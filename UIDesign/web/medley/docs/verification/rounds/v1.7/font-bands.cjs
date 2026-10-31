// v1.7 font ink bands: element rects from DOM, ink rows measured in the panel PNG.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
  const rects = await page.evaluate(() => {
    const q = (s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
    // rects are viewport coords; panel shots are element shots, so also report panel offsets
    const pw = document.querySelector("#welcome div.max-w-\\[560px\\]");
    const ph = document.querySelector("#home .grid > div:first-child");
    const pwr = pw.getBoundingClientRect(), phr = ph.getBoundingClientRect();
    return {
      welcomeTitle: q("#welcome .text-welcome-title"),
      welcomePanel: [Math.round(pwr.x), Math.round(pwr.y)],
      greetingEn: q("#home .grid > div:first-child .text-greeting"),
      homeEnPanel: [Math.round(phr.x), Math.round(phr.y)],
    };
  });
  console.log(JSON.stringify(rects));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
