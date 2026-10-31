// Fractional box heights for the drawer panel, v1.8 dist vs wt17 dist.
// (Explains the 849 vs 850 screenshot heights: identical 848.71875 CSS
// heights at different fractional page Y offsets round differently.)
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  for (const [label, file] of [["v1.8", "file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/dist/index.html"],
                               ["wt17", "file:///home/hatch/workspace/wt-v17/UIDesign/web/medley/dist/index.html"]]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(file, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const r = await page.locator("#drawer div.max-w-\\[340px\\]").first().boundingBox();
    console.log(label, "drawer box:", JSON.stringify(r));
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
