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
  const data = await page.evaluate(() => {
    const w = document.querySelector('[data-window="main"]');
    const wr = w.getBoundingClientRect();
    const rel = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { x: Math.round(r.x - wr.x), y: Math.round(r.y - wr.y), w: Math.round(r.width), h: Math.round(r.height),
        fontSize: cs.fontSize, fontWeight: cs.fontWeight, bg: cs.backgroundColor, color: cs.color, borderRadius: cs.borderRadius };
    };
    const q = (s) => w.querySelector(s);
    const qa = (s) => Array.from(w.querySelectorAll(s));
    const out = {};
    out.window = { w: Math.round(wr.width), h: Math.round(wr.height) };
    out.groupTitles = qa('div').filter(d => d.textContent === 'Projects' || d.textContent === 'Agents').map(rel);
    const rows = qa('button[aria-label^="Message "]');
    out.agentRow0 = rel(rows[0]);
    out.agentName0 = rel(rows[0] ? rows[0].querySelector('strong') : null);
    out.agentStatus0 = rel(rows[0] ? rows[0].querySelector('small') : null);
    out.onlineDot0 = (() => {
      const s = rows[0] ? rows[0].querySelector('span:last-child') : null;
      return s ? { ...rel(s), text: s.textContent } : null;
    })();
    out.footerBtns = qa('button[aria-label="Home"], button[aria-label="Settings"], button[aria-label="Activity"]').map(rel);
    out.accountPill = rel(q('button[aria-label="Account"]'));
    out.projectTiles = qa('button[aria-label^="Open "]').slice(0, 4).map(rel);
    out.composer = rel(q('form'));
    out.attachBtn = rel(q('button[aria-label="Attach"]'));
    out.sendBtn = rel(q('button[aria-label="Send"]'));
    out.tabBtn = rel(q('button[role="tab"]'));
    out.phoneFrame = (() => {
      const els = Array.from(w.querySelectorAll('div'));
      const ph = els.find(d => d.style && d.style.aspectRatio === '0.51');
      return rel(ph);
    })();
    out.phoneStatus = (() => {
      const spans = Array.from(w.querySelectorAll('span'));
      const t = spans.find(s => s.textContent === '9:41');
      return t ? { ...rel(t.parentElement), textFont: getComputedStyle(t.parentElement).fontSize } : null;
    })();
    out.feedAvatars = qa('svg[aria-label="Ato"], svg[aria-label="Pluso"]').map(rel);
    out.feedNames = Array.from(w.querySelectorAll('span')).filter(s => (s.textContent === 'Ato' || s.textContent === 'Pluso') && getComputedStyle(s).fontSize === '9px').map(rel);
    out.capsule = rel(q('div div span') || null);
    const caps = Array.from(w.querySelectorAll('span')).filter(s => getComputedStyle(s).width === '64px');
    out.capsules = caps.map(rel);
    out.projectIconBtn = rel(q('button[aria-label^="Current project"]'));
    out.resizerMounted = !!w.querySelector('[role="separator"]');
    return out;
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
