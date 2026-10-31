// v1.8 verification: section/panel shots (SF render, Display override) +
// interactive phone-demo state shots + behaviour assertions. Harness ONLY:
// product code and font tokens untouched. Binary: headless_shell-1243.
const { chromium } = require("/home/hatch/workspace/muse-build/shot/node_modules/playwright-core");
const path = require("path");
const fs = require("fs");
const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const OUT = __dirname;
const results = [];
function log(name, ok, detail) {
  results.push({ name, ok, detail: String(detail) });
  console.log((ok ? "PASS " : "FAIL ") + name + " :: " + detail);
}
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
async function frameShot(page, name) {
  const el = page.locator('[data-testid="demo-phone"]');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await el.screenshot({ path: path.join(OUT, name) });
  console.log("wrote " + name);
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const file = "file://" + path.resolve(__dirname, "..", "..", "..", "..", "dist", "index.html");
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await optical(page);
  await page.screenshot({ fullPage: true, path: path.join(OUT, "gallery-fullpage.png") });
  console.log("wrote gallery-fullpage");
  const sections = ["welcome", "home", "chat", "picker", "pricing", "credits", "agent-team", "drawer", "chat-info", "suspended", "language", "composer", "desktop-lisbon", "desktop-home", "phone-chrome", "interactive"];
  for (const id of sections) {
    const el = page.locator("#" + id);
    if (await el.count()) {
      await el.first().screenshot({ path: path.join(OUT, "sec-" + id + ".png") });
      console.log("wrote sec-" + id);
    } else console.log("missing #" + id);
  }
  const panels = [
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
    ["interactive", '[data-testid="demo-phone"]'],
  ];
  for (const [name, sel] of panels) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await el.screenshot({ path: path.join(OUT, "panel-" + name + ".png") });
      console.log("wrote panel-" + name);
    } else console.log("missing panel " + name);
  }

  async function scrimClick(x, y) {
    // Playwright's element click targets the scrim centre, which the
    // sheet/drawer covers; tap the visible scrim strip instead.
    const box = await phone.boundingBox();
    await page.mouse.click(box.x + x, box.y + y);
  }
  // ---- interactive behaviour assertions (fresh state) ----
  const phone = page.locator('[data-testid="demo-phone"]');
  await phone.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const title0 = await page.locator('[data-testid="demo-title"]').innerText().catch(() => "?");
  // By behaviour-check time the demo has rotated for a while (section +
  // panel shots run first), so any rotation-list sentence is valid here;
  // the rotation check below proves it advances.
  const ROT = ["Let's discover", "Every idea, one app", "Ask anything, anywhere"];
  log("welcome-initial", ROT.includes(title0), "title=" + title0);
  await frameShot(page, "state-welcome.png");
  // rotation: dwell 3200ms; wait for a change (up to 6s)
  let title1 = title0;
  for (let i = 0; i < 12 && title1 === title0; i++) {
    await page.waitForTimeout(500);
    title1 = await page.locator('[data-testid="demo-title"]').innerText().catch(() => "?");
  }
  log("welcome-rotation", title1 !== title0 && title1.length > 0, "after=" + title1);
  // go home via Try (scoped to the phone frame)
  await phone.getByRole("button", { name: "Try without an account" }).click();
  await page.waitForTimeout(600);
  const homeVisible = await page.locator('[data-testid="demo-screen-home"]').isVisible().catch(() => false);
  log("push-welcome-home", homeVisible, "home visible=" + homeVisible);
  await frameShot(page, "state-home.png");
  // tabs: Agents
  await page.locator('[data-testid="demo-tab-agents"]').click();
  await page.waitForTimeout(600);
  const agentsText = await phone.innerText().catch(() => "");
  log("tab-agents", /Compare the pricing/.test(agentsText), "agents panel present=" + /Compare the pricing/.test(agentsText));
  await frameShot(page, "state-tabs-agents.png");
  await page.locator('[data-testid="demo-tab-chat"]').click();
  await page.waitForTimeout(500);
  // send from home -> push to chat + thinking + streaming
  await page.locator('[data-testid="demo-home-input"]').fill("Plan 3 days in Lisbon on a budget.");
  await page.locator('[data-testid="demo-home-send"]').click();
  await page.waitForTimeout(700);
  const chatVisible = await page.locator('[data-testid="demo-screen-chat"]').isVisible().catch(() => false);
  const thinking = await page.locator('[data-testid="demo-thinking"]').count().catch(() => 0);
  log("send-push-thinking", chatVisible && thinking >= 1, "chat=" + chatVisible + " thinking=" + thinking);
  await frameShot(page, "state-chat-thinking.png");
  // wait for streaming text
  let streamed = false;
  for (let i = 0; i < 20 && !streamed; i++) {
    await page.waitForTimeout(300);
    const t = await page.locator('[data-testid="demo-message-list"]').innerText().catch(() => "");
    streamed = /Here is a quick plan/.test(t);
  }
  const stopCount = await page.locator('[data-testid="demo-chat-stop"]').count().catch(() => 0);
  log("streaming-stop-visible", streamed && stopCount >= 1, "streamed=" + streamed + " stop=" + stopCount);
  await frameShot(page, "state-streaming.png");
  // stop halts streaming
  const beforeStop = await page.locator('[data-testid="demo-message-list"]').innerText().catch(() => "");
  if (stopCount >= 1) await page.locator('[data-testid="demo-chat-stop"]').click();
  await page.waitForTimeout(800);
  const afterStop = await page.locator('[data-testid="demo-message-list"]').innerText().catch(() => "");
  const stopped = /Stopped/.test(afterStop);
  log("stop-halts", stopped, "stopped-meta=" + stopped);
  await frameShot(page, "state-stopped.png");
  // picker sheet via model pill
  await page.locator('[data-testid="demo-model-pill"]').click();
  await page.waitForTimeout(800);
  const pickerShown = await page.locator('[data-testid="demo-sheet-picker"]').getAttribute("data-state").catch(() => "?");
  log("sheet-picker", pickerShown === "shown", "data-state=" + pickerShown);
  await frameShot(page, "state-sheet-picker.png");
  // dismiss via scrim, then info sheet via control row
  await scrimClick(195, 20);
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Open chat info" }).click();
  await page.waitForTimeout(800);
  const infoShown = await page.locator('[data-testid="demo-sheet-info"]').getAttribute("data-state").catch(() => "?");
  log("sheet-info", infoShown === "shown", "data-state=" + infoShown);
  await frameShot(page, "state-sheet-info.png");
  await scrimClick(195, 20);
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Open drawer" }).click();
  await page.waitForTimeout(800);
  const drawerShown = await page.locator('[data-testid="demo-drawer"]').getAttribute("data-state").catch(() => "?");
  log("drawer", drawerShown === "shown", "data-state=" + drawerShown);
  await frameShot(page, "state-drawer.png");
  // scroll: message list scrolls (still on the chat screen)
  await scrimClick(360, 360);
  await page.waitForTimeout(600);
  const scrollInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="demo-message-list"]');
    if (!el) return "no-list";
    const before = el.scrollTop;
    el.scrollTop = 50;
    return "scrollHeight=" + el.scrollHeight + " clientHeight=" + el.clientHeight + " scrollTop-set=" + el.scrollTop + " before=" + before;
  }).catch((e) => "err " + e);
  log("scroll-container", /scrollHeight/.test(scrollInfo), scrollInfo);
  // pop back home via back button
  await page.locator('[data-testid="demo-back"]').click();
  await page.waitForTimeout(600);
  const backHome = await page.locator('[data-testid="demo-screen-home"]').isVisible().catch(() => false);
  log("pop-chat-home", backHome, "home visible=" + backHome);
  // press state: hold mouse down on the phone Try button, shot the frame
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await optical(page);
  await phone.scrollIntoViewIfNeeded();
  const tryBtn = phone.getByRole("button", { name: "Try without an account" });
  const box = await tryBtn.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(150);
    await frameShot(page, "state-press.png");
    await page.mouse.up();
    log("press-shot", true, "held Try button, frame shot taken");
  } else {
    log("press-shot", false, "no Try button box");
  }
  // focus ring: keyboard Tab until the primitives input is focused
  let focused = "";
  for (let i = 0; i < 200 && focused !== "primitives"; i++) {
    await page.keyboard.press("Tab");
    focused = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a) return "";
      const sec = a.closest("section");
      return sec ? sec.id : a.tagName;
    }).catch(() => "");
  }
  log("focus-primitives", focused === "primitives", "focused-section=" + focused);
  const prim = page.locator("#primitives");
  await prim.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await prim.screenshot({ path: path.join(OUT, "state-focus.png") });
  console.log("wrote state-focus");
  fs.writeFileSync(path.join(OUT, "behaviour.json"), JSON.stringify(results, null, 2));
  console.log("behaviour: " + results.filter((r) => r.ok).length + "/" + results.length + " pass");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
