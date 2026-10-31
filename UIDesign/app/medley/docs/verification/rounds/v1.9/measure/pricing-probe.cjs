const { chromium } = require('playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 } });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=pricing-dark');
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
    });
  });
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const out = {};
    const h1 = document.querySelector('h1');
    const r = h1.getBoundingClientRect();
    out.h1 = { y: +r.y.toFixed(2), h: +r.height.toFixed(2), top: +(r.y / 0.986).toFixed(2) };
    // close icon: first svg in pricing screen
    const svgs = [...document.querySelectorAll('svg')];
    const c = svgs[0].getBoundingClientRect();
    out.closeSvg = { y: +c.y.toFixed(2), h: +c.height.toFixed(2) };
    // arc span: the inline-flex span containing 6 dot spans
    const spans = [...document.querySelectorAll('span.inline-flex')];
    const arc = spans.find((s) => s.children.length === 6);
    if (arc) {
      const ar = arc.getBoundingClientRect();
      out.arcSpan = { y: +ar.y.toFixed(2), h: +ar.height.toFixed(2) };
      out.dots = [...arc.children].map((d) => {
        const dr = d.getBoundingClientRect();
        return { y: +dr.y.toFixed(2), h: +dr.height.toFixed(2) };
      });
    }
    return out;
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
