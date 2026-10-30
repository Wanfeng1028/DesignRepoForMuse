// v1.5b DOM probe (corrected selectors + decomposed transitions + backdrop via getPropertyValue).
// Run before fixes (probe-before2.txt) and after fixes (probe-after.txt) on the same dist method.
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
    const rect = (el) => { if (!el) return 'MISSING'; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), cx: Math.round(r.x + r.width / 2), cy: Math.round(r.y + r.height / 2) }; };
    const byAria = (root, label) => root.querySelector(`[aria-label="${label}"]`);
    const trans = (el) => el ? [cs(el, 'transition-property'), cs(el, 'transition-duration'), cs(el, 'transition-timing-function')].join(' / ') : 'MISSING';
    const win = document.querySelector('[data-window="main"] .ab-window');
    const titlebar = win.children[0];
    const tbSidebar = titlebar.children[0];
    const tbConv = titlebar.children[1];
    const convCol = document.querySelector('[data-window="main"] .ab-scroll').parentElement;
    const sidebarRoot = win.querySelector('[aria-label="Projects"]').parentElement;
    const composer = win.querySelector('form');
    const attach = byAria(win, 'Attach');
    const send = byAria(win, 'Send');
    const account = byAria(win, 'Account');
    const footHome = byAria(win, 'Home');
    const capsuleBtn = byAria(win, 'Create a new project');
    const brightToggle = byAria(win, 'Toggle preview');
    const phone = Array.from(win.querySelectorAll('div')).find(d => cs(d, 'border-radius') === '38px' && rect(d).w === 270);
    const statusbar = phone ? phone.children[0] : null;
    const statusGroup = statusbar ? statusbar.children[2] : null;
    const island = statusbar ? statusbar.children[1] : null;
    const battery = statusGroup ? statusGroup.children[statusGroup.children.length - 1] : null;
    const feedSpans = phone ? Array.from(phone.querySelectorAll('span')).filter(s => cs(s, 'font-size') === '9px' && s.textContent.startsWith('Ato')) : [];
    const feedName = feedSpans[0] || null;
    const feedText = feedName && feedName.parentElement ? feedName.parentElement.children[1] : null;
    const feedTime = feedName ? feedName.closest('div').parentElement.querySelectorAll('span') : null;
    const agentRow = byAria(win, 'Message Ato');
    const rowSpans = agentRow ? agentRow.querySelectorAll('span') : [];
    const onlineDot = rowSpans.length ? rowSpans[rowSpans.length - 1] : null;
    const agentName = agentRow ? agentRow.querySelector('strong') : null;
    const agentStatus = agentRow ? agentRow.querySelector('small') : null;
    const tile = byAria(win, 'Open Hands Time');
    const traffic = win.querySelector('.ab-traffic-light');
    const tabBtn = win.querySelector('[role="tab"]');
    const tabSpans = tabBtn ? tabBtn.querySelectorAll('span') : [];
    const tabClose = tabSpans.length ? tabSpans[tabSpans.length - 1] : null;
    const toast = Array.from(win.querySelectorAll('div')).find(d => d.textContent === 'Message sent');
    const author = win.querySelector('.ab-agent-bubble') ? win.querySelector('.ab-agent-bubble').previousElementSibling : null;
    const bubble = win.querySelector('.ab-agent-bubble');
    const separator = Array.from(document.querySelectorAll('div')).find(d => d.getAttribute && d.getAttribute('data-orientation') === 'horizontal');
    const galleryBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Hide toast' || b.textContent === 'Show toast');
    const taskFill = Array.from(win.querySelectorAll('div')).find(d => d.style && d.style.width === '66%');
    return {
      windowRect: rect(win),
      windowInlineBackdrop: win.style.backdropFilter || '(none)',
      windowInlineWebkitBackdrop: win.style.webkitBackdropFilter || '(none)',
      windowComputedBackdrop: cs(win, 'backdrop-filter'),
      windowComputedWebkitBackdrop: cs(win, '-webkit-backdrop-filter'),
      windowBg: cs(win, 'background-color'),
      titlebarTransition: trans(titlebar),
      tbConvTransition: trans(tbConv),
      tbSidebarBoxShadow: cs(tbSidebar, 'box-shadow'),
      sidebarBoxShadow: cs(sidebarRoot, 'box-shadow'),
      capsuleBtnIconFilter: capsuleBtn ? cs(capsuleBtn.querySelector('span'), 'filter') : 'MISSING',
      brightToggleIconFilter: brightToggle ? cs(brightToggle.querySelector('span'), 'filter') : 'MISSING',
      accountIconFilter: account ? cs(account.querySelector('span'), 'filter') : 'MISSING',
      footHomeIconFilter: footHome ? cs(footHome.querySelector('span'), 'filter') : 'MISSING',
      attachIconFilter: attach ? cs(attach.querySelector('span'), 'filter') : 'MISSING',
      sendIconFilter: send ? cs(send.querySelector('span'), 'filter') : 'MISSING',
      appSettingsIconFilter: byAria(win, 'App settings') ? cs(byAria(win, 'App settings').querySelector('span'), 'filter') : 'MISSING',
      appMenuIconFilter: byAria(win, 'App menu') ? cs(byAria(win, 'App menu').querySelector('span'), 'filter') : 'MISSING',
      composerBackdrop: cs(composer, 'backdrop-filter'),
      toastBackdrop: toast ? cs(toast, 'backdrop-filter') : 'MISSING',
      toastAnimation: toast ? [cs(toast, 'animation-name'), cs(toast, 'animation-duration'), cs(toast, 'animation-timing-function')].join(' / ') : 'MISSING',
      toastTransition: toast ? trans(toast) : 'MISSING',
      galleryBtnBackdrop: galleryBtn ? cs(galleryBtn, 'backdrop-filter') : 'MISSING',
      separatorBg: separator ? cs(separator, 'background-color') : 'MISSING',
      feedNameFont: feedName ? cs(feedName, 'font-size') + '/' + cs(feedName, 'font-weight') + '/lh=' + cs(feedName, 'line-height') : 'MISSING',
      feedTextFont: feedText ? cs(feedText, 'font-size') + '/lh=' + cs(feedText, 'line-height') : 'MISSING',
      agentNameLineHeight: agentName ? cs(agentName, 'line-height') : 'MISSING',
      agentStatusLineHeight: agentStatus ? cs(agentStatus, 'line-height') : 'MISSING',
      authorLineHeight: author ? cs(author, 'line-height') : 'MISSING',
      bubbleLineHeight: bubble ? cs(bubble, 'line-height') : 'MISSING',
      windowLineHeight: cs(win, 'line-height'),
      bodyLineHeight: cs(document.body, 'line-height'),
      tabLabelLineHeight: tabBtn ? cs(tabBtn, 'line-height') : 'MISSING',
      tabCloseTransition: tabClose ? trans(tabClose) : 'MISSING',
      tileTransition: trans(tile),
      rowTransition: agentRow ? trans(agentRow) : 'MISSING',
      taskFillTransition: taskFill ? trans(taskFill) : 'MISSING',
      trafficCursor: traffic ? cs(traffic, 'cursor') : 'MISSING',
      onlineDotRect: rect(onlineDot),
      onlineDotText: onlineDot ? onlineDot.textContent : 'MISSING',
      onlineDotFont: onlineDot ? cs(onlineDot, 'font-size') + '/' + cs(onlineDot, 'color') : 'MISSING',
      phoneRect: phone ? rect(phone) : 'MISSING',
      statusbarRect: statusbar ? rect(statusbar) : 'MISSING',
      statusGroupRect: statusGroup ? rect(statusGroup) : 'MISSING',
      islandRect: island ? rect(island) : 'MISSING',
      batteryRect: battery ? rect(battery) : 'MISSING',
      wifiPresent: statusbar ? !!statusbar.querySelector('svg') : false,
      statusGroupChildren: statusGroup ? statusGroup.children.length : 'MISSING',
      convBorderRight: cs(convCol, 'border-right'),
      dividerRect: (() => { const d = Array.from(titlebar.querySelectorAll('div')).find(x => x.style.left === '58%'); return d ? rect(d) : 'MISSING'; })(),
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
