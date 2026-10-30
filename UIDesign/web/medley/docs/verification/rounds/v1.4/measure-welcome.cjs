// Round-6 welcome measurement: element screenshot + boxes/computed styles.
// Usage: node docs/verification/rounds/v1.4/measure-welcome.cjs <out-png> <out-json>
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const fs = require("fs");
(async () => {
  const outPng = process.argv[2];
  const outJson = process.argv[3];
  const browser = await chromium.launch({
    executablePath: "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell",
    args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const el = page.locator("#welcome");
  await el.first().screenshot({ path: outPng });
  const data = await page.evaluate(() => {
    const sec = document.querySelector("#welcome");
    const panel = sec.querySelector(".bg-dark-bg") || sec.firstElementChild;
    const byText = (t) => {
      const els = Array.from(sec.querySelectorAll("span, div, button, p"));
      return els.find((e) => e.childElementCount === 0 && e.textContent.trim() === t) || els.find((e) => e.textContent.includes(t));
    };
    const info = (node) => {
      if (!node) return null;
      const r = node.getBoundingClientRect();
      const cs = getComputedStyle(node);
      return { x: r.x, y: r.y, w: r.width, h: r.height, fontSize: cs.fontSize, lineHeight: cs.lineHeight, color: cs.color, bg: cs.backgroundColor, borderColor: cs.borderColor, borderWidth: cs.borderWidth, fontWeight: cs.fontWeight };
    };
    const panelR = panel.getBoundingClientRect();
    return {
      panel: info(panel),
      panelRel: { x: panelR.x, y: panelR.y, w: panelR.width, h: panelR.height },
      title: info(byText("Let's discover")),
      tagline: info(byText("Every top AI in one app.")),
      modelLine: info(byText("Claude, GPT, Gemini, DeepSeek, Kimi and GLM")),
      googleBtn: info(byText("Continue with Google")),
      tryBtn: info(byText("Try without an account")),
      footnote: info(byText("By continuing, you confirm")),
      dot: (() => {
        const d = sec.querySelector(".bg-welcome-dot");
        return info(d);
      })(),
      wordmark: info(byText("Medley")),
    };
  });
  fs.writeFileSync(outJson, JSON.stringify(data, null, 2));
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
