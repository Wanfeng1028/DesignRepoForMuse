const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const page = await (await browser.newContext({ viewport: { width: 900, height: 900 } })).newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.6/probes/probe-refraction3.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.6/probes/refraction3.png', fullPage: true });
  await browser.close();
})().catch((e) => { console.error('REFR3-FAIL', e.message); process.exit(1); });
