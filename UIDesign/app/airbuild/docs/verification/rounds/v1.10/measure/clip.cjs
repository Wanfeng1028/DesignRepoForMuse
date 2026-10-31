// Clip probe: elements extending past the framed inner bottom (y=834) or
// past the inner right edge (x=380), per screen. Run: node clip.cjs
const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  for (const s of ['home', 'chat', 'briefing', 'draft', 'detail', 'components']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    await page.goto('file://' + DIST + '?screen=' + s);
    await page.waitForTimeout(2500);
    await page.evaluate(() => { document.querySelectorAll('*').forEach(el => { const cs = getComputedStyle(el); if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif'; }); });
    await page.waitForTimeout(500);
    const res = await page.evaluate(() => {
      const over = [];
      document.querySelectorAll('*').forEach(el => { const r = el.getBoundingClientRect(); const t = (el.textContent || '').trim(); if (r.bottom > 834.5 && t && el.children.length === 0) over.push({ tag: el.tagName, text: t.slice(0, 40), bottom: +r.bottom.toFixed(1), over: +(r.bottom - 834).toFixed(1) }); });
      return over.slice(0, 12);
    });
    console.log(s, JSON.stringify(res));
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('CLIP-FAIL', e.message); process.exit(1); });
