// v1.4 shots: gallery + three windows, same browser + file:// method as shoot.cjs / shoot-sections.cjs
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const outdir = __dirname;
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const base = 'file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html');
  for (const [name, w, h, full] of [['gallery-1280', 1280, 800, true], ['gallery-1200x668', 1200, 668, false], ['gallery-1280-top', 1280, 800, false]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outdir, name + '.png'), fullPage: full });
    await ctx.close();
    console.log('shot', name);
  }
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  for (const name of ['main', 'sidebar-collapsed', 'preview-collapsed']) {
    const el = page.locator(`[data-window="${name}"]`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: path.join(outdir, `window-${name}.png`) });
    console.log('shot window', name);
  }
  // phone stage close-up from section 4
  const phone = page.locator('#preview');
  await phone.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await phone.screenshot({ path: path.join(outdir, 'probes', 'phone-stage.png') });
  console.log('shot phone-stage');
  await browser.close();
})().catch((e) => { console.error('SHOT-FAIL', e.message); process.exit(1); });
