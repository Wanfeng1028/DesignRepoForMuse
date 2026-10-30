// v1.4 second probe: feed text/time, titlebar action icons, collapsed paddings, task card, headings
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
    const shareBtn = win.querySelector('[aria-label="Share build"]');
    const inboundBtn = win.querySelector('[aria-label="Send preview to iPhone"]');
    const toggleBtn = win.querySelectorAll('[aria-label="Toggle preview"]')[0];
    const feedText = Array.from(win.querySelectorAll('span')).find(s => s.textContent === 'Session ready to review');
    const feedTime = Array.from(win.querySelectorAll('span')).find(s => s.textContent === '10:24' && s.closest('[data-window]'));
    const heading = Array.from(win.querySelectorAll('span')).find(s => s.textContent === 'Projects');
    const agentSmall = Array.from(win.querySelectorAll('small')).find(s => s.textContent === 'The new screens are ready to review.');
    const taskCard = win.querySelector('div[style]'); // placeholder, refined below
    const task = Array.from(win.querySelectorAll('span')).find(s => s.textContent === 'Make the first session rewarding');
    const taskBox = task ? task.parentElement : null;
    const todoStep = Array.from(win.querySelectorAll('span')).find(s => s.textContent === 'Check the layout on iPhone and iPad');
    const newTab = win.querySelector('[aria-label="Open new preview tab"]');
    const collapsed = document.querySelector('[data-window="preview-collapsed"] .ab-window');
    const collapsedConv = collapsed ? collapsed.children[0].children[1] : null;
    const sbCollapsed = document.querySelector('[data-window="sidebar-collapsed"] .ab-window');
    const sbConv = sbCollapsed ? sbCollapsed.children[0].children[1] : null;
    const typingDot = document.querySelector('.ab-typing-dot');
    const activeDot = document.querySelector('.ab-task-active-dot');
    return {
      shareSvg: shareBtn ? { w: shareBtn.querySelector('svg').getAttribute('width'), h: shareBtn.querySelector('svg').getAttribute('height') } : 'MISSING',
      inboundSvg: inboundBtn ? inboundBtn.querySelector('svg').outerHTML.slice(0, 220) : 'MISSING',
      toggleSvgSize: toggleBtn ? toggleBtn.querySelector('svg').getAttribute('width') : 'MISSING',
      feedTextColor: feedText ? cs(feedText, 'color') : 'MISSING',
      feedTextSize: feedText ? cs(feedText, 'fontSize') : 'MISSING',
      feedTimeColor: feedTime ? cs(feedTime, 'color') : 'MISSING',
      feedTimeSize: feedTime ? cs(feedTime, 'fontSize') : 'MISSING',
      headingColor: heading ? cs(heading.parentElement, 'color') : 'MISSING',
      agentSmallColor: agentSmall ? cs(agentSmall, 'color') : 'MISSING',
      taskBorder: taskBox ? cs(taskBox, 'border') : 'MISSING',
      todoStepColor: todoStep ? cs(todoStep, 'color') : 'MISSING',
      newTabIconOpacity: newTab ? cs(newTab.querySelector('span'), 'opacity') : 'MISSING',
      collapsedConvPadding: collapsedConv ? cs(collapsedConv, 'padding') : 'MISSING',
      sbCollapsedConvPadding: sbConv ? cs(sbConv, 'padding') : 'MISSING',
      typingAnim: typingDot ? cs(typingDot, 'animation') : 'MISSING',
      activeDotAnim: activeDot ? cs(activeDot, 'animation') : 'MISSING',
    };
  });
  console.log(JSON.stringify(out, null, 2));
  // new-tab hover bg
  await page.locator('[data-window="main"] button[aria-label="Open new preview tab"]').hover();
  await page.waitForTimeout(250);
  const nt = await page.evaluate(() => { const w = document.querySelector('[data-window="main"] .ab-window'); return getComputedStyle(w.querySelector('[aria-label="Open new preview tab"]')).backgroundColor; });
  console.log('newTabHoverBg:', nt);
  await browser.close();
})().catch((e) => { console.error('PROBE2-FAIL', e.message); process.exit(1); });
