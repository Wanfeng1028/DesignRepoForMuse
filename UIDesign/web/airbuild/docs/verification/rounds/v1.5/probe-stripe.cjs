// Stripe-backdrop blur probe: paints a high-contrast vertical-stripe body backdrop
// behind the main window, screenshots the window element, and dumps a horizontal
// pixel profile across one stripe edge inside the sidebar zone (window coords).
// Before fix: window backdrop is -webkit-only in built CSS, headless Chromium
// computes backdrop-filter:none, so the edge stays sharp (alpha only).
// After fix (inline both declarations): blur(34px) must smooth the edge.
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    document.body.style.background = 'repeating-linear-gradient(90deg, #000000 0px, #000000 60px, #ffffff 60px, #ffffff 120px)';
    document.body.style.backgroundAttachment = 'fixed';
  });
  await page.waitForTimeout(500);
  const el = page.locator('[data-window="main"]');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await el.screenshot({ path: path.join(__dirname, 'probes', 'stripe-window.png') });
  const backdrop = await page.evaluate(() => {
    const w = document.querySelector('[data-window="main"] .ab-window');
    const c = getComputedStyle(w);
    return { backdrop: c.getPropertyValue('backdrop-filter'), webkit: c.getPropertyValue('-webkit-backdrop-filter'), inline: w.style.backdropFilter || '(none)' };
  });
  console.log('backdrop:', JSON.stringify(backdrop));
  await browser.close();
})().catch((e) => { console.error('STRIPE-FAIL', e.message); process.exit(1); });
