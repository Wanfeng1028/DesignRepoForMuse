// v1.6 eye-compare helper: panel-only screenshots (no section titles).
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
  const shots = [
    ["welcome", "#welcome div.max-w-\\[560px\\]"],
    ["home-en", "#home .grid > div:first-child"],
    ["home-cn", "#home .grid > div:nth-child(2)"],
    ["chat-lisbon", "#chat .grid > div:first-child"],
    ["pricing", "#pricing div.max-w-\\[560px\\]"],
    ["credits", "#credits div.max-w-\\[720px\\]"],
    ["picker-a", "#picker .grid > div:first-child"],
    ["chat-info", "#chat-info .grid > div:first-child"],
    ["drawer", "#drawer div.max-w-\\[340px\\]"],
    ["suspended", "#suspended div.max-w-\\[560px\\]"],
    ["language", "#language div.max-w-\\[560px\\]"],
    ["agent-team", "#agent-team div.max-w-\\[560px\\]"],
  ];
  for (const [name, sel] of shots) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await el.screenshot({ path: path.join(__dirname, "panel-" + name + ".png") });
      console.log("wrote panel-" + name);
    } else console.log("missing " + name);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
