// v1.7 title wrap audit: line counts for every >=20px title, Text (no override)
// vs Display (harness override). Lines = round(offsetHeight / lineHeight).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const SELS = [
  ["welcome-title", "#welcome .text-welcome-title"],
  ["home-greeting-en", "#home .grid > div:first-child .text-greeting"],
  ["home-greeting-cn", "#home .grid > div:nth-child(2) .text-greeting"],
  ["pricing-title", "#pricing h1"],
  ["credits-huge", "#credits .text-huge-number"],
  ["chatinfo-stat0", "#chat-info .text-greeting"],
  ["suspended-title", "#suspended .text-\\[26px\\]"],
  ["picker-title", "#picker .text-page-title"],
  ["chatinfo-title", "#chat-info .text-page-title"],
  ["credits-title", "#credits .text-page-title"],
  ["language-title", "#language .text-page-title"],
];
async function measure(page) {
  return page.evaluate((sels) => {
    const out = [];
    for (const [name, sel] of sels) {
      const el = document.querySelector(sel);
      if (!el) { out.push([name, "MISSING"]); continue; }
      const cs = getComputedStyle(el);
      const lh = parseFloat(cs.lineHeight);
      const lines = Math.max(1, Math.round(el.offsetHeight / lh));
      out.push([name, lines, el.offsetHeight, lh, cs.fontSize, cs.fontFamily.slice(0, 40), el.textContent.trim().slice(0, 40)]);
    }
    return out;
  }, SELS);
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const text = await measure(page);
  console.log("TEXT (no override):");
  for (const r of text) console.log(" ", r.join(" | "));
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
  const disp = await measure(page);
  console.log("DISPLAY (override):");
  for (const r of disp) console.log(" ", r.join(" | "));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
