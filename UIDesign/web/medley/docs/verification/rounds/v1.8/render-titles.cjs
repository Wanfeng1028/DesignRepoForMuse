// v1.8 stem audit: element screenshots of the six big titles at DSF=2
// (SF render + Display override). Harness ONLY.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const OUT = path.join(__dirname, "stem");
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  const file = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
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
  const targets = [
    ["render-welcome", "#welcome", "Let's discover"],
    ["render-greeting", "#home", "Good evening, Alex"],
    ["render-pricing", "#pricing", "Every top AI in one app"],
    ["render-credits", "#credits", "12,480"],
    ["render-suspended", "#suspended", "Your account is suspended"],
    ["render-picker", "#picker", "Choose a model"],
  ];
  for (const [name, section, text] of targets) {
    const el = page.locator(section).getByText(text, { exact: true }).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await el.screenshot({ path: path.join(OUT, name + ".png") });
    console.log("wrote " + name);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
