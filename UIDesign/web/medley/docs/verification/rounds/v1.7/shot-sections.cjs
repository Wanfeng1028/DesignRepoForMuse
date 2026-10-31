// v1.7 verification helper: element screenshots of gallery sections (SF render).
// Harness ONLY: iOS optical sizing override (>=20px leaf text -> SF Pro Display),
// product code and repo font tokens untouched. Binary: headless_shell-1243
// chrome-headless-shell (playwright-core default 1248 is NOT installed).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
async function optical(page) {
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await optical(page);
  await page.screenshot({ fullPage: true, path: path.join(__dirname, "gallery-fullpage.png") });
  console.log("wrote gallery-fullpage");
  for (const id of ["welcome", "home", "chat", "picker", "pricing", "credits", "agent-team", "drawer", "chat-info", "suspended", "language", "composer", "desktop-lisbon", "desktop-home", "phone-chrome"]) {
    const el = page.locator("#" + id);
    if (await el.count()) {
      await el.first().screenshot({ path: path.join(__dirname, "sec-" + id + ".png") });
      console.log("wrote sec-" + id);
    } else console.log("missing #" + id);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
