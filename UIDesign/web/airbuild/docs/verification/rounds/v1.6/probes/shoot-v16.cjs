// v1.6 shots: same browser + file:// method as v1.5 shoot-v15.cjs, plus the
// harness-ONLY optical-size override (product code untouched): after load,
// every leaf element with computed font-size >= 20px gets SF Pro Display.
// Headless shell 1243 via explicit executablePath (1.64 default 1248 absent).
// Usage: node shoot-v16.cjs <outdir>
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');
async function optical(page) {
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
}
(async () => {
  const outdir = process.argv[2];
  fs.mkdirSync(outdir, { recursive: true });
  fs.mkdirSync(path.join(outdir, 'probes'), { recursive: true });
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const base = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html';
  for (const [name, w, h, full] of [['gallery-1280', 1280, 800, true], ['gallery-1200x668', 1200, 668, false], ['gallery-1280-top', 1280, 800, false]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);
    await optical(page);
    await page.screenshot({ path: path.join(outdir, name + '.png'), fullPage: full });
    await ctx.close();
    console.log('shot', name);
  }
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await optical(page);
  for (const name of ['main', 'sidebar-collapsed', 'preview-collapsed']) {
    const el = page.locator(`[data-window="${name}"]`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: path.join(outdir, `window-${name}.png`) });
    console.log('shot window', name);
  }
  const phone = page.locator('#preview');
  await phone.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await phone.screenshot({ path: path.join(outdir, 'probes', 'phone-stage.png') });
  console.log('shot phone-stage');
  await browser.close();
})().catch((e) => { console.error('SHOT-FAIL', e.message); process.exit(1); });
