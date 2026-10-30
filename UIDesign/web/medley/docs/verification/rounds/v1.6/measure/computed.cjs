// Render computed-style road: dump computed values for key elements + font identification.
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
  const out = await page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); return { font: s.fontSize + "/" + s.fontWeight + "/" + s.lineHeight, family: s.fontFamily, color: s.color, bg: s.backgroundColor, radius: s.borderRadius, border: s.borderBottomWidth + " " + s.borderBottomColor, shadow: s.boxShadow, h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width }; };
    const q = (sec, sel) => { const root = document.querySelector("#" + sec); if (!root) return null; return root.querySelector(sel); };
    const qa = (sec, sel) => { const root = document.querySelector("#" + sec); if (!root) return []; return [...root.querySelectorAll(sel)]; };
    const r = {};
    r.welcomeTitle = cs(q("welcome", ".text-welcome-title"));
    r.welcomeDot = (() => { const el = q("welcome", ".h-4.w-4"); return el ? { h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width, bg: getComputedStyle(el).backgroundImage, shadow: getComputedStyle(el).boxShadow } : null; })();
    r.welcomeGoogleBtn = cs(qa("welcome", "button")[0]);
    r.welcomeTryBtn = cs(qa("welcome", "button")[1]);
    r.welcomeFootnote = cs(q("welcome", ".text-\\[12px\\]"));
    r.homeAutoPill = (() => { const el = q("home", ".rounded-chip"); return el ? { h: el.getBoundingClientRect().height, bg: getComputedStyle(el).backgroundColor, radius: getComputedStyle(el).borderRadius, pad: getComputedStyle(el).padding } : null; })();
    r.homeGreeting = cs(q("home", ".text-greeting"));
    r.homeSuggRow = (() => { const el = q("home", ".border-b"); return el ? { bbw: getComputedStyle(el).borderBottomWidth, bbc: getComputedStyle(el).borderBottomColor, py: getComputedStyle(el).paddingTop + "/" + getComputedStyle(el).paddingBottom } : null; })();
    r.homeComposer = (() => { const el = q("home", ".rounded-input"); return el ? { h: el.getBoundingClientRect().height, radius: getComputedStyle(el).borderRadius, shadow: getComputedStyle(el).boxShadow } : null; })();
    r.composerBars = qa("composer", ".rounded-input").map(el => ({ h: el.getBoundingClientRect().height, radius: getComputedStyle(el).borderRadius, shadow: getComputedStyle(el).boxShadow }));
    r.micCircles = qa("composer", ".h-9.w-9").map(el => ({ h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width, bg: getComputedStyle(el).backgroundColor }));
    r.pricingSeg = (() => { const el = q("pricing", ".rounded-button"); return el ? { h: el.getBoundingClientRect().height, radius: getComputedStyle(el).borderRadius } : null; })();
    r.pricingSegBtn = (() => { const el = q("pricing", ".rounded-chip"); return el ? { h: el.getBoundingClientRect().height, py: getComputedStyle(el).paddingTop + "/" + getComputedStyle(el).paddingBottom } : null; })();
    r.pricingCards = qa("pricing", ".rounded-card").map(el => ({ h: el.getBoundingClientRect().height, bg: getComputedStyle(el).backgroundColor, border: getComputedStyle(el).borderWidth + " " + getComputedStyle(el).borderColor, radius: getComputedStyle(el).borderRadius }));
    r.pricingCta = (() => { const els = qa("pricing", ".rounded-button"); return els.map(el => ({ h: el.getBoundingClientRect().height, text: el.textContent.trim().slice(0, 30) })); })();
    r.creditsHuge = cs(q("credits", ".text-huge-number"));
    r.creditsBtns = qa("credits", "button").map(el => ({ h: el.getBoundingClientRect().height, text: el.textContent.trim() }));
    r.chatinfoHandle = (() => { const el = q("chat-info", ".h-1.w-9"); return el ? { h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width, bg: getComputedStyle(el).backgroundColor } : null; })();
    r.chatinfoSheet = (() => { const el = q("chat-info", ".rounded-sheet"); return el ? { radius: getComputedStyle(el).borderRadius, shadow: getComputedStyle(el).boxShadow } : null; })();
    r.drawerPill = (() => { const el = q("drawer", ".rounded-input"); return el ? { h: el.getBoundingClientRect().height, radius: getComputedStyle(el).borderRadius } : null; })();
    r.langRows = qa("language", ".border-b").map(el => ({ bbw: getComputedStyle(el).borderBottomWidth, py: getComputedStyle(el).paddingTop + "/" + getComputedStyle(el).paddingBottom }));
    r.suspBtns = qa("suspended", "button").map(el => ({ h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width }));
    r.agentDot = (() => { const el = q("agent-team", ".h-\\[7px\\]"); return el ? { h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width } : null; })();
    r.agentProgress = (() => { const el = q("agent-team", ".h-1.rounded-full"); return el ? { h: el.getBoundingClientRect().height } : null; })();
    r.pickerRows = qa("picker", ".border-b").map(el => ({ bbw: getComputedStyle(el).borderBottomWidth }));
    // font identification via canvas widths
    const cv = document.createElement("canvas").getContext("2d");
    const widths = {};
    for (const fam of ["-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto", "DejaVu Sans", "Liberation Sans", "Arial", "Noto Sans SC"]) {
      cv.font = "700 41px " + fam;
      widths[fam] = cv.measureText("Let's discover").width;
    }
    r.canvasWidths = widths;
    r.bodyFont = getComputedStyle(document.body).fontFamily;
    return r;
  });
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
