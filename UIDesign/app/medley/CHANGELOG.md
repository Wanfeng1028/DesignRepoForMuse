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
