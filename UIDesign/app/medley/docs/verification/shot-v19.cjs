// v1.9 verification shots (harness ONLY; product code untouched).
// Per-page logic copied verbatim from ~/workspace/ios-texture-proof/shot-single.js
// (2026-11-01 SF optical-size update): viewport 430x920, DSF 1, explicit
// headless-shell 1243 executablePath, file:// dist, ?screen=<id>, wait 3000ms,
// then JS optical-size override (>=20px leaf text -> SF Pro Display), wait
// 500ms, fullPage screenshot. Browser is launched once for the loop; the
// per-page steps are identical to the single-shot reference.
// Run: NODE_PATH=/home/hatch/workspace/muse-build/shot/node_modules node
//   docs/verification/shot-v19.cjs <outdir> [screen-id]
const { chromium } = require('playwright-core');
const path = require('path');
const IDS = ['welcome-dark','home-light-en','home-light-cn','chat-dark-lisbon-en','chat-dark-lisbon-cn','chat-light-train-en','chat-light-savings-en','chat-dark-kyoto-en','chat-light-router-en','chat-info-sheet','search-drawer-dark','model-picker-a','model-picker-b','pricing-dark','credits-light','suspended-light','agent-team-dark','language-light'];
(async () => {
  const outDir = path.resolve(__dirname, process.argv[2] || 'rounds/v1.9');
  const only = process.argv[3];
  const ids = only ? [only] : IDS;
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  for (const screen of ids) {
    const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
    await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=' + screen);
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
    await page.screenshot({ path: path.join(outDir, screen + '.png'), fullPage: true });
    console.log('saved', screen);
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
