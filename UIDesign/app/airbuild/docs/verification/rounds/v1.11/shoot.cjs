// v1.11 shoot: Playwright headless shell 1243 (explicit path; playwright-core
// 1.64 default wants 1248, not installed) + file:// dist + SF optical-size
// override (harness-only, product code untouched). Viewport screenshots
// (not fullPage) so the 390x844 frame fills the viewport exactly as in v1.9;
// chat-430 uses a 430x932 viewport with the 390 frame centred, as in v1.9.
const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');
const OUT = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.11';
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
async function shoot(browser, screen, w, h, out) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto('file://' + DIST + '?screen=' + screen);
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
  await page.screenshot({ path: out });
  console.log('OK', out);
  await page.close();
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  for (const s of ['home', 'chat', 'briefing', 'draft', 'detail', 'components']) await shoot(browser, s, 390, 844, path.join(OUT, s + '-390.png'));
  await shoot(browser, 'chat', 430, 932, path.join(OUT, 'chat-430.png'));
  await browser.close();
})().catch(e => { console.error('SHOT-FAIL', e.message); process.exit(1); });
