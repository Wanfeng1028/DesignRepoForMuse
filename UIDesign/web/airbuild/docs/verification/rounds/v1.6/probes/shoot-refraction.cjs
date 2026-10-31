// Refraction probe shot: headless shell 1243, file:// probe page.
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const page = await (await browser.newContext({ viewport: { width: 1020, height: 340 } })).newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.6/probes/probe-refraction.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const filters = await page.evaluate(() => ['slabA', 'slabB', 'slabC', 'slabD', 'slabE', 'slabF'].map((id) => { const el = document.getElementById(id); const r = el.getBoundingClientRect(); return { id, filter: el.style.filter ? el.style.filter.slice(0, 60) : '(none)', rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }; }));
  console.log(JSON.stringify(filters, null, 1));
  await page.screenshot({ path: '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.6/probes/refraction.png' });
  await browser.close();
})().catch((e) => { console.error('REFR-FAIL', e.message); process.exit(1); });
