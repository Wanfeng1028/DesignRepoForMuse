// Control: panel shots of the v1.7-code worktree build (same environment,
// same harness) to separate environment drift from v1.8 code effects.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const OUT = __dirname;
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file:///home/hatch/workspace/wt-v17/UIDesign/web/medley/dist/index.html";
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
    ["drawer", "#drawer div.max-w-\\[340px\\]"],
    ["phone-chrome", "#phone-chrome .chrome-dark"],
    ["agent-team", "#agent-team div.max-w-\\[560px\\]"],
    ["credits", "#credits div.max-w-\\[720px\\]"],
    ["pricing", "#pricing div.max-w-\\[560px\\]"],
    ["picker-a", "#picker .grid > div:first-child"],
    ["chat-info", "#chat-info .grid > div:first-child"],
    ["suspended", "#suspended div.max-w-\\[560px\\]"],
    ["language", "#language div.max-w-\\[560px\\]"],
  ];
  for (const [name, sel] of shots) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: path.join(OUT, "wt17-panel-" + name + ".png") });
    console.log("wrote wt17-panel-" + name);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
