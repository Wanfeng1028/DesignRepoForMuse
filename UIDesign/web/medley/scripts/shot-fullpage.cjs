// Verification screenshot helper (kept inside this package only).
// Launches the Playwright headless shell on the built file:// gallery with
// file access allowed (plain file:// blocks module scripts via CORS) and
// takes a full-page screenshot.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");

(async () => {
  const out = process.argv[2] || "docs/verification/gallery-fullpage.png";
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file://" + path.resolve(__dirname, "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: out, fullPage: true });
  console.log("wrote", out);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
