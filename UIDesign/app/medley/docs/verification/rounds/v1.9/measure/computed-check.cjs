// One-off probe: computed font metrics of the welcome status bar + title.
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=welcome-dark');
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const out = {};
    const spans = [...document.querySelectorAll('span')];
    const time = spans.find(s => s.textContent.trim() === '10:24');
    if (time) {
      const cs = getComputedStyle(time);
      const r = time.getBoundingClientRect();
      out.time = { fontSize: cs.fontSize, fontFamily: cs.fontFamily, fontWeight: cs.fontWeight, rect: [r.x, r.y, r.width, r.height] };
    }
    const title = spans.find(s => s.textContent.includes("Let's discover"));
    if (title) {
      const cs = getComputedStyle(title);
      const r = title.getBoundingClientRect();
      out.title = { fontSize: cs.fontSize, fontFamily: cs.fontFamily, fontWeight: cs.fontWeight, rect: [r.x, r.y, r.width, r.height] };
    }
    const root = getComputedStyle(document.documentElement);
    out.textStatusVar = root.getPropertyValue('--text-status');
    return out;
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
