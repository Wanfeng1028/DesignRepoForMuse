const { chromium } = require('playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 } });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
    });
  });
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].map((b) => {
      const r = b.getBoundingClientRect();
      return { text: (b.textContent || '').trim().slice(0, 30), x: +r.x.toFixed(3), y: +r.y.toFixed(3), w: +r.width.toFixed(3), h: +r.height.toFixed(3) };
    });
    return btns;
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
