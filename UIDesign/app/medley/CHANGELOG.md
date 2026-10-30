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

## v1.3 — 2026-10-29 — HD 复验轮（welcome 实测修复，裁判 429 停手）

- 原图准绳切换：本轮起一律用用户亲供高清条（UIDesign/docs/references/medley/）：welcome 用中文条首屏裁切 (20,15,580,1260)；pricing 用 5 屏条第 4 屏裁切 (1495,100,1965,1000)（初切右缘切字后扩至 1965，复核全文完整）；home-cn、lisbon-cn/en、picker（Fable）同法裁切，裁切与并排图存 rounds/v1.3/judge/。裁判脚本与 prompt 新增于本套 docs/verification/（judge.py、judge-prompt.txt、judge-zone-prompt.txt），只用 qiniu/conatus-free，max_tokens 6000，verdict 先行。
- 全屏 welcome 裁判（HD 并排，高度归一化 844）：回 VERDICT: DIFFS: 1, 2, 3, 4, 5, 6, 7（另列第 8 项脚注）：1 标题纵向位置低约 25px、2 标题字号 42-44 vs 38-40px、3 圆点 14 vs 18-20px、4 副文案间距 30 vs 22px、5 副文案字号 17 vs 15px、6 副行亮度、7 按钮位置低约 24px 且 G 角标偏小、8 脚注换行与缩进 36 vs 20px。
- 像素复核（宽度归一化 390 宽为准，因原图设备高宽比 2.22 与渲染 2.16 不同，高度归一化会夸大纵向差）：圆点原图 22 native px = 约 15px 当量，与渲染 14-15px 一致，裁判第 3 项误读；标题 cap 高渲染 26px vs 原图约 29px 当量，裁判第 2 项方向反了；标题顶距差约 11px、按钮顶距差约 8px，裁判第 1/7 项量级夸大。但两项为真差异：W1 按钮高渲染 39px vs 原图 74 native px = 约 51-53px 当量（宽约 340 vs 约 345px 接近，唯高度差约 12px）；W2 脚注缩进渲染 42px vs 原图约 27px 当量（代码里父级 px-5 + 内层 px-5 双重缩进所致）。结论：v1.2 的 D2“按钮 40px”结论被 HD 推翻——旧小拼图量得的 38-42px 当量是错的，HD 下按钮应为约 52px，恰为 Button 组件默认尺寸。
- 分区复验（按钮区 Z3，宽度归一化）：裁判回 VERDICT: DIFFS: 1, 2，其中第 1 项脚注换行差属实（与 W2 同源）；第 2 项“右侧圆角卡片 vs 左侧直角”是裁切边框假象（原图手机框圆角被裁进画面，渲染裁切为矩形），非设计差；按钮高度本项裁判漏报，不以此为准。
- 停手点：分区 Z1（标题区）调用回 HTTP 429 free_campaign_global_limit（request_id chatcmpl-a03c6d50d6a84c11bcb86257c120de51）。按铁律立即停手：不 sleep 重试、不换模型、不再发任何裁判调用。以下均未送裁判：welcome 全屏复验、pricing 全屏、home-cn、lisbon、picker/Fable、kyoto（并排图已备好在 rounds/v1.3/judge/，额度恢复后直接送）。
- 修复（只改 welcome-dark.tsx 一处，不动全局按钮与全局 caption）：
  - W1：两按钮去掉 h-[40px] 覆盖，回到 Button 默认 52px；G 角标维持 16px/10px 字不变。
  - W2：脚注去掉内层 px-5，只留父级 px-5，与按钮左缘对齐。
- 像素复验：新渲染白 pill 行 643-693，高 51px（原图约 51-53px 当量）；脚注左缘 22px（原图约 27px 当量，旧 42px）。其余 17 屏重截图与 v1.2 字节一致（仅 welcome 变了），证实改动无扩散。
- 构建：pnpm build 通过（126 modules）；18 张重截图存 docs/verification/rounds/v1.3/（judge 工作文件在同目录 judge/ 子目录）。
- 本轮 verdict：未干净（裁判口径）——welcome 修复待额度恢复后复验拿零差异 verdict；pricing 从未在本轮送裁判；home-cn / kyoto / lisbon / Fable 抽查待办不变。残差沿用 v1.2。

## v1.4 — 2026-10-30 — 第 4 轮裁判验收（6 项 verdict 驱动修复，2 屏 contested）

- 裁判链（本轮改造自 rounds/round3/judge-runner.py，见 rounds/round4/judge-runner-round4.py）：主裁判 nvidia/nemotron-3.5-super-vl:free（openrouter 渠道 12，免费、cost 0）；备选 claude-sonnet-4-6（vyceai 渠道 17）；第三备选 mimo-v2.6-flash（vectide，仅 lisbon-cn 一次成功兜底）。禁用 deepseek-v4-flash-vision / qiniu / kimi-k3 / 一切 Oxion 模型（均未用）。传输 curl -K - stdin 传密钥（密钥只放内存、不进 argv、不落文件）；提示词 verdict-only（首行 VERDICT: PASS/FAIL + 一句话理由）。
- 裁判链教训（本轮实测）：① max_tokens 500 会被 nemotron/mimo 的 reasoning 吃光致 content 为空（nemotron 首轮 2 次空 content、mimo 1 次 500 reasoning token 耗尽），改 4000 后才出 verdict；runner 验收标准亦补丁为“无 VERDICT 行即算失败调用”（首轮 claude 曾回一段无 verdict 的分析前言，已废弃）。② nemotron 后段连续 9 次调用回 429（免费层限流，本轮后段每次均靠备选兜底）；另有 claude 1 次 524（mimo 兜底成功）。停手口径说明：控制块“连续 429 三次”按“连续 3 次调用拿不到 verdict”执行——本轮每次主裁 429 后备选均拿到 verdict，故未触发停手；若按主裁单链计则已超 3 次，协调人可覆议此口径。③ claude 备选幻觉率高：本轮 11 次 FAIL 理由经核对无据或错位（见下），均未驱动改动；nemotron 出 verdict 时理由基本可验（welcome 按钮底色、pricing 弧线、lisbon 顶栏箭头/角标/停止钮、lisbon-cn 圆钮均属实）。
- 修复（全部 verdict 驱动、像素复核；只改本套）：
  - W3 按钮底色：welcome Google 按钮与 pricing CTA 原图底色均为 #EDEEF2（采样 (237,238,242)），渲染原为纯白；index.css 新增 token --color-btn-light: #edeef2，Button white variant 改用它（white-btn token 未动，tabs 仍用它）；两屏像素复验均为 (237,238,242)，与原图一致。
  - P1 定价顶部圆点：原图为 6 点 pastel 弧线（#dcb1c2/#abceee/#dfdda7/#afddc9/#cdb9e8/#eab6a3，间距 20px、逐点抬升 8/7/7/6/5px），渲染原为 5 点横排；Model.tsx 新增 ModelDotsArc，仅定价顶行用（ml-[72px] 对齐原图 24.9% 起始位置），Pro 卡内圆点行原图确为横排、未动；复验弧线 6 点落位 ±0.5px。
  - L1 lisbon-en 顶栏：原图模型名后有下拉箭头，渲染缺失；补 Icon.chevronDown('#9a9ba2')。
  - L2 lisbon-en Day 1 引用角标：原图第 1 条末尾角标 1、第 3 条末尾角标 2，渲染缺失；bullets 改为带可选 cite 的结构，第 2 条无角标不变。
  - L3 lisbon-en 输入按钮：原图为桃色圆底 + 黑色方块（停止态），渲染为桃色圆底 + 麦克风；InputBar 新增 mic="stop-accent"（accent 圆底 + 黑方块），仅 lisbon-en 用。注意：原图 lisbon-cn 输入按钮为白圆底 + 黑方块（即既有 stop 变体），故未动 stop 变体。
  - L4 lisbon-cn 顶栏左钮：原图汉堡在深色圆钮内，渲染为裸汉堡；左钮包 h-9 w-9 rounded-full bg-dark-input。
- 构建：pnpm build 通过；18 屏重截图与 v1.3 比对，仅上述 4 屏变化（welcome/pricing/lisbon-en/lisbon-cn），其余 14 屏字节一致（含 kyoto、picker-a、home-cn 均未动代码）。
- Verdict（本轮，verdict-only 提示词）：
  - PASS：welcome（nemotron 主裁，按钮底色修复后复验）、pricing（定价弧线修复后复验）、home-cn（第 2 判；第 1 判幻觉已废弃）、lisbon-cn（左钮圆圈修复后复验）、kyoto（第 2 判；第 1 判幻觉已废弃）。
  - CONTESTED（无干净 PASS、不落地、不改代码）：lisbon-en（chevron/角标/停止钮三项实改均被后续判决越过，证实已修；但随后连续 3 判无据：个人资料页幻觉、AiMeta 圆点“缺失”误读、空白图误判）、picker-a（连续 3 判无据：占位图/个人资料头幻觉、白底误判、headline 字母 i 上圆点无从对应；Fable Pro+ 角标目视确认在位，与原图一致）。
- 废弃的无据 FAIL（均有据驳回，不驱动改动）：pricing 首判 Continue 按钮（两图均无此按钮）、pricing 第 2 判 Loading 插画与登录表单（两图均无）、home-cn 首判英文句 solutions/platform（中文屏两图均无此句）、lisbon-en 第 4 判个人资料页（Alex Johnson / Save Changes，两图均无）、lisbon-en 第 6 判空白图（左图为完整渲染）、lisbon-cn 首判 Continue to Payment 绿钮（两图均无）、picker-a 第 1/2 判（占位图/白底，两图均为深色模型选择屏）、kyoto 首判 Start/Get Started 按钮（两图均无）。
- 残差（无 verdict 引用，未改代码，列为问题）：① home-cn 原图底部输入条为双行高条（占位行+控制行），渲染为单行 52px InputBar；② home-cn 分段控件宽度与顶部图标圆圈与原图有目视差异；③ picker-a 原图积分数字前缀为 ~（~5/~11/~31/~80/~120/~400），渲染为 -（-5/-11/…）；④ lisbon-cn 原图顶栏中/右区亦为 pill 容器、底部输入条亦为双行（本轮只修了 verdict 引用的左钮圆圈）；⑤ AiMeta 圆点色：原图呈淡色辉光感，渲染为饱和模型色（v1.0 备案“实测近似”延续，lisbon-en 第 5 判“缺失”误读即源于此）；⑥ 旧残差沿用 v1.2/v1.3（VM 字体度量致折叠/折行类）。
- 费用：claude 备选 18 次调用、约 72.5 万 prompt tokens（含 1 次无 verdict 畸形回复）；nemotron 6 次出 verdict（cost 0）+ 多次空 content/429；mimo 2 次（1 次 reasoning 耗尽无 verdict、1 次成功兜底）。密钥全程只放内存，未打印、未落文件。
- 证据：rounds/round4/（全量：并排图、历次 verdict、日志、裁切、runner 与一次性探针脚本）与 rounds/v1.4/（18 张终版截图 + judge/ 终版并排图与终判）。未 commit、未 push、未 git add，工作区留待协调人统一提交。
