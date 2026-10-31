const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const out = {};
    const c = document.createElement('canvas').getContext('2d');
    for (const [fam, w] of [['"SF Pro Display"', 700], ['"SF Pro Display"', 600], ['"SF Pro Text"', 700], ['"SF Pro Text"', 600]]) {
      for (const [size, txt] of [[43, "Let's discover"], [28, 'Good evening, Alex'], [28, 'Every top AI in one app'], [51, '12,480'], [26, 'Your account is suspended']]) {
        c.font = `${w} ${size}px ${fam}`;
        out[`${fam} ${w} ${size}px ${txt}`] = Math.round(c.measureText(txt).width * 10) / 10;
      }
    }
    // title span DOM
    const spans = [...document.querySelectorAll('span')].filter(s => s.textContent.includes("Let's discover"));
    out.titleSpan = spans.map(s => {
      const r = s.getBoundingClientRect();
      const cs = getComputedStyle(s);
      return { rect: [Math.round(r.x * 10) / 10, Math.round(r.y * 10) / 10, Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10], font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing };
    });
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
