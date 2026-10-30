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

## v1.7 — 2026-10-30 — round 6：登录形态核查 + 全套漏网重扫重修（未 commit、未 push，留待协调方提交）

- 决策总则（用户 2026-10-30 亲令）：只看结果、直接做、不许问；歧义按原图实测证据自行定夺并记入本条；round 5 接受过的残差不自动沿用，逐项重测；“已修复”只认实测到 1:1 的项，其余一律进未闭合。本轮零裁判调用（只认 PIL/DOM 实测）。

### 工作一：登录形态核查——结论：本套无登录形态屏，不造屏

- 核查过的屏（原图基准）：App Store iPhone 图 iphone-01（home）、iphone-02（home 全景）、iphone-03（聊天串）、iphone-04（网站草稿）、iphone-05（详情面板）、iphone-06（每日简报）——全部为已登录态应用内屏；App Store iPad 图 ipad-01（home+聊天）、ipad-02（聊天）、ipad-03（详情面板）、ipad-05（草稿+聊天）——同为已登录态（ipad-04 缺失 404，v1.0 已知）；~/workspace/airbuild-refs/user-photo-chatroom-crop.jpg（macOS 三栏聊天室，已登录）；~/workspace/airbuild-rea/AIRBUILD-REA-20261029.md（声明未登录分析的仅为公开网页层，其唯一账号提及为网页 mockup 的 account-button 控件，非登录屏）。
- 包内资产核查：~/workspace/airbuild-pkg/app/AirBuild.app 的 en.lproj/Localizable.strings（725,312 字节）中 Sign / Log in / Welcome / password / Password 均为 0 次；Assets.car 为编译二进制、Linux 无官方读取工具（见未闭合 U13）；environment-local.bundle 内无 .xcassets。
- 结论：本套不存在 welcome / sign-in / 账号入口屏；所谓“登录页底色”问题属于另一套的 welcome 屏，不导入本套。本套不新增任何登录屏。
- 本套现有屏亦无账号入口控件可比对：顶栏仅有云同步钮、+ 钮、返回/更多钮，均已按原图核对（见下）。

### round 5 漏网清单（本轮补修，每项：原图值 → 改前值 → 改后值）

- L1 聊天气泡行高：原图行带 pitch 46–48px@1024（17.5–18.3px@390），改前 leading 1.35，改后 1.52（agent 与用户气泡同改）。正文 11.5px 经字带与行宽双重验证，维持。
- L2 作者行：原图作者/正文字带比约 0.77–0.79、作者行宽 14px/字@1024（约 10px@390），改前 11px/mb-1，改后 10px/mb-[7px]（气泡顶-作者底 19px@1024 = 7.2px@390）。
- L3 agent 气泡宽：原图 657px@1024 = 250px@390，改前行 pr-8 时渲染 266px，改后行 pr-12，实测 247px（Δ3，近 1:1）。
- L4 文件卡宽：原图 659px@1024 = 251px@390，改前 68%（渲染 230px），改后 74%，实测 247px（Δ4，近 1:1；余差为头像半叠与舍入）。
- L5 文件卡字：原图文件名/元数据字带 33px@1024（em 约 10.8px@390），改前 13/13px + py-3，改后 11/11px + py-3.5（高 58px vs 原图 60px，Δ2）。
- L6 任务卡标题 glyph：原图为两行“圆+线”（首圆带勾），Lucide list-checks（线上的勾）形态错误；改后自绘 TaskGlyphIcon（同手形/tray share 的 Lucide 缺位先例）。标题 14→13px、条目 14→12px（原图条目圆 16px 已确认）。
- L7 任务卡结构：原图 iphone-03 卡底完整圆角、无 View-task 行（iPad 卡有该行，手机基准优先），改前带 onAction 行，改后去掉；卡左下原图有 Ato 式重叠头像，改后任务行加 32px Ato 头像（items-end gap-2，卡 flex-1，行 pr-8），实测卡宽 263px（原图 257–264px，1:1）。
- L8 顶栏圆钮：原图 120px@1024 = 45.7px@390（v1.5 的 48px 为误估），改前 42px，改后 46px（chat + home 通用）。
- L9 home 云钮：原图为左下绿色弧段 + 淡灰轨迹，改前为绿圆点，改后为 SVG 双弧（绿弧 165°→120°、灰弧过底部）。home 中央标：原图为淡色实心四叶标（方孔、无茎），Lucide Clover（描边+茎）形态错误，改后自绘 AirMarkIcon（四圆角瓣 + 方孔，#e0e0dc）。
- L10 状态栏：原图含信号 + wifi + 电池三组，改前缺 wifi，改后补三弧 wifi glyph（信号与电池之间）。
- L11 作曲器手形：原图为实心黑手 + 白色掌心点，Lucide 描边手形态错误，改后 HandSolidIcon + 白点（v1.6 详情手形已确立的先例；v1.6 残留“掌心圆点因 Lucide 优先而去除”就此作废）。
- L12 作曲器输入字：原图字带 31px@1024（含升降部，JPEG 阈值下限）+ 行宽 406px/25 字 → em 约 12px@390，改前 18px（约 2 倍），改后 12px（py-3 不变，行高与原图一致）。复核说明：初值 10px 系按 0.94em 带高误算，行宽法纠正为 12px。
- L13 简报消息形态：原图 iphone-06 / iphone-04 的简报与草稿消息均无作者行、无头像（顶栏人物即发言人标识），改前为标准作者行消息，改后新增 Message bare 变体（仅气泡，行 pr-[72px]，气泡上限 266px，与聊天 agent 气泡一致；11.5px/1.52）。
- L14 简报/草稿顶栏：原图顶栏中央为人物（简报 Ato 绿 #8fd14f、草稿 Colo 紫 #a78bfa 的圆角方 tile + 名字 pill），非项目标，改后 ChatTopBar 新增 mark="person" 变体（38px Avatar 裁成 rounded-[12px] 方 tile）。
- L15 简报首卡结构：改前顺序为眉标→标题→正文→照片→At a glance→底部 plain 日期行，改后按原图重排为眉标（AirMark + Made in airbuild 小写）→标题→正文→药丸行（手形白 tile + 蓝/橙头像点 + Sep 14, 2026 pill + The Air Daily pill）→照片→At a glance；底部 plain 日期行删除（App 侧 date 入参相应改为 Sep 14, 2026）。
- L16 简报折角：v1.6 的 20px 自定值错误，原图折边底腿约卡宽 35–40%、右腿约卡高 17%（227px 卡约 84×56px），改后 FoldCorner 改为 84×56px 渐变三角 + 投影，两卡同改。
- L17 销售卡统计：原图 1204 Downloads +18%、$386 Est. Proceeds +10%（改前 +22% 系误读）+ 第三项 4.8 / US App Store，改后三列（label 10→9px 使 label+delta 单行），统计值 18→16px、label 11→10px。
- L18 销售卡标题：原图两行“Hands Time [小手标] / Sales Report”，改后 title 入参改为 ReactNode（手形标 + br），两卡眉标 Share 由 plain 文本改为 pill。
- L19 Performance 区：改前仅有点线无坐标，改后补副标题行（A STRONGER FINISH TO THE WORK 左 + Daily first downloads 右，单行不折）、Y 轴 100k/50k/20k/10k/0、面积填充 + 点线、周一至周五 5 点 [0.18, 0.5, 0.75, 0.3, 0.5]（改前 8 点配 5 日标签，点数与标签错位）。
- L20 Discovery & Monetization 区：改前整区缺失，改后新增（标题、FROM DISCOVERY TO DOWNLOAD + Product page conversion: 14%、Search/Browse/Referrals 约 100%/88%/72% 蓝渐变条）。
- L21 简报卡宽：原图首卡 598px@1024 = 227px@390，改前 62%（渲染 210px），改后 67%，实测 223px（Δ4，近 1:1）。
- L22 简报第二消息被裁：改前第二消息被 overflow-hidden 卡行推出 844 框（v1.2 起的残留），改后经 DOM 量测逐轮裁剪直至完整可见：销售卡图表 64→22px 高、统计/标题/副标题间距收紧、首卡封面 105→70px（见 U12 取舍）、简报顶栏 compact（pb-4→pb-2）、列表 gap-4→gap-1.5、作曲器包 pb-3→pb-2；终态第二消息三行 + 气泡底 padding 全部在作曲器之上（截图目视确认）。
- L23 草稿卡：流量灯原图 13.1px@390（34–35px@1024，pitch 57–58），改前 16px，改后 14px；分享标原图为 iOS tray+arrow，Lucide Share（三节点）形态错误，改后自绘 ShareTrayIcon；标题 24→20px、副标题 14→11px；网格 grid-cols-2 改为 grid-cols-[170px_1fr]（封面 144px）使标题折 2 行（Shape time / with your hands）、副标题 1 行；窗口圆角 28→24px、封面圆角 20→12px、封面注脚 12→10px。
- L24 详情标题与 chevron：原图标题字带 28px@1024（em 11–13px@390），改前 17px，改后 12px；chevron 原图为 24px 浅灰圆 badge + 白色箭头（改前为裸灰箭头），改后灰圈白箭头，旋转 morph 保留（ChevronMorphIcon）。
- L25 详情状态卡：原图状态字带 34px（12px@390）、更新字带 24px（9px@390）、绿点 22px@1024（10px@390）、角标 55px@1024（24px@390）且 glyph 为白色画笔（非勾选），改前 16/14/8/20px + 蓝圈白勾，改后 12/9/10/24px + 蓝圈白画笔（BrushIcon）；tile 52→56px、勾选钮 44px 维持（原图 100px@1024 = 43px@390，确认无误）。
- L26 详情版本/进度/商店：原图 section label 27px@1024（12px@390），改前 15px/mt-5，改后 12px/mt-4；版本行 label/value/action-sub 改前 15/16/13px + py-3.5，改后 12/14/11px + py-3；进度行改前 15/13px + py-3.5，改后 13/11px + py-3；商店 glyph 28→30px（原图 70px@1024）、店名 16→15px、卡 padding p-4→p-3.5。
- L27 详情进度第 4 行：改前 DetailPanel 忽略 done、一律渲染绿勾且只有 3 行；原图面板（ipad-03 同款面板完整版）实有第 4 行 Prepare Version / Build 3.1.5 (373) is ready to test，且未完成态为空心蓝环（非绿勾）；改后 done=false 渲染空心蓝环，App 侧补第 4 行；面板经上述缩尺寸后在 844 框内完整容纳（终态截图：Progress 卡底在 824 内高内，见验证）。
- L28 项目 tile 预览：改前 Hands Time 为单表盘、Sleepy Coffee 为杯子、Casehot 为落日横幅；按 ipad-01 改后：Hands Time 为双 widget（Dot Counter 29 + Angle 时钟）+ 底部中央黑手 badge；Hourtown 地图 + 右下小地图 badge；Sleepy Coffee 为 mini 列表 + 杯 badge；Casehot 为气泡 note + 蓝头像点 + 手机 tile。tile 132px、pill 13px 维持（v1.6 已验证）。附：iphone-01 倾斜照的“白卡包 tile”旧读法已由 ipad-01 平铺裁图纠正——tile 本为全幅圆角矩形，无包层改动。

### 决策与依据（本轮新定）

- 手机基准优先：iphone-05 面板被营销裁切时，以 ipad-03 同款完整面板补全第 4 进度行；iPad 卡的 View-task 行不导入手机任务卡。
- 字体量测方法：字带高度在 JPEG 阈值下易低估（细笔画丢失），凡行宽可算者以行宽法（字符均 advance 约 0.52em）校核字带法；作曲器 10px→12px、作者行 9px→10px 均为此次校核结果。
- 844 框适配优先于单元素绝对值：简报封面 105→70px、图表 64→22px 为框内放下第二消息的显式取舍（记入 U12），其余文字与结构量测值未动。
- 图标口径：Lucide 优先；仅当原图 glyph 类在 Lucide 中不存在时自绘（本轮新增 AirMarkIcon、ShareTrayIcon、BrushIcon、TaskGlyphIcon；状态切换类图标仍 morph、不硬切）。
- 官方位图零复制：本轮量测用的原图裁图仅存于 docs/verification/work-v17/crops/，交付前已删除；仓库内不含任何官方位图（见清理项）。

### 验证

- 构建：`/home/hatch/.npm-global/bin/pnpm build`（tsc -b && vite build）通过。
- 截图：docs/verification/rounds/v1.7/（framed：home/chat/briefing/draft/detail/components-390.png、chat-430.png）+ bare/（六张 370×824 去边框版）。出图方式沿用本套 shoot2 系（Playwright headless shell + dist 本地服务），未发明新方式。
- 改后实测值（bare 图 PIL 量测）：文件卡 247px（目标 251）、任务卡 263px（目标 257–264）、agent 气泡 247px（目标 250）、简报首卡 223px（目标 227）；简报第二消息三行完整可见；详情面板 4 行进度全部在框内；草稿标题 2 行、副标题 1 行。

### 未闭合（带实测原因，不编数）

- U1 详情面板顶圆角 32px：未获可靠弧线拟合（营销裁切 + 面板底与画布近色），维持 32px（iOS sheet 惯例值）。
- U2 详情商店卡高度：原图约 90px@1024 vs 渲染 87px，卡高维持（padding 已按量改 p-3.5；高度差 3px 内不硬凑）。
- U3 成员行字号绝对值：iPad 左栏字带仅得名/状态比（约等大），无手机屏绝对 px；渲染 15/14px 维持，记为比值量测、非绝对量测。
- U4 草稿封面注脚折行：原图 1 行，渲染在 Linux 回退字体下折 2 行（回退字体宽于 SF Rounded）；不改文案、不缩字号硬凑，记为字体回退适配残差。
- U5 简报卡内文字行数：首卡 glance、销售卡 body 在回退字体下行数与原图营销裁图不完全一致；内容与字号已按量，行数差记为字体回退残差。
- U6 项目 tile 预览细节：ipad-01 裁图仅能定结构（widget/地图/列表/note），tile 内小元素绝对尺寸未逐项量出；预览为结构级矢量重绘，非逐像素复刻。
- U7 home 中央标瓣形：原图瓣为花瓣形（外凸弧），渲染为四圆角方瓣 + 方孔（40px 下观感一致）；瓣弧曲率未拟合，记为近似。
- U8 作曲器手形掌心点位置：原图白点位于掌心，渲染白点位于 tile 中央偏上 2px；手形路径为 Lucide hand 实心化改绘，掌心坐标未逐像素标定。
- U9 详情状态卡角标底色：画笔 glyph 已确认，角标底色在裁图中与 tile/阴影混杂，维持旧蓝 #0088fe，未独立取样。
- U10 顶栏 pill 与玻璃材质：玻璃钮直径 46px 已量，pill 内边距与玻璃高光参数无独立量测值，维持 v1.6。
- U11 iPad 双栏 / ipad-04 / 深色 / 设置账号屏：沿用 v1.6 未闭合（本套只渲染手机单列；ipad-04 官方图 404；无公开图不造屏）。
- U12 简报封面与图表高度取舍：封面 105→70px、图表 64→22px 偏离原图量测值，系为 844 框内放下第二消息的显式取舍；如后续放宽框高或改滚动呈现，应先恢复 105px/64px 再重验。
- U13 Assets.car：沿用 v1.6 未闭合（Linux 无官方读取工具）。
- U14 v1.6 残留清理：v1.6 残留中的“详情底溢”本轮已闭合（L27）；“掌心圆点去除”已作废（L11）；“折角 20px 自定值”已纠正（L16）；其余 v1.6 残留（头像非逐像素复刻、SF 回退）继续有效。

### 清理与范围确认

- 已删除 docs/verification/work-v17/crops/（全部官方原图裁图）；保留 work-v17/before/（v1.6 渲染基线）、量测/探针脚本与 shoot.cjs、measure17*.cjs 作为工作证据。
- 本轮只改 UIDesign/app/airbuild/ 内文件；未动其他三套、未动 UIDesign/CHANGELOG.md 总账、未动服务器/令牌/BotsRouter/X/其他项目；未 git add、未 commit、未 push。
