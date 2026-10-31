const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const phone = document.querySelector('.phone-frame');
    const cs = getComputedStyle(phone);
    return { class: phone.className, boxSizing: cs.boxSizing, width: cs.width, height: cs.height, rect: [Math.round(phone.getBoundingClientRect().width), Math.round(phone.getBoundingClientRect().height)], clientW: phone.clientWidth, offsetW: phone.offsetWidth };
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
