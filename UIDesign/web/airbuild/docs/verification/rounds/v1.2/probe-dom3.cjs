const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, '..', '..', '..', '..', 'dist', 'index.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const win = page.locator('[data-window="main"]');
  await win.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  // two tabs first
  await page.locator('[data-window="main"] button[aria-label="Open new preview tab"]').click();
  await page.waitForTimeout(400);
  // hover inactive tab (iOS)
  const tabs = page.locator('[data-window="main"] button[role="tab"]');
  await tabs.nth(0).hover();
  await page.waitForTimeout(300);
  const tabHover = await win.evaluate((w) => {
    const b = w.querySelectorAll('button[role="tab"]')[0];
    const cs = getComputedStyle(b);
    const close = b.querySelector('span:last-child');
    return { bg: cs.backgroundColor, closeOpacity: getComputedStyle(close).opacity };
  });
  console.log('tab-hover-inactive', JSON.stringify(tabHover));
  const tabActive = await win.evaluate((w) => {
    const b = w.querySelectorAll('button[role="tab"]')[1];
    return { color: getComputedStyle(b).color, bg: getComputedStyle(b).backgroundColor };
  });
  console.log('tab-active', JSON.stringify(tabActive));
  // hover new-tab
  await page.locator('[data-window="main"] button[aria-label="Open new preview tab"]').hover();
  await page.waitForTimeout(300);
  const newTabHover = await win.evaluate((w) => {
    const b = w.querySelector('button[aria-label="Open new preview tab"]');
    return getComputedStyle(b).backgroundColor;
  });
  console.log('newtab-hover-bg', newTabHover);
  // capsule hover
  await page.locator('[data-window="main"] button[aria-label="Create a new project"]').hover();
  await page.waitForTimeout(300);
  const capHover = await win.evaluate((w) => {
    const b = w.querySelector('button[aria-label="Create a new project"]');
    return getComputedStyle(b).backgroundColor;
  });
  console.log('capsule-hover-bg', capHover);
  // island + appbar + battery + author em + agent pitch
  const phone = await win.evaluate((w) => {
    const wr = w.getBoundingClientRect();
    const spans = Array.from(w.querySelectorAll('span'));
    const island = spans.find(s => getComputedStyle(s).width === '48px' && getComputedStyle(s).backgroundColor === 'rgb(5, 5, 5)');
    const ir = island ? island.getBoundingClientRect() : null;
    const appbar = Array.from(w.querySelectorAll('div')).find(d => d.textContent.includes('Hourtown') && getComputedStyle(d).height === '42px');
    const rows = Array.from(w.querySelectorAll('button[aria-label^="Message "]'));
    const r0 = rows[0].getBoundingClientRect(); const r1 = rows[1].getBoundingClientRect();
    const authorEm = w.querySelector('.ab-agent-bubble') ? null : null;
    const msgAuthor = Array.from(w.querySelectorAll('div')).find(d => d.textContent.includes('@product') && getComputedStyle(d).fontSize === '10px');
    const em = msgAuthor ? msgAuthor.querySelector('span') : null;
    return {
      island: ir ? { x: Math.round(ir.x - wr.x), y: Math.round(ir.y - wr.y), w: Math.round(ir.width), h: Math.round(ir.height), cx: Math.round(ir.x - wr.x + ir.width / 2) } : null,
      appbarPadL: appbar ? getComputedStyle(appbar).paddingLeft : null,
      agentPitch: Math.round(r1.y - r0.y),
      authorEmColor: em ? getComputedStyle(em).color : null,
    };
  });
  console.log('phone-misc', JSON.stringify(phone));
  // battery: outer span with border in status row
  const batt = await win.evaluate((w) => {
    const wr = w.getBoundingClientRect();
    const cand = Array.from(w.querySelectorAll('span')).filter(s => {
      const cs = getComputedStyle(s);
      return cs.width === '16px' && cs.borderTopWidth === '1px';
    });
    return cand.map(s => { const r = s.getBoundingClientRect(); const inner = s.querySelector('span'); const ir = inner ? inner.getBoundingClientRect() : null;
      return { x: Math.round(r.x - wr.x), y: Math.round(r.y - wr.y), w: Math.round(r.width), h: Math.round(r.height), fillW: ir ? Math.round(ir.width) : null }; });
  });
  console.log('battery', JSON.stringify(batt));
  // attach/send hover + icon opacity
  await page.locator('[data-window="main"] button[aria-label="Attach"]').hover();
  await page.waitForTimeout(300);
  const attach = await win.evaluate((w) => {
    const b = w.querySelector('button[aria-label="Attach"]');
    const sp = b.querySelector('span');
    return { filter: getComputedStyle(b).filter, iconOpacity: getComputedStyle(sp).opacity, iconFilter: getComputedStyle(sp).filter, bg: getComputedStyle(b).backgroundColor };
  });
  console.log('attach-hover', JSON.stringify(attach));
  await page.locator('[data-window="main"] button[aria-label="Send"]').hover();
  await page.waitForTimeout(300);
  const send = await win.evaluate((w) => {
    const b = w.querySelector('button[aria-label="Send"]');
    const sp = b.querySelector('span');
    return { filter: getComputedStyle(b).filter, transform: getComputedStyle(b).transform, iconOpacity: getComputedStyle(sp).opacity };
  });
  console.log('send-hover', JSON.stringify(send));
  // footer hover + account hover
  await page.locator('[data-window="main"] button[aria-label="Settings"]').hover();
  await page.waitForTimeout(300);
  const foot = await win.evaluate((w) => {
    const b = w.querySelector('button[aria-label="Settings"]');
    return { filter: getComputedStyle(b).filter, bg: getComputedStyle(b).backgroundColor, border: getComputedStyle(b).borderColor };
  });
  console.log('footer-hover', JSON.stringify(foot));
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
