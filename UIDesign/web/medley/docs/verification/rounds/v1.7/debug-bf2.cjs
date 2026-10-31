const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const out = await page.evaluate(() => {
    const el = document.querySelector("#home .grid > div:first-child .glass-chrome");
    const cs = getComputedStyle(el);
    return [
      "standard: " + cs.getPropertyValue("backdrop-filter"),
      "webkit: " + cs.getPropertyValue("-webkit-backdrop-filter"),
    ];
  });
  console.log(out.join("\n"));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
