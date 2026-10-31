// v1.7 eye-compare helper: panel-only screenshots (SF render + Display override).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
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
    ["phone-chrome", "#phone-chrome .chrome-dark"],
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
