// Post-fix computed-style probes (harness page, no product change).
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  async function probe(screen, fn) {
    const page = await browser.newPage({ viewport: { width: 430, height: 920 }, deviceScaleFactor: 1 });
    await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=' + screen);
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
          el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
        }
      });
    });
    await page.waitForTimeout(500);
    const r = await page.evaluate(fn);
    console.log(screen, JSON.stringify(r));
    await page.close();
  }
  await probe('welcome-dark', () => {
    const time = [...document.querySelectorAll('span')].find(s => s.textContent.trim() === '10:24');
    const bar = time.parentElement;
    const phone = document.querySelector('.phone-frame');
    const pr = phone.getBoundingClientRect();
    const title = [...document.querySelectorAll('span')].find(s => s.textContent.includes("Let's discover"));
    const tr = title.getBoundingClientRect();
    return { statusFont: getComputedStyle(bar).fontSize, statusLH: getComputedStyle(bar).lineHeight, statusH: Math.round(bar.getBoundingClientRect().height), phoneOuter: [Math.round(pr.width), Math.round(pr.height)], titleRect: [Math.round(tr.x), Math.round(tr.y), Math.round(tr.width), Math.round(tr.height)], titleFont: getComputedStyle(title).fontFamily };
  });
  await probe('home-light-en', () => {
    const rows = [...document.querySelectorAll('div')].filter(d => d.textContent.trim() === "What's in the news today");
    const r = rows.length ? rows[0].getBoundingClientRect() : null;
    return { suggRow: r ? [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] : null, suggFont: rows.length ? getComputedStyle(rows[0]).fontSize : null };
  });
  await probe('chat-dark-lisbon-en', () => {
    const labels = [...document.querySelectorAll('div')].filter(d => /sources/i.test(d.textContent) && d.children.length <= 4);
    const out = [];
    for (const d of labels.slice(0, 3)) {
      const r = d.getBoundingClientRect();
      out.push({ text: d.textContent.trim().slice(0, 30), font: getComputedStyle(d).fontSize, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] });
    }
    return out;
  });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
