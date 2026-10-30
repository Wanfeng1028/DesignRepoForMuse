const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const main = page.locator('[data-window="main"]');
  await main.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => {
    const btn = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]');
    const line = btn.querySelector('line');
    return getComputedStyle(line).transform + ' opacity=' + getComputedStyle(line).opacity;
  });
  console.log('morph-before', before);
  await page.locator('[data-window="main"] button[aria-label="Toggle left sidebar"]').click();
  await page.waitForTimeout(110);
  const mid = await page.evaluate(() => {
    const btn = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]');
    const line = btn.querySelector('line');
    return getComputedStyle(line).transform + ' opacity=' + getComputedStyle(line).opacity;
  });
  console.log('morph-mid-computed', mid);
  await main.screenshot({ path: path.join(__dirname, 'probes', 'window-morph-mid2.png') });
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => {
    const btn = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]');
    const line = btn.querySelector('line');
    return getComputedStyle(line).transform + ' opacity=' + getComputedStyle(line).opacity;
  });
  console.log('morph-after', after);
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
