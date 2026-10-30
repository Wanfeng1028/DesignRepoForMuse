# UIDesign 总版本记录

四套设计系统（web/airbuild、app/airbuild、web/medley、app/medley）的总账。
每套的详细轮次见各套自己的 CHANGELOG.md；这里只记总账、裁判与 blocker。
栈（用户已拍板，不变）：Vite + React + TS + Tailwind CSS v4 + Radix primitives，
shadcn 式源码进仓；禁 Ant Design / MUI / Next.js。

## 规则

- 干净标准：视觉裁判逐项核查后明确报告“零实质差异”才算干净；
  “看起来像”、人眼感觉、像素自测都不算干净。
- 仅剩的备案残差（可保留，不许硬凑）：底部模块条是改编（原版是右侧列）；
  iPad 第 4 张官方图 404；桌面聊天正文无高清可读文本；全部公开图浅色、
  深色未知；Medley picker-b 倍率小字不渲染。除此之外的一切差异都必须改掉。
- CHANGELOG 只追加不改写历史；旧截图不删除；每轮截图存
  docs/verification/rounds/<版本号>/。

## 裁判与令牌（2026-10-29 实测）

- 视觉裁判：qiniu/conatus-free（BotsRouter 平台）。/v1/models 经流水线密钥
  实测只返回 8 个模型；视觉探针 2/2 通过：welcome 屏白按钮答对
  "Continue with Google"，airbuild 聊天屏顶栏答对 "Hourtown"。
  其余：GLM-5.3 / glm-5.3 / glm-4.7 均 400 拒图片（content.type 仅 text）；
  spark-x2.6 自认纯文本；moonshotai/kimi-k3 与 GLM-5.3-Flash 触限；
  glm-5.3-flash 503 不可用。以上一律不许作裁判。
- 令牌机制（流水线老办法）：日本服务器 SSH 必须走代理脚本
  （ssh_via_proxy.py，出口直连会被掐）；令牌在服务器持久路径
  /etc/botsrouter/muse_pipeline_token.txt（600、root，已从 /tmp 迁出，
  /tmp 副本已删）；每次调用前 sudo cat 现取现用，只放内存，
  绝不进仓库、聊天、日志或文件。

## v1.0 — 2026-10-29 初版交付（用户裁决：不达标，需返工）

- 四套建成、build 通过、push 已核验（80d21fd、104b6d6、e3f1449）。
- 用户裁决：Medley 与 AirBuild 两套风格都差很多，“不太行”；
  上一轮“无可见差异”是肉眼看得不细造成的误判；本轮裁判一律是视觉模型。
- 返工要求：多轮迭代直到干净；每轮版本记进仓库。

## 返工轮次（2026-10-29，裁判：qiniu/conatus-free）

### web/airbuild — 未干净（裁判 verdict 待定）
- v1.0 e50e607：基线。
- v1.1 c013168：15 项量化差异全改（标题栏三栏 grid、17px 红绿灯、
  预览 tab 入标题栏、270px 手机预览、3 列项目 tile、成员行状态句与@role、
  侧栏、消息底部对齐、任务卡顺序、打字行、作曲器 grid、Toast 11px、
  blob 头像、iPad Hourtown 对话逐字、折叠态），build 通过，自测像素值吻合。
- 待定：裁判第 1 次调用 HTTP OK 但消息体为空（completion 顶满 3000 tokens
  未交出 verdict）；第 2 次调用 429 free_campaign_global_limit，按铁律停手。
  下一轮先以 window-main.png 对真实原图重跑裁判拿 verdict 再修。

### app/airbuild — 未干净（裁判部分有效，v1.6 待定）
- v1.0 d87d9a3：基线。
- v1.1+v1.2 合并提交 33dca96（v1.1 未及单独提交即被 v1.2 覆盖）：
  390 宽实测值回调（顶栏 42px、头像 32px、气泡 15px、圆角 20px 等）。
- v1.3 09435ba：文件卡字号、任务卡不再通栏、详情面板底改浅灰。
- v1.4 7801cb3：文件卡 13px、简报卡 66%、标题 14px、封面 120px。
- v1.5 826cc57：文件头像 -ml-2 半叠、任务标题 14px 单行、简报标题 13px
  两行、封面 110px、顶栏/状态栏各省 4px。
- 像素取样修复：画布 #f4f4f4、用户蓝 #0088fe、任务卡纯白、简报首卡 66%、
  文件卡右侧头像、详情面板浅灰、草稿卡全幅、作曲器 68px 瓦与 52px 发送钮。
- 裁判：chat 轮有效 8 项（顶栏圆钮、项目标、药丸尺寸、状态栏尺寸、
  作者名 13→14px、气泡内边距 16→18px、文件卡尺寸等；第 9 项起因打印截断
  3000 字丢失全文；圆角读数与头像对齐项存疑/无效）；briefing 轮无效
  （模型自称未收到图片）；detail 轮 429 free_campaign_global_limit 停手；
  home、draft 两屏未及送裁判。
- 待定 v1.6（候选）：顶栏圆钮 42→46px、项目标改抽象小镇图、药丸尺寸、
  状态栏尺寸、作者名 13→14px、气泡内边距 16→18px、文件卡加宽加高；
  另需重跑 detail / home / draft / briefing 裁判与 chat 第 9 项起全文。

### web/medley — 未干净（零轮裁判，v1.0 仅基线）
- v1.0 5cb12b5：基线（CHANGELOG、基线截图、裁判管线 scripts/judge.py
  与 shot-viewport.cjs、逐屏渲染裁切与原图裁切、通用裁判 prompt）。
- 叫停点：裁判试点 J1（Welcome）即回 HTTP 429 free_campaign_global_limit
  （凭证见 rounds/v1.0/judge/judge-j1.err），按铁律当场停手，未重试、未换模型。
- 零个组件拿到裁判 verdict；无代码改动；无 v1.1。
- 候选差异（未裁判确认，不动手）：D-01 Suspended 按钮文案——画廊 demo
  props 现为 primary "Contact support" / secondary "Sign out"，而移动版参照
  为 primary "Appeal" / secondary "Contact support"，"Sign out" 仅在
  "You can still:" 行中。
- 待办裁判队列（材料已备好，恢复后直接跑）：J1 Welcome、J2 Home EN/CN、
  J3 Lisbon/Train、J4 Savings/Kyoto、J5 Router、J6 Picker A/B、J7 Pricing、
  J8 Credits、J9 Agent team、J10 Drawer/Chat-info、J11 Suspended/Language、
  J12 Composer states。

### app/medley — 未干净（像素修复完成，裁判复验待定）
- v1.0 34f3dce：基线。
- v1.1 c313a7a：18 屏逐屏重验（无代码改动），编号差异 8 项。
- v1.2 f5ae7b2：8 项全改（welcome 圆点 #FD6718/15px、按钮 40px 与 G 角标
  16px、pricing 特性行文案、pricing 切换灰 pill #303135、home-cn 分段控件
  轨道白 + 选中灰 pill、京都 mic 去圆底、里斯本末条橙点、Fable 角标 Pro+），
  build 通过，18 张重截图。
- 裁判复验：welcome 轮裁判报 DIFFS 1-4（标志橙楔、圆点位置/尺寸、
  副文案间距亮度、按钮高 56 vs 48px），四项均被 PIL 像素逐项驳回
  （标志原图橙像素仅 1、圆点中心差 ≤3px、副文案间距双方约 29px、
  按钮高双方实测 39px）；pricing 轮调用回 HTTP 429
  free_campaign_global_limit（request_id
  chatcmpl-9bb58d2e3df347e1995330a5636ce94a），按铁律停手。
- 总协调裁决：像素驳回只是证据，不能替代裁判 verdict；按“模型报零才算
  干净”的口径，welcome 不记为干净，待额度恢复后重跑裁判。
- 待办：pricing v1.2 裁判复验 + home-cn / kyoto / lisbon / Fable 四项抽查；
  其余 14 屏本轮已逐屏核对无新增差异。
- 本轮新增残差：定价/火车/储蓄/积分/agent-team 的页脚或尾行在 VM 截图
  首屏外（滚动快照 + VM Noto 字体偏宽，非设计参数）；pricing 特性行在 VM
  下折两行（原设备字体应为单行）；M 标橙块色无法独立分辨（维持桃色）。

## Blocker（2026-10-29 返工停手原因，全四套同一原因）

- qiniu/conatus-free 回 HTTP 429 free_campaign_global_limit：
  web/medley 在 J1 试点即触限；web/airbuild 在 1 次空响应后触限；
  app/airbuild 在 detail 轮触限；app/medley 在 pricing 复验轮触限。
- 429 响应未披露重置时间。解限办法（二选一，需用户侧动作）：
  1. 等免费活动预算重置后重跑裁判（本轮全部裁判材料、截图、待办清单
     均已就位，恢复后可直接继续）；
  2. 用户在 BotsRouter 里给流水线密钥所在组（dyandcocoo）开通一个
     非免费的视觉能力模型/渠道，裁判改用该模型重跑。
- 在解限前，任何一套都不许记为干净、不许以人眼或像素自测替代裁判 verdict、
  不许悄悄换用 k3free / spark / 其他模型。

## 本轮新增准绳（2026-10-29，用户亲供高清 Medley 原图）

- 3 张唯一文件已复制进 UIDesign/docs/references/medley/（原文件在
  ~/workspace/user/media_library/image/，复制不移动）：
  - medley-15-screens-overview-hd.jpg — md5 e3c77147009c9564409522ea92684994
    （278,920 字节；与上传的另一张完全重复，去重）
  - medley-4-screens-chinese-hd.jpg — md5 eece9e866a39de38fcfe665ae82a10ad
    （223,290 字节；welcome-dark、home-light-cn、chat-dark-lisbon-cn、
    App language 四屏，全文可读）
  - medley-5-screens-hd.jpg — md5 91c4515ffd47cd3a4838350599534067
    （208,580 字节；与上传的另一张完全重复，去重；chat-dark-lisbon-en、
    home-light-en、model-picker 暗色、pricing-dark、credits-light，全文可读）
- 两套 Medley 的每轮比对一律以这 3 张为准；中文屏文字、模型价格、
  积分图表等此前“看不清”的项不再列为不可确认，必须逐项抠到 1:1。
  AirBuild 两套依据不变（App Store 高清图 + 用户照片 + rea 报告）。

## 第 3 轮（2026-10-30，裁判：deepseek-v4-flash-vision，经新裁判密钥）

- 结论：四套全部无 verdict、无代码改动、无 bump、各套 CHANGELOG 未写条目。
  本轮唯一提交内容是各套裁判工具与验证证据（见下），产品代码零改动。
  四套构建协调人逐一重验全过（pnpm build）。
- 裁判通道：新裁判密钥 id=11（muse-judge-20261030，白名单限制关），值只存
  服务器 /etc/botsrouter/muse_judge_token.txt，调用时 SSH sudo cat 现取现用、
  只放内存；本站密钥为 48 字符无前缀，带 sk- 前缀会 401。08:37 探针曾 200
  通过，但本轮实测三路失败，互不相同：
  - app/medley：唯一有效调用回 429 Cluster TPM rate limit exceeded
   （upstream_request_rejected），与上一轮免费额度限流不同；welcome v1.3
    重验等 6 屏全部 pending；Kyoto 裁切已备好（rounds/round3/orig-kyoto.jpg），
    6 张并排图已备好待送。版本 v1.3 保持。
  - web/airbuild：2 次调用无 verdict——第 1 次传输 IncompleteRead，第 2 次
    HTTP 200 但 reasoning 占满 6000 tokens（finish_reason length，content 为
    空），实耗 7788 tokens 未产出 verdict；collapsed 两屏未送判。版本 v1.1 保持。
  - app/airbuild：6 次调用无有效 verdict——3 次 200 但推理式全文无 VERDICT 行
    （约 18000 completion tokens 耗尽，prompt 长短无关）、2 次间歇性 402、
    1 次传输失败；chat/detail/home 无效，draft/briefing 未发；v1.5 保持，
    v1.6 候选一项未落地；5 张合成图与修正后裁切坐标已备好
    （judge/CROPS-v1.6.md）。上一轮 chat 的 8 项差异未获本轮复核确认。
  - web/medley：4 次调用 0 verdict——3 次 402 Insufficient balance、1 次 200 流
    截断；J1–J12 全部 pending；D-01 未动。版本 v1.1 保持。
- 402 裁决：402 不在“连续 429/401/403 三次”字面停手条件内，但属余额硬失败
  且两屏独立复现，协调人裁决按停手处理；另 app/airbuild 的 402 为间歇性
  （同屏重试可 200），更像路由到余额不足上游渠道的抖动，需核查余额与路由。
- 传输教训重申：urllib 遇 chunked 大响应多次 IncompleteRead/RemoteDisconnected；
  web/airbuild 与 app/airbuild 已改走 curl（token 不进 argv、不落文件），
  下一轮 judge 脚本优先 curl。
- 旧管线作废提醒：web/medley 旧 run-judge.sh/judge.py（conatus + pipeline
  密钥 + 自动补 sk- 前缀）、app/airbuild 旧 judge-single.py（conatus + sk-
  前缀）均已作废，下一轮不要误用。新管线：web/airbuild judge-v2.py、
  app/airbuild judge/judge-vision.py、web/medley scripts/judge-deepseek.py、
  app/medley rounds/round3/judge-runner.py。
- 本轮提交文件（仅新增验证产物 + 本总账条目；另有两处清理：web/airbuild
  两张 gallery 重出图无 verdict 故还原、web/medley J1.err 还原回上一轮 429
  证据，402 证据记在 round3-attempts.log 里不丢失）：
  - web/airbuild：docs/verification/judge-v2.py、judge-v2-main.json、
    window-main.png、window-sidebar-collapsed.png、window-preview-collapsed.png
  - app/airbuild：docs/verification/judge/（judge-vision.py、make-composites.py、
    CROPS-v1.6.md、prompts/、composites/、renders/、verdicts/、cropcheck/）
  - web/medley：scripts/judge-deepseek.py、scripts/run-judge-deepseek.sh、
    docs/verification/rounds/v1.1/judge/round3-attempts.log、verdicts/J2.err、verdicts/J2.txt
  - app/medley：docs/verification/rounds/round3/（orig-kyoto.jpg、6 张并排图、
    judge-runner.py、prompt 两份、429 证据）
- 下一轮开工前需拍板（选择题，见最终报告）：① 裁判模型/参数（reasoning 吃
  预算：换无推理模型 / 调 max_tokens / 换可分离 reasoning 字段的调用方式）；
  ② 402 路由余额核查（哪条渠道余额不足、是否充值）；③ 429 Cluster TPM 窗口
  （何时恢复）。
- 版本状态：web/airbuild v1.1 pending、app/airbuild v1.5 pending、web/medley
  v1.1 pending、app/medley v1.3 pending；无一套 clean。

## 第 4 轮（2026-10-30，裁判：nvidia/nemotron-3.5-super-vl:free，经新裁判密钥；备选 claude-sonnet-4-6、mimo-v2.6-flash）
- 裁判链：主裁 nemotron（openrouter 渠道 12，免费上游）。校准发现：低 max_tokens 下 reasoning 耗尽、content 为空算失败调用——400/500/2000 均失败过；web/medley 8000 上限才出 verdict，app/medley 4000 上限出 verdict，web/airbuild 2000 仍全 reasoning；主裁对提示词/图片形态敏感，表现不稳定，详单提示词在主裁上不可用，只能用两行 verdict-only 提示词，拿不到精确像素目标值。
- 备选实测：claude-sonnet-4-6（vyceai 渠道 17）verdict 干净、reasoning 0，但贵（web/airbuild 3 图 prompt 合计 300,059；app/medley 18 次约 72.5 万 prompt tokens）且幻觉率高（app/medley 11 次 FAIL 理由经核对无据或错位，已废弃留证，未驱动改动）；mimo-v2.6-flash 兜底 1 次成功、1 次 reasoning 耗尽。
- 禁用与路由：Novai 路由未动、只是不用；deepseek-v4-flash-vision、conatus-free、kimi-k3、Oxion 模型本轮全部禁用；旧 conatus/deepseek 管线一律未用。
- 停手口径裁决：app/medley 主裁后段 9 连 429，工人按“连续 3 次调用拿不到 verdict”执行未停手（备选链持续交付）；协调人裁决：简报允许 429 时切备选，停手条件按“整条裁判链连续 3 次拿不到 verdict”执行，本轮未触发；若上级不同意此口径，备选链交付的 verdict 可重跑。
- web/airbuild：v1.1 保持，2 PASS（main、sidebar-collapsed，claude 出具）+ 1 争议 FAIL（preview-collapsed：裁判称 bottom module bar avatar blob 实色块、布局不符；工人亲眼核对截图中无此元素，且理由命中提示词明文排除项，判误判嫌疑，未改代码、未重跑刷 verdict）。无代码改动。
- app/airbuild：v1.5 保持，2 PASS（home、detail-v2 修正版，bezel-ignore 提示词）+ 3 FAIL（chat 项目标识字母块非小镇图——上轮 8 项中唯一复核确认项；draft 封面宽高比；briefing 首卡缺页角折边）。v1.6 候选一项未落地（其余 5 项无新 verdict）。无代码改动。
- web/medley：v1.1 → v1.2（仅 D-01：suspended 按钮文案 Contact support→Appeal、Sign out→Contact support，重验 PASS；修后全页图与修前仅差 2310 像素，布局零变化）。其余 13 项 FAIL：多项已证伪（J2/J11b 裁切错位漏顶栏/首行；J4/J6 missing 项代码里全有）；J1 CONFLICT（同输入 nemotron 校准 PASS、claude FAIL、nemotron 队列 FAIL；像素实测支持一处真差异：welcome 圆点原图约 23px 鲜艳橙 ~(244,104,41) vs render token #E2A181 蜜桃色 12px，未动）。v1.2 非 clean。
- app/medley：v1.3 → v1.4（6 项像素复核证实的修复：按钮底色 token #edeef2、定价弧线 ModelDotsArc、lisbon-en 顶栏箭头/角标/输入钮 stop-accent、lisbon-cn 左钮圆圈；18 屏重截图仅 4 屏变化，其余 14 屏字节一致）。5 PASS（welcome、pricing、home-cn、lisbon-cn、kyoto）+ 2 contested（lisbon-en、picker-a：末判皆无据，修复已被后续判决越过证实）。
- 本轮提交文件（仅新增验证产物 + 两套 CHANGELOG + 本总账条目；代码改动仅 web/medley App.tsx、app/medley 7 源码文件）：
- web/airbuild：docs/verification/judge-round4.py、docs/verification/rounds/round4/（3 截图 + 3 裁判 JSON + NOTES.md）
- app/airbuild：docs/verification/judge/judge-vision-round4.py、judge/round4-work/、docs/verification/rounds/round4/（合成图、渲染图、verdict、提示词、ROUND4-NOTES.md）
- web/medley：scripts/judge-round4.py、run-judge-round4.sh、run-round4-queue.sh、docs/verification/rounds/round4/（SUMMARY.md + 全页图、裁切、verdicts、队列日志）、docs/verification/rounds/v1.2/
- app/medley：docs/verification/rounds/round4/、docs/verification/rounds/v1.4/（并排图 + 终判）
- 版本状态：web/airbuild v1.1（2 PASS + 1 争议 FAIL）、app/airbuild v1.5 pending、web/medley v1.2（非 clean）、app/medley v1.4（残留 2 contested）；无一套 clean。
- 下一轮开工前需拍板（选择题，见最终报告）：web/airbuild preview FAIL 是否按误判处理/是否重跑；app/airbuild v1.6 五项复核口径与 chat/draft/briefing 落地项；web/medley 重切重验与 composer/header/圆点/价格符号/信任规则/修复优先级；app/medley contested 交付与双行输入条/积分前缀/顶栏对齐/圆点色；下轮主裁选型（nemotron 校准口径 vs claude 为主裁 vs 等免费层恢复）。

## Round 5 — 2026-10-30（修复轮，审查清单落地）

- 依据：docs/verification/comprehensive-audit-20261030.md（总表 164 项）+ 四套分表。
  上一轮“只审不改”已被用户 2026-10-30 12:30 亲令否决；本轮交付必须是修好的
  版本 + 新截图 + 验收数。P0 由执行方按原图实测证据自行定夺（见各套
  CHANGELOG），不再列问题等用户批、不中途汇报。
- 验收口径（用户 2026-10-30 11:27 + 12:42 亲定，取代旧“裁判干净”标准）：
  字体大小/粗细、按钮纹理、色系、元素大小比例/位置，及其他界面上可见的一切，
  逐项实测对比；一项不达标不算 clean。验收只认实测数据（原图值 vs 改后值），
  裁判 verdict 只当第二意见。本轮四套零裁判调用，全部为 PIL/DOM 实测。
- web/airbuild v1.2：B10 作曲器 blur 删、B11 hover 落地、S16 手机框阴影
  0.14→0.24、P04 预览折叠图标中心 680→675；P2 17 项闭合 15 项；Lucide 1.63.0
  接包（19 在用图标全换真件、线宽 2.0、10 未用导出全删）；morphing 两档落地；
  清单外按 REA 表 A 全条扫查又落一批（tab/胶囊 hover、controlShadow 表 A 值、
  灵动岛居中 941→948 等）。截图 rounds/v1.2（25 文件）。
- app/airbuild v1.6：S1 封面比 1.65→1.00、F1 正文 +31%→+4.6%、F2 作者名
  +18%→+4.6%、S2 发送钮 50px→35px、S3 首卡圆角 24px→15px、P2 裁切全文可见、
  玻璃 .ab-glass 落地、头像按成员分形重绘、封面/卡片矢量替代（字母块清零）、
  lucide-react 1.63.0 接包 12 图标全走 Lucide、morphing 三档落地。截图
  rounds/v1.6（13 文件，含 Q8 去边框 bare 版）。
- web/medley v1.3：58 项差距 + 全屏扫全部处理。Q12 中文源橙红 #D95E27、
  accent 拆 5 个独立 token；Q13/Q19 前缀 ~ 与 Thinking 档位补齐；T1–T15 文案
  数值全改；C 系颜色全批；S1 六处 composer、S2/S3/S4 导航 chrome、S8 S/R/K、
  B1/I1–I3/M-stop、F 系字号（22/37/19/41/11px）落地并复量；清单外全屏扫又修
  一批；Lucide 1.63.0 接包逐字复核、morphing 两档接线。截图 rounds/v1.3
  （36 文件，全页 + 6 分区 + 测量证据）。
- app/medley v1.5：全部 G 项 + T1–T16 + 图标迁移。pricing 弧起点 77px→+4.5px、
  点距 19.8→25.0px、抬升偏差 ≤0.4px；停止钮 en 35→41px/方块 11→9px、
  cn 白圆 35→29px/方块 11→9px；lisbon-cn 左钮 36→46px、双 pill（100×27 /
  56px）新增、AiMeta 去圆点（en 保留）；双行输入条 88px（原图 87–91）；
  圆点淡 pastel 化 + token 拆分；前缀全改 ~；Fable 角标同行同基线；18 屏
  bare 验证图全量重截，未改动屏逐像素确认（suspended 字节一致）。
- 未闭合（带实测原因，详见各套 CHANGELOG；均未编数）：JPEG 无法分离定界类
  （web/airbuild U1–U6、app/airbuild T01–T17 部分、app/medley T1/T3/T6/T8–T12/
  T14/T15、web/medley P2 部分）；VM 无 SF 字体/无 Apple 设备（F05）；
  VM 字体偏宽类残差（折行、首屏外）；U7 B10 冲突：任务令按 REA 表 A 删了
  作曲器 blur，但基础 CSS .follow-up 原文确有 blur(16px)——维持删除，
  冲突原样记档，待更硬证据再定（平底上视觉不可分辨）。
- 本轮提交：web/airbuild v1.2、app/airbuild v1.6、web/medley v1.3、
  app/medley v1.5 各一 commit + 本总账一 commit；构建四套全部由协调方
  独立重跑通过（tsc + vite）。

## Round 6 — 2026-10-30（登录页全量重比 + 四套完美 1:1 重扫重修）

- 起因：round 5（61909ce）交付后用户当场指出“差太多”，质问“人家的
  登录首页是纯黑背景吗？”“所有的细节你对比到了吗”；后追问“整体都是
  一个颜色吗？”、再令四套全部完美 1:1。验收口径：11:27 全量实测标准 +
  12:42“界面上有的都是细节”+ 13:41 完美 1:1；只认实测数据，本轮四套
  零裁判调用。
- 登录页底色定论（两套 Medley 独立证实，一致）：原图 welcome 面板通体
  纯色 #111518（17,21,24），无渐变、无辉光、无分段。证据：web 侧空带
  155,100 像素零方差；app 侧空带 y700–940 100% 精确 + 逐 5% 行/列中位数
  全为 (17,21,24)。两处偏离均非底色变化：顶右角 (23,27,30) 为状态图标
  抗锯齿/JPEG 光晕；0.45 处 (15,18,23) 为拼图阴影条/JPEG 分块 artifact。
  改后：两套渲染底色均改为 #111518（原 #121316 是旧低分辨率样本共识，
  现被 HD 证据取代）；app 侧新图协调方抽查复核：深色面板 297,184 像素
  众数 (17,21,24)。
- app/medley v1.6：welcome 全量（状态栏 44→32px、标志/标题/副文案位置与
  颜色、Google 钮 G 角标 16→21px、Try 钮 h50 + 边框 #2d3134、脚注 #808487
  等）；lisbon-cn 左盘/中 pill 左流布局/右 pill 纵向圆点/AiMeta chevron/
  正文折行级联/margin-collapse 结构修正；credits 行距 48 精确；language
  标题入 TopBar；pricing Pro 副 leading 1.15。截图 rounds/v1.6（18 张 bare
  + measure/pre/post1–6）。
- web/medley v1.4：welcome 同上（Try 透明描边 pill、G 圆盘 20px 纯白无圈、
  圆点 #FF6521、词标 19px、副 #B0B4B6、模型行 14px #8E9295、脚注 12px/
  1.31/#84878B）；气泡 #1D242E、停止钮 #DFA282、CN 首页 Pro 素灰字、CN
  输入条双行 stacked、GLM 操作行补 "28 credits 1.1s 71 tok/s"、语言面板
  返回箭头。截图 rounds/v1.4。
- app/airbuild v1.7：登录形态核查结论——本套无登录形态屏（App Store 图
  全为已登录态屏，Localizable.strings 中 Sign/Log in/Welcome/password
  均为 0 次），不造屏；L1–L28（气泡行高、文件卡/任务卡、顶栏钮径、中央标
  自绘四叶、作曲器字号、简报重排 + 折角 84×56px、销售卡统计纠错、第二
  消息完整可见、详情全部字号 + 第 4 进度行、Home tile 重绘）。截图
  rounds/v1.7（7 framed + 6 bare）。
- web/airbuild v1.3：登录形态核查同上（无登录屏，不造屏；iphone-01 标题
  为 App Store 营销文案，非应用内 welcome）；D1 裁决——Shadow 层优先于
  base 层（解决 round 5 U7 B10：作曲器 backdrop 实为 blur(4px)
  saturate(1.45)）；DOM 实测全批（会话底 0.54、预览平色、标题栏 padding、
  32px 窄 footer、toast 16px + blur 18px、电话 appbar 重建、tiles 去标
  44px、feed 6 行、设备阴影、home 指示条删除）。截图 rounds/v1.3。
- 未闭合（均带实测原因，详见各套 CHANGELOG，不编数）：app/medley
  pricing 整体漂移（顶 −39 等，顶 padding 与中段 excess 交互，单点修正
  会破坏已合底部）、picker-a 全部（顶 −70→底 −32 非均匀位移，sheet 顶/
  圆角/底色未采样）、language 行距矛盾、总览 9 屏无单屏 HD 原图（仅
  >10% 大差可行动）、AiMeta 全屏影响面未逐验、G36/T3/T6–T9/T14/T15/G40
  旧残差；web/medley U1（HD5 与 CN 暗底冲突取 CN）、U3（无 HD 源处沿用
  v1.3 值）、U11（定价等只视觉重扫未逐元素重证，不谎称 1:1）；app/airbuild
  U1–U14（详情顶圆角 32px 无弧线拟合、商店卡高 87 vs 约 90、简报封面/
  图表取舍、Assets.car 无 Linux 工具等）；web/airbuild U1–U13（窗口外阴影
  为画廊可读性保留、发送钮蓝为原生证据、SF 字形无 Apple 设备不可验、
  头像/贴图 artwork 不可复制等）。
- 本轮提交：四套各一 commit + 本总账一 commit；构建四套由工人各自通过
  后，协调方独立重跑全部通过（tsc + vite）。

## Round 7 — 2026-10-30（颜色层还原 + 四套主动重扫重修）

- 起因：用户 2026-10-30 15:32 亲发新截图 photo-9（2×2 四屏），当场指出 round 6 渲染把原屏压成了黑白灰 + 一个橙点，“差太远”；并再令不要一句一句提醒，四套所有细节须主动重比。本轮第一优先是颜色层，其次是四套全量主动重扫重修；零裁判调用，验收只认 PIL/DOM 实测数。
- 基准规则（冲突定夺，不平均）：颜色层服从新截图 photo-9；布局/字号/间距等其他维度仍以旧 HD 条 + round 6 实测为准。旧 HD 条 welcome 平色 #111518 + 橙点是另一状态/旧 capture。静态渲染取新截图的暖色 + 宝石蓝一帧；标题轮换行为（每句一色）只在 CHANGELOG 注明，不伪造动画。
- 颜色层定论（新截图证明原屏并非黑白灰）：welcome 左下暖色（橙棕）环境光、右下绿色环境光、上部蓝晕；Medley 标志旁多彩圆点（绿/品红/蓝）；“Let's discover”后宝石蓝光标/圆点；home “Auto”旁多彩圆点；Kimi K3 黄点；GPT-6.1 Sol 绿点；天气图标、模型点等彩色元素。环境光一律用径向渐变还原（参数见各套 CHANGELOG），不许一色平铺冒充。
- app/medley v1.7：品牌簇矢量重绘（绿 #5ec8a7、蓝 #8fb0d8、品红 #d98cb4）；标题光标 #fd6718 → #6ea9dd；三色环境光（蓝晕 radial 320×260 at 78% 30% rgba(52,86,120,0.45)、暖光 300×240 at 21% 76% rgba(114,66,40,0.55)、绿光 280×220 at 82% 92% rgba(38,94,78,0.55)）；Kimi 点全线 #d8c25a（京都顶栏硬编码紫点纠正，round 6 T9 闭合）、GPT 点全线 #4a8a76；Auto pill 5 点 pastel → 3 点斜簇。截图 rounds/v1.7（18 张）。
- web/medley v1.5：welcome 局部底 #0D0E10（干净顶中实测 (13,14,16)）+ 三向环境光（蓝 radial 300px at 88% 42% rgba(64,102,150,0.46)、暖 280px at 16% 76% rgba(116,66,46,0.62)、绿 320px at 92% 108% rgba(52,110,95,0.90)）；品牌簇 9px 盘 0/4/8px 上升；标题点橙 → 宝石蓝光泽球（核实测）；Kimi/GPT 点改光泽（底色不变）；home 浅色面平铺 → 洗色渐变 + 卡片 flex 拉伸（面板填满卡片）。截图 rounds/v1.5。
- app/airbuild v1.8：头像 7 色按 ipad-01/iphone-03 网格修正（Pluso 单色 cyan #50e2f1、Ampo 蓝底粉面 #1fb0df/#fdccc8 等）+ Pluso 橙点/Camo 杯徽标；简报 pills 真色 6×6 圆点（蓝 #64a2f7、红 #cb2c19）；简报封面 teal + 淡黄花头 + 77px；草稿封面改中性深灰；商店 glyph 竖渐变；详情绿 #34c759；发送钮 #268eff（用户气泡仍 #0088fe）；Home tile 白卡 + pastel 三块 + 日落渐变。截图 rounds/v1.8（7 framed + 6 bare）。
- web/airbuild v1.4：头像圆盘饱和化（Ato #97c151、Pluso #52ccdb、Colo #855dfe、Camo #f9d01f、Ampo #4db7da、Leto #f8ad43）；共享渐变改两段式 325deg；全部控件补齐 backdrop blur(4px) saturate(1.45)（作曲器本身未动）；胶囊图标墨色 #11110f；侧栏 PROJECTS/AGENTS 标题行删除（官方模板无此元素，属臆造）；头像内环只留 agent 行；滚动条全局隐藏；resizer 挂载（此前定义未挂载）。截图 rounds/v1.4。
- welcome 底色统一（协调方裁决）：app/medley welcome 初版仍沿用旧 HD #111518，与 web/medley welcome-local #0D0E10 冲突。协调方亲测 photo-9 干净顶中 (13,14,16) 后裁定：新截图在颜色层优先，两套 welcome 统一为 #0D0E10；app 侧只改 welcome 容器 + Phone frame（className 覆盖），global darkBg #111518 不动；重建 + welcome 重拍验证（众数/状态栏/顶中/底条均为 (13,14,16)，光标仍 #6EA9DD）。旧 HD #111518 仍为其他深色屏的底色依据（其颜色证据未被新截图推翻）。
- 全量主动重扫（非颜色层）：四套每屏可见元素逐项重比，扫出即修；AirBuild 两套无登录形态屏的结论沿用（App Store 图全为已登录态屏，Localizable.strings 中 Sign/Log in/Welcome/password 均为 0 次），不造屏。改动细节与前后值见各套 CHANGELOG。
- 未闭合（均带实测原因，详见各套 CHANGELOG，不编数）：标题轮换其余句子与配色未知（只捕获宝石蓝一帧，不做动画）；photo-9 右列两屏右缘裁切（右缘外文字无法采样）；京都天气图标色（约 10px JPEG 块，无精确值，图标缺失本身记未闭合）；home 建议行图标色（过小无法定精确色）；app/medley pricing 整体漂移、picker-a 全屏、language 行距矛盾、总览 9 屏无单屏 HD 原图；web/medley U1 深色底状态冲突（welcome 局部跟 photo-9，全局 darkBg 保持 #111518）、U3/U4/U5/U6（无 HD 源处沿用、品牌点底色去模糊估计、洗色中段冷约 9 级、CN home 洗色假设）；app/airbuild U1–U14 延续（详情顶圆角、商店卡高、Assets.car 无 Linux 工具等）与本轮新增近似项（TestFlight 渐变复用、销售条坐标未定位、pills pitch 多约 2pt）；web/airbuild U1–U8 延续（tile 照片封面不可拷、服务列底色无证据、头像五官自绘、画廊底平色、Assets.car、发送钮蓝取舍、深色未渲染）。
- 本轮提交：四套各一 commit + 本总账一 commit；四套构建由工人各自通过后，协调方独立重跑全部通过（tsc + vite，含 app/medley 底色补丁后重建）；app/medley welcome 按补丁后代码重拍。

## Round 8 — 2026-10-30（Apple iOS 质感打磨，在 1:1 保真内做）

- 起因：用户 2026-10-30 17:44 再令继续打磨，要 Apple 设计的 iOS 设计质感；17:46 再令精度收紧。质感定义（用户原意 + 执行口径）：不是重新设计——原屏本身就是 iOS 应用，Apple 质感 = 把它们 iOS 原生的细节忠实还原出来（字体、材质、组件精度、动效），而不是按 Apple 品味改原屏；1:1 保真仍是底线，质感是 1:1 之上的完成度。
- 方法（新 skill measured_visual_replication，全文照办）：先量后建（每屏写明参照物 + 状态）；同态同尺寸比对（同一视口、同一状态，左右两边都记实测值；裁切/模糊/分辨率不足记“未量”，不同状态参照物绝不混用）；字节级核查（包内字体与字重、图标形态按字节核对，只看含义不看形态不算）；修复顺序固定（几何 → 缺失层 → 排版 → 裁切 → 间距 → 动效，每项修前/修后值都记，修后对不上参照值不闭合）；质感按实测集合修（blur、saturation、内高光、底色、阴影成套量，不用一个“玻璃”之名交差）；修复后全套重扫，残留列表带数，绝不藏在 clean 标签后；裁判 verdict 只当输入，残留未清时永不等于放行；标题轮换只量已观测句，未观测句列未量；本平台验不了的字体写明替代品并量出差值记残留。零裁判调用，验收只认 PIL/DOM 实测数。
- 收紧门（17:46 五条，全部执行证据见各套 CHANGELOG）：①1px 级：1–2px、1–4 级色差不四舍五入抹掉，能量出就记、能修就修，只有拿出证据证明是 JPEG 噪声的才可放过；②小元素一个不放过（状态栏图标、分割线、tiny 标签、图标端点、阴影、hairline、圆角弧线）；③单点采样不够，每处多点/分区采样（底色教训：一个众数会掩盖渐变与分区色）；④量测交叉核对：像素采样 + DOM/computed 值两路对不上不许放行；⑤交付前一眼比对：原图与渲染同尺寸并排全屏看，肉眼可见的每一处差异逐项量，不许带着肉眼可见的差距交卷。
- app/airbuild v1.9：气泡圆角 20→13px（REA 13px，顶角拟合残差 ≤1px）、横向内边距 16→12px（agent 泡宽恰 250）、玻璃成套（REA 渐变 + REA 阴影组 + blur 34 + saturate 1.24，无边框，DOM 全量一致）、hairline 全 0.045（详情卡内 divide 0.06 保留）、作曲器阴影 0.08→0.065、用户气泡阴影 0.05→0.025、发送钮 35→34px（原图盘 33.7pt）、打字行 REA 值（点 5、padding 11/9、头像 28）、简报封面 77→103px（v1.8 换算错误纠正：整图宽换算 vs 内屏宽 1030 换算不一致，实测 teal bbox 273 原图 px = 103.4pt，与 v1.7 旧值 105px 互证；第一卡 +26、行高仅 +1、文字零裁切）、Home 指示条新增 134×5（标注为 iOS 系统 chrome 值，非原图采样）。残留 8 项 R1–R8（头像两轴分歧、Noto 回落非 SF、详情钮、日期 pill 折行、纵向内边距、封面宽 +6.2、动效弹簧参数不可观测、v1.7/v1.8 延续项）。截图 rounds/v1.9（framed 六屏 + chat-430、bare 六张、measure）。
- app/medley v1.8：欢迎页 5 条带全部收至 1px 内（标题带 303.6→304、副 1/副 2 361.4/387.9→362/388、脚注 775.8/791.8→775/791）；picker-a 从全屏错体还原为原图 bottom sheet（sheet 顶 102.3→102、把手顶 110–113→110、标题核顶 141.0→141（0.0）、GLM/DeepSeek 核顶 335.6/390.2→336/390、行距 54.6→54）；picker 细节 HD 几何独立重验（scale 0.9929）后才动手，post1 挤出 Fable 经三步实测分配回到 767–776。15 屏字节零扩散；welcome 差异 8864px（仅文本区）、picker-a 差异 328354px（sheet 重构）、picker-b 差异 53761px（ModelRow/ModelSection 共享组件影响：亮核带上收 -8/-13/-26/-61，记为共享推断 R-8，不宣称 picker-b 已 1:1）。残留 13 项 R-1～R-13（含 language 行距拟合方案本轮重测否决：中文 HD 文本墨每行仅 29–66px、带顶不确定度约 4px，初算系拟合噪声，不动手）。颜色层无回退（光标 #6ea9dd、品牌簇、Auto 簇、Kimi #d8c25a、GPT #4a8a76、里斯本流式点 #fd6718 全在位）。截图 rounds/v1.8（18 张 bare，根目录为终版）。
- web/airbuild v1.5：窗口 backdrop 构建缺陷——改前 Tailwind/Lightning 丢弃无前缀 backdrop-filter，Chromium computed 为 none，blur 根本未渲染（条带 172→237 的 1px 锐变）；改后 inline backdropFilter + WebkitBackdropFilter，DOM computed = blur(34px) saturate(1.24)，条带呈平滑渐变。状态栏 wifi 自绘 11×7（组 44×8）；标题栏侧栏内嵌阴影补齐（DOM 与 body 一致）；图标 drop-shadow 范围收敛（仅 phone-appbar 保留）；行高 normal 化（Tailwind 1.5 膨胀纠正：feed 名 11.25px、文本 10.4px，字形带 +2/+1px 证明）；分隔线 hairline 0.045（Separator DOM 0.043 系 8 位取整）；动效四档（网格 240ms、tab 关闭 120ms、tile 140ms、toast 180ms 关键帧）+ reduced-motion + 红绿灯 cursor；圆角 r18 1px 级复核（弧点与圆心 (18,18) 的 r18 圆在 1px 内吻合）。全套重扫不 clean，残留 21 项 R1–R21（SF 形态不可验、头像面部重绘、tile 照片封面不可拷、服务列底 0.92、深色未渲染、折叠中间态、设备切换动画、焦点环、电池内芯、画廊 chrome + 改编 bottom bar 等）。截图 rounds/v1.5（window-main、side-by-side-v14-v15、gallery-1280）。
- web/medley v1.6：定价结构纠正（3 卡→plain 行 + 选中卡 + border-dark-sub 1px，卡 218.2→179.8、check pitch 26.9→22.9、Lite→Pro pitch 66.4 精确）；credits 白区 + 30 柱图（8px、gap 3、126×327，首柱 4、末柱 65，色值 #8C553C/#9D4564/#7B6730/#466C8C）；斜簇圆点（定价新 DiagonalDots 10px/gap 13、品牌簇、Auto 3 点斜簇替代 5 点横排）；作曲器 home-en 48→54、CN stacked 96→122、黑盘 36→40；菜单 13.3/1.67/5.0→16.0/2.0/5.0；ClockDashed 20→18；分隔线 1px→0.5px CSS（见下诚实说明）；picker 去分隔线 + sheet darkCard；用户气泡角统一 20（弧实测 19–20px）；动效 iOS 曲线（200ms cubic-bezier(0.32,0.72,0,1) / 180ms cubic-bezier(0.22,1,0.36,1)）+ reduced-motion；drawer Agent 任务图标改 Lucide list-checks、头像 36→32、Fable 锁 14px。残留 17 项 R1–R17（深色底冲突、标题轮换余句、无 HD 源项、品牌点底色去模糊估计、洗色中段冷约 9 级、CN 洗色假设、Pro 边框 ±25、badge 宽 Δ4.8、language 行距 + 末行分隔线未量、tiny 柱色成因未明、字体回落、hairline 绘制极限等）。颜色层复验无回退（welcome 基底干净点 (13,14,16) 精确，中心右漂移 +1/+2/+3 系蓝 radial 尾部解释）。截图 rounds/v1.6（gallery-fullpage、sec-*/panel-*、sidebyside/pair-*）。
- 字体统一口径：SF / SF Pro Rounded 本机不可验（VM 无 SF/Helvetica、macOS 包内无字体文件、Assets.car 不可读），回落品（Noto Sans / Noto Sans SC）量出渲染尺寸与字重差并记残留，iOS 真机即为 SF；绝不把 Apple 系统字体文件拷进仓库。
- 三点诚实说明：① web/medley hairline 0.5px CSS 在本 VM Chromium DPR1/DPR2 下绘为满 1 设备像素，无法目视确认——系正确 iOS 设备 CSS、凭规则 + 类名验证，须真机复核；② app/airbuild 简报第二消息底边与作曲器顶现已相接（0–1px），后续再动简报纵向尺寸前先复测此贴合；③ app/medley picker-b 共享影响为推断，不称 1:1；language 行距拟合方案已被本轮重测否决，不动手。
- 本轮提交：四套各一 commit + 本总账一 commit；四套构建由工人各自通过后，协调方独立重跑全部通过（tsc + vite）。
