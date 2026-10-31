const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const getBg = (label) => page.evaluate((l) => { const w = document.querySelector('[data-window="main"] .ab-window'); const t = w.querySelector('[aria-label="' + l + '"]'); return getComputedStyle(t).backgroundColor; }, label);
  console.log('tile before:', await getBg('Open Hands Time'));
  const loc = page.locator('[data-window="main"] button[aria-label="Open Hands Time"]');
  await loc.scrollIntoViewIfNeeded();
  const box = await loc.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(800);
  console.log('tile after mouse.move + 800ms:', await getBg('Open Hands Time'));
  // synthetic control: dispatch mouseover/mouseenter directly
  await page.evaluate(() => { const w = document.querySelector('[data-window="main"] .ab-window'); const t = w.querySelector('[aria-label="Open Hands Time"]'); t.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); t.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false })); });
  await page.waitForTimeout(500);
  console.log('tile after synthetic mouseover:', await getBg('Open Hands Time'));
  // row control in same session
  const row = page.locator('[data-window="main"] button[aria-label="Message Ato"]');
  await row.hover();
  await page.waitForTimeout(300);
  console.log('row after hover:', await getBg('Message Ato'));
  await browser.close();
})().catch((e) => { console.error('DBG2-FAIL', e.message); process.exit(1); });
