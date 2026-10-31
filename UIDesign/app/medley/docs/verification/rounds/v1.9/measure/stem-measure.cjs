const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(2000);
  const r = await page.evaluate(() => {
    const out = {};
    const c = document.createElement('canvas');
    c.width = 400; c.height = 200;
    const ctx = c.getContext('2d');
    for (const [w, size] of [[700, 43], [600, 43], [600, 38], [700, 38], [600, 28], [700, 28]]) {
      ctx.clearRect(0, 0, 400, 200);
      ctx.fillStyle = '#fff'; ctx.font = `${w} ${size}px "SF Pro Display"`;
      ctx.fillText('L', 50, 100);
      const d = ctx.getImageData(0, 0, 400, 200).data;
      // find L bbox + stem width at mid-cap row
      let minX = 400, maxX = -1, minY = 200, maxY = -1;
      for (let y = 0; y < 200; y++) for (let x = 0; x < 400; x++) {
        if (d[(y * 400 + x) * 4 + 3] > 128) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      }
      const midY = Math.floor((minY + maxY) / 2);
      let stemL = -1, stemR = -1;
      for (let x = 0; x < 400; x++) {
        if (d[(midY * 400 + x) * 4 + 3] > 128) { if (stemL < 0) stemL = x; stemR = x; }
      }
      out[`${w} ${size}`] = { cap: maxY - minY + 1, stem: stemR - stemL + 1, ratio: Math.round((stemR - stemL + 1) / (maxY - minY + 1) * 1000) / 1000 };
    }
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
