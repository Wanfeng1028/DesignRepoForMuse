// Element screenshots of the three gallery windows, same browser + file://
// method as shoot.cjs. Usage: node shoot-sections.cjs <outdir>
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const outdir = process.argv[2] || __dirname;
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  for (const name of ['main', 'sidebar-collapsed', 'preview-collapsed']) {
    const el = page.locator(`[data-window="${name}"]`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: path.join(outdir, `window-${name}.png`) });
    console.log('shot', name);
  }
  await browser.close();
})().catch((e) => { console.error('SHOT-FAIL', e.message); process.exit(1); });
