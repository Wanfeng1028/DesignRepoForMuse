// Font comparison probe (harness-only, no product change, no fontconfig touch):
// for chat/briefing/draft, measure key text widths under the shipped stack
// (resolves SF Pro Rounded), then under Inter, then draft headline under
// SF Pro Text and SF Pro Display (rows + width). Run: node font-compare.cjs
const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const targets = [
    ['chat', 'agentBubble', 'I\u2019ve put together'],
    ['chat', 'userBubble', 'Yes. Keep the soft green'],
    ['briefing', 'bare1', 'Your daily report is ready'],
    ['briefing', 'bare2', 'Check Mood\u2019s first-entry flow'],
    ['briefing', 'briefHead', 'Hands Time led the growth'],
    ['draft', 'draftHead', 'Shape time'],
  ];
  for (const [scr, key, prefix] of targets) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    await page.goto('file://' + DIST + '?screen=' + scr);
    await page.waitForTimeout(2500);
    const res = await page.evaluate((prefix) => {
      const pick = () => { const c = [...document.querySelectorAll('*')].filter(el => (el.textContent || '').trim().startsWith(prefix)); c.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height); return c[0]; };
      const el = pick(); if (!el) return null;
      const m = (fam) => { if (fam) el.style.fontFamily = fam; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); const lh = parseFloat(cs.lineHeight); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), lines: lh ? +((r.height - (parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)) - (parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth))) / lh).toFixed(2) : null }; };
      const out = { sf: m(null) };
      out.inter = m('Inter, sans-serif');
      out.text = m('"SF Pro Text", sans-serif');
      out.display = m('"SF Pro Display", "SF Pro Text", sans-serif');
      out.size = getComputedStyle(el).fontSize; out.weight = getComputedStyle(el).fontWeight;
      return out;
    }, prefix);
    console.log(JSON.stringify({ screen: scr, key, ...res }));
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('FONT-FAIL', e.message); process.exit(1); });
