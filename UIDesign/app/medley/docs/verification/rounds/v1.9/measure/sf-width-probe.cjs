// Measure SF Pro Text 600 "10:24" width + cap height at several sizes (harness page, no product change).
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  const res = await page.evaluate(() => {
    const out = [];
    for (const fs of [12, 13, 14, 16, 17]) {
      const s = document.createElement('span');
      s.textContent = '10:24';
      s.style.cssText = `position:absolute;left:0;top:0;font-family:"SF Pro Text",sans-serif;font-weight:600;font-size:${fs}px;line-height:1;white-space:nowrap;`;
      document.body.appendChild(s);
      const r = s.getBoundingClientRect();
      // cap height via canvas measure? use range rects for 'H' glyph top vs baseline approx: use a second span 'H' and compare
      out.push({ fs, width: Math.round(r.width * 100) / 100 });
      s.remove();
    }
    return out;
  });
  console.log(JSON.stringify(res));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
