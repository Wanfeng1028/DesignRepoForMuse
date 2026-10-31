// v1.7 glass refraction probe (evidence only, not shipped).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 960, height: 420 } });
  await page.goto("file://" + path.join(__dirname, "glass-test.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const bf = await page.evaluate(() => window.__bf);
  console.log(bf.join("\n"));
  await page.screenshot({ path: path.join(__dirname, "glass-test.png") });
  console.log("wrote glass-test.png");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
