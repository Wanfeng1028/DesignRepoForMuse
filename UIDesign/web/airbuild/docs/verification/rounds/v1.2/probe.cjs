// v1.2 measurement probes only (NOT gallery renders). Writes into probes/.
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
const out = path.join(__dirname, 'probes');
const fs = require('fs');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const main = page.locator('[data-window="main"]');
  await main.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  // 1. Two-tab state: click new preview tab, then shoot main window.
  await page.locator('[data-window="main"] button[aria-label="Open new preview tab"]').click();
  await page.waitForTimeout(500);
  await main.screenshot({ path: path.join(out, 'window-main-twotabs.png') });
  console.log('shot twotabs');
  // 2. Hover tile: hover Hands Time tile (non-active), shoot main window.
  await page.locator('[data-window="main"] button[aria-label="Open Hands Time"]').hover();
  await page.waitForTimeout(400);
  await main.screenshot({ path: path.join(out, 'window-main-hovertile.png') });
  console.log('shot hovertile');
  // 3. Hover agent row: hover Colo row (non-active), shoot main window.
  await page.locator('[data-window="main"] button[aria-label="Message Colo"]').hover();
  await page.waitForTimeout(400);
  await main.screenshot({ path: path.join(out, 'window-main-hoverrow.png') });
  console.log('shot hoverrow');
  // 4. Morph mid-frame: click sidebar toggle, read divider transform at ~120ms.
  await page.locator('[data-window="main"] button[aria-label="Toggle left sidebar"]').click();
  await page.waitForTimeout(120);
  const mid = await page.evaluate(() => {
    const btn = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]');
    const line = btn ? btn.querySelector('line') : null;
    return line ? { transform: line.style.transform, opacity: line.style.opacity } : null;
  });
  console.log('morph-mid', JSON.stringify(mid));
  await main.screenshot({ path: path.join(out, 'window-morph-mid.png') });
  console.log('shot morph-mid');
  await page.waitForTimeout(400);
  // 5. Dark backdrop: window corner arc against dark page bg.
  await page.evaluate(() => { document.body.style.background = '#222222'; });
  await page.waitForTimeout(300);
  await main.screenshot({ path: path.join(out, 'window-main-darkbg.png') });
  console.log('shot darkbg');
  // 6. Striped backdrop: glass blur evidence (8px black/white vertical stripes behind window).
  await page.evaluate(() => {
    document.body.style.background = 'repeating-linear-gradient(90deg, #000000 0 8px, #ffffff 8px 16px)';
  });
  await page.waitForTimeout(300);
  await main.screenshot({ path: path.join(out, 'window-main-stripes.png') });
  console.log('shot stripes');
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
