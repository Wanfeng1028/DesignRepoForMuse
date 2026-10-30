const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const out = await page.evaluate(() => {
    const cs = (el) => { const s = getComputedStyle(el); return { h: s.height, w: s.width }; };
    const r = {};
    const dr = document.querySelector("#drawer div.max-w-\\[340px\\]");
    const ham = dr.querySelector(".mt-2 svg");
    r.drawerMenu = ham ? cs(ham) : null;
    const flexCol = document.querySelector("#composer .flex-col");
    const kids = flexCol ? [...flexCol.children] : [];
    r.stackedTotal = kids[2] ? kids[2].getBoundingClientRect().height : null;
    r.sendDarkDisc = kids[3] ? cs(kids[3].querySelector(".rounded-full")) : null;
    r.plainDisc = kids[1] ? cs(kids[1].querySelector(".rounded-full, svg")) : null;
    // hairline classes present?
    r.hairlineClasses = {
      homeSugg: !!document.querySelector("#home .border-b-\\[0\\.5px\\]"),
      homeCont: !!document.querySelector("#home .border-t-\\[0\\.5px\\]"),
      lang: !!document.querySelector("#language .border-b-\\[0\\.5px\\]"),
      susp: !!document.querySelector("#suspended .border-b-\\[0\\.5px\\]"),
      chatinfo: !!document.querySelector("#chat-info .border-t-\\[0\\.5px\\]"),
    };
    return r;
  });
  console.log(JSON.stringify(out, null, 1));
  // DPR2 language panel shot for hairline paint check
  const page2 = await browser.newPage({ viewport: { width: 800, height: 800 }, deviceScaleFactor: 2 });
  await page2.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
  await page2.waitForTimeout(800);
  const lang = page2.locator("#language div.max-w-\\[560px\\]").first();
  await lang.scrollIntoViewIfNeeded();
  await page2.waitForTimeout(300);
  await lang.screenshot({ path: path.join(__dirname, "panel-language-dpr2.png") });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
