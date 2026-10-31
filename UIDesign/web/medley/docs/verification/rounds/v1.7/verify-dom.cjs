// v1.7 DOM verification: glass computed values + chrome geometry (SF + Display override).
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html"), { waitUntil: "networkidle" });
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
  const out = await page.evaluate(() => {
    const r = [];
    r.push("defs present: " + !!document.querySelector("filter#medley-lg"));
    const probe = (label, sel) => {
      const el = document.querySelector(sel);
      if (!el) { r.push(label + " MISSING"); return; }
      const cs = getComputedStyle(el);
      r.push(label + " | bf=" + cs.backdropFilter + " | bg=" + cs.backgroundColor + " | shadow=" + cs.boxShadow.slice(0, 120));
    };
    probe("composer-light", "#home .grid > div:first-child div.rounded-input");
    probe("composer-dark-lisbon", "#chat .grid > div:first-child div.rounded-input");
    probe("drawer-search", "#drawer div.rounded-input");
    probe("cn-segment", "#home .grid > div:nth-child(2) span.rounded-chip");
    probe("pricing-segment", "#pricing div.rounded-button");
    probe("chatinfo-sheet", "#chat-info div.rounded-sheet");
    const wbtns = document.querySelectorAll("#welcome button");
    if (wbtns[1]) { const cs = getComputedStyle(wbtns[1]); r.push("try-button | bf=" + cs.backdropFilter + " | bg=" + cs.backgroundColor + " | shadow=" + cs.boxShadow.slice(0, 120)); }
    else r.push("try-button MISSING");
    const bar = document.querySelector("#phone-chrome .chrome-dark > div");
    if (bar) {
      const cs = getComputedStyle(bar);
      r.push("statusbar padding=" + cs.padding + " gap=" + cs.gap);
      const time = bar.querySelector("div span");
      if (time) { const t = getComputedStyle(time); r.push("time font=" + t.fontSize + " weight=" + t.fontWeight + " lh=" + t.lineHeight); }
      const svgs = bar.querySelectorAll("svg");
      svgs.forEach((s, i) => r.push("svg" + i + " " + s.getAttribute("width") + "x" + s.getAttribute("height")));
    }
    const ind = document.querySelector("#phone-chrome .chrome-dark > div:last-child > div");
    if (ind) { const b = ind.getBoundingClientRect(); r.push("home-indicator " + Math.round(b.width * 10) / 10 + "x" + Math.round(b.height * 10) / 10); }
    const isl = document.querySelector("#phone-chrome .chrome-island [style*='translateX']");
    if (isl) { const b = isl.getBoundingClientRect(); r.push("island " + Math.round(b.width * 10) / 10 + "x" + Math.round(b.height * 10) / 10); }
    return r;
  });
  console.log(out.join("\n"));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
