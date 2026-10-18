/* Node preload for local browser tests. All server fetches are intercepted; no real Shopify traffic. */
import fs from 'node:fs';
import path from 'node:path';
import { load, root } from './cart-response.mjs';
const { products } = load(path.join(root,'content/products.ts'));
const variants = products.flatMap(p=>p.variants.map(v=>({...v, product:{handle:p.handle,title:p.title.ja}})));
const amount = n=>({amount:String(n),currencyCode:'JPY'});
const carts = new Map();
let sequence=0;
function recalc(cart) {
  cart.totalQuantity=cart.lines.nodes.reduce((n,l)=>n+l.quantity,0);
  const subtotal=cart.lines.nodes.reduce((n,l)=>n+Number(l.merchandise.price.amount)*l.quantity,0);
  cart.cost={subtotalAmount:amount(subtotal),totalAmount:amount(subtotal)};
  return cart;
}
function line(id,quantity) {
  const v=variants.find(v=>v.id===id);
  if(!v)throw new Error('Unknown fixture variant');
  return {id:'fixture-line-'+id.split('/').pop(),quantity,cost:{totalAmount:amount(v.price*quantity)},merchandise:{id,title:v.size,availableForSale:true,quantityAvailable:99,price:amount(v.price),product:v.product}};
}
globalThis.fetch=async (input,init)=>{
  const url=String(input);
  if(!url.startsWith('https://synthetic-shopify.invalid/'))throw new Error('External request forbidden by local fixture: '+new URL(url).hostname);
  const {query,variables:v}=JSON.parse(init.body);
  fs.appendFileSync(process.env.SNOBI_FIXTURE_LOG,JSON.stringify({query,variables:v})+'\n');
  let data;
  if(query.startsWith('query Stock'))data={nodes:variants.map(v=>({id:v.id,sku:v.sku,availableForSale:true,quantityAvailable:99,price:amount(v.price)}))};
  else if(query.startsWith('query Cart'))data={cart:carts.get(v.id)??null};
  else {
    const field=['cartAttributesUpdate','cartCreate','cartLinesAdd','cartLinesUpdate','cartLinesRemove'].find(n=>query.includes(n+'('));
    let cart=carts.get(v.id);
    if(field==='cartCreate') {
      const id=`gid://shopify/Cart/synthetic-${++sequence}?key=PRIVATE_TEST_SENTINEL`;
      cart={id,checkoutUrl:'https://checkout.example.invalid/c/fixture',attributes:v.input.attributes,lines:{nodes:v.input.lines.map(l=>line(l.merchandiseId,l.quantity))}};
    } else if(!cart)throw new Error('Missing fixture cart');
    else if(field==='cartAttributesUpdate')cart.attributes=v.attributes;
    else if(field==='cartLinesAdd')cart.lines.nodes.push(...v.lines.map(l=>line(l.merchandiseId,l.quantity)));
    else if(field==='cartLinesUpdate')for(const l of v.lines){const item=cart.lines.nodes.find(x=>x.id===l.id);item.quantity=l.quantity;item.cost.totalAmount=amount(Number(item.merchandise.price.amount)*l.quantity);}
    else if(field==='cartLinesRemove')cart.lines.nodes=cart.lines.nodes.filter(l=>!v.lines.includes(l.id));
    else throw new Error('Unknown fixture mutation');
    recalc(cart);carts.set(cart.id,cart);data={[field]:{cart,userErrors:[],warnings:[]}};
  }
  return new Response(JSON.stringify({data}),{status:200,headers:{'content-type':'application/json'}});
};
