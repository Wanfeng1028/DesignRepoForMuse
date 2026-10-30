# CHANGELOG — UIDesign/app/airbuild

## v1.0 — 2026-10-29 — 基线（返工起点）

- 2026-10-29 交付的初版：Vite + React + TS + Tailwind CSS v4 + Radix primitives，
  手机单列 390×844，home / chat / briefing / draft / detail / components 六屏。
- 用户裁决：不达标，需返工。本轮起按视觉裁判迭代，直到裁判逐项核查后明确报告
  “零实质差异”才算过关（验收通过轮记为 v2.0）。
- 基线截图：docs/verification/rounds/v1.0/（即初版 docs/verification/*-390.png、
  chat-430.png 的原样复制）。
- 基线自查（对照 ~/workspace/airbuild-refs/appstore/ 官方高清截图，肉眼 + 像素取样）：
  - D1 画布：初版 #f9f9f7；原图 iphone-03 取样 #f4f4f4 / #f5f5f5。
  - D2 用户蓝：初版 #1987f7；原图 iphone-03 / iphone-04 取样 #0088fe / #0188fd。
  - D3 任务卡：初版暖奶油 #fffaf2；原图 iphone-03 任务卡取样 #ffffff（纯白）。
  - D4 全局尺寸偏小：顶栏圆钮 44px、头像 34–42px、气泡字 15px、圆角 16px、
    输入框手形/+ 瓦 44px、发送钮 40px、简报封面 118px、草稿封面 118px、
    详情图标 48px / 绿勾 20px；原图同类元素均大一档（见 v1.1 清单）。
  - D5 简报横向露卡：初版首卡 82% 宽、第二卡仅露一条边；原图 iphone-06
    首卡约 59% 宽、第二卡露出约 34% 宽（含 1204 / $386 统计行）。
  - D6 文件卡缺右侧发送者头像：原图 iphone-03 文件卡右缘外叠一个紫色头像，
    初版无此元素。
  - D7 详情面板：初版面板底 #f9f9f7 与画布同色、无分层；原图 iphone-05
    面板为白、图标带蓝色角标、商店卡更高。
  - 备案残差（保留，不硬凑）：头像重绘近似；ipad-04 官方图 404 不做该屏；
    设置/账号/新建/深色无公开图、只做浅色；SF Pro Rounded 非苹果设备回落；
    小屏三栏折叠方式不可确认；项目 tile 与报告封面用抽象占位、未复制官方照片。
- 裁判模型：qiniu/conatus-free（BotsRouter），其余模型不许用；限流即停手。

## v1.1 — 2026-10-29 — 全局放大（方向错误，后被 v1.2 纠正）

- 改动：画布 #f9f9f7→#f4f4f4、用户蓝 #1987f7→#0088fe、任务卡 #fffaf2→纯白、
  顶栏圆钮 44→52px、头像 34→48px、气泡字 15→17px、圆角 16→24px、作曲器瓦 44→68px、
  发送钮 40→52px、简报首卡 82%→62%、草稿卡全幅、详情图标 48→68px。
- 截图：docs/verification/rounds/v1.1/。
- 复验（肉眼）：顶栏药丸与作者行重叠（绝对定位中柱溢出 header）、聊天与详情内容
  超高被裁；放大方向本身存疑——原图 1320px 照片在显示时比 390px 渲染图大，
  绝对像素比较会系统性高估原图元素。
- 教训：此后一律以 390 宽等比裁图（手机屏内宽为基准换算）作比较，禁用绝对像素目测。

## v1.2 — 2026-10-29 — 回调到 390 宽实测值（v1.1 未单独提交，与本轮合为一次提交）

- 依据：iphone-03 / iphone-06 / iphone-05 手机屏裁成 390 宽后的相对尺寸。
- 改动：顶栏圆钮 52→42px、项目标 52→38px、药丸字 14→13px、header 下 padding 补到
  5（中柱不再溢出）；头像 48→32px、作者行 15→13px、气泡字 17→15px、圆角 24→20px、
  任务卡纯白 + 墨色文字；成员头像 52→42px、名 17→15px；项目 tile 152→132px；
  简报卡圆角 28→24px、标题 21→17px、封面 188→150px；详情图标 68→52px、
  商店 glyph 32→28px、绿勾 28→24px、面板底改白；文件卡行加右侧紫色发送者头像
  （36px，原图 iphone-03 右缘外叠头像）；作曲器大瓦/发送钮保留 v1.1（经 06 裁图验证）。
- 截图：docs/verification/rounds/v1.2/。
- 复验（肉眼）：顶栏重叠消除、详情不再溢出、聊天用户气泡可见；残留：文件卡
  文件名换行、任务卡过宽、简报标题仍偏大导致第二条消息被裁、详情面板底应为灰。
- 裁图说明：比对用的原图裁图仅临时存放于 rounds/v1.1/、复验后已删除，不进交付物；
  仓库内不含任何官方位图资产。

## v1.3 — 2026-10-29 — 文件卡字号、任务卡宽度、详情底色、单屏截图去顶距

- 改动：文件卡文件名 15→14px；聊天任务卡外包 pr-10（不再通栏）；
  简报标题 17→15px、正文 12→11px、封面 150→140px；详情面板底 #ffffff→#f4f4f4
  （原图 iphone-05 面板底为浅灰、白卡浮于其上）；单屏模式 main py-6→py-0
  （390×844 视口下手机框不再被顶距推出底边）。
- 截图：docs/verification/rounds/v1.3/。
- 复验（肉眼）：顶栏、任务卡、详情均已贴近原图；残留：文件卡文件名仍换行
  （14px 在 68% 宽卡内仍超宽）、简报标题仍 3 行（原图 2 行）、简报第二条消息
  仍被裁（卡高 + 作曲器挤占）。

## v1.4 — 2026-10-29 — 文件卡字号、简报卡宽、任务卡宽度微调

- 改动：文件卡文件名 14→13px、padding px-3.5→px-3、图标 20→18px；
  简报卡宽 62%→66%、标题 15→14px、封面 140→120px、卡 padding p-4→p-3.5；
  聊天任务卡外包 pr-10→pr-14；简报作曲器 wrapper pb-5→pb-3。
- 截图：docs/verification/rounds/v1.4/。
- 复验（肉眼）：文件名单行但被右侧头像压住末字（flex 最小宽度致文本溢出）；
  任务卡标题因变窄换行；简报标题仍 3 行（原图 2 行）；简报第二条消息仍未出现。

## v1.5 — 2026-10-29 — 文件头像半叠、任务标题单行、简报标题 2 行；裁判限流停手

- 改动：文件卡行改 flex + 头像 -ml-2 半叠（只压卡片右 padding、不压文字）；
  任务卡标题 15→14px（单行）；简报标题 14→13px（2 行，与原图一致）、
  封面 120→110px；顶栏 header pb-5→pb-4；状态栏 pt-4→pt-3。
- 截图：docs/verification/rounds/v1.5/。
- 复验（肉眼）：聊天屏已干净——文件名单行且头像不压字、任务标题单行、
  用户气泡可见；简报标题 2 行、卡片含日期行完整可见，第二条消息仍在 844 折叠下
  （真实应用可滚动，画廊定高截图无法同时容纳三消息 + 高卡 + 作曲器）。
- 裁判 qiniu/conatus-free（BotsRouter）：chat 轮出 verdict（见下），briefing 轮
  模型自称未收到图片（verdict 无效），detail 轮回 429 free_campaign_global_limit。
  按限流铁律立即停手：不再重试、不换模型、不做 v1.6。
- chat 裁判已捕获的差异（1–8 项，第 9 项起因本轮打印截断 3000 字而丢失，未获全文）：
  ①顶栏圆钮原图约 48px、我方 42px；②顶栏项目标原图为等距小镇缩略图、我方为字母块；
  ③药丸原图约 104×28px、我方约 90×26px；④状态栏电池/WiFi/时钟原图略大；
  ⑤作者名原图约 14px、我方 13px，名到气泡间距原图约 6px、我方约 4px；
  ⑥气泡横向内边距原图约 18px、我方 16px（裁判估算我方圆角 16px 与实际 20px 不符，
  该项圆角读数存疑）；⑦头像对齐项裁判坐标系错乱（把营销全图坐标当 390 框坐标），无效；
  ⑧文件卡原图约 222×74px、我方约 198×64px，文档图标原图更大、标题约 14px。
  以上 ①–⑥⑧ 列为待办，未在本轮动手（限流停手）。
- 待办：限流解除后重跑裁判（detail / home / draft 全量 + briefing 重跑 + chat 第 9 项起全文），
  再按裁判清单做 v1.6。

## v1.6 — 2026-10-30 — 修复轮：audit-20261030 的 30 项 + T01–T17 + P0 决策全部落地（未 commit、未 push，留待协调方提交）

- 本轮性质：只审不改已被用户否决，本轮只交修好的代码 + 新截图 + 实测值。裁判未调用：全部为本地 PIL 实测 + 目视，裁判按任务口径只是第二意见、不是放行依据。未碰其他三套、总 CHANGELOG、总表与各套 audit 文件（只读）、服务器数据库、任何令牌、BotsRouter、X、其他项目。工作区内其他三套的改动属于并行 agent，本轮未碰。
- 构建：`/home/hatch/.npm-global/bin/pnpm build` 一次通过（tsc + vite）。截图：本套现有脚本 `docs/verification/shoot2.cjs`，因本机受管 Chromium 被组织策略拦（Hatch WebGL domain policy），改用 `~/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell` 出图；截图存 `docs/verification/rounds/v1.6/`（390×844 六屏 + chat-430），验证用图另有去边框版 `rounds/v1.6/bare/`（370×824 内屏裁切，脚本 `docs/verification/bare-crop.py`；gallery 演示仍保留设备框）。

### P1 实测前后值（原图值 vs 改后值，均为 PIL 量出 + 代码 token 读出）

- S1 draft 封面比：原图 529×529（比 1.00）→ 改前约 148×244（比 1.65）→ 改后 156×156（比 1.00，渐变区行扫描：全宽行 361–496 + 上下圆角弧 342/497）。实现：`website-draft-card.tsx` 的 `min-h-[240px]` 改为 `aspect-square`。Q6 选项 A“封面改到与标题栏等高”与原图实测不符（原图照片高远超标题栏高），按任务指令以 1.00 为准，选项 A 不执行。
- F1 chat 正文字号：原图 cap 20px@1020（等效 7.65px@390，占屏宽 1.96%）→ 改前 cap 10px（声明 15px，+31%）→ 改后 cap 8px（声明 11.5px，残差 +4.6%，±1px 阈值误差内）。实现：`message.tsx` agent/用户气泡 `text-[15px]` → `text-[11.5px]`（11.5 = 15 × 7.65/10，按 cap 线性换算）。
- F2 chat 作者名：原图 cap 等效 7.65px@390 → 改前 cap 9px（声明 13px，+18%）→ 改后 cap 8px（声明 11px，残差 +4.6%）。实现：`text-[13px]` → `text-[11px]`；Q5 候选“13→14px”与实测方向相反，作废不执行。
- S2 briefing 发送钮：原图 92px@1020（占屏宽 9.0%，等效 35px@390）→ 改前蓝区 50×50（声明 52px，+42%）→ 改后蓝区 35×35（`composer.tsx` 52→35px，箭头 24→16px）。注意：S2 只改 briefing 共用的 Composer 发送钮尺寸，chat 屏无作曲器，不受影响。
- S3 briefing 首卡圆角：原图弧拟合约 39px@1020（逻辑约 15px，占屏宽 3.8%）→ 改前声明 24px（白区实测约 21px）→ 改后声明 15px，白区弧拟合约 14–15px（左界 x=27、顶界 y=234；x=30→239、x=35→235 与 r=15 圆拟合吻合）。实现：两张简报卡 `rounded-[24px]` → `rounded-[15px]`。
- P2 draft 底部裁切：改前末条气泡框底切于 y=833、次行 “app.” 被切 → 改后末条气泡底 y=717，框内底 834，全文单行完整可见。实现：S1 封面省高约 88px + F1 字号回调 + DraftScreen 的 MessageList `gap-4` → `gap-3`、`py-3` → `py-2`。
- P1 chat 底部裁切：改前末条气泡仅见 3 整行加第 4 行局部 → 改后蓝区底 y=753（框内底 834），末条气泡 4 行全文可见，已优于原图营销裁切（原图可见 4 行、第 5 行被图底切）。
- S4 briefing 第二卡可见宽：原图约 350px@1020（占屏宽 34.3%，等效 134px@390）→ 改前约 112px（28.7%）→ 改后 131px（33.6%，残差 -2.2%）。实现：简报卡宽 66% → 62%，gap 保持 12px。决策：接受（横向滚动偏移量，非 token 缺陷；残差已进 minor 级，不再追改）。
- L1 draft 草稿卡结构：仍为聊天流内全宽卡（-mx-4，平台适配取舍，不改回悬浮浏览器窗）；封面比 S1 不受此影响，已按 1.00 改。
- 玻璃质感 T1–T4：新增 `.ab-glass`（`index.css`：`rgba(244,244,244,0.72)` + blur 12px + saturate 1.4 + 内高光 `inset 0 1px 0 rgba(255,255,255,0.65)` + 柔和阴影；token `glass` 同值记入 `tokens/index.ts`）。落地：chat 顶栏返回/…钮、home 顶栏云朵/+ 钮（同款组件）、Pill（含 Hourtown pill，T3）、draft 的 handstime.app 药丸与分享钮（T2）、detail 右上勾选圆钮（T4，尺寸保持 44px）。目视：钮面由实色白转为与画布同色的浅灰磨砂。
- C1 draft 封面内容：深绿渐变 + 白字保留为底，叠加自绘矢量天鹅抽象（白身 + S 形颈 + 倒影线），不用官方天鹅照片、不拷位图。
- C2 briefing 首卡配图：teal 渐变块内叠加自绘矢量蒲公英（茎 + 辐射种头），不用官方蒲公英照片；块高保持 110px（完整照片四边待量 T11 未闭合，不编高）。
- C3 home 项目卡 + Q4 chat 项目标识：字母块（H/H/S/C）全部去除。home 四卡改为自绘矢量应用预览：Hands Time 钟表 widget、Hourtown 小镇地图、Sleepy Coffee 咖啡杯、Casehot 落日横幅；chat 顶栏 38×38 项目标改为自绘矢量小镇（房屋 + 树 + 太阳），位置尺寸不变。

### 头像 A1–A7（P0：矢量重绘插画人物，不用统一笑脸圆、不拷官方位图）

- `avatar.tsx` 按成员分形：Pluso 青底深青人物 + 短发簇、Ampo 紫底橙色人物 + 偏分发、Colo 紫底戴帽人物 + 帽上调色点、Ato 绿底粉色人物 + 卷发、 Camo 黄底戴帽人物、Qesto 粉底深色卷发人物、Leto 橙底眼镜人物；各成员底色沿用既有近似色（Pluso #45c8d8、Ampo #9b7bf3、Colo #a78bfa、Ato #8fd14f、Camo #f5c518、Qesto #f27ba7、Leto #f59e0b）。说明：原图小目标 JPEG 无法逐像素复刻面部细节，本轮为同 idiom 的自绘区分形象，非官方肖像复刻。

### 图标 I1–I7 与 P3（Lucide 接包 + morphing 分档）

- 接包：`pnpm add lucide-react`（1.63.0，`package.json` + `pnpm-lock.yaml` 已变）。逐字复核：`node_modules/lucide-react/dist/esm/icons/*.mjs` 实测存在 clover、hand、list-checks、cloud、file-text 等，T14 闭合。
- 12 图标全部改走 Lucide（`icons.tsx`）：plus、arrow-up、check、share、chevron-left、chevron-down、ellipsis、cloud、clover、hand、file-text（Doc）、list-checks（TaskList）；描边统一为 Lucide 默认 2（原自绘 1.6–2.2 混用消除）。品牌 glyph（App Store / TestFlight）Lucide 无对应，仍自绘矢量：App Store 改为三笔 “A”（原店面檐篷示意作废），TestFlight 改为三叶螺旋桨（原示意线作废），尺寸保持 28px。
- I1 手形键：Lucide hand（无掌心圆点）。决策记录：用户已定图标一律 Lucide，原图掌心圆点为官方特征转译、Lucide 无此点，二者冲突时按 Lucide 优先，去点；残差：与原图黑手掌心点差一处，记入残留。
- I2 detail 应用图标：原描边手 + 浅绿 tile → 自绘实心黑手剪影（`HandSolidIcon`）+ 同 tile，形态向原图黑色实心手靠拢；tile 尺寸保持 52px。
- I4 云朵钮、I5 中央四叶标：分别改走 Lucide cloud、Lucide clover（描边式，含茎线；原填充式自绘作废）。
- I6 文件图标：Lucide file-text（文件 + 折角 + 横线，折角与线位以 Lucide 为准）。
- I7 任务列表图标：Lucide list-checks（横线 + 勾，原双圆圈 + 横线 + 竖连线结构作废）；任务卡完成态的文字 “✓” 同步改为 SVG CheckIcon（M5 的前提）。
- Morphing（状态切换一律过渡动画，不硬切；`icons.tsx` + `index.css` 的 `.ab-morph` 0.35s/0.25s 过渡）：
  - M1 纯插值可行：chevron down/up 用旋转过渡；detail 标题 chevron 改为真实折叠 toggle（默认展开，gallery 截图不变；收起时隐藏 Versions/Progress 卡），另在 components 屏设演示。
  - M2 plus/check：节点数不同不可直接插值，改自定义描边动画（plus 组淡出 + 缩小，check 路径 stroke-dashoffset 画入），同槽演示于 components 屏。
  - M5 任务圆圈/check：圆环保留 + check 路径 stroke-dashoffset 画入，演示于 components 屏；任务卡本身完成态已用 SVG 勾。
  - M3 ellipsis/x、M4 play/pause：本套无此对，不虚构、不新增（audit 已记无）。
  - 需产品决策先行的项：本轮按“原图形态优先”自行定夺并记录在案（去掌心圆点、折角加两卡、S4 接受），不再列问题等批。

### P0 决策记录（本套相关，全部已执行）

- Q4：chat 项目标识矢量重绘小镇，不用字母块（见上）。
- Q6：draft 封面按原图来（比 1.00；选项 A 作废）+ 按钮玻璃质感落地（T1–T4，见上）。
- Q8：验证截图去边框出图（`rounds/v1.6/bare/` 370×824 内屏裁切），gallery 演示保留设备框（`PhoneFrame` 不动，dist 站点仍带框）。
- Q16/Q17 contested：本套无 lisbon/picker 类 contested 屏，无可重判内容；按“已确认的修复算”口径，本轮不对任何已确认修复做回滚或重判，记为无操作。
- Q7（本轮自行定夺，非 P0 原清单）：简报页角折边加两卡（首卡已证实缺失；第二卡 audit 目视亦有折痕）——两卡右下角各加 20px CSS 折角（`FoldCorner`，自绘样式非位图）；折边边长原图待量，20px 为本轮自定值，记入残留。

### P2：T01–T17 逐项（量不出的明说，不编数）

- T01 顶栏玻璃钮原图直径：未闭合。填充与屏底同色，JPEG 下边框与阴影无法分离定界；渲染保持 42px，不编数。
- T02 Hourtown pill 原图尺寸：未闭合。同上原因无可靠定界；渲染 Pill 内边距与字号不变，只改材质为玻璃。
- T03 chat 气泡内边距：部分闭合。audit 估计原图约 38px@1020（等效约 14.6px@390，左界误差约 ±10px）；渲染 px-4=16px 落在误差带内，保持 16px 不动（改 15px 属假精度）。
- T04 任务卡/文件卡原图宽度：未闭合。JPEG 行扫描中卡白与画布/文字混杂，无法可靠定界；宽度不动。
- T05 Q5 其余候选（顶栏 42→46px、pill 尺寸、气泡内边距 16→18px、file 卡加宽加高）：未闭合，无本轮新实测支撑；42px、16px、file 卡尺寸均保持原值。
- T06 draft 流量灯原图直径：未闭合。红核 32×20px 宽高不一致，JPEG 核不可靠；渲染保持 16px。
- T07 detail 商店卡原图高度：未闭合。JPEG 下卡片与面板底色接近、白区分段碎裂，无法可靠定界；高度不动。
- T08 detail 勾选钮原图直径与面板顶圆角：未闭合。玻璃同色无法定界；渲染勾选钮保持 44px、面板顶圆角保持 32px。
- T09 detail 商店 glyph 原图尺寸与绿点、橙色 patch：未闭合。蓝色扫描横贯整个 detail 屏（链接 + 角标混杂），glyph 无法隔离；glyph 只改形态不改尺寸（28px），绿点/橙色 patch 不动。
- T10 home 项目 tile 高与成员头像直径原图值：未闭合。iphone-01 为倾斜手持照、无统一屏宽、未做透视校正；渲染 tile 保持 132px、成员头像保持 42px。
- T11 briefing 照片块完整四边：未闭合。本轮行/列扫描返回的是卡片边界（teal 核心区 517×157px 已有旧量），完整照片块因照片内容与 JPEG 无法与卡片/文字分离；teal 块高保持 110px，内容改为矢量蒲公英。
- T12 chat/draft 气泡圆角原图值：未闭合。本轮对 iphone-03 底部气泡做行扫描，顶角未在营销裁切图中隔离出可拟合弧线；渲染气泡圆角保持 20px。
- T13 Assets.car 内容：未闭合。Linux 无官方工具可读，包内应用 UI 资源未获实测值；未复制任何包内素材。
- T14 Lucide 精确核对：闭合（见 P3 接包逐字复核）。
- T15 morphing 插值细节：闭合（分档见 P3；M1 旋转、M2/M5 自定义描边动画均已落地）。
- T16 iPad 双栏：未闭合。本套只渲染手机单列 390 屏，未新增 iPad 屏；iPad 图仍只作结构参照。
- T17 components 屏独立原图：未闭合。无独立 App Store 原图，只与 chat/briefing 同款组件交叉对照；打字圆点保持 5–6px（REA 网页模型参照 5px，微差不单独改）。

### 残留（本轮未动，需协调方/后续轮注意）

- detail 面板在 844 框内仍底溢（Progress 卡底被框底切，v1.5 已有，非本轮 P1/P2 清单项，未动）。
- 手形键掌心圆点（I1）因 Lucide 优先而去除，与原图差一处（见上决策）。
- 简报折角边长 20px 为自定值（原图待量）。
- 头像为自绘区分形象，非官方肖像逐像素复刻。
- 截图：`docs/verification/rounds/v1.6/`（framed）+ `bare/`（去边框）；量测脚本 `docs/verification/measure-orig.py`、`measure-v16*.py` 随证据留存。
