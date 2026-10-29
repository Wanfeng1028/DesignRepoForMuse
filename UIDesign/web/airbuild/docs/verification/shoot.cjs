const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const base = 'file://' + path.join(__dirname, '..', '..', 'dist', 'index.html');
  for (const [name, w, h, full] of [['gallery-1280', 1280, 800, true], ['gallery-1200x668', 1200, 668, false], ['gallery-1280-top', 1280, 800, false]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(__dirname, name + '.png'), fullPage: full });
    await ctx.close();
    console.log('shot', name);
  }
  await browser.close();
})().catch((e) => { console.error('SHOT-FAIL', e.message); process.exit(1); });
