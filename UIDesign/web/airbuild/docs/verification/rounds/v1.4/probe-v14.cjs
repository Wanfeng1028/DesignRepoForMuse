// v1.4 new-item probe: gradient stops, backdrops, ink/muted colours, borders,
// avatar discs, window shadow, resizers, heading absence, toast centre.
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
    const q = (sel) => win.querySelector(sel);
    const capsule = win.querySelector('[aria-label="Create a new project"]').parentElement;
    const composer = win.querySelector('form');
    const attach = win.querySelector('[aria-label="Attach"]');
    const account = win.querySelector('[aria-label="Account"]');
    const footHome = win.querySelector('[aria-label="Home"]');
    const appSettings = win.querySelector('[aria-label="App settings"]');
    const createBtn = win.querySelector('[aria-label="Create a new project"]');
    const tabBtn = Array.from(win.querySelectorAll('button')).find(b => b.textContent.trim() === 'iOS 26.5');
    const newTab = win.querySelector('[aria-label="Open new preview tab"]');
    const input = win.querySelector('.ab-followup-input');
    const workingStep = Array.from(win.querySelectorAll('span')).find(s => s.textContent === 'Build the completion reveal');
    const phoneTile = Array.from(win.querySelectorAll('div')).filter(d => cs(d, 'borderRadius') === '32%' && d.getBoundingClientRect().width > 40 && d.getBoundingClientRect().width < 120)[0];
    const feedDivider = Array.from(win.querySelectorAll('div')).find(d => d.style.marginLeft === '33px');
    const rowAvatar = win.querySelector('[aria-label="Message Ato"] svg circle');
    const msgAvatar = win.querySelector('.ab-message-in svg circle');
    const toast = Array.from(win.querySelectorAll('div')).find(d => d.textContent === 'Message sent');
    const toastRect = toast ? toast.getBoundingClientRect() : null;
    const headings = Array.from(win.querySelectorAll('span')).filter(s => s.textContent === 'Projects' || s.textContent === 'Agents');
    return {
      controlBg: cs(capsule, 'backgroundImage'),
      controlBackdrop: cs(capsule, 'backdropFilter'),
      composerBg: cs(composer, 'backgroundImage'),
      composerBackdrop: cs(composer, 'backdropFilter'),
      attachBackdrop: cs(attach, 'backdropFilter'),
      accountBackdrop: cs(account, 'backdropFilter'),
      footHomeBackdrop: cs(footHome, 'backdropFilter'),
      appSettingsBackdrop: appSettings ? cs(appSettings, 'backdropFilter') : 'MISSING',
      capsuleBtnColor: createBtn ? cs(createBtn, 'color') : 'MISSING',
      tabInactiveColor: tabBtn ? cs(tabBtn, 'color') : 'MISSING-tab-active?',
      newTabColor: newTab ? cs(newTab, 'color') : 'MISSING',
      inputColor: input ? cs(input, 'color') : 'MISSING',
      placeholderColor: input ? getComputedStyle(input, '::placeholder').color : 'MISSING',
      workingStepColor: workingStep ? cs(workingStep, 'color') : 'MISSING',
      phoneTileBorder: phoneTile ? cs(phoneTile, 'border') : 'MISSING',
      feedDividerBg: feedDivider ? cs(feedDivider, 'backgroundColor') : 'MISSING',
      rowAvatarFill: rowAvatar ? rowAvatar.getAttribute('fill') : 'MISSING',
      rowAvatarRing: win.querySelector('[aria-label="Message Ato"] svg circle[stroke]') ? 'present' : 'absent',
      msgAvatarRing: document.querySelector('.ab-message-in svg circle[stroke]') ? 'present' : 'absent',
      windowShadow: cs(win, 'boxShadow'),
      sidebarResizer: win.querySelector('[aria-label="Resize sidebar"]') ? 'present' : 'MISSING',
      previewResizer: win.querySelector('[aria-label="Resize preview"]') ? 'present' : 'MISSING',
      windowResizer: win.querySelector('[aria-label="Resize app window"]') ? 'present' : 'MISSING',
      headingSpansInWindow: headings.length,
      toastCentreX: toastRect ? Math.round(toastRect.x + toastRect.width / 2) : 'MISSING',
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
