// v1.6 DOM probe: fonts (SF availability + resolved), title wrap experiment
// (natural vs forced Text vs forced Display), backdrop computed, status geometry.
// Usage: node probe-v16.cjs <outfile>
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const fs = require('fs');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const titleLines = () => page.evaluate(() => {
    const lines = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getClientRects().length; };
    const out = [];
    document.querySelectorAll('h1, h2').forEach((el) => {
      const cs = getComputedStyle(el);
      out.push({ tag: el.tagName, text: el.textContent.slice(0, 60), fontSize: cs.fontSize, fontWeight: cs.fontWeight, inlineFamily: el.style.fontFamily || '(none)', height: Math.round(el.getBoundingClientRect().height), lines: lines(el) });
    });
    return out;
  });
  const fontsAvail = await page.evaluate(() => ({
    rounded: document.fonts.check('12px "SF Pro Rounded"'),
    display: document.fonts.check('12px "SF Pro Display"'),
    text: document.fonts.check('12px "SF Pro Text"'),
    inter: document.fonts.check('12px "Inter"'),
    bodyStack: getComputedStyle(document.body).fontFamily,
  }));
  const natural = await titleLines();
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => { if (el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Text", sans-serif'; });
  });
  await page.waitForTimeout(500);
  const forcedText = await titleLines();
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
    });
  });
  await page.waitForTimeout(500);
  const forcedDisplay = await titleLines();
  // Reload fresh so the forced-Text title pass cannot contaminate small-text
  // families: the delivered render uses ONLY the verbatim >=20px Display override.
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
    });
  });
  await page.waitForTimeout(500);
  const data = await page.evaluate(() => {
    const cs = (el) => { const s = getComputedStyle(el); return { fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, backdropFilter: s.backdropFilter, backgroundColor: s.backgroundColor, boxShadow: s.boxShadow, filter: s.filter }; };
    const rect = (el) => { const r = el.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
    const main = document.querySelector('[data-window="main"]');
    const win = document.querySelector('.ab-window');
    const findText = (root, t) => [...root.querySelectorAll('span')].find((s) => s.textContent === t);
    const timeEl = findText(main, '9:41');
    const statusRow = timeEl ? timeEl.parentElement : null;
    const cluster = statusRow ? statusRow.children[2] : null;
    const clusterKids = cluster ? [...cluster.children].map((c) => {
      const inner = [...c.querySelectorAll('*')].map((g) => ({ tag: g.tagName, rect: rect(g), w: g.getAttribute('width'), h: g.getAttribute('height'), vb: g.getAttribute('viewBox') }));
      return { tag: c.tagName, rect: rect(c), html: c.outerHTML.slice(0, 400), inner };
    }) : [];
    const statusKids = statusRow ? [...statusRow.children].map((c) => ({ tag: c.tagName, rect: rect(c) })) : [];
    const island = [...main.querySelectorAll('span')].find((s) => { const r = s.getBoundingClientRect(); return Math.round(r.width) === 48 && Math.round(r.height) === 15 && getComputedStyle(s).backgroundColor === 'rgb(5, 5, 5)'; });
    const composer = main.querySelector('form');
    const toast = main.querySelector('.ab-toast-in');
    const capsules = [...main.querySelectorAll('span')].filter((s) => { const st = getComputedStyle(s); return st.backdropFilter !== 'none' && Math.round(s.getBoundingClientRect().width) === 64; });
    const phoneBtns = [...main.querySelectorAll('button')].filter((b) => b.getAttribute('aria-label') === 'App settings' || b.getAttribute('aria-label') === 'App menu');
    const bubble = main.querySelector('.ab-agent-bubble');
    const userBubble = main.querySelector('.ab-user-bubble');
    const canvas = document.createElement('canvas').getContext('2d');
    const measure = (font, text) => { canvas.font = font; const m = canvas.measureText(text); return { width: Math.round(m.width * 100) / 100, ascent: Math.round(m.actualBoundingBoxAscent * 100) / 100, descent: Math.round(m.actualBoundingBoxDescent * 100) / 100 }; };
    return {
      winRect: rect(win), winStyle: cs(win), winInline: win.getAttribute('style'),
      statusRowRect: statusRow ? rect(statusRow) : null, statusKids, clusterKids,
      islandRect: island ? rect(island) : null,
      timeStyle: timeEl ? cs(timeEl) : null,
      composerRect: composer ? rect(composer) : null, composerStyle: composer ? cs(composer) : null,
      capsuleCount: capsules.length, capsuleStyle: capsules[0] ? cs(capsules[0]) : null,
      toastStyle: toast ? cs(toast) : null, toastRect: toast ? rect(toast) : null,
      phoneBtnStyle: phoneBtns[0] ? cs(phoneBtns[0]) : null,
      bubbleStyle: bubble ? cs(bubble) : null, userBubbleStyle: userBubble ? cs(userBubble) : null,
      canvasMeasures: {
        bubble12Rounded: measure('12px "SF Pro Rounded"', 'Session ready to review'),
        bubble12Text: measure('12px "SF Pro Text"', 'Session ready to review'),
        bubble12Inter: measure('12px "Inter"', 'Session ready to review'),
        agentName10w600Rounded: measure('600 10px "SF Pro Rounded"', 'Ato'),
        feedName9w600Rounded: measure('600 9px "SF Pro Rounded"', 'Pluso'),
        time8w700Rounded: measure('700 8px "SF Pro Rounded"', '9:41'),
        title34w800Display: measure('800 34px "SF Pro Display"', 'AirBuild — desktop / web design system'),
        title34w800Text: measure('800 34px "SF Pro Text"', 'AirBuild — desktop / web design system'),
        title34w800Rounded: measure('800 34px "SF Pro Rounded"', 'AirBuild — desktop / web design system'),
      },
    };
  });
  data.fontsAvail = fontsAvail;
  data.titleLines = { natural, forcedText, forcedDisplay };
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log('probe written', out);
  await browser.close();
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
