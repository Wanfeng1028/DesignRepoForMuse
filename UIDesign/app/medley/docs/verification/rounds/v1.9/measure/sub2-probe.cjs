const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
  const res = await page.evaluate(() => {
    const out = {};
    const mk = (text, fs, fam) => {
      const s = document.createElement('span');
      s.textContent = text;
      s.style.cssText = `position:absolute;left:0;top:0;font-family:${fam};font-size:${fs}px;white-space:nowrap;`;
      document.body.appendChild(s);
      const w = s.getBoundingClientRect().width;
      s.remove();
      return Math.round(w * 10) / 10;
    };
    out.sub2Text15 = mk('Claude, GPT, Gemini, DeepSeek, Kimi and GLM', 15, '"SF Pro Text",sans-serif');
    out.sub2Display15 = mk('Claude, GPT, Gemini, DeepSeek, Kimi and GLM', 15, '"SF Pro Display",sans-serif');
    out.sub1Text15 = mk('Every top AI in one app.', 15, '"SF Pro Text",sans-serif');
    out.titleDisplay43 = mk("Let's discover", 43, '"SF Pro Display",sans-serif');
    out.titleText43 = mk("Let's discover", 43, '"SF Pro Text",sans-serif');
    // actual sub2 element rects (line boxes)
    const divs = [...document.querySelectorAll('div')];
    const sub2 = divs.find(d => d.textContent.trim() === 'Claude, GPT, Gemini, DeepSeek, Kimi and GLM');
    if (sub2) {
      const r = sub2.getBoundingClientRect();
      const rects = [...sub2.getClientRects()].map(x => [Math.round(x.y), Math.round(x.height)]);
      out.sub2El = { rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], lineRects: rects, fontSize: getComputedStyle(sub2).fontSize, fontFamily: getComputedStyle(sub2).fontFamily };
    }
    const title = [...document.querySelectorAll('span')].find(s => s.textContent.includes("Let's discover"));
    if (title) {
      const r = title.getBoundingClientRect();
      out.titleEl = { rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], lineRects: [...title.getClientRects()].map(x => [Math.round(x.y), Math.round(x.height)]) };
    }
    return out;
  });
  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
