const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const out = await page.evaluate(() => {
    const cs = (el, p) => el ? getComputedStyle(el).getPropertyValue(p) : 'MISSING';
    const rect = (el) => { if (!el) return 'MISSING'; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
    const sb = document.querySelector('[data-window="sidebar-collapsed"] .ab-window');
    const pv = document.querySelector('[data-window="preview-collapsed"] .ab-window');
    const sbTitle = sb.children[0];
    const sbZone = sbTitle.children[0];
    const pvStrip = pv.querySelector('[aria-label="Toggle preview"]');
    const mainIcon = (() => { const w = document.querySelector('[data-window="main"] .ab-window'); const b = Array.from(w.querySelectorAll('button')).find(x => (x.getAttribute('aria-label') || '').startsWith('Current project')); const r = b.getBoundingClientRect(); return Math.round(r.x + r.width / 2); })();
    const sbIcon = (() => { const b = Array.from(sb.querySelectorAll('button')).find(x => (x.getAttribute('aria-label') || '').startsWith('Current project')); const r = b.getBoundingClientRect(); return Math.round(r.x + r.width / 2); })();
    const pvIcon = (() => { const b = Array.from(pv.querySelectorAll('button')).find(x => (x.getAttribute('aria-label') || '').startsWith('Current project')); const r = b.getBoundingClientRect(); return Math.round(r.x + r.width / 2); })();
    return {
      sbCollapsedTitlebarSidebarBoxShadow: cs(sbZone, 'box-shadow'),
      sbCollapsedTitlebarSidebarBg: cs(sbZone, 'background-color'),
      sbCollapsedTitlebarSidebarRect: rect(sbZone),
      pvStripIconFilter: pvStrip ? cs(pvStrip.querySelector('span'), 'filter') : 'MISSING',
      pvStripBackdrop: pvStrip ? cs(pvStrip, 'backdrop-filter') : 'MISSING',
      iconCentreMain: mainIcon, iconCentreSidebarCollapsed: sbIcon, iconCentrePreviewCollapsed: pvIcon,
      sbWindowRect: rect(sb), pvWindowRect: rect(pv),
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
