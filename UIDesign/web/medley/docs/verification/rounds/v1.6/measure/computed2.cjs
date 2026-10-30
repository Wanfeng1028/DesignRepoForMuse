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
  await page.locator("#composer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const out = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement).fontSize;
    const mics = [...document.querySelectorAll("#composer .h-9.w-9")].map(el => ({ h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width }));
    const bars = [...document.querySelectorAll("#composer .rounded-input")].map(el => el.getBoundingClientRect().height);
    const cv = document.createElement("canvas").getContext("2d");
    const widths = {};
    for (const fam of ["-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto", "DejaVu Sans", "Liberation Sans", "Arial", "Noto Sans SC"]) {
      cv.font = "700 41px " + fam;
      widths[fam] = Math.round(cv.measureText("Let's discover").width * 100) / 100;
    }
    return { root, mics, bars, widths };
  });
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
