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
  const info = await page.evaluate(() => {
    const sheet = document.querySelector("#chat-info div.rounded-sheet");
    const r = sheet.getBoundingClientRect();
    const cs = getComputedStyle(sheet);
    return { rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], bg: cs.backgroundColor, bf: cs.backdropFilter };
  });
  console.log("sheet in page:", JSON.stringify(info));
  const el = page.locator("#chat-info .grid > div:first-child").first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await el.screenshot({ path: path.join(__dirname, "debug-sheet-shown.png") });
  await page.evaluate(() => {
    const sheet = document.querySelector("#chat-info div.rounded-sheet");
    sheet.style.visibility = "hidden";
  });
  await page.waitForTimeout(300);
  await el.screenshot({ path: path.join(__dirname, "debug-sheet-hidden.png") });
  console.log("shots done");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
