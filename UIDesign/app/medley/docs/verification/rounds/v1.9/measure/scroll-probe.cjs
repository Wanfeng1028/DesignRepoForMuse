const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=chat-dark-lisbon-en');
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const sc = [...document.querySelectorAll('div')].find(d => d.className.includes('overflow-y-auto'));
    const phone = document.querySelector('.phone-frame');
    const status = phone.children[0];
    const topbar = phone.querySelector('div');
    return {
      scrollTop: sc.scrollTop, scrollHeight: sc.scrollHeight, clientHeight: sc.clientHeight,
      statusH: Math.round(status.getBoundingClientRect().height * 10) / 10,
      phoneRect: [Math.round(phone.getBoundingClientRect().width), Math.round(phone.getBoundingClientRect().height)],
      scRect: [Math.round(sc.getBoundingClientRect().y), Math.round(sc.getBoundingClientRect().height)],
    };
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
