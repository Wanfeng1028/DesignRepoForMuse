// v1.3 verification helper: element screenshots of gallery sections (no device frames).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  for (const id of ["welcome", "home", "chat", "picker", "pricing", "credits", "agent-team", "drawer", "chat-info", "suspended", "language", "composer", "desktop-lisbon"]) {
    const el = page.locator("#" + id);
    if (await el.count()) {
      await el.first().screenshot({ path: path.join(__dirname, "sec-" + id + ".png") });
      console.log("wrote sec-" + id);
    } else console.log("missing #" + id);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
