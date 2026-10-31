// v1.7: title intrinsic widths under Text vs Display + phone-width (350px) wrap verdict.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const SELS = [
  ["welcome-title", "#welcome .text-welcome-title"],
  ["home-greeting-en", "#home .grid > div:first-child .text-greeting"],
  ["home-greeting-cn", "#home .grid > div:nth-child(2) .text-greeting"],
  ["pricing-title", "#pricing h1"],
  ["credits-huge", "#credits .text-huge-number"],
  ["suspended-title", "#suspended .text-\\[26px\\]"],
  ["picker-title", "#picker .text-page-title"],
];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const widths = async () => page.evaluate((sels) => sels.map(([n, s]) => {
    const el = document.querySelector(s);
    if (!el) return [n, "MISSING"];
    const r = document.createRange();
    r.selectNodeContents(el);
    return [n, Math.round(r.getBoundingClientRect().width * 10) / 10, getComputedStyle(el).fontSize];
  }), SELS);
  console.log("TEXT widths:");
  for (const r of await widths()) console.log(" ", r.join(" | "));
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
  console.log("DISPLAY widths:");
  for (const r of await widths()) console.log(" ", r.join(" | "));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
