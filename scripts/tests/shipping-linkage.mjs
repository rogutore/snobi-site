import assert from 'node:assert/strict';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {load,root} from './cart-response.mjs';
const generated=load(path.join(root,'content/system.generated.ts'));
const original=generated.SYSTEM.free_shipping_yen;
let checks=0;
for(const threshold of [original,original-200]) {
  let subtotal=0;
  const overrides={
    './system.generated':{...generated,SYSTEM:Object.freeze({...generated.SYSTEM,free_shipping_yen:threshold})},
    '@/components/commerce/cart':{useCart:()=>({subtotal,pending:false,add:()=>{}})},
  };
  const cache=new Map();
  const read=file=>load(path.join(root,file),overrides,cache);
  const ordering=read('content/ordering.ts');
  const {products,yen}=read('content/products.ts');
  const {ShippingProgress}=read('components/commerce/shipping-progress.tsx');
  const {BuyBar}=read('components/v3/buy-bar.tsx');
  const {OriginBuy}=read('components/v3/pages/origins-buy.tsx');
  assert.equal(ordering.FREE_SHIPPING_YEN,threshold);
  for(subtotal of [0,threshold-1,threshold,threshold+1]) {
    const {left,pct}=ordering.shippingProgress(subtotal);
    assert.equal(left,Math.max(0,threshold-subtotal));
    assert.equal(pct,Math.min(100,subtotal/threshold*100));
    for(const lang of ['ja','en']) {
      const html=renderToStaticMarkup(createElement(ShippingProgress,{subtotal,lang}));
      if(subtotal>=threshold)assert.equal(html,'');
      else assert.ok(html.includes(yen(threshold-subtotal)));
      checks++;
    }
    for(const element of [createElement(BuyBar,{stock:{}}),createElement(OriginBuy,{p:products[0],stock:{},initialSize:products[0].variants[0].size})]) {
      const html=renderToStaticMarkup(element);
      assert.ok(html.includes(`width:${pct}%`));
      assert.ok(html.includes(left>0?`<b>${yen(left)}</b>で送料無料`:'送料無料です'));
      checks++;
    }
  }
  for(const file of ['content/ordering.ts','content/legal.ts','content/trade.ts','content/v2.ts','content/journal/posts/organic-coffee-gift.ts']) {
    const formatted=file==='content/legal.ts'?threshold.toLocaleString('ja-JP')+'円':yen(threshold);
    assert.ok(JSON.stringify(read(file)).includes(formatted),file+' reaches registry threshold');checks++;
  }
  const {OFFER_TERMS}=read('lib/seo.tsx');
  for(const details of OFFER_TERMS.shippingDetails)assert.equal(details.freeShippingThreshold.value,threshold);
  checks++;
  const {FAQ}=read('components/commerce/sections.tsx');
  for(const lang of ['ja','en']) {
    assert.ok(renderToStaticMarkup(createElement(FAQ,{lang})).includes(yen(threshold)));
    checks++;
  }
  const {Hero}=read('components/site/hero.tsx');
  const {TableChapter}=read('components/v3/table-chapter.tsx');
  for(const element of [createElement(Hero,{en:false}),createElement(Hero,{en:true}),createElement(TableChapter,{stock:{}})]) {
    assert.ok(renderToStaticMarkup(element).includes(yen(threshold)),'Legacy component follows registry before any reuse');
    checks++;
  }
}
assert.equal(generated.SYSTEM.free_shipping_yen,original,'Perturbation never changes production registry');
console.log(`PASS ${checks} rendered/display/content/schema linkage checks at real and synthetic thresholds; production value unchanged`);
