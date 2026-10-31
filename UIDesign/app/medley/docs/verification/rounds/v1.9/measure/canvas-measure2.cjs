const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const c = document.createElement('canvas').getContext('2d');
    const out = {};
    const tests = [
      ['"SF Pro Display"', 700, 43, "Let's discover"], ['"SF Pro Display"', 600, 43, "Let's discover"],
      ['"SF Pro Display"', 600, 38, "Let's discover"], ['"SF Pro Display"', 700, 38, "Let's discover"],
      ['"SF Pro Display"', 600, 41, "Let's discover"], ['"SF Pro Display"', 700, 41, "Let's discover"],
      ['"SF Pro Text"', 600, 15, 'Every top AI in one app.'], ['"SF Pro Text"', 400, 15, 'Every top AI in one app.'],
      ['"SF Pro Display"', 700, 28, 'Good evening, Alex'], ['"SF Pro Display"', 600, 28, 'Good evening, Alex'],
      ['"SF Pro Display"', 700, 51, '12,480'], ['"SF Pro Display"', 600, 51, '12,480'],
      ['"SF Pro Display"', 700, 37, '12,480'], ['"SF Pro Display"', 600, 37, '12,480'],
    ];
    for (const [fam, w, size, txt] of tests) {
      c.font = `${w} ${size}px ${fam}`;
      out[`${fam} ${w} ${size} ${txt}`] = Math.round(c.measureText(txt).width * 10) / 10;
    }
    // render sub1 span rect (Display override NOT applied here, sub1 is 15px Text anyway)
    const subs = [...document.querySelectorAll('span,div')].filter(el => el.children.length === 0 && el.textContent.trim() === 'Every top AI in one app.');
    out.sub1 = subs.map(s => { const r = s.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; });
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
