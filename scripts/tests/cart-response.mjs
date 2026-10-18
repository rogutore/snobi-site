/* Execute the real action module with synthetic cookie/Storefront boundaries. No network. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import { createRequire } from 'node:module';
const requireFromRoot = createRequire(path.join(root, 'package.json'));

function load(file, overrides = {}, cache = new Map()) {
  if (cache.has(file)) return cache.get(file).exports;
  const loaded = { exports: {} }; cache.set(file, loaded);
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX,
  }}).outputText;
  function localRequire(name) {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name === 'server-only') return {};
    if (name.startsWith('.') || name.startsWith('@/')) {
      const base = name.startsWith('@/') ? path.join(root, name.slice(2)) : path.resolve(path.dirname(file), name);
      const resolved = [base, base + '.ts', base + '.tsx', path.join(base, 'index.ts')].find(p => fs.existsSync(p) && fs.statSync(p).isFile());
      if (!resolved) throw new Error('Unresolved test import: ' + name);
      return load(resolved, overrides, cache);
    }
    return requireFromRoot(name);
  }
  vm.runInNewContext(`(function(require,module,exports){${source}\n})`, {
    URL, console, process, structuredClone,
    fetch: () => { throw new Error('Network forbidden in cart response tests'); },
  }, { filename: file })(localRequire, loaded, loaded.exports);
  return loaded.exports;
}

const { products } = load(path.join(root, 'content/products.ts'));
const variant = products[0].variants[0].id;
const money = { amount: '1600', currencyCode: 'JPY' };
const privateId = 'gid://shopify/Cart/synthetic?key=PRIVATE_TEST_SENTINEL';
const base = {
  id: privateId, checkoutUrl: 'https://checkout.example.invalid/c/test?existing=keep', totalQuantity: 1,
  attributes: [{ key: 'lang', value: 'ja' }, { key: 'source', value: 'snobi.jp' }],
  cost: { subtotalAmount: money, totalAmount: money },
  lines: { nodes: [{ id: 'synthetic-line', quantity: 1, cost: { totalAmount: money }, merchandise: {
    id: variant, title: '100g', availableForSale: true, quantityAvailable: 9, price: money,
    product: { handle: products[0].handle, title: 'Synthetic coffee' },
  }}] },
};
let passed = 0;
function fixture({ cart = structuredClone(base), payload = {}, fail = false, mutation = {} } = {}) {
  const calls = [], writes = [];
  const result = () => ({ cart: cart ? structuredClone(cart) : null, userErrors: [], ...structuredClone(payload) });
  const actions = load(path.join(root, 'lib/shopify/actions.ts'), {
    'next/headers': { cookies: async () => ({ get: () => cart ? { value: privateId } : undefined, set: (...args) => writes.push(args) }) },
    './client': { CART_FIELDS: 'id checkoutUrl', storefront: async (query, variables) => {
      calls.push({ query, variables });
      if (fail) throw new Error('Synthetic transport failure');
      if (query.startsWith('query')) return { cart: cart ? structuredClone(cart) : null };
      const field = ['cartAttributesUpdate','cartCreate','cartLinesAdd','cartLinesUpdate','cartLinesRemove'].find(n => query.includes(n + '('));
      assert.ok(field, 'Known mutation');
      if (mutation[field]?.throw) throw new Error('PRIVATE_TEST_SENTINEL raw diagnostic');
      const data = result();
      if (field === 'cartCreate' && data.cart === null) data.cart = structuredClone(base);
      return { [field]: { ...data, ...structuredClone(mutation[field] ?? {}) } };
    } },
  });
  return { actions, calls, writes };
}
function safe(result, lang = 'ja', expected = base) {
  const encoded = JSON.stringify(result);
  assert.ok(!encoded.includes('PRIVATE_TEST_SENTINEL'), 'Private Storefront cart identity must not reach an action response');
  assert.ok(!encoded.includes('private@example.invalid'), 'Unrequested future buyer fields must not escape');
  assert.ok(!encoded.includes('raw diagnostic'), 'Raw diagnostics must not escape');
  if (expected === null) assert.equal(result.cart, null);
  else {
    assert.ok(result.cart, 'An existing cart must remain usable');
    assert.ok(!Object.hasOwn(result.cart, 'id'));
    assert.ok(!Object.hasOwn(result.cart, 'attributes'));
    assert.equal(new URL(result.cart.checkoutUrl).searchParams.get('locale'), lang);
    assert.equal(new URL(result.cart.checkoutUrl).searchParams.get('existing'), 'keep');
    assert.equal(result.cart.totalQuantity, expected.totalQuantity);
    assert.deepEqual(JSON.parse(JSON.stringify(result.cart.cost)), expected.cost);
    assert.deepEqual(JSON.parse(JSON.stringify(result.cart.lines)), expected.lines);
  }
  passed++;
}
async function main() {
  for (const lang of ['ja','en']) {
    for (const action of [a => a.getCart(lang), a => a.addLine(variant, lang), a => a.updateLine('synthetic-line', 2, lang), a => a.removeLine('synthetic-line', lang), a => a.updateLine('foreign-line', 2, lang), a => a.removeLine('foreign-line', lang), a => a.updateLine('synthetic-line', 0, lang)]) {
      const f = fixture(); safe(await action(f.actions), lang);
      for (const call of f.calls) if (call.variables.id) assert.equal(call.variables.id, privateId, 'Server keeps private identifier');
    }
    for (const payload of [{ userErrors: [{message:'raw diagnostic'}] }, { warnings: [{message:'quantity changed'}] }]) {
      const f=fixture({payload}); const r=await f.actions.addLine(variant, lang); safe(r, lang); assert.ok(r.error);
    }
    const f=fixture({cart:null}); const r=await f.actions.addLine(variant, lang); safe(r,lang);
    assert.equal(f.writes[0][0], 'snobi_cart'); assert.equal(f.writes[0][1], privateId); assert.equal(f.writes[0][2].httpOnly,true);
  }
  const f=fixture();
  for (const quantity of [-1, 1.5, NaN, Infinity, 101]) safe(await f.actions.updateLine('synthetic-line',quantity),'ja',null);
  safe(await f.actions.addLine('unlisted-variant'),'ja',null);
  assert.equal(f.calls.length, 0, 'Invalid inputs refuse before transport');
  for (const method of ['getCart','addLine','updateLine','removeLine']) {
    const t=fixture({fail:true});
    const args=method==='addLine'?[variant]:method==='updateLine'?['synthetic-line',2]:method==='removeLine'?['synthetic-line']:[];
    const r=await t.actions[method](...args); safe(r,'ja',null); assert.ok(r.error);
  }
  safe(await fixture({cart:null}).actions.getCart(),'ja',null);
  for (const [field, invoke, options, locale] of [
    ['cartCreate', a=>a.addLine(variant), {cart:null}, 'ja'],
    ['cartAttributesUpdate', a=>a.getCart('en'), {}, 'en'],
    ['cartAttributesUpdate', a=>a.addLine(variant), {}, 'ja'],
    ['cartLinesAdd', a=>a.addLine(variant), {}, 'ja'],
    ['cartLinesUpdate', a=>a.updateLine('synthetic-line',2), {}, 'ja'],
    ['cartLinesRemove', a=>a.removeLine('synthetic-line'), {}, 'ja'],
  ]) {
    for (const outcome of [{throw:true}, {cart:null,userErrors:[{message:'raw diagnostic PRIVATE_TEST_SENTINEL'}]}, {userErrors:[{message:'raw diagnostic PRIVATE_TEST_SENTINEL'}]}, {warnings:[{message:'raw diagnostic PRIVATE_TEST_SENTINEL'}]}]) {
      const t=fixture({...options,mutation:{[field]:outcome}});
      const r=await invoke(t.actions);
      safe(r, locale, outcome.throw || outcome.cart===null ? null:base);
      // addLine proceeds after an attribute-only warning; its final line result is authoritative.
      if (field==='cartAttributesUpdate' && outcome.warnings && locale==='ja') assert.equal(r.error,undefined);
      else assert.ok(r.error);
      if (field==='cartCreate' && (outcome.throw || outcome.cart===null)) assert.equal(t.writes.length,0,'Failed creation must not store a cookie');
      assert.ok(t.calls.some(c=>c.query.includes(field+'(')), 'Target mutation reached');
    }
  }
  const empty=structuredClone(base); empty.totalQuantity=0; empty.lines.nodes=[];
  empty.cost={subtotalAmount:{amount:'0',currencyCode:'JPY'},totalAmount:{amount:'0',currencyCode:'JPY'}};
  safe(await fixture({mutation:{cartLinesRemove:{cart:empty}}}).actions.removeLine('synthetic-line'),'ja',empty);
  const extra=structuredClone(base); extra.buyerIdentity={email:'private@example.invalid'};
  extra.lines.nodes[0].merchandise.product.internalCustomer='private@example.invalid';
  extra.cost.totalAmount.privateField='private@example.invalid';
  safe(await fixture({cart:extra}).actions.getCart());
  assert.equal(base.checkoutUrl.includes('locale='),false, 'Original synthetic object unchanged');
  console.log(`PASS ${passed} action response cases; private cookie/server IDs retained, all browser returns projected, synthetic transport only`);
}
export { load, root };
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e.message); process.exitCode=1; });
}
