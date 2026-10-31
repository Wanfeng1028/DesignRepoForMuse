// DOM probe for v1.11: pre/post SF-Display override, glass computed, key texts,
// status bar geometry, briefing fit. Run: node dom.cjs <tag> (writes stdout).
const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const tag = process.argv[2] || 'base';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  for (const s of ['home', 'chat', 'briefing', 'draft', 'detail', 'components']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    await page.goto('file://' + DIST + '?screen=' + s);
    await page.waitForTimeout(3000);
    const data = await page.evaluate((scr) => {
      const R = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
      const leaf = (el) => { const cs = getComputedStyle(el); const lh = parseFloat(cs.lineHeight); return { tag: el.tagName, text: (el.textContent || '').trim().slice(0, 44), size: cs.fontSize, weight: cs.fontWeight, lh: cs.lineHeight, fam: cs.fontFamily.slice(0, 60), rect: R(el), lines: lh ? +(el.getBoundingClientRect().height / lh).toFixed(2) : null }; };
      const big = (stage) => [...document.querySelectorAll('*')].filter(el => { const cs = getComputedStyle(el); return parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim(); }).map(el => ({ stage, ...leaf(el) }));
      const pre = big('pre');
      document.querySelectorAll('*').forEach(el => { const cs = getComputedStyle(el); if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif'; });
      const post = big('post');
      const glass = [...document.querySelectorAll('.ab-glass')].map(el => { const cs = getComputedStyle(el); return { rect: R(el), bgImg: (cs.backgroundImage || '').slice(0, 110), bf: cs.backdropFilter, shadow: (cs.boxShadow || '').slice(0, 220) }; });
      const byText = (prefix) => { const cands = [...document.querySelectorAll('*')].filter(el => (el.textContent || '').trim().startsWith(prefix)); cands.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height); return cands[0] ? leaf(cands[0]) : null; };
      const timeEl = [...document.querySelectorAll('span')].find(el => el.textContent.trim() === '13:00');
      const statusBar = timeEl ? timeEl.parentElement.parentElement : null;
      const island = [...document.querySelectorAll('span')].filter(el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return cs.backgroundColor === 'rgb(0, 0, 0)' && r.height >= 20 && r.height <= 40 && r.width >= 100 && r.width <= 130; }).map(el => ({ rect: R(el), radius: getComputedStyle(el).borderRadius }));
      const homeInd = [...document.querySelectorAll('div')].filter(el => { const r = el.getBoundingClientRect(); return r.height === 5 && r.width >= 130 && r.width <= 140; }).map(R);
      const keys = {};
      for (const [k, p] of [['agentBubble', 'I\u2019ve put together'], ['userBubble', 'Yes. Keep the soft green'], ['bare1', 'Your daily report is ready'], ['bare2', 'Check Mood\u2019s first-entry flow'], ['briefHead', 'Hands Time led the growth'], ['draftHead', 'Shape time'], ['detailTitle', 'Hands Time'], ['composerInput', 'Any updates on Hands Time?']]) keys[k] = byText(p);
      const composer = [...document.querySelectorAll('div')].find(el => (el.className || '').includes('rounded-[32px]'));
      const fit = keys.bare2 && composer ? { bare2Bottom: +keys.bare2.rect.y + +keys.bare2.rect.h, composerTop: +composer.getBoundingClientRect().y, gap: +(composer.getBoundingClientRect().y - (keys.bare2.rect.y + keys.bare2.rect.h)).toFixed(1) } : null;
      return { screen: scr, bigPre: pre, bigPost: post, glass, keys, time: timeEl ? leaf(timeEl) : null, statusBar: statusBar ? R(statusBar) : null, island, homeInd, fit, bodyFam: getComputedStyle(document.body).fontFamily.slice(0, 120) };
    }, s);
    console.log(JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('DOM-FAIL', e.message); process.exit(1); });
