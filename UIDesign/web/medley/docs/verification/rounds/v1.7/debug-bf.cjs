const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const out = await page.evaluate(() => {
    const r = [];
    const el = document.querySelector("#home .grid > div:first-child .glass-chrome");
    r.push("el classes: " + (el && el.className));
    r.push("el bf computed: " + (el && getComputedStyle(el).backdropFilter));
    r.push("el webkit bf: " + (el && getComputedStyle(el).webkitBackdropFilter));
    const sheets = [];
    for (const ss of document.styleSheets) {
      try {
        for (const rule of ss.cssRules) {
          if (rule.cssText && rule.cssText.includes("glass-chrome")) sheets.push(rule.cssText.slice(0, 200));
        }
      } catch (e) { sheets.push("sheet blocked: " + e.message); }
    }
    r.push("rules: " + JSON.stringify(sheets));
    const t = document.createElement("div");
    t.style.backdropFilter = "url(#medley-lg) blur(50px) saturate(1.8)";
    document.body.appendChild(t);
    r.push("inline spaced bf: " + getComputedStyle(t).backdropFilter);
    const t2 = document.createElement("div");
    t2.style.backdropFilter = "url(#medley-lg)blur(50px)saturate(1.8)";
    document.body.appendChild(t2);
    r.push("inline nospace bf: " + getComputedStyle(t2).backdropFilter);
    const t3 = document.createElement("div");
    t3.style.backdropFilter = "blur(50px) saturate(1.8)";
    document.body.appendChild(t3);
    r.push("inline blur-only bf: " + getComputedStyle(t3).backdropFilter);
    r.push("filter el: " + !!document.querySelector("filter#medley-lg") + " feImage href len: " + (document.querySelector("filter#medley-lg feImage")?.getAttribute("href")?.length || 0));
    return r;
  });
  console.log(out.join("\n"));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
