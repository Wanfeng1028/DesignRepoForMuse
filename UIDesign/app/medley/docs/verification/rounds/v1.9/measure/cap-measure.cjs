const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(2000);
  const r = await page.evaluate(() => {
    const c = document.createElement('canvas').getContext('2d');
    const out = {};
    for (const [fam, w, size] of [['"SF Pro Display"', 700, 43], ['"SF Pro Display"', 600, 43], ['"SF Pro Display"', 600, 38], ['"SF Pro Display"', 700, 38], ['"SF Pro Display"', 600, 41]]) {
      c.font = `${w} ${size}px ${fam}`;
      const m = c.measureText('H');
      out[`${fam} ${w} ${size}`] = { ascent: Math.round(m.actualBoundingBoxAscent * 10) / 10, descent: Math.round(m.actualBoundingBoxDescent * 10) / 10, width: Math.round(m.width * 10) / 10 };
    }
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
