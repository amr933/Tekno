// Browser smoke test for TEKNO (Chromium via Playwright).
// Usage: npm i playwright && npx playwright install chromium && node tests/browser-smoke.js
// Checks: console/page errors, horizontal overflow at phone width (EN and AR),
// invalid input handling, Clear, Enter-to-calculate, language switch, directory filter, home search, internal links.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const URL_OF = (p) => 'file://' + path.join(ROOT, p);
const toolFiles = fs.readdirSync(path.join(ROOT, 'tools')).filter((f) => f.endsWith('.html')).sort();
const PAGES = ['index.html', 'tools.html'].concat(toolFiles.map((f) => 'tools/' + f));
const CALCS = PAGES.filter((p) => p.startsWith('tools/'));
let failures = 0;
const fail = (msg) => { failures++; console.log('FAIL  ' + msg); };
const ok = (msg) => console.log('ok    ' + msg);

(async () => {
  // 1) internal links point to existing files
  for (const p of PAGES) {
    const html = fs.readFileSync(path.join(ROOT, p), 'utf8');
    for (const m of html.matchAll(/href="([^"#:]+)(#[^"]*)?"/g)) {
      const target = path.resolve(path.dirname(path.join(ROOT, p)), m[1]);
      if (!fs.existsSync(target)) fail(`broken link in ${p}: ${m[1]}`);
    }
  }
  ok('internal links resolve');

  const browser = await chromium.launch();
  const newPage = async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    page.errors = [];
    page.on('pageerror', (e) => page.errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
    return { ctx, page };
  };

  // 2) every page, both languages: no errors, no horizontal overflow
  for (const lang of ['en', 'ar']) {
    for (const p of PAGES) {
      const { ctx, page } = await newPage();
      await page.goto(URL_OF(p));
      if (lang === 'ar') { await page.locator('#lang-toggle').click(); await page.waitForTimeout(80); }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) fail(`${lang} ${p} scrolls horizontally on a phone`);
      if (page.errors.length) fail(`${lang} ${p} errors: ${page.errors.join('; ')}`);
      await ctx.close();
    }
  }
  ok('all pages: no console errors, no horizontal overflow (EN + AR)');

  // 3) invalid inputs never show a result; Enter calculates; Clear resets
  for (const p of CALCS) {
    const { ctx, page } = await newPage();
    await page.goto(URL_OF(p));
    const inputs = page.locator('.calc-wrap input[data-field]');
    const n = await inputs.count();
    const calc = page.locator('.calc-wrap button[data-action=calculate]').first();
    for (const bad of ['', 'abc', '-5']) {
      for (let i = 0; i < n; i++) await inputs.nth(i).fill(bad);
      await calc.click();
      if (await page.locator('.result .value').count()) {
        // Converter and HVAC accept negative-free zero, but negatives and text must never produce a number.
        if (bad !== '') fail(`${p}: result shown for invalid input "${bad}"`);
        else fail(`${p}: result shown for empty input`);
      }
    }
    await page.locator('.calc-wrap button[data-action=clear]').first().click();
    await inputs.nth(0).press('Enter');
    if (!(await page.locator('.result .value').count()) && !(await page.locator('.msg-error').count())) {
      fail(`${p}: Enter did not produce a result or error after Clear`);
    }
    if (page.errors.length) fail(`${p} errors: ${page.errors.join('; ')}`);
    await ctx.close();
  }
  ok('invalid/empty/negative/text inputs show no result; Clear and Enter work');

  // 4) concrete result is correct and survives a language switch
  {
    const { ctx, page } = await newPage();
    await page.goto(URL_OF('tools/concrete.html'));
    const val = async () => (await page.locator('.result .value').textContent()).trim();
    await page.locator('.calc-wrap button[data-action=calculate]').first().click();
    if (!(await val()).startsWith('1.2')) fail('concrete default 3 x 2 x 0.2 should be 1.2 m³');
    await page.locator('#lang-toggle').click();
    await page.waitForTimeout(80);
    if (!(await val()).startsWith('1.2')) fail('concrete result lost after language switch');
    const steps = await page.locator('.steps').first().textContent();
    if (!steps.includes('الحجم')) fail('Arabic steps not shown after language switch');
    await ctx.close();
  }
  ok('concrete result correct; result and Arabic steps update on language switch');

  // 4b) editing an input removes the old result (no stale numbers); Enter recalculates
  {
    const { ctx, page } = await newPage();
    await page.goto(URL_OF('tools/concrete.html'));
    await page.locator('.calc-wrap button[data-action=calculate]').first().click();
    const w = page.locator('.calc-wrap input[data-field=width]');
    await w.fill('5');
    if (await page.locator('.result .value').count()) fail('stale result shown after editing an input');
    await w.press('Enter');
    if (!(await page.locator('.result .value').count())) fail('Enter did not recalculate after editing');
    await ctx.close();
  }
  ok('editing an input clears the old result; Enter recalculates');

  // 5) directory search, category filter and home search
  {
    const { ctx, page } = await newPage();
    await page.goto(URL_OF('tools.html'));
    const cards = () => page.locator('#tools-grid > *').count();
    if ((await cards()) !== 72) fail('directory should list 72 tools');
    await page.locator('#tools-q').fill('concrete');
    if ((await cards()) !== 2) fail('search "concrete" should match concrete and thermal expansion (2 tools)');
    await page.locator('#tools-q').fill('');
    await page.locator('#tools-chips .chip', { hasText: /Electrical/i }).click();
    if ((await cards()) !== 10) fail('Electrical filter should show 10 tools');
    await ctx.close();
  }
  {
    const { ctx, page } = await newPage();
    await page.goto(URL_OF('index.html'));
    await page.locator('#home-q').fill('pump');
    await page.locator('#home-search button, #home-search [type=submit]').first().click();
    await page.waitForURL(/tools\.html\?q=pump/);
    if ((await page.locator('#tools-grid > *').count()) < 1) fail('home search "pump" returned no tools');
    await ctx.close();
  }
  ok('directory search, category filter and home search work');

  await browser.close();
  console.log(failures ? `\n${failures} check(s) failed` : '\nAll browser checks passed');
  process.exitCode = failures ? 1 : 0;
})();
