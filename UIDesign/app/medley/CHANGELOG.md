# CHANGELOG — UIDesign/app/medley

## v1.0 — 2026-10-29 — 基线

- 交付状态：2026-10-29 交付，用户裁决不达标，需返工。
- 基线内容：18 屏（welcome-dark、home-light-en/cn、chat-dark-lisbon-en/cn、chat-light-train-en、chat-light-savings-en、chat-dark-kyoto-en、chat-light-router-en、chat-info-sheet、search-drawer-dark、model-picker-a/b、pricing-dark、credits-light、suspended-light、agent-team-dark、language-light），栈 Vite + React + TS + Tailwind CSS v4 + Radix primitives。
- 依据：DesignRepoForMuse/Doubao/ 三张拼图全分辨率 + muse/DESIGN-TOKENS.md 全量实测 token + muse/ 已有 18 屏实现形态。上一版自评“除折叠外 MATCH”，但用户重点质疑 welcome 登录屏与整体观感，故本轮返工逐屏重验，不只验主屏。
- 裁判模型（本轮起固定）：qiniu/conatus-free（BotsRouter），并排比对渲染图与真实原图。
- 备案残差（v1.0 沿用，见 README 残差节）：picker-b 倍率小字不渲染；字体家族未确认；模型圆点 hex 为实测近似；字重/阴影为视觉估计；滚动位置为快照状态；agent-team 内联圆点颜色沿用既有约定。

## v1.1 — 2026-10-29 — 差异轮（18 屏逐屏重验，未改代码）

- 方法：pnpm build 通过（126 modules）；按既定视口（390x844）重截图 18 张，存 docs/verification/rounds/v1.1/；三张原图逐屏裁切放大存 rounds/v1.1/refs/（总览 5x3 网格、细节 5 屏、中文 4 屏；屏宽实测：总览约 170、细节约 214、中文约 280，均接近 390:852 纵横比）；PIL 像素实测 + 直接读裁切图为主，视觉裁判为辅。
- 裁判模型：qiniu/conatus-free（BotsRouter）。教训：max_tokens 1500 时模型只交推理过程、content 为空且截断；改 max_tokens 6000 + 要求只交结论后才拿到正文。首轮 welcome 裁判（全拼图）误读原图无“Medley”字标（裁切图明明有），故裁判结论一律以 PIL 实测复核为准，不直接采信。
- 逐屏结论：18 屏全部过完。确认无误的屏：home-light-en、chat-dark-lisbon-en（气泡宽经像素实测与渲染一致）、chat-light-train-en（文案/表格全对；第三建议首屏外属滚动快照残差）、chat-light-savings-en（$58,164/$36,000/$22,164、滑块 16%/44% 全对；卡片脚注在折叠边缘属残差）、chat-dark-kyoto-en（除 mic 一项见 v1.2）、chat-light-router-en（通知卡全文、3 bullets、44 credits 全对）、chat-info-sheet（210/9/6、回复行 10:24/28/1.1s 与 10:17/41/3.5s、脚注全文全对）、search-drawer-dark（6 recent 行、240 messages、Alex/Pro 全对）、model-picker-b（分区、-31/-80/-80/NA/-160、Thinking 六段全对）、credits-light（12,480、71,720、四行 By model、Activity 行全对；Activity 首屏外属残差）、suspended-light、agent-team-dark（31s/9s/7s/6s/21s/8s、Step 3 of 8、20% 全对；Pause/Stop 行首屏外属残差）、language-light（10 行、System default 勾选、脚注全对）。
- 本轮编号差异（8 项，全部进入 v1.2 修复）：
  - D1 welcome 圆点色：渲染 #E2A181（桃色，mic 色）vs 原图圆点中心像素 (253,103,24) ≈ #FD6718（ vivid 橙）；圆点 12px vs 原图约 15px（10.5 native / 280 宽 → 14.6px）。
  - D2 welcome 按钮高：渲染 52px vs 原图约 38–40px（白 pill 高 27.5–30 native / 280 宽 → 38–42px）；G 角标随按钮同比例偏大（渲染 22px，宜 16px）。
  - D3 pricing 特性行文案：渲染 “Claude Sonnet and Opus, GPT-5.1, GLM-5, Kimi K3” vs 细节 3x 裁切 “Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3”（单行）。
  - D4 pricing 切换 pill：渲染白 pill + 桃色 Save pill + 深字 vs 原图 6x 裁切：灰 pill（采样 (48,49,53) ≈ #303135）+ 白字 Yearly + 无底色灰小字 Save 20%。
  - D5 home-cn 分段控件反色：渲染轨道灰 #EDEEF0 + 选中白 pill vs 原图轨道白 + 选中灰 pill（采样选中区 (236,235,240) ≈ #EDEEF0）。
  - D6 kyoto mic：渲染深色橙圆 mic vs 原图总览输入区橙/桃像素计数为 0（里斯本 det mic 有 279 桃像素作对照），京都应为无圆底灰 mic。
  - D7 lisbon EN/CN 末条回答末尾橙点：两张原图末尾均有小橙点（EN “pastel de nata ●”、CN “葡式蛋挞 ●”），渲染缺失。
  - D8 picker-a Fable 角标：渲染 “Pro” vs 细节 8x 裁切 “Pro+”。
- 未采纳的疑似项（有据驳回，不改）：kyoto 第二时段 “10:30”误读（低分辨率字形 + 日落语义支持渲染的 16:30，muse 基线同值）；welcome Try 按钮边框（行扫描未见原图横向边框线，属 subtle，与渲染一致）；pricing CTA 高（原图 27 native / 214 宽 → 约 49px，与渲染 52px 在 JPEG 边缘误差内，不动全局按钮高）。

## v1.2 — 2026-10-29 — 修复轮（D1–D8 全改，复验未达干净）

- 改动（只改本套；栈不变；未动全局按钮高与全局 divider）：
  - D1：新增 token brand-dot #FD6718（index.css + tokens/index.ts），welcome 圆点改 15px + bg-brand-dot；mic 仍用 accent #E2A181（里斯本 mic 中心采样 (224,164,133) 证实两者本就是两种橙）。
  - D2：welcome 两按钮 h-[40px]（实测复验：白 pill 高 39px，667–705 行），G 角标改 16px / 10px 字。
  - D3：pricing 特性行改 “Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3”（VM 字体较宽致渲染仍折两行，原设备字体下应为单行，属字体度量差异，不再缩字号追 VM）。
  - D4：BillingToggle 选中 pill 改 bg-dark-pill #303135 + 白字，Save 改无底色灰小字（仅 pricing 用此组件）。
  - D5：home-cn 分段控件互换：轨道改白、选中 pill 改 #EDEEF0（像素复验：选中区 (237,238,240)、轨道白，互换生效；ThinkingControl 白 pill 不动，其原图确为白 pill）。
  - D6：kyoto InputBar 改 mic="plain"（复验：底部输入区橙像素计数 0）。
  - D7：lisbon EN/CN 末条回答末尾加 12px brand-dot（复验：两屏各 93 橙像素，11px 宽）。
  - D8：Fable 角标改 “Pro+”。
  - 附加（定价局部）：PlanCard py 14px → 12px、PlanFeature mt-2 → mt-1.5，仅定价三卡；为把页脚向框内拉约 18px。结果：页脚链接仍在首屏外约一截（VM Noto 字体偏宽所致，与 train/savings/credits/agent-team 折叠同类），不再继续追 VM 度量。
- 构建：pnpm build 通过；18 张重截图存 docs/verification/rounds/v1.2/（pricing 经收紧后单独重拍一次并覆盖）。
- 复验裁判（qiniu/conatus-free，verdict 先行 prompt，max_tokens 6000）：
  - welcome v1.2：裁判回 VERDICT: DIFFS: 1, 2, 3, 4（1 标志橙楔、2 圆点位置/尺寸、3 副文案间距与亮度、4 按钮高 56 vs 48px）。四项逐项以 PIL 复核全部驳回：标志原图橙像素仅 1（渲染 18 桃像素，块存在且尺寸相当）；圆点渲染与标题中心差 0.0px、原图差 2 native px（≤3px）；副文案间距文本到文本渲染与原图均约 29px、副行中位数原图 (100,104,107) vs 渲染 (98,99,105) 基本一致；按钮高原图约 39px 当量、渲染实测 39px（裁判 56/48 两数均与像素不符）。结论：裁判本轮 welcome 误读成立，像素层面 welcome 已干净，但按“模型报零才算干净”的口径，本轮不能记为干净。
  - pricing v1.2：裁判调用回 HTTP 429 free_campaign_global_limit（request_id chatcmpl-9bb58d2e3df347e1995330a5636ce94a）。按限流铁律立即停手本套迭代：不 sleep 重试、不换模型、不再调用裁判。定价复验待办（额度恢复后）：pricing v1.2 裁判复验（verdict 先行）+ home-cn/kyoto/lisbon/Fable 四项的裁判抽查。
- 本轮 verdict：未干净（裁判口径）——welcome 裁判误读 4 项已逐项像素驳回、pricing 裁判因 429 未验；其余已改项均有像素/截图复验证据。残差沿用 v1.0 备案 + 本轮新增：定价/火车/储蓄/积分/agent-team 页脚或尾行在 VM 截图首屏外（滚动快照 + VM 字体度量，非设计参数）；pricing 特性行在 VM 下折两行（原设备字体应为单行）。
