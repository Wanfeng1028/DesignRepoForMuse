// One-off v1.4 check: add a second device tab, then the first tab is inactive.
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.locator('[data-window="main"] button[aria-label="Open new preview tab"]').click();
  await page.waitForTimeout(400);
  const out = await page.evaluate(() => {
    const win = document.querySelector('[data-window="main"] .ab-window');
    const tabs = Array.from(win.querySelectorAll('button[role="tab"]'));
    return tabs.map(t => ({ label: t.textContent.trim(), color: getComputedStyle(t).color, bg: getComputedStyle(t).backgroundColor }));
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
