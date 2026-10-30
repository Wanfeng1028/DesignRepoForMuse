// v1.3 DOM probe: measured computed styles, same browser + file:// method as shoot-sections.cjs
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const out = await page.evaluate(() => {
    const cs = (el, p) => getComputedStyle(el)[p];
    const win = document.querySelector('[data-window="main"] .ab-window');
    const rect = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), cx: Math.round(r.x + r.width / 2) }; };
    const byAria = (root, label) => root.querySelector(`[aria-label="${label}"]`);
    const titlebar = win.children[0];
    const drawer = win.children[1];
    const sidebarRoot = (() => { const h = Array.from(win.querySelectorAll('span')).find(s => s.textContent === 'Projects'); return h.parentElement.parentElement.parentElement; })();
    const convCol = document.querySelector('[data-window="main"] .ab-scroll').parentElement;
    const divider = Array.from(titlebar.querySelectorAll('div')).find(d => d.style.left === '58%');
    const toast = Array.from(win.querySelectorAll('div')).find(d => d.textContent === 'Message sent');
    const composer = win.querySelector('form');
    const attach = byAria(win, 'Attach');
    const account = byAria(win, 'Account');
    const footHome = byAria(win, 'Home');
    const tile = byAria(win, 'Open Hands Time');
    const phone = Array.from(win.querySelectorAll('div')).find(d => cs(d, 'borderRadius') === '38px' && rect(d).w === 270);
    const phoneStage = phone.parentElement;
    const devShadow = Array.from(phoneStage.querySelectorAll('div')).find(d => (getComputedStyle(d).filter || '').includes('blur(30px)'));
    const appSettings = byAria(win, 'App settings');
    const appMenu = byAria(win, 'App menu');
    const feedName = Array.from(win.querySelectorAll('span')).find(s => s.textContent.startsWith('Ato') && s.parentElement && s.parentElement.parentElement && s.parentElement.parentElement.textContent.includes('Session ready'));
    const feedRow = feedName ? feedName.closest('div[style]') : null;
    const phoneTiles = Array.from(phone.querySelectorAll('div')).filter(d => cs(d, 'borderRadius') === '32%' && rect(d).w > 40 && rect(d).w < 120);
    const phoneTileSvg = phoneTiles.length ? phoneTiles[0].querySelector('svg') : null;
    const projIcon = (name) => { const w = document.querySelector(`[data-window="${name}"] .ab-window`); const b = Array.from(w.querySelectorAll('button')).find(x => (x.getAttribute('aria-label') || '').startsWith('Current project')); const r = b.getBoundingClientRect(); return Math.round(r.x + r.width / 2); };
    return {
      windowRect: rect(win),
      sidebarPadding: cs(sidebarRoot, 'padding'),
      sidebarBg: cs(sidebarRoot, 'backgroundColor'),
      convBg: cs(convCol, 'backgroundColor'),
      convBorderRight: cs(convCol, 'borderRight'),
      titlebarSidebarBg: cs(titlebar.children[0], 'backgroundColor'),
      titlebarConvBg: cs(titlebar.children[1], 'backgroundColor'),
      titlebarConvPadding: cs(titlebar.children[1], 'padding'),
      titlebarPreviewBg: cs(titlebar.children[2], 'backgroundColor'),
      dividerBg: divider ? cs(divider, 'backgroundColor') : 'MISSING',
      toastBottom: toast ? cs(toast, 'bottom') : 'MISSING',
      toastBackdrop: toast ? cs(toast, 'backdropFilter') : 'MISSING',
      composerBg: cs(composer, 'backgroundImage'),
      composerBorder: cs(composer, 'border'),
      composerShadow: cs(composer, 'boxShadow'),
      composerBackdrop: cs(composer, 'backdropFilter'),
      attachBg: cs(attach, 'backgroundImage'),
      accountRect: rect(account),
      accountBg: cs(account, 'backgroundImage'),
      footHomeRect: rect(footHome),
      footHomeBg: cs(footHome, 'backgroundImage'),
      footHomeBorder: cs(footHome, 'border'),
      tileBgIdle: cs(tile, 'backgroundColor'),
      phoneRect: phone ? rect(phone) : 'MISSING',
      phoneShadow: phone ? cs(phone, 'boxShadow') : 'MISSING',
      deviceShadow: devShadow ? rect(devShadow) : 'MISSING',
      appSettingsRect: appSettings ? rect(appSettings) : 'MISSING',
      appMenuRect: appMenu ? rect(appMenu) : 'MISSING',
      feedNameColor: feedName ? cs(feedName, 'color') : 'MISSING',
      phoneTileRect: phoneTiles.length ? rect(phoneTiles[0]) : 'MISSING',
      phoneTileSvgRect: phoneTileSvg ? rect(phoneTileSvg) : 'MISSING',
      iconCentreMain: projIcon('main'),
      iconCentreSidebarCollapsed: projIcon('sidebar-collapsed'),
      iconCentrePreviewCollapsed: projIcon('preview-collapsed'),
    };
  });
  console.log(JSON.stringify(out, null, 2));
  // hover probes
  await page.locator('[data-window="main"] button[aria-label="Open Hands Time"]').hover();
  await page.waitForTimeout(250);
  const tileHover = await page.evaluate(() => { const w = document.querySelector('[data-window="main"] .ab-window'); const t = w.querySelector('[aria-label="Open Hands Time"]'); return getComputedStyle(t).backgroundColor; });
  console.log('tileHoverBg:', tileHover);
  await page.locator('[data-window="main"] button[aria-label="Message Ato"]').hover();
  await page.waitForTimeout(250);
  const rowHover = await page.evaluate(() => { const w = document.querySelector('[data-window="main"] .ab-window'); const t = w.querySelector('[aria-label="Message Ato"]'); return getComputedStyle(t).backgroundColor; });
  console.log('agentRowHoverBg:', rowHover);
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
