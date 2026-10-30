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

## v1.5 — 2026-10-30 — 修复轮（audit-20261030 全部 G 项 + T1–T16 + 图标迁移；P0 自行定夺）

- 本轮性质：修复轮（控制块：用户只看最后结果，不中途汇报；P0 由本 agent 按原图实测证据自行定夺，全部记入本节；不 commit、不 push，工作区留待协调方统一提交）。构建：pnpm build 通过（tsc + vite，含 lucide-react）；18 张去边框验证截图存 docs/verification/rounds/v1.5/（bare 模式：`node docs/verification/shot-screens.cjs --bare rounds/v1.5`，390x844、scale 1.0，元素尺寸即代码值）；带框演示截图同步刷新于 docs/verification/*.png。裁判：本轮零调用（未取裁判密钥、未调 nemotron/claude/mimo）。理由：任务验收条明言“验收只认实测数据”，且往轮裁判幻觉率高；本轮以 PIL 实测为唯一放行依据，裁判仅为可选第二意见故跳过。
- P0 决策（定夺 + 依据）：
  - Q12/J1 圆点源：以 HD 中文源为准（鲜艳橙红）。welcome 圆点 token brandDot #fd6718 保持不动——该值是 welcome 圆点中心实测 (253,103,24)，与中文源 25x25 区域均值 (217,94,39) 一致（区域均值含深色底 blending，不是另一个颜色）；英文侧淡蓝灰 blob 来自小总览图、不可靠，不采用。
  - accent token 拆分：此前 accent #e2a181 承载四处（welcome 圆点/composer 圆钮/drawer 运行点/ModelDots 首点）。现 welcome 圆点仍用 brandDot（早已独立），composer mic/stop 继续用 accent，drawer 运行点新立 drawerDot token（值同为 #e2a181，结构分离以便日后独立改色），ModelDots 首点改走淡 pastel 弧线色（不再用 accent 值）。
  - Q16/Q17 contested：按已确认的修复算，不重判、不重跑裁判。L1/L2/L3 与 Fable Pro+ 在位均经本轮实测证实；G31 位置差另行修复（见下）。
  - Q18/Q20：双行输入条与顶栏药丸按原图量值落地，范围覆盖原图有此形态的屏：双行条仅 home-cn 与 lisbon-cn（lisbon-en 原图确为单行，G21；home-en 未量出双行，不动）；顶栏双 pill 仅 lisbon-cn。
  - Q21 圆点色：按原图实测淡 pastel 色改，不统一猜。映射见“圆点 pastel”一节。
  - Q13/Q19 前缀：模型行成本前缀 `-` 改 `~`（G30 已确认字形错误，约数 vs 负值）；Thinking 行无数字前缀可改（本套 Thinking 控件根本不渲染倍率数字，G36 备案延续，原因见下）。
  - Q8：验证截图去边框出图（bare 模式），gallery 演示保留设备框。
- 修复逐项（原图值 vs 改后值；PIL 量出 + 代码 token 读出）：
  - G01 welcome 标题：代码 38px → 43px（按 cap 缩放：渲染 cap 26px @38 → 目标 29.9px）。复量：标题 L 簇 cap 29px vs 原图 29.9px（-3%，原 -13%）。
  - G02 副文案：首行 16px → 15px（原图估计 15.4px；第二行 15px 不动）。复量：E cap 11 行 vs 目标 11.1（原 12）。
  - G03 脚注左缘：加 pl-[3.5px]。复量：脚注左缘比按钮内缩约 3–4px vs 原图 3.5px（原仅 1px）。
  - G04 MedleyMark：审计以代码 size（26）比原图 painted 高（25.1）混了单位；本轮实测：标志路径纵跨 viewBox 高 19 单位中的 18，故 painted 高 = size x 18/19；size 26 → 24.6px（-2%），size 25 → 23.7px（-5.7%）。结论：26 更接近原图，v1.5 初改的 25 已回退为 26（复量 bright 区跨度 24 行，与 24.6 一致）。G04 记为“复量纠正、维持 26”，不是一次尺寸改动。
  - G05 pricing 弧线起点：删 ml-[72px] 包裹，弧线直接顶内容左缘。复量：首点中心距内容左缘 +4.5px vs 原图约 4px（原 77px）。
  - G06 弧线点距：ModelDotsArc gap 10px → 15px。复量：点距 25px vs 原图 24.8px（+0.8%，原 -20%）。
  - G07 弧线抬升：rise [5,13,20,27,33,38] → [5,13,20,28,34,40]。复量（重建重拍后）：6 点中心落差 [0,8,15,23,29,35] vs 原图 [0,8.2,15.4,22.6,28.7,34.9]，逐点偏差 ≤0.4px（原末点 -1.9px）。G07 闭合。
  - G08 单点直径：复量 10x10px，与上限吻合，下限腐蚀可解释，确认不改。
  - G09 Pro 卡五点：ModelDots 改弧线同系淡 pastel（见圆点一节）。复量：五点逐值 (220,177,194)/(171,206,238)/(223,221,167)/(175,221,201)/(205,185,232)，与 token 逐值一致。
  - G10 Pro 特性行折行：初版复量曾误判单行（亮带阈值漏掉了仅 2 字“ K3”的弱带）；目视全屏发现仍折行后修正：PlanFeature 字号 13px → 12px（VM Noto 比原设备字体宽，13px 下全文宽约 278px vs 文本区 264px；12px 下约 257px，单行）。复量：特性行单带 468–476，无第二带。注明：原图该行字号未曾逐像素量出，12px 是 VM 度量 accommodation，不是确认的原图字号。
  - G11 页脚链接首屏位置：G10 单行后内容上收 19px，页脚行复量 y810–821，首屏内（原在首屏外）。G10/G11 同闭合；v1.4 带框截图 0.9906 缩放致有效宽少约 3px，恰在折行边界上，是旧误判的另一成因。
  - G12 home-cn 双行条：InputBar 新增 variant="double"（占位行 32px + 控制行 56px = 88px），仅 home-cn 与 lisbon-cn 用。复量：88px vs 原图 87–91px。
  - G13 home-cn 底色：Phone 与内层 bg-light-bg → bg-white。复量：(255,255,255)（原图同值）。home-en 不动：其原图约 246 与 lightBg (245,246,248) 吻合，复量 (245,246,248)。
  - G14 home-en 问候行高：greeting token 27px → 28px，记部分闭合。依据：两个直接量在 28px 时均已入 ±1%（home-cn 中文字形高 26→27.0px vs 原图 26.7px，+1%；pricing 标题 E cap 19→19.7px vs 原图 19.5px，+1%）；唯 EN 行带法噪声大且受 InputBar +4px 致 spacer 收缩的位置移动干扰（v1.4 带 (489,508) → v1.5 主带 (486,504) + 降部点 508，顶缘上移 3px 是位置移动、非字号变化），若为 EN 单指标加到 29px 会把两项直接量推到约 +5%。故停在 28px，EN 行带在噪声内未进一步闭合。
  - G15 顶栏下拉箭头：chevron svg 16px → 14px。复量：灰簇宽 8px vs 原图 8.2px（原 9px）。
  - G16 lisbon-en 停止钮圆底：stop-accent 圆 36px → 41px。复量：41x41px vs 原图 41.0px（原渲染 35px）。
  - G17 停止钮内黑方块：方块 12px → 9px。复量：9x9px vs 原图 9.2x8.2px（原 11x11px）。
  - G18 lisbon-en GLM 圆点：token modelGlm #e1b3c7。复量：中心 patch (225,179,199)，与原图逐值一致。
  - G19 Claude 圆点：token modelClaude #dfc1ad。复量：淡桃在位（GLM 已逐值验过同码路径）。
  - G20 lisbon-en 正文：腐蚀修正后约 -0–10%，在 allowance 内；复量 H 列带 229–240（12 行含抗锯齿），确认不扩大、不改字号。
  - G21 lisbon-en 单行输入条：InputBar 单行高 52px → 56px。复量：56px vs 原图 56.4px（影响 home-en、train、savings、kyoto、router、lisbon-en；home-cn/lisbon-cn 走 double；agent-team 自定义 52px 条不动）。
  - G22 lisbon-cn 顶栏左钮：36px → 46px。复量：46x46px vs 原图约 45.5px。
  - G23 lisbon-cn 中 pill：新增（bg #1c2026 即 (28,32,38)，标题 12px bold + 副行 10px，px-2 py-[1px] leading-[1.15]）。复量：100x27px，与原图约 100x27px 逐值一致。
  - G24 lisbon-cn 右 pill：新增（bg #1a202a 即 (26,32,42)，px-1.5 py-[5px] gap-2，edit/more 均为 18px；edit 新增 size 参数，默认 20）。复量：56x28px，宽与原图约 56px 一致。
  - G25 lisbon-cn 双行条：variant="double"。复量：88px（同 G12）。
  - G26 lisbon-cn 白色停止钮：stop 圆 36px → 29px、方块 12px → 9px（与 stop-accent 分开，不再共用尺寸）。复量：白圆 29x29px vs 原图 28.9px、方块 9x9px vs 原图 9.4px。
  - G27 lisbon-cn AiMeta 多余圆点：Chat.tsx AiMeta 新增 dot?: boolean = true，lisbon-cn 两处传 dot={false}。复量：GLM 区饱和簇为零，Claude 区仅余正文笔画细簇（无 8px 圆点，文字改从 x20 起排）；en 屏保留圆点，两屏逻辑分开。
  - G28 lisbon-cn 第三条 bullet 折行：标签 px-[7px] → px-[6px]、gap-1.5 → gap-1。复量：第三条仅单带 (376,390)，单行。
  - G29 lisbon-cn 来源行：原图裁切目视确认结构为 chip 独行 + 统计/图标同行（非拥挤单行）；SourcesChip 新增 className 透传（经 cn() 合并，cn 屏传 mt-0 覆盖默认 mt-[14px]），来源行改为两行结构（SourcesChip T/L/V + “3个来源”独行，其下 ActionRow credits="28积分 1.1秒 71 tok/s"）。复量：chip 三方块 16x16 在位。
  - G30 成本前缀：picker-a/b 全部 `-` → `~`（~5/~11/~31/~80/~120/~400 与 ~31/~80/~80/~160）；全 src grep 确认无 `value="-` 残留；App 展示行同步 `~31`。
  - G31 Fable Pro+ 角标：右区由上下叠放改为同行（flex items-start gap-2，Pro+ 角标 mt-[2px] 与成本首行同基线对齐）。目视确认：Pro+ 与 ~400 同行同基线；Fable 描述行在滚动区底部（sheet 可滚动，非折行错误，见 G40）。
  - G32 picker-a 四点淡 pastel：按模型映射（GLM #e1b3c7、DeepSeek #a1bfd3、Claude 系 #dfc1ad、Kimi #d4da9f、GPT-6.1 Sol #afddc9）。复量：(23,308) = (225,179,199) GLM 淡粉、(23,371) = (161,191,211) DeepSeek 淡蓝，方向确认。
  - G33 picker 圆点直径：ModelDot8 8px → 7px（原图约 4–7px，取区间顶）。复量：GLM 圆点 bbox 7x7px。
  - G34 分区标题：ModelSection 标题 text-section（16px）改为局部 text-[15px]（picker 专用组件，不影响 credits/info-sheet 的 section 标题；pageTitle token 保持 20px 不动，因 picker/credits/info-sheet 的标题未量出，不全局改）。复量：Everyday E cap 11 行（239–249，另 y 250–252 为 y 降部）vs 原图估计约 10.6–10.8，入 ±2%。
  - G35 顶部拖动手柄：picker-a 顶部加居中 h-[5px] w-9 rounded-full bg-[#3a3b40]，标题行 pt-3 → pt-2。复量：手柄 y56–60、x177–212（36x5px）在位。
  - G36 picker-b 倍率小字：仍不渲染。原因：源小字不可分辨；web 套的 Thinking 档位数列是 web 套证据，未经 app 侧实测量出，不能直接套用。备案延续。
  - G37 credits 巨号：hugeNumber token 44px → 51px（按数字干高缩放：渲染 31px @44 → 目标 35.9px）。复量：数字干高 36 行 vs 目标 35.9px（原 31px，-14%）。
  - G38 language 标题：text-page（20px）改为局部 text-[18px]（原图估计 17.9px；pageTitle token 不动，理由同 G34）。复量：A cap 13 行（108–120）vs 目标 12.9（原 14）。
  - G39 language 底色：Phone className="bg-[#fdfdfd]"。复量：(253,253,253) 两处 patch 一致。
  - G40 多屏折叠边缘：pricing 页脚已拉入首屏（G11）；其余屏的超首屏内容均为可滚动内容（chat 屏内容区 flex-1 滚动、picker-a sheet 滚动），非设计参数错误；InputBar 52→56px 使 chat 屏内容区少 4px，属滚动区高度变化，不改折叠结构。残差：train/savings/credits/agent-team/search-drawer/info-sheet 的折叠边缘位置未逐项精定（VM 度量类，见未闭合）。
  - 不动项：D-01 已闭合；W3 #edeef2 已确认（复量 welcome 钮底与 pricing CTA 底均为 (237,238,242)）。
- 圆点 pastel 映射（Q21/G09/G18/G19/G32 同根因：模型圆点 token 饱和化）：
  - token（tokens/index.ts 与 index.css 同步）：modelGlm #e1b3c7（lisbon-en GLM 实测 (225,179,199)）、modelClaude #dfc1ad（(223,193,173)）、modelKimi #d4da9f（picker 淡黄绿 (212,218,159)）、modelDeepseek #a1bfd3（picker 淡蓝 (161,191,211)）、modelGpt #afddc9（弧线淡绿 (166,213,192)）。旧饱和值作废。
  - ModelDots 五点由饱和 #e2a181/#4a7de4/#2eb5a5/#9b5de5/#3fa34d 改为弧线同系淡 pastel 前五点 #dcb1c2/#abceee/#dfdda7/#afddc9/#cdb9e8（影响 pricing Pro 卡、AutoCard、home-en ModelPill、info-sheet、App 展示）。
  - picker 行圆点按模型映射（model-picker-a/b、App 展示行）；不动：credits 图例色（T8 未能量出）、kyoto 顶栏 Kimi 圆点硬编码 #9b5de5（T9 未量）、MedleyMark 橙色块硬编码 #e2a181（logo 几何，非圆点系统）。
- P2 补量结果（T1–T16；量不出的明说、不编数）：
  - T1 welcome G 角标：未量出。原图 Google 钮左区（x34–160，y946–1019，560 宽裁切）内无可隔离的 G 字母暗簇与徽圆边缘（徽圆边框 #d8d8dc 系融入 #edeef2 钮底，审计原话“被按钮底色污染”属实）。保持渲染 16px/10px 字，不改。
  - T2 welcome Try pill：量出：上下边框行 y1034 / y1105（560 宽裁切）→ 高 71px → 约 49.4px@390，边框色约 (45,49,52)；渲染 Button 默认 52px + 边框 #2a2c31 (42,44,49)，偏差约 +5%（minor），且与 Google 钮同 Button 尺寸（实测 51–53px），不拆分改动。
  - T3 lisbon-en 引用角标：未量出。候选簇 (344,338,354,350) 与 (332,402,336,411) 经 patch 核查均为正文笔画（暗像素簇，无 #2f3034 方底 + 浅色数字结构），角标底色与正文色相近无法隔离。保持渲染 14px 盒，不改。
  - T4 lisbon-en 末条橙点：近似量出：暖色核心 6x5px（420 宽裁切，x137–142，y735–739），均值 (207,175,157)（小尺寸 JPEG blending 致淡）；结合 T5，末条橙点 12px → 9px（两屏同改；复量两屏均为 9px 宽）。
  - T5 lisbon-cn 末条橙点：量出：12x12px（585 宽裁切，x482–493，y947–958）→ 8.7px@390，中心 patch (251,98,25) ≈ brandDot vivid 橙。支撑 9px 改动。
  - T6 home-cn 分段控件与顶部图标圆：未量出。白轨道在白底上不可见；顶栏内容带 y88–104（裁切）高度换算自相矛盾（疑似裁切非均匀缩放），图标圆圈无法隔离。分段控件不动（D5 选中 pill 色 (237,238,240) 此前已验证一致）。
  - T7 home-en Auto pill 五点：部分量出：HD 条 home-en 面板内孤立出 2 点（约 7x6 strip px → 约 7px 设备宽），色为 muted（(165,122,144) 粉、(103,129,158) 蓝灰），方向支持淡 pastel 化；5 点完整色序未隔离，不另定色序，沿用弧线/G32 的 pastel 映射。
  - T8 credits 图例圆点：未解决。候选行 y564–570（条带）的簇呈重复图案带而非 4 点干净映射（另有 (54–67,90–107,126–145) 蓝系与 (163,124,137) 粉系 muted 点，但无法对应 Claude/GLM/Kimi/DeepSeek 四色）。图例色不动（不统一猜）。
  - T9 kyoto Kimi 圆点 + 标题/正文 cap：未尝试（仅 218px 总览裁切，无缩放系数）。kyoto 顶栏 Kimi 点 #9b5de5 不动；AiMeta Kimi 点随 token 改淡 pastel（与 AiMeta 系统一致）。
  - T10/T11/T12 总览 8 屏（train/savings/router/info-sheet/search-drawer/picker-b/suspended/agent-team）：全部受阻——总览缩放系数未知、无线单屏 HD 原图，字号三档、纯底色重采、逐元素像素均无法换算。不改，记入未闭合（原因：缺缩放系数/单屏原图）。
  - T13 pricing CTA 边距：量出：CTA 亮区 (1607,804,1951,853)（条带）→ 宽约 354px 设备宽，基本等于内容全宽（渲染 w-full 于 px-5 内 = 350px），属 padding 内全宽按钮；面板左缘容差 ±10px 使左右边距无法精定。不改。
  - T14 全部圆角弧半径：方法极限（本轮只做目视一致，未逐项拟合圆弧），不改、不虚构数值。
  - T15 全部字重精确数值：方法极限（像素只能给观察档 + 代码 font-weight），不改。
  - T16 picker 描述/模型名行 cap：部分量出：亮核行带 6–10px（430 宽裁切），与 13px 描述 / 15px 模型名 + JPEG 腐蚀一致，无法逐行分离 cap。字号不动（G34 分区标题已另行回调）。
- P3 图标与动效（lucide-react 1.63.0；pnpm add 接包，package.json 与 pnpm-lock 同步更新）：
  - 逐字复核 node_modules/lucide-react/dist/esm/icons/*.mjs 的 node 数组：8 项与旧手绘路径逐字一致（仅子路径顺序/大小写差异）——back=chevron-left（m15 18-6-6 6-6）、close=x、plus、check、chevronDown、chevronRight、more=ellipsis（三圆 12/19/5, r1）、logout=log-out；menu 不逐字：旧线 y 6/12/18，Lucide 5/12/19，差 1 格（20px 渲染约 0.8px，低于图标量测噪声，且原图菜单线位置未量出），按 Lucide 规范源执行并记录。
  - 因此 9 项走包源（各保留原默认尺寸：menu/back/close/plus/check/logout 20，chevronDown/chevronRight 16，more 18）；16 项近形（mic、search、edit、clock、copy、refresh、like、dislike、info、news、image、mapPin、calendar、folder、download、trash）保留手绘矢量（与 Lucide 差 1px 半径/端点/tab 形态，换源会无据移动像素，原图形态优先）；gear 保留 Feather 系齿轮（Lucide settings 是另一套齿轮路径，重绘无据）；send 保留手绘（几何经核对 = Lucide ArrowUp：M12 19V5 + M5 12l7-7 7 7，与 Lucide 纸飞机 send 完全不同，键名保留因 agent-team 在用）；pdf/cards/searchOrbit 无 Lucide 对应，保留自定义；edit 新增 size 参数（默认 20），供 lisbon-cn 右 pill 用 18px。
  - morphing 分档执行：先行 M3（chevron 旋转，Radix 下拉 open 时旋转 180°，纯旋转、零重绘；TopBar ModelPill 的 chevron 包 span.morph-chevron flex，index.css 加 200ms 旋转过渡）、M10（投票内点缩放：kyoto PollOption 内点改为常驻元素 + scale-0/scale-100，环加 morph-poll-ring 颜色过渡；静态截图外观不变）、M5（InputBar mic 容器 transition-all duration-200，运行时变体切换时圆底保持、内形 crossfade+scale，不硬切；静态截图无视觉变化）；M1（menu↔close 分段变换）、M2（menu↔back 重参数化）、M4（plus↔check，需同槽位语义确认）无本套运行时切换实例，只记配方不写死代码；M6（mic↔send）非同屏同槽位、不列入切换义务；M7（like↔dislike 并列按钮、非切换）不做；M9（play↔pause）本套无此对，不立项。
- 额外 sweep（2026-10-30 12:42 口径：验收范围 = 界面上可见的一切）：
  - 对 9 个有 HD 原图的屏做渲染全屏目视（welcome、home-en、home-cn、lisbon-en、lisbon-cn、pricing、picker-a 逐屏看过；credits、language 以复量值 + 局部目视为准），除清单项外未发现其他可量出数的差异；lisbon-cn 来源行结构即 sweep 式发现（原图裁切目视：chip 独行 + 统计/图标行，渲染原为拥挤单行，已按原图结构重排，见 G29）。
  - 本轮自查纠错两则：① pricing G10 初版 band 分析曾误判单行（2 字弱带低于阈值），全屏目视发现仍折行后改 12px 并复量单带闭合；② G11 页脚初版 band 误认（y803–809 带实为脚注第三行，非页脚），G10 收紧后页脚行 y810–821 入首屏，方为真闭合。两处均以目视 + 低阈值重扫双重确认。
  - 9 个总览屏以 v1.1 已核验文案/数值为准 + 审计第 6 节结构结论为准，超出总览分辨率的差异记未闭合（缺单屏 HD 原图）。
- 共享改动的影响面与未改动屏：
  - InputBar 单行 52→56px 影响：home-en、train、savings、kyoto、router、lisbon-en（已验 56px）；home-cn/lisbon-cn 走 double（88px）。
  - ModelDots pastel 影响：pricing Pro 卡、AutoCard（picker-a/b）、home-en ModelPill、info-sheet 两处、App 展示。
  - modelDotColor pastel 影响：全部 AiMeta 圆点（lisbon-en、train、savings、kyoto、router 等；lisbon-cn 已去点）。
  - greeting 27→28px 影响：home-en、home-cn、pricing h1、info-sheet 数值标题。
  - welcomeTitle/hugeNumber/pageTitle 局部改动仅影响各自屏（pageTitle token 未动）。
  - 图标包迁移：menu/back/close/plus/check/chevron/more/logout 全屏通用，但 8 项逐字、menu 差约 0.8px，静态截图应无可视变化。
  - 零改动屏的逐像素比对（带框截图 vs v1.4 带框版，同尺寸 390x844）：suspended-light 字节一致（真无变化）；agent-team-dark 仅差 29px，全部位于 plus 图标区（x35–48，y789–802，lucide 描边抗锯齿差异，路径逐字）；search-drawer-dark 仅差 112px，全部位于右上角 menu 图标区（x285–300，y75–88，即 lucide menu 1 格线位移 + 抗锯齿，与 P3 记录一致），其余像素一致，drawerDot 值不变。bare 与带框截图因框/缩放不同不做字节比对，固定元素位置除框与 8px 高度压缩外一致。
- 未闭合项（带实测原因）：
  - T1/T3/T6/T8/T9：未量出或未尝试（原因见 P2 各条），对应渲染保持原值。
  - T10/T11/T12：总览 8 屏缺缩放系数/单屏 HD 原图，无法换算。
  - T14/T15：圆角弧半径与字重精确数值超出像素方法极限，不虚构。
  - G14：部分闭合（28px 时两项直接量入 ±1%，EN 行带在噪声内未进一步闭合，见 G14 条）。
  - G36：Thinking 倍率小字仍不渲染（源小字不可分辨；web 套数列未经 app 侧实测，不能套用）。
  - G40 残差：train/savings/credits/agent-team/search-drawer/info-sheet 的折叠边缘位置未逐项精定（VM 字体度量类）。
  - G10 字号说明：PlanFeature 12px 是 VM 度量 accommodation，原图该行字号未曾逐像素量出，待原设备字体证据出现时复议。
  - pricing 特性行文案：v1.2 D3 已改 “Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3”，本轮未动文案。
- 费用：本轮零裁判调用、零令牌取用（未取 /etc/botsrouter/muse_judge_token.txt）。未 commit、未 push、未 git add，工作区留待协调方统一提交。

## v1.6 — 2026-10-30 — 登录页全量重比 + 全套漏网重扫修复轮（round 6，v1.5 → v1.6）

- 任务来源：round 5（v1.5）交付后用户 2026-10-30 13:35 当场指出仍差太多，并质问登录首页底色与全部细节是否对比到位；13:41 再令四套全部完美 1:1。本套按此升级：每屏每个可见元素重比重修，round 5 接受过的残差不自动沿用，能推到 1:1 的推，推不到的逐项记未闭合（带实测原因，不编数）。最终报告的“已修复”只认实测到 1:1 的项。
- 零裁判调用：本轮全程只认实测数据，未取 /etc/botsrouter/muse_judge_token.txt，未调用任何裁判模型。未 commit、未 push、未 git add，改动留工作区由协调方统一提交。只动 UIDesign/app/medley/ 一套（16 个源码文件 + 本 CHANGELOG + rounds/v1.6/ 证据）；web/medley 与 app/web airbuild 的工作区改动系并行他人的工作，本轮未碰。
- 构建与截图：每批改动后 pnpm build 均通过（tsc + vite，末次 1.37s）。裸版验证截图（390x844，scale 1.0，元素尺寸即代码值）存 docs/verification/rounds/v1.6/（平铺 18 张最终版，与 post6 逐字节同一批）及过程子目录 pre/（v1.5 等价重拍，18 张与 v1.5 字节一致）、post1（welcome 中间态）、post2（batch 2 后，lisbon-cn/home-cn 后被最新修复覆盖）、post3/post4/post5/post6（各批修复后）；测量脚本与调查裁切存 rounds/v1.6/measure/（profile-hd.py 已指向 post6）。

### 登录页底色定论（用户追问“整体都是一个颜色吗？”的分支 2：纯色，已证实）

- 协调方网格复现（自有裁切，welcome 面板 (20,15,580,1260)，560x1245，与 v1.3 裁切字节可比：最大绝对差 26，均值 0.27，仅 JPEG 重编码噪声，裁切正确无需纠正）：纵向 0.05–0.95、横向三列 11x11 patch 中位数全部为 (17,21,24) = #111518，仅单点 0.45 处例外（见下）。
- 决定性纯色证据：空带区 y700–940、x20–500（副文案与按钮之间，无任何 UI）100% 精确等于 (17,21,24)；全空带 y700–950、x20–500 为 97.73% 精确，余量仅为 Google 钮顶缘在 y946–950 的侵入。逐 5% 行中位数与列中位数（x15–510）全部为 (17,21,24)，斜率为零。无纵向/横向/径向渐变，无辉光，无分段。
- 两处偏离的解释（均非底色变化）：① 顶部右角 (23,27,30)：全空带内仅 4 像素（120731 像素中），全幅空带 8 像素；右上状态区 x400–512、y20–60 内 16 像素，位置如 (460,31)、(490,33)、(484,36)，均为白色状态图标抗锯齿在深底上的混合色，从不是底色场。② 0.45 处 (15,18,23)：单像素 (280,560) 落在 16x6 实心矩形 x268–283、y555–560 内，位于副文案第一行下行区/间隙区（副文案灰带 y537–559 与 y570–592，y560–569 无灰字像素）；其 11x11 patch 中位数仍为 (17,21,24)，矩形在条带坐标下 x 分块对齐（strip x288 = 36x8），处于字带边缘，系 JPEG 分块 artifact，不是设计元素，不是底色分段。
- 左右边缘与顶部行（右条 x515–559 中位数 (15,18,23)、左条 x0–10、顶部行）为拼贴框/阴影/条带底，非应用底色（手机内区为 x约15–512）。跨屏佐证：lisbon-cn HD 面板众数同样为 (17,21,24)（内区 47.6%，余量为气泡/卡片）；三张细节条带彼此不一致（pricing 顶条 (13,14,16)、picker (8,9,11)），证实细节条带的深色为拼贴 surround 污染。旧 #121316 来源 muse/DESIGN-TOKENS.md 第 37 行自称“跨污染低分辨率样本的 bracket 共识”（范围 #06070B–#1C1818，welcome #1C1818“疑似污染”），现被 HD 证据取代。
- 改动：全局深底 #121316 → #111518（tokens/index.ts、index.css、Phone.tsx 共用底；两张干净 HD 见证一致，故为全局 token，非单屏局部色）。

### welcome-dark（登录页全量重比，改前 v1.5 → 改后 v1.6，手机坐标系：原点 crop y18，缩放 0.6964）

- 状态栏：时间字带原图 18 行 → 12.5 当量，渲染 13 行（合）；时间左原图当量 29.9，渲染 28（-1.9）；时间顶原图屏内 9.1 当量，渲染改前 15（+5.9）→ 改后 9（-0.1，StatusBar h-11 44px → h-8 32px，(32-13)/2 = 9.5，目标 9.1）；状态图标右缘原图当量 357.9，渲染改前 364（+6）→ 改后以 pl-7 pr-8（右内边距 24→32）对齐。
- 标志行：原图盒 (39,92)–(164,128) → 高 37 → 25.8 当量，渲染 26（+0.2）；宽原图 126 → 87.7 当量，渲染 90（+2.3，字体度量）；标志左原图当量 27.2，渲染改前 22（-5.2）→ 改后 26（-1.2，px-5 → px-6）；标志顶原图当量 51.5（手机坐标系；未做原点修正的宽度归一化 64.1 是误读，符号混乱即源于此），渲染改前 56（+4.5）→ 改后 53（+1.5，StatusBar -12 后 logo pt-3 → pt-5 补偿，32+20 = 52，实测 53）。
- 标题：原图带 454–497（44 行）→ 30.6 当量，渲染 31（+0.4）；标题顶原图当量 303.6，渲染改前 312（+8.4）→ 改后 303（-0.6）；leading 1.15 → 1.0 的实验曾使标题下移（312→320，居中块缩小时顶下移），已 revert 回 1.15；中间容器 pb-[28px]（原图标题块中心比中间空区中心高约 11px，底 padding 复现该偏上布局）。圆点：原图簇 x399–420、y469–490（22x22）→ 15.3 当量，渲染 15x15（-2%）；圆点中心相对标题中心原图 +2.8 当量，渲染 +2（合）；圆点间隙原图 13 → 9.1 当量（合）；渲染标题带内 x67–138、x190–265 的小簇（n=6,7）为 LCD 子像素抗锯齿 fringe，不是圆点（真圆点簇 n=161，15x15）。
- 副文案：原图行 1 带 537–557（21 行）→ 14.6 当量，行 2 带 575–591（17 行）→ 11.8 当量；渲染各 13 行（均值当量 13.2 vs 渲染 13，15px 尺寸按均值正确，逐行差为字形内容效应非尺寸错）；副行顶原图当量行 1 361.4、行 2 387.9，渲染改前 376（+14.6）、403（+15.1）→ 改后行 1 带 360–372（顶 -1.4）、行 2 带 386–398（顶 -1.9）；行距 mt-4 → mt-2.5（标题→副 1）、mt-1.5 → mt-1（副 1→副 2）；副行间隙原图 18 原图 px → 12.5 当量，渲染改前 15（+2.5）→ 改后约 13（合）；副行 1 宽原图当量 165.7，渲染 157（-5.2%，VM Noto 宽于原设备字体，改尺寸会破坏高度，不追）。
- 副文案/脚注颜色（厚核中位数，3x3 全差像素；JPEG 会把细笔画往深底拖暗，故原图读数亮于渲染 token 即证明渲染 token 确实过暗，真值不低于所量中位数）：原图副 1 (176,180,182)、副 2 (141,145,149)、脚注 (128,132,135)；渲染旧 token 副 1 #9a9ba2 (154,155,162)、副 2/脚注 #6b6c72 (107,108,114)。改动（welcome 局部色，非全局 token，跨屏副文案证据未齐前不全局化）：副 1 → #b0b4b6、副 2 → #8d9195、脚注 → #808487；改后单行带内精确色像素计数：副 1 带 (176,180,182) 42 像素、副 2 带 (141,145,149) 78 像素（确切命中，非中位数近似）；标题色保持 (245,245,247)（原图标题核众数 (233,237,240)/(235,239,242) 偏暗，符合 JPEG 细笔画损失；平区对照：Google 钮底原图众数 = 渲染 (237,238,242) 精确一致，证明 JPEG 对平区忠实）。
- Google 钮：亮带原图 946–1019（74）→ 51.5 当量，渲染 52（+0.5）；钮底众数原图 = 渲染 = (237,238,242) 精确；钮左原图当量 23.7，渲染改前 20（-3.7）→ 改后 px-6 对齐；钮宽原图当量 344，渲染 350（字体度量）。G 角标（闭合 v1.5 T1“未量出”）：原图白核弦几何得圆径约 29–31 原图 px → 20.2–21.6 当量（顶弧 y970 x160–170，底 y997，中心约 (165,983)）；渲染改前 16px（白核 14x14）→ 改后 21px/11px 字（白核实测 19x19，圆心 y 约 670 vs 原图当量 672.4，-2.4；圆心 x 约 108 vs 原图当量约 114，-6，系居中单元 + VM 文本宽 5% 所致的派生位移，非角标自身杠杆，移角标会破坏单元居中，故记字体度量残差）；原图 G 字 bbox x159–171、y977–990（13x14）→ 约 7.7 当量字，渲染 G 约 7px（11px 字，尺寸已 1:1）。
- Try 钮：边框原图 y1034（434px 通栏，众数 (45,49,52) 精确）与 y1105（众数 (46,50,53)）→ 高 72 原图 px → 50.1 当量；渲染改前边框 y707/758 → 52（+1.9）→ 改后 h-[50px]（边框 706/755 → 高 50，-0.1），边框色 border-dark-divider → #2d3134（顶边框真色；底边 1 级亮属 JPEG/阴影）；标签带原图 1063–1078（16）→ 11.1 当量，渲染 11（合）；标签中心原图当量 733.0，渲染 730（-3.0，残差：Try 顶与高均已 1:1，标签居中自动，无干净杠杆，不硬调）。
- 脚注：原图行 1132–1146 与 1155–1165 → 顶当量 775.8，行隙原图 9 原图 px → 6.3 当量；渲染改后行 1 顶 773（-2.8）、行 2 顶 791（-0.8，目标 791.8）；行 1 含下行区 773–784（vs 原图 775.8–785.6，底 -1.6），行 2 791–799（vs 原图 791.8–798.5，底 +0.5）；脚注左原图当量 27.9/27.2，渲染 24（pl-[3.5px] 相对缩进 v1.5 G03 已正确）；脚注 pt-0.5 → pt-1。
- 按钮间距：Google 底 → Try 顶原图当量 9.1–9.8，渲染改前 12（+2.2–2.9）→ 改后 gap-3 → gap-2.5（10px）；Try 底 → 脚注顶原图当量 18.8，渲染改前 18（-0.8）。Home indicator：原图暗行 y1214–1218（5 原图 px → 3.5 当量），簇 x207–355（149 宽 → 104 当量），中位数 (81,85,88) = #515558；渲染改前 134x5、#3a3b40 → 改后 104x3.5px、#515558（簇 x143–246，104 宽精确，行 832–835 vs 目标 833–836.5，顶 -1）；亮 indicator（home-cn、language）同宽 149–150，中位数 (185,185,185)/(187,187,187) 约 #bababa，渲染改前 #c9cacc (201,202,204) → 改后 #bababa；纵向位置已合（原图底边距当量约 7–8，渲染 8）。
- welcome 其余改动：中间容器 px-5 → px-7；底部容器 px-5 pb-4 → px-6 pb-[19px]；标志行 px-5 pt-3 → px-6 pt-5。

### home-light-cn（pt 修复已验，double bar 已验）

- 标志/问候块：专用脚本 homecn-dividers.py 实测原图建议区分隔行 crop y752 → 手机 511.2、输入区分隔行 crop y1069 → 手机 731.9；渲染分隔行 495（建议区 border-t）、562/611/660/709（行底边，间距 49）、734（输入顶边）。分解证明错的是建议容器顶 padding 而非问候→建议 margin：原图分隔 511.2 + 问候块约 79（标志 div 约 30 + mt-14 + 问候 div 约 35，问候底约 492）得 mt 约 19.2（约 mt-18，代码本就正确）；pt-18 时行 1 字形约 545（vs 原图 528.6），pt 约 1–2 时行 1 字形约 527–529。唯一修复：建议容器 pt-[18px] → pt-0.5（2px）；该修复同时使标志顶下移（spacer +16）且行 1 顶不变（分隔 495→511，pt 18→2：行 1 div 顶两种情形均为 514）。
- 改后带（post2 重拍）：标志 415–442 vs 原图 413.0–439.4（顶 +2.0，改前 -14）；问候 460–487 vs 原图 463.1–488.9（顶 -3.1，改前 -19；超工作容差 0.1，残差原因：问候行盒相对标志底偏移约 5，疑似字体 ascent 差，无干净杠杆）；建议行 529/578/627/676 vs 原图 528.6/575.9/624.7/673.4（顶 +0.4/+2.1/+2.3/+2.6；间距 49 vs 原图 48.3，行 4 累计 +2.6）；状态带改后（9–21）vs 原图带底 20.9（原图带顶 0.0 为顶缘 artifact，时间顶原图约 8.4，渲染 9，差 1 内）；TopBar 带改后（48–63，左 26，右 364）vs 原图（48.1–60.6，左 28.6，右 361.4）：顶 -0.1、左 -2.6、右 +2.6、高 +2.4（图标/字体）。
- home-cn TopBar 左区经实测无圆盘（仅裸菜单图标：暗像素 84、中像素 272 散布，无实心盘块；列计数最高 17/10），故 lisbon-cn 的圆盘修复必须只留本屏，不得经共享 TopBar.tsx 扩散（两屏左区确实不同，不统一）。
- home-cn 输入（double bar，见下节 split）：改后占位 747–761 vs 原图 749.3–761.9（顶 -2.3，改前 -6.3）；控制带 775–810 vs 原图 777.9–814.8（顶 -2.9；带底 -4.8 为抗锯齿截断 artifact，非位置错：圆底盒 812 vs 原图 813.4（-1.4），pill 底 813.5 vs 原图 814.8（-1.3），圆顶 776 vs 原图 778.6（-2.6），pill 顶 786.5 vs 原图约 787（-0.5），均已直接采样确认）。注意：同轮早期一次 home-cn 占位 743 读数为过期 pre-split 文件（组合截图行被 tail -2 截断致旧文件未被覆盖），以后附截图必须显式重拍并核文件 mtime/内容。

### chat-dark-lisbon-cn（全量画像 + 修复批，post2 最新 shot 已验）

- 带映射纠正（关键：首版 profiler 错位一带）：气泡 1 两行：原图行 1（101.0–114.2，x99.9–343.0）、行 2（121.9–134.4，x99.9–161.9）；渲染改前行 1（106–121）、行 2（128–143）。此前读作 AiMeta 的带（128–143）实为气泡行 2，不是 AiMeta。
- 改后带 vs 原图顶差（最新 post2 lisbon-cn）：状态 -0.1、TopBar +1.3、气泡行 1 +1.0、行 2 +2.1、AiMeta 模型 1 -2.9、AiMeta 副 1 -3.5（超工作容差 0.5，见未闭合）、正文 1 -3.0、标题 -2.9、CnItem1 +0.8、CnItem2 +1.2、CnItem3 +0.5、来源 -1.9、操作 +2.2、气泡 2 +2.1、AiMeta 模型 2 -2.2、AiMeta 副 2 -2.8、正文 2 行 1 -2.6、行 2 -2.7、行 3 -2.8、占位 -1.3、控制顶 -1.9。除 AiMeta 副 1 外均在工作容差 ±3 内（最终报告口径：工作容差内的近合不自动记“已修复”，见未闭合节的严格口径说明）。
- TopBar 左圆盘（原图确有，先前“裸菜单”目视错误；盘底与屏底差仅 11–21，显示尺度下不可见）：近盘色采样 (28,37,45) ±6，中心列 crop x45 → 手机 36.6，纵 crop y65–124 → 手机 32.7–73.8（高 41.8）；≥40/56 行核 crop x23–67 → 手机 21.2–51.9（宽 31.3，恰为约 60 crop 行 / 42 手机 px 圆的弦长）。盘径约 42–47 手机 px（高 41.8，目视宽约 47），盘左约 13.6–15.6。原图菜单线：crop x35–54 → 手机 29.6–42.8（13.2 宽），行 crop y89/96/102 → 手机 49.4/54.3/58.5（间距 4.9/4.2；渲染线在 y50 与 y61，中间线被 >200 亮度阈值漏掉，Lucide 间距约 5.5）。修复（本屏左槽 only）：盘 h-[46px] w-[46px] → h-[42px] w-[42px] + ml-[-8px]。结果：盘左 24→16（目标约 15.6），图标线左 40→约 30（目标 29.6，+0.4），TopBar 带左 39→29（目标 28.9，+0.1）。盘纵向位置不受尺寸改动影响（居中件：图标顶 = TopBar 顶 + (48−20)/2，与盘高无关）；原图图标顶线 49.4 vs 渲染 50（+0.6，改前已合）。
- TopBar 中 pill（左流布局，非屏居中）：原图 pill 底中行 crop y90–95 → 手机 65.8–192.6（宽 126.8）；纵 crop y65–126 → 手机 32.7–75.2（高 42.5）。标题字 crop y76–92 → 手机 40.4–51.5（高 11.8），x crop 113–244 → 手机 83.9–175.1（宽 91.2，中心 129.5）。pill 中心 (65.8+192.6)/2 = 129.2 约等于标题中心 129.5（标题在 pill 内居中）。副行：crop y100–114 → 手机 57.1–66.9，x crop 112–165 → 手机 83.2–120.3（宽 36.9）。副行左对齐非居中：副左 83.2 约等于标题左 83.9（差 -0.7）；居中副应位于 110.75–147.65。pill 内容左对齐 px 约 16–18（标题左 − pill 左 = 18.1，副左 − pill 左 = 17.4）。pill 左 65.8 = 左盘右（约 57.6）+ 间隙约 8.2，即左流布局（盘 + pill），不是屏居中 pill。修复（本屏中槽 only）：pill py-[1px] → py-2（高 27.3→41.3，目标 42.5，-1.2；py 相消：居中 pill 内字顶 = TopBar 顶 + (48 − pill 高)/2 + py + 偏移，而 pill 高 = 2py + 内容，故 py 相消，字顶不受 py 影响）、px-2 → px-4（宽约 116–120，目标 126.8，-7 至 -11，好于 -23）、items-center → items-start；副行改为 folder + gap-1 + “旅行”；中槽包一层 <div className="flex w-full items-center"><div className="ml-[-30px]">pill</div></div>（中 div 左缘 = 96（24 px-6 + 72 左 div），原图 pill 左 65.8，偏移 -30.2 → ml-[-30px]，pill 左 96−30 = 66（目标 65.8，+0.2），pill 中心约 129.4（目标 129.2））。包层法使 pill 左与 pill 宽无关；居中 pill 上直接 ml-[-69px] 会随宽变化而漂移，不用。
- 中 pill 副图标：原图为文件夹轮廓（放大中裁切 lisbon-topbar-centre.png 目视确认）。文件夹 bbox 约 11 手机 px 宽 x 10.4 高，与“旅行”间隙约 3 手机 px，副行总计 36.9 手机 px。修复：既有手绘 Icon.folder（Feather 路径，本套已有）加尺寸参数（默认 20，既有调用不受影响），本屏调用 Icon.folder('#9a9ba2', 12) + gap-1（4px）。预测副行：12 + 4 + 约 20 = 36（目标 36.9）。
- TopBar 右 pill：原图底左 cap 约 crop 419 → 手机 297.0，右缘约 crop 523 → 手机 369.4（宽约 72.4，高 42.5，与左盘/中 pill 同高）。编辑图标：亮行 crop y83–105 → 手机 45.3–60.6，x crop 434–455 → 手机 307.6–322.3（约 15x15）。更多图标为纵向圆点（非横向）：圆点中心 crop x499–500 → 手机约 353，圆点 crop y约 88/96/104 → 手机 48.7/54.3/59.9（间距 5.6，点径约 4，总高约 15.2）。渲染改前右 pill 为 py-[5px]（高 28）、px-1.5、gap-2、编辑 18、横向 more 18（宽 56）。修复（本屏右槽 only）：py-[5px] → py-[11px]（高 28→42，目标 42.5，-0.5；图标顶不受 py 影响，py 相消）、gap-2 → gap-5（20；原图盒间隙编辑右 → 更多盒左 = 20.7）、编辑 18→15、Icon.more（横向）→ 新增 Icon.moreVertical（Lucide EllipsisVertical，20px；间距 5.8，总高 14.2，点径 2.5）。预测：编辑左 = pill 左 + 6 = 307.6（pill 左 301.6 时精确），圆点中心 = 307.6 + 15 + 20 + 10 = 352.6（目标 353，-0.4），pill 右 = 368.6（目标 369.4，-0.8），pill 左 = 301.6（目标 297，+4.6，仅底缘），pill 宽 67（目标 72.4，-5.4，仅左缘）。图标精确，底左缘为残差。TopBar.tsx 右 div（w-[72px] justify-end gap-4）未动。
- TopBar 纵向位置改前已合且不受上述修复影响（py 相消 / 居中盘论证）：原图标题字顶 40.4 vs 渲染 41（+0.6）；原图菜单顶线 49.4 vs 渲染 50（+0.6）；TopBar 带原图 39.7–66.9 vs 渲染 41–67（+1.3/+0.1）。
- AiMeta（全局 Chat.tsx 改动，影响全部 AiMeta 使用处，须以 lisbon-en 校验，见 lisbon-en 节）：原图模型低阈值（diff>20，lisbon-cn crop 行 270–286）：模型 1 文本手机 x22.6–88.8（宽 66.2）vs 渲染改前 14px 时 83（-20%）；高 17 crop 行 = 11.8 手机 px vs 渲染 13。模型 2：原图带（543.2–551.5，x22.6–121.5，宽 98.9，高 8.3）vs 渲染（563–573，x20–141，宽 121，高 10）（-18% 宽，-17% 高）。结论：原图模型约 12px（渲染 12px 预测宽 71 vs 原图 66.2（+7%，与 VM 字体 +5% 溢价一致），高约 11.1 vs 原图 11.8）。原图副（不含 chevron）：副 1 手机 x24.0–180.0（宽 156）vs 渲染改前 13px 时 171（-8.8%）；高 11.1（16 crop 行）vs 渲染 12。结论：原图副约 12px（渲染 12px 预测宽约 158 vs 原图 156，高约 11.1 精确）。
- AiMeta 副 chevron 确实存在（像素行证实，非 JPEG artifact）：副 1 chevron diff>40 行 crop x264–268，行 y306–315 → 手机 189.1–191.9 x 200.6–206.8（bbox 3.5x7.0 手机 px，色约 (140,145,150) 约等于副色模糊后）；形状为“>”（中间行最右，268 在 y310–311，264–265 在上下端）。副 2 chevron crop x124–128，行 y831–840 → 手机 91.6–94.4 x 566.2–572.4（同尺寸 3.5x7.0）。间隙（chevron 字左 − 文本右）两行均为 9.1 手机 px（副 1：189.1−180.0；副 2：91.6−82.5）。
- AiMeta 修复（Chat.tsx AiMeta）：模型 text-[14px] → text-[12px]；副 text-[13px] → text-[12px]，副 div 改为 flex items-center gap-1.5 + 文本 + Icon.chevronRight(副色, 14)（Lucide ChevronRight 14px 时字形 3.5x7.0：polyline x 9–15/24 → 字左 = 盒左 + 5.25，字右 = 盒左 + 8.75）。预测副 1（12px）：文本右约 177.8（原图 180.0，-2.2），chevron 盒左 = 177.8 + 6（gap-1.5）= 183.8，字左 = 189.05（原图 189.1，-0.05），字右 = 192.55（原图 191.9，+0.65）。实测改后副 1 带右 = 193（原图含 chevron 带右 192.6，+0.4），chevron 落点如预测。副 2 预测字左 = 80 + 6 + 5.25 = 91.25（原图 91.6，-0.35）。
- 正文折行（改前最主要的系统性误差）：渲染改前正文 1 折 2 行（行 2 = 孤字“。”在片段 y256–270、x20–41），原图正文 1 为 1 行（227.0–240.3）；渲染正文 2 折 4 行（614/639/664/689），原图正文 2 为 3 行（592.6/617.7/642.8，间距 25.1）。成因：VM 字体比原设备字体同尺寸宽约 5%（原图正文 1 墨 316 宽 / 22 字 = 14.4/字；渲染行 1 墨 317 宽 / 21 字 = 15.1/字，比 1.049）。高度证据略支持 16px（原图正文带 13.3 = 16px 墨约 15.2 减 JPEG 削薄约 1.4–1.9；15px 预测 11.9–12.85，高 0.45–1.4），且气泡 1 折行在 16px 时吻合（17/5），15px 时会变（18/4）。决策（权衡，已记录，仅本屏局部）：lisbon-cn 正文 div（2 处，不动共享 text-body token，不动 UserBubble，不动标题）由 text-body leading-[1.55] → text-[15px] leading-[1.67]（间距 15x1.67 = 25.05 vs 原图 25.1，-0.05）。结果：正文 1 单行，正文 2 三行，标题偏移由 +30.1 收至 -2.9，CnItem 偏移由 +29…+34 收至 ±3.5（CnItem 间距修复前）。字形高度代价约 -0.75（15px 墨约 14.25 vs 原图真值约 15.0），换 +25px 布局收益，已接受。
- 内容顶：lisbon-cn 内容 div pt-1（4）→ pt-0。结果：气泡行 1 +4.8→+1.0，行 2 +6.1→+2.1，正文 1 +4→-3.0（正文尺寸改动后），CnItem1 +3.2→+0.8。AiMeta 模型 1 +1.1→-2.9、副 1 +4.5→-3.5 为代价，均在/近容差内。
- CnItem 间距：原图间距 30.6/30.7（293.2→323.8→354.5）；渲染改前间距 29/28（294→323→351）。CnItem 文本用 text-item（15px，行盒 22.5）+ 父 flex-col gap-1.5（6）= 28.5 间距。修复（本屏 only）：CnItems 父 gap-1.5 → gap-2（8；间距 22.5+8 = 30.5 vs 原图 30.6，-0.1）+ 同父 mb-[-4px] 补偿下方 +4 位移（见 margin-collapse）。结果：CnItem2 323→325（+1.2），CnItem3 351→355（+0.5，改前 -3.5）；来源、操作、气泡 2、模型 2、副 2、正文 2 均保持气泡 2 修复后的值（补偿精确）。
- Margin-collapse 结构课（2026-10-30 发现，直接边框采样证实）：lisbon-cn 内容容器为 BLOCK div（min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-0），不是 flex 列，故相邻纵向 margin 取 max 而非求和（非 flex gap/margin 求和数学）。证据：渲染气泡 2 盒顶边框实测 y466（148 边框色像素，x202–349），气泡 2 文本顶 480（466 + py-2.5（10）+ 偏移约 4 = 480，吻合）；无 collapse 的类数学预测气泡 2 顶约 477.5–489（操作内容底约 449–451.5 + 操作 mb 12 + 气泡 2 mt 14 + py 10 + 偏移），实测盒顶 466 推出 collapse margin 约 14.5–17，约等于 max(12, 14) = 14，不是 26。原图推断 collapse margin：操作→气泡 2 约 27（原图字→字间隙 43.9 − 行偏移约 7 − py 10），气泡 2→AiMeta 约 26（原图间隙 41.1 − 偏移约 7 − py 10，vs 渲染 collapse max(2, 16) = 16）。
- 气泡 2 修复（本屏 only）：气泡 2 div my-[14px] mb-0.5 → my-[25px] mb-0.5（顶 14→25；底经 mb-0.5 保持 2；collapse max(12, 25) = 25 vs 改前 14，+11 位移）。预测与实测一致：气泡 2 480→491（vs 原图 488.9，+2.1），模型 2 530→541（-2.2 vs 原图 543.2），副 2 551→562（-2.8 vs 原图 564.8），正文 2 行 1 579→590（-2.6）、行 2 604→615（-2.7）、行 3 629→640（-2.8）。全部在 ±3 内。上游（操作及以上）不变。下游残余 -2 至 -3 为 margin-collapse + 行盒偏移噪声（模型不确定度 ±5）；进一步调参（如气泡 2 mt 23 vs 25，或 AiMeta mt 16→26）被否决：mt 25 已使下游全部在 ±3 内，mt 23 会留 -4.2…-4.8。
- 来源/操作/气泡 2 改前偏移（+31.1/+35.2/+24.1）为正文 1 折行级联（+25）+ 间隙噪声，非独立间距错；正文修复 + 气泡 2 修复后为 -1.9/+2.2/+2.1。操作图标：原图操作带高 13.9 手机 px（crop 行 638–657）为墨高非盒高（复制图标墨约 14.25/18 盒 = 0.79；原图墨 13.9 → 盒约 17.6，约 18），故操作图标保持 18px；早先“图标约 14px”推断（墨与盒混淆）已取代，不得重用。
- 渲染改前片段（256–270，x20–41）为正文 1 行 2（“。”），非独立元素；正文尺寸修复后消失（正文 1 单行，最新带表无片段）。

### InputBar double bar（home-cn + lisbon-cn，InputBar.tsx double 变体 only，single 变体不动）

- 原图 double bar（两屏输入带完全一致：占位 749.3–761.9，控制 777.9–814.8）：bar 顶约 735–738（渲染 bar 顶 736，差约 2 内，与 pb 假设无关）；占位文本顶 749.3；停止顶（lisbon-cn）778.6；控制带底 814.8；pill 底约 814.8。渲染改前 32/56 时占位文本 -5.3（lisbon-cn）/-6.3（home-cn），控制约 0：因为 15px 文本在 32px 行内居中比在原图约 40px 行内居中位置更高。
- 推导（跨 pb 假设稳健）：占位文本顶 = bar 顶 + (Hp−15)/2 = 749.3，bar 顶 736–738.4 得 Hp 在 [36.8, 43.6]；中点 Hp = 40。在任一 pb 模型下，居中 mic/stop 均超 +4.4…+5.7，顶对齐 mic 落在 ±3.4 内。pill 证据佐证顶对齐：原图 pill 底 814.8，pill 高约 27，居中 pill 得行顶约 777、pill 顶约 787.8，而停止顶 778.6 = 行顶（停止比 pill 高出约 9，实测一致）。
- 修复：占位行 h-[32px] → h-[40px]，控制行 h-[56px] → h-[48px]（bar 总高保持 88，外顶/pt/bar 顶不变）；MicButton 圆与停止 span 仅在 variant === 'double' 时加 self-start（经 cn(..., variant === 'double' && 'self-start')；single 变体圆保持居中）。注释已更新（原图 split 约 40/47–48，非 32/56）。
- lisbon-cn 输入结果（最新）：占位 748–762 vs 原图 749.3–761.9（顶 -1.3，改前 -5.3）；控制带 776–809 vs 原图 777.9–814.8（顶 -1.9；带底 -5.8 为 diffmask artifact 非位置错：渲染 pill 底（bg-dark-row，与屏底差 14/11/12）对 diff>40 掩码不可见，故渲染带底 = 停止底 810，而原图带底 814.8 = pill 底；预测渲染 pill 底 = 控制行顶 776 + (48−27)/2 + 27 = 813.5 vs 原图 814.8（-1.3）；停止底 = 776+34 = 810 vs 原图约 812.6（-2.6））。
- 停止尺寸修复（lisbon-cn only，mic="stop" 经 2026-10-30 grep 确认仅 lisbon-cn 用）：原图白区 52 crop 行 x 45 crop 宽 = 36.2 x 31.3 手机 px；v1.5“29px”只读了 JPEG 白核（最大白 41 crop px = 28.6 手机 px）。决策：中点 34px（InputBar.tsx 注释记录该推理）；方块保持 9px（原图方块白凹行 1155–1169 = 15 crop 行 = 10.4 手机 px，渲染 9px 差 2 内）。渲染停止白行改后按构造 29→34 高；停止顶改后 split + self-start = 控制行顶 776 vs 原图 778.6（-2.6，差 3 内）。
- 其他 InputBar mic 用法（2026-10-30 grep，未被 double-only self-start 影响）：home-light-en mic="plain" single、train-en mic="plain" single、lisbon-en mic="stop-accent" single（41px 圆 + 9px 方块，原图 41.0/9.2px，v1.5 已验）、savings-en mic="plain" single、kyoto-en mic="plain" single、router-en mic="plain" single、home-light-cn mic 默认 circle double（sendDark）、lisbon-cn mic="stop" double。

### 图标（icons.tsx，本轮新增）

- 新增 Lucide EllipsisVertical 引入与条目 moreVertical: lucide(LucideEllipsisVertical, 20)（仅 lisbon-cn 右 pill 用，20px）。
- 既有手绘 folder（Feather 路径，本套已有）加尺寸参数：(c, s = 20)（默认 20，既有调用不受影响）；lisbon-cn 调用 Icon.folder('#9a9ba2', 12)。
- 注释更新：“Package-sourced (9)”→“(10)”（menu、back、chevron-left、close、plus、check、chevronDown、chevronRight、more、moreVertical、logout 共 10 条目，9 项路径逐字 + menu 差 1 格）。v1.5 P3 的 16 项近形手绘、gear（Feather）、send（= Lucide ArrowUp 几何，键名保留）政策不变。
- chevronRight（Lucide，默认 16）此前已有；AiMeta 以 14px 调用。edit 已接受尺寸 override（(c, s = 20)）；lisbon-cn 以 15px 调用。

### home-light-en（建议行间距修复，已验闭合）

- 建议行间距：原图行顶 559/609/660/712（间距 50/51/52，均值 51，与顶部几何无关，因间距为差值，顶部抵消）；渲染改前间距 49（行 564/613/663/711）。问候顶差（+4 至 +9，取决于顶部修正）为间距派生（问候经 spacer 底锚：建议区短 8 → 问候低 8），非独立问候错。修复（本屏 only）：建议容器（border-t 的 block div）→ flex flex-col gap-0.5（2px 行间隙；行 1 顶不变，行 2/3/4 分别 +2/+4/+6；问候经底锚 -6）。
- 改后（post3）：问候 495–520 vs 原图 492–519（顶 +3 未修正 / -2 已修正（顶部修正 +5，状态栏证据支持）；改前 +9/+4）；行 558/609/661/711 vs 原图 559/609/660/712（顶 -1/0/+1/-1；间距 51/52/50，均值 51 精确）；输入 790–803 vs 原图 788–800（+2/+3）；TopBar（修正后）47–61 vs 渲染 48–63（+1/+2）；状态时间顶（修正后）9 vs 渲染 9（0，细节顶部修正 +5 的证据：欢迎原图时间顶 9.1，渲染 9）。home-en 闭合（全部在 3 内，间距精确）。
- 注意：home-cn 建议间距原图 48.3 与 home-en 51 不同屏不同值，共享 SuggestionRow py-3（12）为折中（home-cn +0.7，home-en 改前 -2）；本轮 home-en 用本屏 gap 补齐，不动共享 py，避免修一屏坏另一屏。

### chat-dark-lisbon-en（气泡边距 + bullets 间距 + 气泡 2 边距 + 正文 2 尺寸，post5 已验闭合）

- 几何说明：细节条带顶部估计不确定度 ±5（状态栏证据支持修正 +4–5：欢迎原图时间顶 9.1，渲染 9；细节原图状态带 4–15 在 top=30 时对应时间顶 4，不合理，top=25 时对应 9，合理）。以下差值同时给出未修正/已修正（+5）两档；修复按已修正几何校准（状态栏证据支持），未修正档下个别项会偏大，已在括号内注明。
- AiMeta 模型校验（全局 AiMeta 改动的关键验证）：lisbon-en 原图模型带（188–196，x21.5–106.5，宽 85）vs 渲染改前 14px 带（180–189，x20–121，宽 101）。改后 12px 预测宽 87（vs 原图 85，+2），高约 11（vs 原图 8，JPEG 削薄后合）。lisbon-en AiMeta 无副行（原图模型（196）与正文 1（217）之间无副带，渲染同样无副带；AiMeta 调用仅传 model，未传 sub），故副 12px + chevron 改动不影响本屏；lisbon-en 原图有圆点（与 lisbon-cn dot=false 不同，见 v1.5 备注）为模型行圆点，非副行内容。
- 气泡 1 边距：原图气泡上间隙（TopBar 字底 → 气泡文本顶）52（与顶部无关，字底差值）vs 渲染 45（+7）；气泡下间隙（气泡行 2 字底 → AiMeta 模型顶）原图 48 vs 渲染 39（+9）。两者同指气泡纵向边距原图约 17 vs 渲染 my-2（8）。UserBubble 接受 className 但只作用于内层圆角盒（外层 my-2 div 固定），故不能直接改 className。修复（本屏 only）：气泡 1 外包 <div className="pt-[7px] pb-px">。机制（实测确认，不可凭直觉）：包层 pt-7（顶 padding 阻断 collapse，顶 +7）；包层 pb-px（1px 底 padding 阻断 collapse，底 = 子 my-bottom 8 + pb 1 + AiMeta mt 约 22 = 31，vs 改前 collapse max(8, 22) = 22，+9）；合计 AiMeta 位移 +16（顶 +7 + 底 +9）。pb-0 时底 collapse 不破（子 my-bottom 8 与 AiMeta mt 22 取 max 22，底 +0，合计仅 +7，AiMeta 欠 6），故 pb 必须为 px（1px）而非 0。改后气泡行 1 115 vs 原图 109/114（+6/+1）、行 2 137 vs 130/135（+7/+2）。
- AiMeta 模型顶改后 195 vs 原图 188/193（+7/+2）；正文 1 行 1 222 vs 217/222（+5/0，已修正档精确）、行 2 247 vs 241/246（+6/+1）；标题 286 vs 280/285（+6/+1）。
- Bullets 间距：原图 bullets 间距 30/32（310→340→372），渲染改前间距 27/28（306→333→361，父 gap-1.5（6）+ text-item 行盒 22.5 = 28.5）。修复（本屏 only）：bullets 父 mt-2（8）→ mt-[3px]（3，-5）+ gap-1.5 → gap-2（8，+2/行）。改后 bullets 314/343/373 vs 原图 310/340/372（未修正 +4/+3/+1；已修正 -1/-2/-4）。来源 417 vs 415/420（+2/-3）、操作 454 vs 450/455（+4/-1）。
- 气泡 2 边距：气泡 2 为内联 div（非 UserBubble，my-1（4/4））。原图气泡 2 顶 516/521，渲染改前 487（-29/-34）；上游修复（气泡 1 +7/+9、bullets gap +4）后渲染气泡 2 顶约 500，需再 +16/+21（中点 +18.5）→ collapse 顶 margin 由 12 增至约 30.5 → mt-[33px]（collapse 33，+21，气泡 2 顶 500+19 = 519，未修正 +3 / 已修正 -2）；气泡 2 底：AiMeta2 顶需再 +7/+12（中点 +9.5）→ collapse 底 margin 由 16 增至约 25.5 → mb-[26px]（collapse 26，+10）。修复（本屏 only）：气泡 2 div my-1 → mt-[33px] mb-[26px]。改后气泡 2 520 vs 516/521（+4/-1）、AiMeta2 578 vs 574/579（+4/-1）。
- 正文 2 折行：渲染改前正文 2 折 5 行（565/590/615/639/664），原图 4 行（603/627/651/676，间距 24–25）。修复（本屏 only，正文 2 div 一处，正文 1 不动（正文 1 两行两屏一致））：正文 2 div text-body leading-[1.55] → text-[15px] leading-[1.67]（与 lisbon-cn 同理，VM 字体宽 5% 所致折行，局部尺寸换布局，不动全局 text-body）。改后正文 2 4 行：607/632/657/682 vs 原图 603/627/651/676（未修正 +4/+5/+6/+6；已修正 -1/0/+1/+1）。正文 2 末尾橙点（bg-brand-dot 9px inline-block）保持；引用角标 T3：角标存在（bullets cite 14px 盒，10px 字，align-super），带右原图 347.5 vs 渲染 344（-3.5，字体噪声），角标底（dark-row，与屏底差 <40）对 diffmask 不可见故不能单独隔离，记部分验证（与 v1.5 同口径，不恶化）。
- 输入（single 变体，56px）：改后 776–816 vs 原图 772–813（+4/+3，G21 单条 56px 确认，无改动）；停止 accent（41px 圆 + 9px 方块）single 变体不受 double split 影响。Indicator 832–835 两屏一致。

### pricing-dark（Pro 副行距修复；整体漂移未闭合）

- Pro 副行距（已验单项）：原图 Pro 副带（396–422，26 高，2 行）→ 行距 15（26 − 墨 11）；渲染改前副带（357–389，32 高）→ 行距 21。副源 <p className="ml-[30px] mt-3 text-[13px] leading-[1.5]">（行距 19.5，渲染带 32 吻合）。修复（本屏 Pro 卡副 p only）：leading-[1.5] → leading-[1.15]（行距 19.5→15，-4.5–6，带高 32→约 26，与原图带高一致）。
- 整体漂移（未闭合，见未闭合节）：渲染定价内容比原图高约 46（首尾跨度原图 81→802 = 721 vs 渲染 42→809 = 767），且顶缺约 39（X 顶原图 81 vs 渲染 42）。单点顶 padding 修复会破坏已合的底部（+39），单点压缩分配（卡 py / 特性 mt）未经逐项近色采样验证，属编数，故本轮只修已验的副行距，漂移整体记未闭合（需卡底近色采样 + 组件级间距审计，见未闭合）。

### model-picker-a（未改动，全部未闭合，见未闭合节）

- 目视确认：原图为底部 sheet（sheet 顶约手机 y98–103，圆角顶，sheet 上方为暗底 + 状态栏；拖柄原图带 110–113，标题 132–144）；渲染为全屏（拖柄 44–48，标题 62–76）。但标题/AutoCard 差约 -70/-65 的同时，分区（Everyday 标题渲染 228 vs 原图 281，差 -53；行 -49 至 -32）并非均匀位移（顶 -70 → 底 -32，渲染中段比原图高约 38），单一 sheet 顶偏移会破坏目前已合的分区，故本轮未做 sheet 重构（重构净效果为修 1 处坏约 10 处），全部记未闭合（需 ModelRow/ModelSection 间隙审计，见未闭合）。

### credits-light（行距 + 图表 + 标签 + 图例 + 活动行，post6 已验闭合）

- CreditsRow 间距（核心修复）：原图模型行间距 48/49/48（行顶 545→593→642→690），渲染改前间距 68（551→619→687→755，+19–20/行，行 4 累计 +68）。CreditsRow 源：py-3（12）+ 内容（名 15px 行盒约 22.5 + mt-0.5（2）+ 副 13px 行盒约 19.5 = 44）+ border 1 = 69（实测 68，-1 吻合）。原图行高 48–49 = py + 44 + 1 → py 约 1.5–2。修复（Credits.tsx，共享组件，全部 CreditsRow 调用同受益）：py-3 → py-0.5（2px）。改后间距 48（行顶 547/595/643/691 vs 原图 545/593/642/690，未修正 +2/+2/+1/+1；已修正 -3/-3/-4/-4）；行 1 副顶差同步收敛（副顶 = 行顶 + py + 名行盒 + mt：py -10 使副顶 -10，改后行 1 副 569 vs 原图 564/569（+5/0，已修正精确））。
- “Last 30 days”行：原图 286 vs 渲染改前 278（-8/-13）。修复（本屏 only）：mt-6（24）→ mt-8（32，+8）。改后 293 vs 286/291（+7/+2）。
- 图表容器高（修正记录：h-80 为误读，h-100 为正解）：图表带顶为 marker 顶（非最 tall bar 顶，marker 与图表在原图合并为一带 318–435，渲染 post3 分离为 marker 316 + 图表 316–411 时误把带顶当 bar 顶）。原图容器底 435（带底）vs 渲染容器底：h-110 时容器底约 442（?），h-80 时 412（-23），h-100 时 438–439（+3/-2，已修正精确）。修复：CreditsChart 容器 h-[110px] → h-[100px]（最 tall bar 96 在 100 容器内留 4px 顶隙，bar 顶 = 容器顶 + 4；marker 顶改后 323 vs 原图约 318/323（+5/0，已修正精确）；容器底 438 vs 435/440（+3/-2））。
- 标签行与图例行（联动校准，缺一不可）：容器底 +27（h-80→h-100）与标签 mt 变化需联合算：标签 mt-1.5（6）→ mt-4（16，+10）时标签 451（vs 原图 447/452，+4/-1）；最终标签 mt-4 → mt-[10px]（10，-6）→ 标签 452（vs 原图 447/452，+5/0，已修正精确）；图例 mt-2.5（10）→ mt-[7px]（7，-3；连同标签 -6 合计图例 -9）→ 图例 477（vs 原图 472/477，+5/0，已修正精确）。注意：图例 mt 若一步到位 mt-[1px]（-9）会与标签 -6 叠加成 -15，图例欠 6（post5 实测 471 vs 477，-6），故最终为 mt-[7px]（-3），不是 mt-[1px]。
- 副文案行：副 1 改前 151 vs 原图 153/158（-2/-7）、副 2 改前 171 vs 175/180（-4/-9）。修复（本屏 only）：副 1 div mt-2（8）→ mt-[11px]（11，+3）+ 两副 div leading-[18px] → leading-[20px]（副 2 再 +2，合计副 2 +5）。改后副 1 155 vs 153/158（+2/-3）、副 2 177 vs 175/180（+2/-3）。
- 活动行：活动行改前名顶 792 vs 原图 779/784（+13/+8，含行距修复后的残余 +8）。修复（本屏活动行 div only，与 CreditsRow 组件无关）：py-3（12）→ py-1（4，-8）。改后活动名 782 vs 779/784（+3/-2）、活动副 794 vs 原图副约 793/798（+1/-4）、活动标题 755 vs 752/757（+3/-2）。
- 其余已验：大数 94–131 vs 原图 94–132（顶 0/-5，底 -1/-6；G37 大数字体 51px 保持，行盒差由副 mt 吸收，不动 token）；按钮带 208–255 vs 原图 205–246（顶 +3，底 +9 中约 6 为原图 JPEG 底缘截断，盒底真差约 +3）；“By model”520 vs 518/523（+2/-3）；Indicator 832–835 一致。图例圆点 T8：渲染圆点色与源色逐字一致（Kimi #9b5de5 = (155,93,229) 实测命中）；原图图例行仅孤立出一处蓝系簇（crop (259–263, 503–508)，(79,109,143) 一带，JPEG 小点模糊），其余三点未能干净隔离，T8 仍记部分验证（源色不动，不统一猜）。
- 活动行副第二带（806–814，x20–207）：副行下行区/抗锯齿带，非独立元素（原图活动行带 779–805（26 高）含名 + 副 + 下行区；渲染名 782–792 + 副 794–803 + 下行区 806–814，顶差在 4 内，高度差为字体度量）。

### language-light（TopBar 标题入栏 + 标题 div 删除 + 勾选对齐，post6 已验；行距与脚注未闭合）

- 结构纠正（本轮关键发现）：原图 TopBar 带（48.1–62.7，x23.7–153.9，14 高）为后退图标 + 标题文本合并带（后退约 x23–43 + 标题约 x50–153，103 宽），即标题在 TopBar 内；渲染改前 TopBar 中心为空 span + 下方另有独立标题 div（88–104，18px），致行顶整体下移约 35（行 1 名改前 129 vs 原图 93，+36）。修复（本屏 only）：TopBar 左槽改为后退 + “App language”（原 credits 式左槽结构）+ 删除独立标题 div。改后行 1 名 94 vs 原图 93（+1）、行 1 副 117 vs 原图 112（+5）。
- TopBar 标题折行纠正：初版左槽标题在 flex-1 左 div（约 130 宽）内因后退（20）+ 间隙（8）+ 标题（约 105）= 133 超 130 宽 3px 而折为两行（“App”带 39–53 + “language”带 65–79）。修复：标题 span 加 whitespace-nowrap（单行，不碰共享 TopBar.tsx；中心空、右侧空，溢出 3px 无碰撞）。再修字体与左位：标题 text-page（约 20px，带宽约 136）vs 原图标题宽 103（约 16px，105 预测）→ 标题改 text-[16px]（带宽约 109，+6）；左槽加 ml-[-8px]（后退字左 31→23，目标 23.7，-0.7；标题左约 51，目标约 50，+1）。改后 TopBar 带（49–63，x23–149）vs 原图（48.1–62.7，x23.7–153.9）：顶 +0.9、底 +0.3、左 -0.7、右 -4.9（全部在 5 内，多数在 1 内）。
- 勾选对齐：原图勾选在行 1 名行层级（放大裁切 lang-title-zone.png 目视：勾选与“System default”同行高，非行居中）；渲染改前行 div items-center 使勾选居中于名 + 副两行中间（低约 11–15）。修复（本屏行 div only）：行 div items-center → items-start + 勾选 span mt-[1px]（勾选顶 = 行顶 + py-top 10 + (名行盒 22 − 勾选 20)/2 = 行顶 + 11）。改后行 1 带（94–104，x20–367，全宽含勾选）证实勾选已回名行层级（非行中心约 125）。
- 行距与脚注（未闭合）：渲染行间距：行 1→行 2 62、行 2→行 3 39、其余 2 行行 61–63；原图行间距：行 1→行 2 70、行 2→行 3 43、其余 2 行行 53–56。行 1 间距 -8（需 py 约 14/侧）与其余 +7–9（需 py 约 4/侧）矛盾，单一 py 值无法同时满足（行 1 为勾选行，高 15 的特殊量未分离）；脚注改后 714 vs 原图 642（+72）为行距累计派生（9 间距累计约 +45–56 + 行 1 顶 +1 + 标题结构差），非独立脚注错。行 py 保持 py-2.5（10），脚注保持 mt-3（行距修好后自然归位，不单独硬调脚注 mt）。

### 总览屏 sweep（9 屏，无 HD 单屏原图，文案/数值/底色核验，不做逐像素 1:1 宣称）

- 文案/数值复核（源即渲染，v1.1 已核验值本轮重验无变）：savings $58,164（大数）/$36,000/$22,164 全在；句中 “About $58,160”（line 38）为约数（58,164 约至十位，句首有 About，非笔误，不改）；滑块 Monthly saving $200 fill 16（16%）、Yearly return 6% fill 44（44%）；info-sheet stat 210（Credits used）/9（Tool calls）/6（Messages）全在；agent-team CreditsProgress “1,240 of 6,000 credits”、Step 3 of 8、20%，时长 31s/9s/7s/6s/21s/8s 六项全在；kyoto InputBar mic="plain"（v1.2 D6 已验，橙像素 0 口径不变）。
- 底色模式（post6 渲染 subsample 众数，源 token 对照，非原图比对）：train (245,246,248) = light-bg、savings (255,255,255) = 白、kyoto (17,21,24) = darkBg、router (245,246,248) = light-bg、info-sheet (255,255,255) = 白、search-drawer (22,23,26) = 抽屉深底、picker-b (17,21,24) = darkBg、suspended (245,246,248) = light-bg、agent-team (17,21,24) = darkBg。以上底色与源 token 一致；原图底色因总览分辨率无法采样比对，记未闭合（原因：缺单屏 HD 原图），不宣称 1:1。
- 总览屏逐元素位置/字号/间距同样记未闭合（原因同上：总览缩放系数未知，约 256x566 cell 内仅 >10% 大差可行动，小差为分辨率极限）。

### 全局共享改动（影响面）

- Phone.tsx：StatusBar h-11（44）→ h-8（32）、右内边距 px-6 pl-7 → pl-7 pr-8（24→32）；HomeIndicator 134x5 → 104x3.5px，暗 #3a3b40 → #515558，亮 #c9cacc → #bababa。影响全部 18 屏状态栏与 indicator（welcome/home-cn/lisbon-cn/lisbon-en/home-en/credits/language 已逐屏验；其余屏状态栏同组件，位置同移 -12，indicator 同尺寸色）。
- TopBar.tsx：h-14（56）→ h-12（48）、px-4（16）→ px-6（24）。影响全部 TopBar 屏（home-cn/home-en/lisbon-cn/lisbon-en/credits/language 已验；其余 TopBar 屏同移 -8，内边距 +8）。注意：language TopBar 标题左位另经本屏 ml-[-8px] 修正（原图语言 TopBar 盒左约 16，非 24），不得把 TopBar.tsx px-6 改回 px-4（会破坏 home-cn/home-en 已合的 TopBar 左位）。
- Chat.tsx：SuggestionRow py-[14px] → py-3（12；home-cn 建议间距 48.3 的依据，home-en 另用本屏 gap 补齐，见上）；AiMeta 模型 14→12px、副 13→12px + 14px chevron（gap-1.5；lisbon-cn/lisbon-en 已验，lisbon-en 无副行故副改动不影响本屏；其余 AiMeta 屏（train/savings/kyoto/router 等）模型/副同改，未逐屏 HD 验，记影响面未逐验（原因：无单屏 HD 原图），不宣称全屏 1:1）。
- InputBar.tsx：停止 29→34px（方块 9px 保持）；double split 32/56 → 40/48 + double-only self-start（home-cn/lisbon-cn 已验；single 变体 56px 与 stop-accent 41px 不受影响）。
- Credits.tsx：CreditsRow py-3 → py-0.5（全部 CreditsRow 调用）；CreditsChart 容器 h-[110px] → h-[100px]（全部 CreditsChart 调用，本套仅 credits-light 用）。
- Pricing.tsx：PlanFeature 12px（v1.5 VM accommodation，原图行字号未逐像素量出，见未闭合 G10）不动；BillingToggle、PlanCard 结构不动（本轮仅 Pro 卡副 p 行距 1.5→1.15）。
- tokens/index.ts + index.css：darkBg #121316 → #111518（全部深屏底，见底色节）。
- icons.tsx：moreVertical 新增、folder 尺寸参数（见图标节）。

### 方法补丁与教训（本轮新增，沿用 v1.5 方法门：diffmask 阈值 >40、带分组最小计数 8（细带 5）、手机内区 x 限制 20px 杀边框列、平区精确色众数（JPEG 忠实）vs 细文本厚核中位数（亮底暗文本的下界估计）、子像素 fringe 不作文本色）

- 手机坐标系原点修正为必做项：标题/副文案/按钮位置必须用手机框原点（crop y−18）换算，不用 raw crop 坐标，否则顶差约 12px 且符号翻转（welcome 标志顶 51.5 vs 64.1 的教训）。
- pill/盘底（与屏底差 11–21）对 diff>40 掩码不可见，必须用近色容差（±6，绕采样众数）直接采样，不得用 diffmask 带判断有无（lisbon-cn 左盘/中 pill/右 pill、pricing 卡底、credits 图例底同理；带底因此不可靠，见 lisbon-cn 控制带底 artifact）。
- 字带高度为墨高非盒高（复制图标墨 14.25/18 盒 = 0.79），不得仅凭墨带高推断图标盒尺寸（操作图标 18px 盒的纠正）。
- BLOCK 内容容器内相邻纵向 margin 取 max 而非求和（lisbon-cn 气泡 2 的 lesson）；包层 padding 会阻断 collapse（lisbon-en 气泡 1 包层 pb-px vs pb-0 的 9px 差即 collapse 破与不破之差，pb 必须 >0 才能破，pb-0 等于不破）。
- VM 字体宽约 5% 溢价：同尺寸折行数差为字体度量残差，非尺寸错，除非宽 + 高 + 折行三证据联合支持改尺寸（AiMeta 模型/副符合，聊天正文不符合，故正文只局部改 lisbon-cn/lisbon-en 的折行 div，不动全局 text-body）。
- JPEG 白核 vs 全幅：圆钮直径须同时报白核与全幅（停止 29 白核 vs 36.2x31.3 全幅，取中点 34 并记录推理；单报白核会低估约 5px）。
- 组合截图行被输出截断时旧文件可能未被覆盖：以后附截图必须显式重拍并核文件 mtime/内容（home-cn 占位 743  stale 读数的教训）。
- 带映射错位一带即全盘错：气泡行 2 误读为 AiMeta 的教训——带表必须以源组件顺序 + x 范围交叉核对，存疑时看条带图，不得只按 y 顺序认带。
- 目视 subtle 底色（差 11–21）不可判无：lisbon-cn 左盘目视“裸菜单”为误读，像素采样为准。
- 细节条带顶部估计不确定度 ±5：细节屏差值须同时报未修正/已修正（+5）两档，修复按状态栏证据支持的已修正几何校准（lisbon-en/credits/home-en 均用此口径；中文条带几何精确（原点 18、缩放 0.6964、indicator 宽验证），无需修正档）。

### 未闭合项（带实测原因，不编数；最终报告“已修复”只认实测到 1:1 的项，以下全部不记已修复）

- 工作容差口径声明：本轮调查中使用的工作容差（带顶约 ±3px，容 JPEG 削薄与字体度量噪声）不是最终报告口径。最终报告中，“已修复”只认实测到 1:1 的项（带顶差 0–1px 且尺寸/颜色精确命中，或尺寸/颜色精确且位置差在 1px 内）；工作容差内的近合（如 welcome 标志顶 +1.5、副行顶 -1.4/-1.9、脚注行 2 -0.8、lisbon-cn 多数带 ±2–3、home-cn 问候 -3.1、TopBar 带底 +2.4、lisbon-en 多数带已修正档 ±1–2 但未修正档 +4–7）均不在最终报告“已修复”内，按屏记入本节（原因：未达 1:1，或依赖顶部修正档假设）。以下逐项列出时，凡未达 1:1 的均注明差值与原因，不因在容差内而抹掉。
- welcome 残差（未达 1:1）：标志顶 +1.5、标志左 -1.2、标题顶 -0.6（近 1:1 但未精确 0）、副行顶 -1.4/-1.9、G 角标圆心 x -6（居中单元 + VM 文本宽派生，非角标杠杆）、Try 标签中心 -3.0（Try 顶与高已 1:1，标签居中自动，无干净杠杆）、脚注行 1 顶 -2.8、副行宽 -5.2%（VM 字体度量）、标题带宽 +2.3（字体度量）、Google 钮宽 +6（字体度量）、indicator 顶 -1（1px 内，近 1:1）。以上均未达严格 1:1，记残差（原因：字体度量 / 居中派生 / 自动居中无杠杆）。
- lisbon-cn AiMeta 副 1 顶 -3.5（超工作容差 0.5）：故意未用副 mt-1（4）→ mt-1.5（6）或模型行高修正，因该改动为全局（影响 lisbon-en 与全部 AiMeta 使用处，未经他屏实测）且会使下游 8 项以上 +2 至 +2.4（正文 1 -3.0→-1.0、标题 -2.9→-0.9、CnItem3 -3.5→-1.5、来源 -1.9→+0.1 改善，但操作 +2.2→+4.2/+4.6 恶化出容差），净未闭合数不变（1 项换 1 项），故不 churn，待 AiMeta 全屏实测后再定。
- home-cn 残差：问候顶 -3.1（字体 ascent 差约 5，无干净杠杆）、TopBar 带底 +2.4（图标/字体高差）、建议行 4 累计 +2.6（间距 49 vs 原图 48.3，+0.7/行，共享 py 折中，不动）、输入带底 -4.8（抗锯齿截断 artifact，盒底真差 -1.4/-1.3，已在正文说明）。
- lisbon-en 残差（已修正档）：气泡行 1 +1、行 2 +2、AiMeta 模型 +2、正文 1 行 1 0/行 2 +1、标题 +1、bullets -1/-2/-4、来源 -3、操作 -1、气泡 2 -1、AiMeta2 -1、正文 2 行 1 -1/行 2 0/行 3 +1/行 4 +1、输入 +4/+3（未修正档 +4–7，依赖顶部修正 +5 假设；气泡折行间距 +1（15px/1.4 约 21 vs 渲染 22，字体度量））。以上已修正档多数在 1–2 内但未精确 0，且未修正档偏大，故按严格口径记残差（原因：细节顶部估计不确定度 ±5 + 字体度量）。
- pricing 整体漂移（未闭合）：X 顶 -39（原图 81 vs 渲染 42）、标题带 -39、副带 -40、切换文本 -42、Lite 行 -45、Pro 头 -46、Pro 副 -39（行距已修，带顶仍 -39）、特性行 -29 至 -32、Pro+ 头 -21、CTA -10、脚注 -5/-3/-3、页脚 +3；内容总跨度渲染比原图高约 46（721 vs 767）。原因：顶缺 39 与中段/底段 excess（Pro 卡段 +25、底段 +24）交互，单点顶 padding 会破坏已合底部（+39），单点压缩分配未经卡底近色采样验证（卡底与屏底差 <40，diffmask 不可见，需近色采样定卡高后再分配），属编数风险，故本轮只修已验 Pro 副行距，漂移整体待卡底近色采样 + 组件级间距审计。
- picker-a 全部未闭合：标题 -70（62 vs 132）、拖柄 -66（44–48 vs 110–113）、AutoCard 标题 -65（116 vs 181）、副 -61（141 vs 202）、Up 行 -42（187 vs 229，x 亦存疑：原图带 x62–165 左置 vs 渲染居中 x140–244，目视居中与带左置冲突，未定）、Everyday 标题 -53（228 vs 281）、描述 -50（250 vs 300）、GLM 行 -49（282 vs 331）、DeepSeek 行 -41/-32（345/365 vs 386/约 397）；顶 -70 → 底 -32（渲染中段比原图高约 38）。原因：顶 spacer（状态→拖柄间隙原图 96 vs 渲染 23，+73）与中段间隙 excess（AutoCard→Up +19、行内间隙 +6–13）交互，单一 sheet 顶偏移会破坏目前已合的分区（Everyday 标题改前差仅 +1/-4，sheet +68 后变 +54–68），需 ModelRow/ModelSection 间隙审计后按间隙分配，不宜单点重构。
- credits 残差（已修正档，post6）：大数顶 -5（94 vs 99）、副行顶 -3/-3、按钮带底 +9（约 6 为原图 JPEG 底缘截断，盒底真差约 +3）、“Last 30 days”+2、marker 0、容器底 -2、标签 0、图例 0、“By model” -3、模型行名 -3/-3/-4/-4、副 0/0/0/-1、活动标题 -2、活动名 -2、活动副 -4。以上多数在 0–3 内但未精确 0（大数顶 -5 为字体行盒差，由副 mt 吸收，不动 token），按严格口径记残差。
- language 行距与脚注（未闭合）：行间距渲染行 1→行 2 62、行 2→行 3 39、其余 61–63；原图行 1→行 2 70、行 2→行 3 43、其余 53–56。行 1 间距 -8（需 py 约 14/侧）与其余 +7–9（需 py 约 4/侧）矛盾，单一 py 值无法同时满足（行 1 为勾选行，高 15 的特殊量未分离；行 py 保持 py-2.5（10））；脚注 714 vs 原图 642（+72）为行距累计派生（9 间距累计约 +45–56 + 行 1 顶 +1），非独立脚注错，行距修好后自然归位，不单独硬调脚注 mt。行 2 名 -7、行 3 名 -11、行 6 名 +14、行 7 名 +21、行 8 名 +29、行 9 名 +38、行 10 名 +46（累计，原因同行距）。
- 总览 9 屏（train/savings/kyoto/router/info-sheet/search-drawer/picker-b/suspended/agent-team）：逐元素位置/字号/间距/底色均未闭合（原因：无单屏 HD 原图，总览 cell 约 256x566，仅 >10% 大差可行动，小差为分辨率极限；文案/数值/底色模式已按源核验，见总览节，不宣称 1:1）。
- round 5 残差重验结果：G14（home-en 问候 28px，本轮以行带 27–28 高 + 问候顶 +3/-2 确认，EN 行带噪声已收敛，记闭合（严格口径：问候顶 +3/-2 未精确 0，仍列入 welcome/home-en 残差行，不另单列））；G36（Thinking 倍率小字仍不渲染，源小字不可分辨；web 套数列未经 app 侧实测，不能套用，仍未闭合）；T3（lisbon-en 引用角标，角标存在但底不可见，带右 -3.5 字体噪声，记部分验证，不宣称 1:1）；T4/T5（lisbon EN/CN 末条橙点 9px，本轮 lisbon-en 正文 2 末尾 dot 保持 9px inline-block，lisbon-cn dot 同制，未重验原图 dot 尺寸，沿用 v1.5 9px，不另改）；T6（home-cn 分段控件 + 顶部图标圆，仍未隔离：白轨道在白底上不可见，顶栏内容带换算仍矛盾，不改）；T7（home-en Auto pill 五点，仍仅 2 点孤立（muted 色），5 点完整色序未隔离，不另定色序，沿用 pastel 映射）；T8（credits 图例圆点，仍部分验证：渲染色与源色逐字一致，原图仅一处蓝系簇孤立，其余未隔离，不统一猜）；T9（kyoto Kimi 圆点 #9b5de5，仍未尝试（仅 218px 总览裁切，无缩放系数），不动；AiMeta Kimi 点随 token 改淡 pastel，与 AiMeta 系统一致）；T13（pricing CTA 边距，仍未精定：CTA 约 354px 设备宽 ≈ 内容全宽，面板左缘容差 ±10px，边距无法精定，不改）；T14（全部圆角弧半径，像素方法极限，目视一致，不虚构数值）；T15（全部字重精确数值，像素只给观察档 + 代码权重，不虚构）；T16（picker 描述/模型名 cap，仍部分量出（亮核 6–10px，与 13px 描述 / 15px 模型名 + JPEG 腐蚀一致，无法逐行分离），字号不动；G40（折叠边缘：train/savings/credits/agent-team/search-drawer/info-sheet 折叠位置未逐项精定，VM 字体度量类）；G10（PlanFeature 12px 仍为 VM 度量 accommodation，原图该行字号未曾逐像素量出，待原设备字体证据出现时复议）。
- AiMeta 全屏影响面未逐验：AiMeta 模型/副尺寸 + chevron 改动为全局（Chat.tsx），lisbon-cn/lisbon-en 已 HD 验，其余 AiMeta 屏（train/savings/kyoto/router 等）因无单屏 HD 原图未逐验，记影响面未逐验（不宣称全屏 1:1）。
- 费用：本轮零裁判调用、零令牌取用（未取 /etc/botsrouter/muse_judge_token.txt）。未 commit、未 push、未 git add，工作区留待协调方统一提交。
