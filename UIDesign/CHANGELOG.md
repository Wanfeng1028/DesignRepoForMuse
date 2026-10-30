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
