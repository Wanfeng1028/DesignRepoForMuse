const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const page = await (await browser.newContext({ viewport: { width: 1020, height: 340 } })).newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.6/probes/probe-backdrop-url2.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => ['a', 'b', 'c', 'd', 'e'].map((id) => ({ id, bf: getComputedStyle(document.getElementById(id)).backdropFilter })));
  console.log(JSON.stringify(r, null, 1));
  await page.screenshot({ path: '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.6/probes/backdrop-url2.png' });
  await browser.close();
})().catch((e) => { console.error('URL2-FAIL', e.message); process.exit(1); });
