// v1.5 DOM probe: pre/post fix values, same browser + file:// method as v1.4.
// Covers: geometry, material, typography (incl. line-height), motion, small elements.
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const out = await page.evaluate(() => {
    const cs = (el, p) => el ? getComputedStyle(el)[p] : 'MISSING';
    const rect = (el) => { if (!el) return 'MISSING'; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), cx: Math.round(r.x + r.width / 2), cy: Math.round(r.y + r.height / 2) }; };
    const byAria = (root, label) => root.querySelector(`[aria-label="${label}"]`);
    const win = document.querySelector('[data-window="main"] .ab-window');
    const titlebar = win.children[0];
    const tbSidebar = titlebar.children[0];
    const tbConv = titlebar.children[1];
    const tbPreview = titlebar.children[2];
    const convCol = document.querySelector('[data-window="main"] .ab-scroll').parentElement;
    const sidebarRoot = win.querySelector('[aria-label="Projects"]').parentElement;
    const composer = win.querySelector('form');
    const attach = byAria(win, 'Attach');
    const send = byAria(win, 'Send');
    const account = byAria(win, 'Account');
    const footHome = byAria(win, 'Home');
    const capsuleBtn = byAria(win, 'Create a new project');
    const brightToggle = byAria(win, 'Toggle preview');
    const phone = Array.from(win.querySelectorAll('div')).find(d => cs(d, 'borderRadius') === '38px' && rect(d).w === 270);
    const statusbar = phone ? phone.children[0] : null;
    const appbar = phone ? phone.children[1] : null;
    const appSettings = byAria(win, 'App settings');
    const appMenu = byAria(win, 'App menu');
    const feedName = Array.from(win.querySelectorAll('span')).find(s => s.textContent.startsWith('Ato') && s.parentElement && s.parentElement.parentElement && s.parentElement.parentElement.textContent.includes('Session ready'));
    const feedRow = feedName ? feedName.closest('div') : null;
    const feedText = feedRow ? feedRow.querySelectorAll('span')[1] : null;
    const agentRow = byAria(win, 'Message Ato');
    const agentName = agentRow ? agentRow.querySelector('strong') : null;
    const agentStatus = agentRow ? agentRow.querySelector('small') : null;
    const onlineDot = agentRow ? agentRow.querySelectorAll('span')[2] : null;
    const avatars = Array.from(win.querySelectorAll('[aria-label="Projects"] ~ div button svg, [aria-label="AI team"] button svg')).map(rect);
    const rowAvatars = Array.from(win.querySelectorAll('[aria-label="AI team"] button')).map(b => rect(b.querySelector('svg')));
    const tile = byAria(win, 'Open Hands Time');
    const traffic = win.querySelector('.ab-traffic-light');
    const tabBtn = win.querySelector('[role="tab"]');
    const tabClose = tabBtn ? tabBtn.querySelectorAll('span')[2] : null;
    const toast = Array.from(win.querySelectorAll('div')).find(d => d.textContent === 'Message sent');
    const sep = document.querySelector('#primitives + *') || null;
    const separator = Array.from(document.querySelectorAll('div')).find(d => d.getAttribute && d.getAttribute('data-orientation') === 'horizontal');
    const galleryBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Hide toast' || b.textContent === 'Show toast');
    const input = composer ? composer.querySelector('input') : null;
    const bubble = win.querySelector('.ab-agent-bubble');
    const taskFill = win.querySelector('.ab-task-dot') ? win.querySelector('[style*="width: 66%"]') : null;
    const projIcon = (name) => { const w = document.querySelector(`[data-window="${name}"] .ab-window`); const b = Array.from(w.querySelectorAll('button')).find(x => (x.getAttribute('aria-label') || '').startsWith('Current project')); const r = b.getBoundingClientRect(); return Math.round(r.x + r.width / 2); };
    return {
      windowRect: rect(win),
      titlebarTransition: cs(titlebar, 'transition'),
      titlebarBoxShadow: cs(titlebar, 'boxShadow'),
      tbSidebarBoxShadow: cs(tbSidebar, 'boxShadow'),
      tbSidebarBorderRight: cs(tbSidebar, 'borderRight'),
      tbConvTransition: cs(tbConv, 'transition'),
      tbConvPadding: cs(tbConv, 'padding'),
      sidebarBoxShadow: cs(sidebarRoot, 'boxShadow'),
      sidebarBorderRight: cs(sidebarRoot, 'borderRight'),
      convBorderRight: cs(convCol, 'borderRight'),
      windowBackdrop: cs(win, 'backdropFilter'),
      sidebarBackdrop: cs(sidebarRoot, 'backdropFilter'),
      convBackdrop: cs(convCol, 'backdropFilter'),
      capsuleBtnIconFilter: capsuleBtn ? cs(capsuleBtn.querySelector('span'), 'filter') : 'MISSING',
      capsuleBtnIconOpacity: capsuleBtn ? cs(capsuleBtn.querySelector('span'), 'opacity') : 'MISSING',
      brightToggleIconFilter: brightToggle ? cs(brightToggle.querySelector('span'), 'filter') : 'MISSING',
      accountIconFilter: account ? cs(account.querySelector('span'), 'filter') : 'MISSING',
      footHomeIconFilter: footHome ? cs(footHome.querySelector('span'), 'filter') : 'MISSING',
      attachIconFilter: attach ? cs(attach.querySelector('span'), 'filter') : 'MISSING',
      sendIconFilter: send ? cs(send.querySelector('span'), 'filter') : 'MISSING',
      appSettingsIconFilter: appSettings ? cs(appSettings.querySelector('span'), 'filter') : 'MISSING',
      appMenuIconFilter: appMenu ? cs(appMenu.querySelector('span'), 'filter') : 'MISSING',
      composerBackdrop: cs(composer, 'backdropFilter'),
      toastBackdrop: toast ? cs(toast, 'backdropFilter') : 'MISSING',
      toastAnimation: toast ? cs(toast, 'animation') : 'MISSING',
      toastTransition: toast ? cs(toast, 'transition') : 'MISSING',
      galleryBtnBackdrop: galleryBtn ? cs(galleryBtn, 'backdropFilter') : 'MISSING',
      separatorBg: separator ? cs(separator, 'backgroundColor') : 'MISSING',
      feedNameLineHeight: feedName ? cs(feedName, 'lineHeight') : 'MISSING',
      feedNameFont: feedName ? cs(feedName, 'fontSize') + '/' + cs(feedName, 'fontWeight') : 'MISSING',
      feedTextLineHeight: feedText ? cs(feedText, 'lineHeight') : 'MISSING',
      agentNameLineHeight: agentName ? cs(agentName, 'lineHeight') : 'MISSING',
      agentStatusLineHeight: agentStatus ? cs(agentStatus, 'lineHeight') : 'MISSING',
      bodyLineHeight: cs(document.body, 'lineHeight'),
      windowLineHeight: cs(win, 'lineHeight'),
      bubbleLineHeight: bubble ? cs(bubble, 'lineHeight') : 'MISSING',
      composerInputLineHeight: input ? cs(input, 'lineHeight') : 'MISSING',
      tabLabelLineHeight: tabBtn ? cs(tabBtn, 'lineHeight') : 'MISSING',
      tabCloseTransition: tabClose ? cs(tabClose, 'transition') : 'MISSING',
      tileTransition: cs(tile, 'transition'),
      rowTransition: agentRow ? cs(agentRow, 'transition') : 'MISSING',
      trafficCursor: traffic ? cs(traffic, 'cursor') : 'MISSING',
      trafficRect: rect(traffic),
      onlineDotRect: rect(onlineDot),
      onlineDotFont: onlineDot ? cs(onlineDot, 'fontSize') + '/' + cs(onlineDot, 'color') : 'MISSING',
      rowAvatarRects: rowAvatars,
      phoneRect: phone ? rect(phone) : 'MISSING',
      statusbarRect: statusbar ? rect(statusbar) : 'MISSING',
      statusIconsHTML: statusbar ? statusbar.innerHTML.slice(0, 600) : 'MISSING',
      appbarRect: appbar ? rect(appbar) : 'MISSING',
      wifiPresent: statusbar ? !!statusbar.querySelector('svg') : false,
      iconCentreMain: projIcon('main'),
      iconCentreSidebarCollapsed: projIcon('sidebar-collapsed'),
      iconCentrePreviewCollapsed: projIcon('preview-collapsed'),
      toastCentreX: toast ? Math.round(toast.getBoundingClientRect().x + toast.getBoundingClientRect().width / 2) : 'MISSING',
      dividerLeft: (() => { const d = Array.from(titlebar.querySelectorAll('div')).find(x => x.style.left === '58%'); return d ? rect(d) : 'MISSING'; })(),
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
