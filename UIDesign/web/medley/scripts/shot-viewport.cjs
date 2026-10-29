// Viewport screenshot helper (kept inside this package only).
// Same renderer approach as shot-fullpage.cjs: Playwright headless shell
// on the built file:// gallery with file access allowed.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");

(async () => {
  const width = parseInt(process.argv[2], 10);
  const height = parseInt(process.argv[3], 10);
  const out = process.argv[4];
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width, height } });
  const file = "file://" + path.resolve(__dirname, "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: out });
  console.log("wrote", out);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
