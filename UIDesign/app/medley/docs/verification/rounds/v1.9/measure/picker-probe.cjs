const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=model-picker-a');
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const sheet = document.querySelector('[data-testid="sheet"]');
    const handle = document.querySelector('[data-testid="sheet-handle"]');
    return {
      sheetScrollTop: sheet.scrollTop, sheetScrollHeight: sheet.scrollHeight, sheetClientHeight: sheet.clientHeight,
      sheetClass: sheet.className,
      handleH: Math.round(handle.getBoundingClientRect().height * 10) / 10,
      handleTag: handle.tagName,
    };
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
