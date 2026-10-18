/* Run against a local production server started with shopify-fixture.mjs. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { load, root } from './cart-response.mjs';
const {products}=load(path.join(root,'content/products.ts'));
const {requestedSize}=load(path.join(root,'lib/product-variant.ts'));
const base='http://localhost:3112';
const browser=await chromium.launch({executablePath:process.env.SNOBI_TEST_CHROME});
const results=[];
try {
  for(const lang of ['ja','en']) for(const p of products) for(const size of ['100g','200g']) {
    const context=await browser.newContext({viewport:{width:390,height:844}});
    const actionBodies=[];
    await context.route('**/*',async route=>{
      if(new URL(route.request().url()).origin!==base)return route.abort();
      if(route.request().method()!=='POST')return route.continue();
      const response=await route.fetch();
      actionBodies.push({request:route.request().postData(),body:await response.text()});
      await route.fulfill({response});
    });
    const page=await context.newPage();
    const prefix=lang==='en'?'/en':'';
    const response=await page.goto(`${base}${prefix}/origins/${p.slug}?size=${size}`);
    assert.equal(response.status(),200);
    const html=await response.text();
    const group=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.flatMap(n=>JSON.parse(n.textContent)).find(x=>x['@type']==='ProductGroup'));
    for(const v of p.variants){const item=group.hasVariant.find(x=>x.size===v.size);assert.equal(item.url,`https://snobi.jp${prefix}/origins/${p.slug}?size=${v.size}`);assert.equal(item.offers.url,item.url);assert.equal(Number(item.offers.price),v.price);}
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://snobi.jp${prefix}/origins/${p.slug}`);
    assert.match(html,new RegExp(`<input[^>]+checked=""[^>]+value="${size}"|<input[^>]+value="${size}"[^>]+checked=""`));
    const selected=page.locator('input[type="radio"]:checked');
    await selected.waitFor();assert.equal(await selected.inputValue(),size);
    const other=p.variants.find(v=>v.size!==size).size;
    await page.locator(`input[type="radio"][value="${other}"]`).check();
    assert.equal(await selected.inputValue(),other);
    if(lang==='ja'){
      assert.equal(await page.locator('.v3-prodbar [role="radio"][aria-checked="true"]').innerText(),other);
      await page.locator('.v3p-origins-buy').evaluate(el=>window.scrollTo(0,window.scrollY+el.getBoundingClientRect().bottom+100));
      await page.locator('.v3-prodbar.on').waitFor();
      await page.locator('.v3-prodbar [role="radio"]').filter({hasText:size}).click();
    } else await page.locator(`input[type="radio"][value="${size}"]`).check();
    assert.equal(await selected.inputValue(),size);
    const v=p.variants.find(v=>v.size===size);
    const add=page.locator(lang==='ja'?'.v3p-origins-add':'.detail-card button.add-button');
    const button=lang==='ja'?add:page.getByRole('button',{name:'Add to cart',exact:true});
    await button.click();
    const dialog=page.locator('dialog[open]');await dialog.waitFor();
    await page.waitForFunction(()=>document.querySelector('dialog[open]')?.textContent.includes('fixture')===false && document.querySelector('dialog[open] .cart-line'));
    assert.ok((await dialog.innerText()).includes(size));
    const actionBody=actionBodies.find(x=>x.request.includes(v.id))?.body;
    assert.ok(actionBody?.length>0);
    assert.ok(!actionBody.includes('PRIVATE_TEST_SENTINEL'),'No private cart key in actual action response body');
    const cookie=(await context.cookies()).find(c=>c.name==='snobi_cart');assert.ok(cookie?.httpOnly);
    const calls=fs.readFileSync(process.env.SNOBI_FIXTURE_LOG,'utf8').trim().split('\n').map(JSON.parse);
    assert.equal(calls.filter(c=>c.query.includes('cartCreate(')).at(-1).variables.input.lines[0].merchandiseId,v.id);
    if(lang==='ja')assert.equal(await page.locator('.v3-prodbar [role="radio"][aria-checked="true"]').innerText(),size);
    // Next's public app router exercises an actual client transition without a full reload.
    await page.goto(`${base}${prefix}/origins/${p.slug}`);
    await page.locator('input[type="radio"][value="200g"]').check();
    await page.evaluate(url=>window.next.router.push(url),`${prefix}/origins/${p.slug}?size=100g`);
    await page.waitForURL('**?size=100g');
    await page.waitForFunction(()=>document.querySelector('input[type="radio"]:checked')?.value==='100g');
    results.push({lang,slug:p.slug,size,ssr:true,hydrated:true,selectionToggle:true,sticky:lang==='ja',offer:true,cartVariant:true,privateKeyAbsent:true});
    await context.close();
  }
  for(const p of products)for(const value of [undefined,'unknown',['100g','200g'],''])assert.equal(requestedSize(p,value),p.variants[0].size);
  console.log(JSON.stringify({pass:results.length,results,invalidSizeCases:products.length*4},null,2));
} finally {await browser.close();}
