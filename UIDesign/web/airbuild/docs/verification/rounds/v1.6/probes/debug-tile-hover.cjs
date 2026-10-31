const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const loc = page.locator('[data-window="main"] button[aria-label="Open Hands Time"]');
  const box = await loc.boundingBox();
  console.log('tile box:', box);
  await loc.hover();
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const w = document.querySelector('[data-window="main"] .ab-window');
    const t = w.querySelector('[aria-label="Open Hands Time"]');
    const tr = t.getBoundingClientRect();
    const cx = tr.x + tr.width / 2, cy = tr.y + tr.height / 2;
    const top = document.elementFromPoint(cx, cy);
    return { bg: getComputedStyle(t).backgroundColor, rect: [Math.round(tr.x), Math.round(tr.y), Math.round(tr.width), Math.round(tr.height)], topEl: top ? (top.tagName + '.' + (top.className || '') + ' aria=' + top.getAttribute('aria-label')) : null, matches: top === t || (top && t.contains(top)) };
  });
  console.log(JSON.stringify(r));
  await browser.close();
})().catch((e) => { console.error('DBG-FAIL', e.message); process.exit(1); });
