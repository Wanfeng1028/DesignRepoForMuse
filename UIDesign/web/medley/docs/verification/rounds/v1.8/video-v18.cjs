// v1.8 interaction recordings: 4 clips (Playwright video, .webm).
// Harness ONLY. Binary: headless_shell-1243.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const fs = require("fs");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const OUT = __dirname;
const VDIR = path.join(__dirname, "video");
fs.mkdirSync(VDIR, { recursive: true });
const FILE = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html");
async function optical(page) {
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
}
async function setup(page) {
  await page.goto(FILE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await optical(page);
  await page.locator('[data-testid="demo-phone"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
}
async function record(browser, name, fn) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: VDIR, size: { width: 1280, height: 800 } },
  });
  const page = await ctx.newPage();
  try {
    await setup(page);
    await fn(page);
  } catch (e) {
    console.log("clip " + name + " error: " + e.message);
  }
  await page.waitForTimeout(300);
  await ctx.close();
  // Playwright names the file by page id; rename the newest .webm.
  const files = fs.readdirSync(VDIR).filter((f) => f.endsWith(".webm")).map((f) => ({ f, t: fs.statSync(path.join(VDIR, f)).mtimeMs })).sort((a, b) => b.t - a.t);
  const newest = files[0];
  if (newest && !fs.existsSync(path.join(VDIR, name))) {
    fs.renameSync(path.join(VDIR, newest.f), path.join(VDIR, name));
    console.log("wrote video " + name);
  } else {
    console.log("video missing for " + name + " (newest=" + (newest ? newest.f : "none") + ")");
  }
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const only = process.argv[2];
  const run = async (name, fn) => { if (!only || only === name) await record(browser, name, fn); };
  await run("rotation.webm", async (page) => {
    // Two rotation dwells (3200ms each) + transitions.
    await page.waitForTimeout(8000);
  });
  await run("sheet.webm", async (page) => {
    const phone = page.locator('[data-testid="demo-phone"]');
    await page.getByRole("button", { name: "Open picker" }).click();
    await page.waitForTimeout(1500);
    const box = await phone.boundingBox();
    await page.mouse.click(box.x + 195, box.y + 20);
    await page.waitForTimeout(1200);
  });
  await run("send.webm", async (page) => {
    const phone = page.locator('[data-testid="demo-phone"]');
    await phone.getByRole("button", { name: "Try without an account" }).click();
    await page.waitForTimeout(800);
    await page.locator('[data-testid="demo-home-input"]').fill("Plan 3 days in Lisbon on a budget.");
    await page.locator('[data-testid="demo-home-send"]').click();
    await page.waitForTimeout(1500);
    // Stop mid-stream, then hold the stopped state.
    const stop = page.locator('[data-testid="demo-chat-stop"]');
    if (await stop.count()) await stop.click();
    await page.waitForTimeout(1200);
  });
  await run("tabs.webm", async (page) => {
    const phone = page.locator('[data-testid="demo-phone"]');
    await phone.getByRole("button", { name: "Try without an account" }).click();
    await page.waitForTimeout(800);
    await page.locator('[data-testid="demo-tab-agents"]').click();
    await page.waitForTimeout(1200);
    await page.locator('[data-testid="demo-tab-chat"]').click();
    await page.waitForTimeout(1200);
  });
  await browser.close();
  console.log("video done: " + fs.readdirSync(VDIR).filter((f) => f.endsWith(".webm")).join(", "));
})().catch((e) => { console.error(e); process.exit(1); });
