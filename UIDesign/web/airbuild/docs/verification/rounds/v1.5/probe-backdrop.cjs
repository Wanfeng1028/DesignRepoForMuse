const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const out = await page.evaluate(() => {
    const win = document.querySelector('[data-window="main"] .ab-window');
    const cs = getComputedStyle(win);
    const rules = [];
    for (const sheet of document.styleSheets) {
      try { for (const r of sheet.cssRules) { if (r.selectorText && r.selectorText.includes('ab-window')) rules.push(r.selectorText + ' :: ' + r.style.cssText.slice(0, 300)); } } catch (e) { rules.push('sheet-error:' + e.message); }
    }
    return { backdrop: cs.backdropFilter, webkit: cs.webkitBackdropFilter, bg: cs.backgroundColor, cls: win.className, rules: rules.slice(0, 10), transitionProp: cs.transitionProperty, transitionDur: cs.transitionDuration, transitionTiming: cs.transitionTimingFunction, titlebarTransProp: (() => { const t = win.children[0]; const c = getComputedStyle(t); return [c.transitionProperty, c.transitionDuration, c.transitionTimingFunction]; })() };
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
