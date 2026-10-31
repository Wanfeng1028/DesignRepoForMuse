const { chromium } = require('playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  for (const tag of ['a', 'b']) {
    const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
    await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach((el) => {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
          el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
        }
      });
    });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.9/measure/welcome-${tag}.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
