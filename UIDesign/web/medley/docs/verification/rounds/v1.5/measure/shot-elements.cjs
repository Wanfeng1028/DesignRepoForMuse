// v1.5: tight element shots for pixel measurement (panel boxes = image boxes).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const out = path.join(__dirname, "render-welcome.png");
  await page.locator("#welcome > div > div").first().screenshot({ path: out });
  console.log("wrote render-welcome");
  await page.locator("#home > div > div > div").first().screenshot({ path: path.join(__dirname, "render-home-en.png") });
  console.log("wrote render-home-en");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
