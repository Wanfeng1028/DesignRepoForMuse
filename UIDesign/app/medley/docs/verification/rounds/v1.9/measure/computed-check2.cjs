const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const spans = [...document.querySelectorAll('span')];
    const time = spans.find(s => s.textContent.trim() === '10:24');
    const bar = time ? time.parentElement : null;
    return {
      barClass: bar ? bar.className : null,
      barFontSize: bar ? getComputedStyle(bar).fontSize : null,
      barLineHeight: bar ? getComputedStyle(bar).lineHeight : null,
      timeFontSize: time ? getComputedStyle(time).fontSize : null,
      matchesTextStatus: bar ? bar.matches('.text-status') : null,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
