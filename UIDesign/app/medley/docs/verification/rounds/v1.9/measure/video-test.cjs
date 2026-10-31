const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const ctx = await browser.newContext({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1, recordVideo: { dir: '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.9/video/', size: { width: 430, height: 920 } } });
  const page = await ctx.newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(2500);
  await ctx.close();
  await browser.close();
  console.log('video test done');
})().catch(e => { console.error('VIDEO TEST FAILED:', e.message); process.exit(1); });
