const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.locator('[data-window="main"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const btn = page.locator('[data-window="main"] button[aria-label="Toggle left sidebar"]');
  const box = await btn.boundingBox();
  console.log('transition props:', await page.evaluate(() => { const el = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]'); const c = getComputedStyle(el); return c.transitionProperty + ' / ' + c.transitionDuration; }));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(200);
  await page.mouse.down();
  for (const w of [50, 150, 400]) {
    await page.waitForTimeout(w);
    const r = await page.evaluate(() => { const el = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]'); return { active: el.matches(':active'), transform: getComputedStyle(el).transform }; });
    console.log('down +' + w + 'ms:', JSON.stringify(r));
  }
  await page.mouse.up(); await page.waitForTimeout(300);
  console.log('after up:', await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]')).transform));
  await browser.close();
})().catch((e) => { console.error('DBG-FAIL', e.message); process.exit(1); });
