const { chromium } = require('playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const IDS = ['welcome-dark','home-light-en','home-light-cn','chat-dark-lisbon-en','chat-dark-lisbon-cn','chat-light-train-en','chat-light-savings-en','chat-dark-kyoto-en','chat-light-router-en','chat-info-sheet','search-drawer-dark','model-picker-a','model-picker-b','pricing-dark','credits-light','suspended-light','agent-team-dark','language-light'];
async function audit(browser, override) {
  const out = {};
  for (const id of IDS) {
    const page = await browser.newPage({ viewport: { width: 430, height: 920 } });
    await page.goto(`file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=${id}`);
    if (override) {
      await page.evaluate(() => {
        document.querySelectorAll('*').forEach((el) => {
          const cs = getComputedStyle(el);
          if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
            el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
          }
        });
      });
    }
    await page.waitForTimeout(3000);
    const rows = await page.evaluate(() => {
      const res = [];
      document.querySelectorAll('*').forEach((el) => {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
          let lines = 1;
          const tn = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
          if (tn) {
            const r = document.createRange();
            r.selectNodeContents(tn);
            lines = r.getClientRects().length;
          }
          res.push({ text: el.textContent.trim().slice(0, 40), size: cs.fontSize, weight: cs.fontWeight, lines });
        }
      });
      return res;
    });
    out[id] = rows;
    await page.close();
  }
  return out;
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const withOv = await audit(browser, true);
  const withoutOv = await audit(browser, false);
  for (const id of IDS) {
    const w = withOv[id], wo = withoutOv[id];
    console.log(`== ${id} ==`);
    w.forEach((r, i) => {
      const o = wo[i] || {};
      const flag = (r.lines !== o.lines) ? '  <-- WRAPS WITHOUT OVERRIDE' : '';
      console.log(`  "${r.text}" ${r.size} w${r.weight}: Display-lines=${r.lines} Text-lines=${o.lines}${flag}`);
    });
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
