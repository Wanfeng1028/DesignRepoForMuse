const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const rel = async (winName, fn) => {
    const w = page.locator(`[data-window="${winName}"]`);
    await w.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    return w.evaluate(fn);
  };
  for (const name of ['sidebar-collapsed', 'preview-collapsed']) {
    const r = await rel(name, (w) => {
      const b = w.querySelector('button[aria-label^="Current project"]');
      const r = b.getBoundingClientRect(); const wr = w.getBoundingClientRect();
      return { iconCx: Math.round(r.x - wr.x + r.width / 2), iconX: Math.round(r.x - wr.x), iconW: Math.round(r.width) };
    });
    console.log(name, JSON.stringify(r));
  }
  // twotabs: click new tab in main, dump tab rects + bg
  await page.locator('[data-window="main"]').scrollIntoViewIfNeeded();
  await page.locator('[data-window="main"] button[aria-label="Open new preview tab"]').click();
  await page.waitForTimeout(400);
  const tabs = await page.locator('[data-window="main"]').evaluate((w) => {
    return Array.from(w.querySelectorAll('button[role="tab"]')).map(b => {
      const r = b.getBoundingClientRect(); const wr = w.getBoundingClientRect(); const cs = getComputedStyle(b);
      const strong = b.querySelector('strong');
      return { x: Math.round(r.x - wr.x), y: Math.round(r.y - wr.y), w: Math.round(r.width), h: Math.round(r.height),
        bg: cs.backgroundColor, label: strong ? strong.textContent : '', labelSize: strong ? getComputedStyle(strong).fontSize : '', labelWeight: strong ? getComputedStyle(strong).fontWeight : '' };
    });
  });
  console.log('twotabs', JSON.stringify(tabs));
  // hover computed bg
  await page.locator('[data-window="main"] button[aria-label="Open Hands Time"]').hover();
  await page.waitForTimeout(300);
  const hovTile = await page.locator('[data-window="main"]').evaluate((w) => {
    const b = w.querySelector('button[aria-label="Open Hands Time"]');
    return getComputedStyle(b).backgroundColor + ' transform=' + getComputedStyle(b).transform;
  });
  console.log('hover-tile', hovTile);
  await page.locator('[data-window="main"] button[aria-label="Message Colo"]').hover();
  await page.waitForTimeout(300);
  const hovRow = await page.locator('[data-window="main"]').evaluate((w) => {
    const b = w.querySelector('button[aria-label="Message Colo"]');
    return getComputedStyle(b).backgroundColor;
  });
  console.log('hover-row', hovRow);
  // phone appbar fonts + phone frame
  const phone = await page.locator('[data-window="main"]').evaluate((w) => {
    const spans = Array.from(w.querySelectorAll('span'));
    const name = spans.find(s => s.textContent === 'Hourtown' && getComputedStyle(s).fontSize === '12px');
    const today = spans.find(s => s.textContent === 'Today');
    const frame = Array.from(w.querySelectorAll('div')).find(d => d.style && d.style.borderRadius === '38px');
    const fr = frame ? frame.getBoundingClientRect() : null; const wr = w.getBoundingClientRect();
    return {
      appbarName: name ? { size: getComputedStyle(name).fontSize, weight: getComputedStyle(name).fontWeight } : null,
      today: today ? { size: getComputedStyle(today).fontSize, color: getComputedStyle(today).color } : null,
      frame: fr ? { x: Math.round(fr.x - wr.x), y: Math.round(fr.y - wr.y), w: Math.round(fr.width), h: Math.round(fr.height),
        border: getComputedStyle(frame).border, radius: getComputedStyle(frame).borderRadius, shadow: getComputedStyle(frame).boxShadow } : null,
    };
  });
  console.log('phone', JSON.stringify(phone));
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
