const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
  const page = await ctx.newPage();
  await page.goto('file:///tmp/dbg.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(500);
  for (const id of ['plain', 'grid']) {
    const box = await page.locator('#' + id).boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(150);
    await page.mouse.down(); await page.waitForTimeout(200);
    const r = await page.evaluate((id) => { const el = document.getElementById(id); return { active: el.matches(':active'), transform: getComputedStyle(el).transform }; }, id);
    console.log(id, JSON.stringify(r));
    await page.mouse.up(); await page.waitForTimeout(150);
  }
  // now the real capsule button: force style transform via JS to prove transform works on it
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const r2 = await page.evaluate(() => { const el = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]'); el.style.transform = 'scale(0.5)'; return getComputedStyle(el).transform; });
  console.log('capsule forced inline transform:', r2);
  await browser.close();
})().catch((e) => { console.error('DBG-FAIL', e.message); process.exit(1); });
