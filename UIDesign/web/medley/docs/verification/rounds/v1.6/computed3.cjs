// v1.6 post-fix computed verification.
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
    const cs = (el) => { const s = getComputedStyle(el); return { h: s.height, w: s.width, bg: s.backgroundColor, bw: s.borderBottomWidth, btw: s.borderTopWidth, b: s.borderWidth, bc: s.borderColor, fs: s.fontSize, tt: s.transitionTimingFunction, at: s.animationTimingFunction }; };
    const q = (sel) => document.querySelector(sel);
    const qa = (sel) => [...document.querySelectorAll(sel)];
    const r = {};
    // home EN: composer + auto + menu + clock
    const home = q("#home .grid > div:first-child");
    r.homeComposer = cs(home.querySelector(".rounded-input"));
    const auto = [...home.querySelectorAll("span")].find((s) => s.textContent.trim() === "Auto");
    r.homeAuto = auto ? cs(auto) : null;
    r.homeMenu = cs(home.querySelector("svg"));
    r.homeClock = (() => { const svgs = [...home.querySelectorAll("svg")]; const d = svgs.find((s) => s.querySelector("circle[stroke-dasharray]")); return d ? cs(d) : null; })();
    r.homeSuggBorder = (() => { const el = home.querySelector(".border-t-\\[0\\.5px\\]"); return el ? cs(el).btw : "missing"; })();
    // pricing
    const pr = q("#pricing div.max-w-\\[560px\\]");
    r.pricingSeg = cs(pr.querySelector(".rounded-button"));
    r.pricingSegBtn = cs(pr.querySelector(".rounded-button button"));
    r.pricingCTA = cs([...pr.querySelectorAll("div")].find((d) => d.textContent.trim() === "Start 7-day free trial"));
    const plans = [...pr.querySelectorAll(".mt-5")];
    r.pricingPlans = plans.map((p) => cs(p));
    const badge = [...pr.querySelectorAll("span")].find((s) => s.textContent.trim() === "7 days free");
    r.pricingBadge = badge ? cs(badge) : null;
    r.pricingDotsTop = (() => { const dots = pr.querySelectorAll("span[aria-hidden='true'] span"); return dots.length; })();
    // composer section: stacked total + sendDark disc
    const comp = q("#composer > div");
    const stacked = comp.children[2];
    r.stackedTotal = stacked ? stacked.getBoundingClientRect().height : null;
    const sendDark = comp.children[3];
    r.sendDarkDisc = sendDark ? cs(sendDark.querySelector(".rounded-full")) : null;
    // picker
    const pk = q("#picker .grid > div:first-child > div");
    r.pickerBg = pk ? cs(pk).bg : null;
    const pickerRow = q("#picker .grid > div:first-child .py-\\[11px\\]");
    r.pickerRowBorder = pickerRow ? cs(pickerRow).bw : null;
    // language + suspended + credits by-model borders
    r.langBorder = cs(q("#language .border-b-\\[0\\.5px\\]")).bw;
    r.suspBorder = cs(q("#suspended .border-b-\\[0\\.5px\\]")).bw;
    // drawer
    const dr = q("#drawer div.max-w-\\[340px\\]");
    r.drawerMenu = cs(dr.querySelectorAll("svg")[1] || dr.querySelector("svg"));
    r.drawerAvatar = (() => { const s = [...dr.querySelectorAll("span")].find((x) => x.textContent.trim() === "A"); return s ? cs(s) : null; })();
    // credits
    const cr = q("#credits > div");
    const white = [...cr.querySelectorAll("div")].find((d) => getComputedStyle(d).backgroundColor === "rgb(255, 255, 255)");
    r.creditsWhite = white ? cs(white) : null;
    const bars = white ? white.querySelectorAll(".w-2") : [];
    r.creditsBarCount = bars.length;
    r.creditsBarH = bars.length ? cs(bars[0]).h + "/" + cs(bars[29]).h : null;
    r.creditsBarsCont = white ? cs(white.querySelector(".h-\\[126px\\]")) : null;
    // motion
    const morph = document.querySelector(".morph-rotate");
    r.morphRotate = morph ? cs(morph).tt : null;
    const morphIn = document.querySelector(".morph-in");
    r.morphIn = morphIn ? cs(morphIn).at : null;
    // chat-info backdrop dots: count BrandDots spans (9px) in backdrop
    const bd = q("#chat-info .grid > div:first-child");
    r.backdropDots = bd ? [...bd.querySelectorAll("span[aria-hidden='true'] span")].slice(0, 3).map((s) => cs(s).w) : null;
    return r;
  });
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
