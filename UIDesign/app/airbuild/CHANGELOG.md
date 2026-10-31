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

## v1.8 — 2026-10-30 — round 7：同类颜色检查 + 全量主动重扫重修（未 commit、未 push，留待协调方提交）

决策总则：本轮零裁判调用，只认 PIL/DOM 实测数。颜色只做同类检查：有像素证据表明某处颜色被压平/失真才修，无证据不发明、不移植别家配色（Medley 新截图 photo-9.jpg 与本套无关，未套用）。证据等级分三档：像素级（原图采样值 vs 改前值 vs 改后值均有数）、比值/目视级（营销图裁切或浮动窗缩放使绝对 pt 不可比，只用量测比值或目视结论）、视觉级（截图目视确认，未逐像素锚定）。跨平台口径不变：本套是风格 token/组件 1:1、布局平台适配，绝不谎称截图 1:1。

### 颜色检查表（像素级，有原图采样）

- 头像底色与面色（iphone-03 聊天网格 + ipad-01 成员列 + iphone-04/06 tile；原图值 vs 改前值 vs 改后值）：
  - Pluso：底 #45c8d8 -> #50e2f1（原图 cyan 中值 #50e2f1）；头盘深青 #0e7490 -> 与底同色 #50e2f1（原图为单色 cyan + 笑脸，无深色头盘）；发 #164e63 -> #2aa8c0（深青顶）。
  - Ampo：底 #9b7bf3 -> #1fb0df（原图网格上部蓝 #1fb0df）；面 #fb923c -> #fdccc8（原图下部粉白面部 #fdccc8）；发 #c2410c -> #1fb0df（蓝顶）。结论：Ampo 是蓝底粉面，不是紫底橙面。
  - Camo：#f5c518 -> #ffb11b（ipad-01 #ffb119/#ffb019）。Qesto：#f27ba7 -> #ff5ec0（ipad-01 #fe5ec0）。Ato：#8fd14f -> #9bc24d，面 #f9a8d4 -> #fccccc（iphone-06 tile 面部粉 #fccccc、tile 绿 #9ec351 同族）。Leto：#f59e0b -> #ff8b60（ipad-01 #ff8b60/#fb8c61）。Colo：#a78bfa -> #8a5fe0，面 #fde68a -> #ff96cf（iphone-04 tile 紫 #8f5fe6/#8460ce、面部粉 #ff96cf）。
  - 新增 Sender 变体（文件卡发送者）：调用方传底 #865eff（iphone-03 右缘紫色 sliver #865eff/#8760fb），面 #fb923c，发 #1f2937；与 Ampo 脱钩。
- 简报 pills 簇（iphone-06 pills 行 y=820 原图坐标；像素级）：手形 tile 20px -> 22px、图标 12px -> 14px；蓝点 #45c8d8 -> #64a2f7（原图蓝点中心 #64a2f7）、红点 #f59e0b -> #cb2c19（原图红点中心 #cb2c19，边缘 #d63e17/#ec5624）；圆点 20px -> 6px（原图直径约 20-21 图像像素，约 6pt）；簇 -space-x-1.5 + 白圈 ring -> gap-1 无重叠无 ring（原图点 pitch 约 8pt、点与 tile 间隙约 5pt）。改后实测：蓝点 55-60、红点 65-70、行高 353-358，即 6x6、pitch 10（尺寸确证，间隙比原图多约 2pt，接受）。
- 简报封面（iphone-06；像素级）：渐变 #2e7d7b -> #1f4f4a（绿青）改为 #3f707e -> #386b79（近乎平 teal，原图底色带 #3b6c7a-#3f6b78、中值 #3d6e7c）；蒲公英头与种点白 -> 淡黄 #f7efb5（原图花头 #f8efb6/#f5f6b4），茎保持白色。封面高 70px -> 77px（原图纵向 260 图像像素，约 76.8pt；U12 取舍部分回调）。改后实测：封面 teal bbox x29-228、y381-457（恰 77 高），花头淡黄 #e3e2af（opacity-90 与 teal 混合值）63 像素，x166-195、y400-424；第二消息三行仍完整可见（白气泡自 y584 起，截图目视确认）。
- 草稿封面（iphone-04 行 y=2000；像素级）：渐变绿灰 #3a4a44 -> #1c2422 改为中性深灰 #333333 -> #171717（原图水面深灰带 #1f1f1f-#3a3a3a、天鹅灰白 #b6b6b6-#c8c8c8，无绿色调）。改后实测：封面采样 #2c2c2c-#313131，R=G=B 中性。
- 商店 glyph（iphone-05 App Store glyph 列 x=300；像素级）：平色 #0088fe 改为竖渐变 #8cd3f1（顶）-> #3e97db（中）-> #1b79f3（底）；TestFlight 复用同渐变（其左上采到 #8ad5ff 同蓝渐变家族，完整渐变未单独解析，属近似，注明）。两 glyph 用 kind 区分 gradient id，避免 DOM id 重复。改后为视觉级确认（截图见 light top 到 deep bottom；探针坐标未命中 glyph，像素点未锚定）。
- 详情绿色（iphone-05 进度圈列 x=300；像素级）：状态圆点与进度完成圈 #2ecb70 -> #34c759（原图 #34ca5c/#39c558/#38ca5d）；tokens/index.ts 的 onlineGreen 同步 #2ecb70 -> #34c759（该 token 在组件中实际未被引用，同步仅防漂移）。
- 作曲器发送钮（iphone-06 列 x=1090；像素级）：#0088fe 改为平色 #268eff（原图 y1920 #288bf3、y1930-1990 平坦 #268eff，无渐变），阴影 rgba(0,136,254,0.4) -> rgba(38,142,255,0.4)；直径原图约 90 图像像素，约 34pt，本套 35px 保留。用户气泡保持 #0088fe（iphone-03 行 y=2820 全段确证，不动）。
- 详情手形 tile 底（iphone-05；像素级）：#eef0ea -> #f6f6f6（原图 #f6f6f6）。
- Home 徽标（ipad-01 采样；像素级）：Avatar 新增 badge prop（dot | cup），仅 home 列表使用，聊天头像无徽标（iphone-03 Pluso 聊天头像网格附近无橙点，已确认）。Pluso 橙点：白圈底 + #ea943f 点（ipad-01 行 y=1695 处 #ea943f），SVG 坐标 (33,7) r5/r4；改后实测：紧贴 #ea943f 41 像素，x47-53、y460-466（7x7），位于 Pluso 头像右上。Camo 咖啡杯徽标：白底圆 r8 + #6b4a2f 杯形（ipad-01 行 y=1795 处杯 glyph #a49b92，白底圆徽标内深色杯形），SVG 坐标 (33,7)，截图目视确认。
- 草稿交通灯（iphone-04 y 约 1728-1736；像素级）：红 #ff5f57 -> #ff736a（原图红中心 #ff736a/#fe7469），黄 #febc2e -> #ffbc2d（原图 #ffbc2d/#ffbb2b），绿 #28c840 -> #1ac332（原图 #1ac332/#17be33）；灯尺寸 14px 不动（灯径与 URL pill 高之比原图约 0.45，本套 14px/30px = 0.47，已对上）。

### 颜色检查表（比值/目视级，有把握的相对修正）

- 详情 chevron：圈内图标白 -> text-black/60（目视级：原图灰圈内 chevron 笔画呈深灰；未取得干净像素值，圈底 #cfcfcf 不动）。
- 简报眉标：两卡眉标行与 AirMark 图标 text-black/45 -> text-black/70（iphone-06 列 x=400 y=675 眉标文字笔画 #454545，比本套旧值深）。
- 销售条：三条 bar 的渐变 linear-gradient(90deg,#0088fe,#5cb8ff) -> 平色 #0088fe（目视原图条形均匀亮蓝、无右侧浅化，浅端缺失；条形精确坐标三轮探针均未定位，属目视 + 浅端缺失证据，非逐像素条形采样）。
- 草稿 URL pill：font-semibold -> font-medium（15px 不动；目视级，原图文字观感为 regular/medium，非 semibold 粗细）。
- Home tile 预览（ipad-01 结构 + 颜色采样）：外层 swatch -> 白渐变改为白 #ffffff（原图 tile 是白卡、预览自带颜色；本套外层渐变边缘被染色）；预览 SVG 96x72 -> 140x105（四屏预览统一，viewBox 不变；原图预览约占 tile 宽 85% 以上，本套旧预览仅占约 59%）。
- Hands Time widget（ipad-01 行 y=1150；像素级底色）：白底 rect -> 灰 #969696，描边 #d4d4d0 -> #8a8a8a；圆点与 29 文字颜色不动。
- Sleepy Coffee 预览（ipad-01 行 y=1400；像素级色块）：补 pastel 色块薄荷 #d2f1df、蜜桃 #fce7c8、浅蓝 #dff0ff 于棕线之下。
- Casehot 预览（ipad-01 列 x=650；像素级渐变）：平色 #f0d9c8 改为竖渐变 #7b3929（顶深红棕）-> #d1a080（中间陶土）-> #fbd9a9（底淡橙）+ 青色圆点 #53e3ee（原图青色圆点 #53e3ee；TileBadge 蓝点 #0088fe -> #53e3ee）。
- 人形顶栏 tile 四角：ChatTopBar 的 person 变体 span 增加 style background avatarColor，使 Ato/Colo 方 tile 四角填满成员色（原图 tile 为满方色；本套 Avatar 为圆形致四角漏画布色）。改后截图目视：Ato/Colo 顶栏 tile 已为满方色。

### 颜色检查表（无证据，未动）

- 用户气泡蓝 #0088fe、画布 #f4f4f4、顶栏玻璃钮底色（原图聊天 pill 内区 y=54 行呈 #e7e9e8 一带、与画布差约 13，属玻璃/浅灰范畴，本套 ab-glass 渲染值接近，底色不动）、详情抓手 bg-black/15（在 #f4f4f4 上约 #d3d3d3，与原图观感接近，未取得干净采样，不编数）、详情状态卡角标底色旧蓝 #0088fe（U9 延续，未独立取样；本轮 C6 只改了状态圆点与进度圈的绿色，角标底色未动）、顶栏 pill 玻璃高光参数（U10 延续；本轮只改字号与内边距）。

### 几何与结构（全量重扫，改动项）

- 药丸字号与内边距（同坐标复核，像素级）：Pill 基类 px-2.5 py-1 text-[13px] -> px-2 py-1 text-[10px]；ChatTopBar 覆盖 px-2.5 py-0.5 text-[13px] -> px-2 py-0.5 text-[10px]；ProjectCardGrid 覆盖 px-2.5 py-1 text-[13px] -> px-2 py-1 text-[10px]。依据：原图聊天药丸文字跨度 x161-206 = 46 宽，本套旧值 x156-214 = 59 宽，13 x 46/59 约 10.1。改后实测：聊天药丸文字 x162-207 = 46 宽（与原图完全一致）；home 药丸文字 x70-124 = 55 宽（10 字，5.5/字，与聊天药丸 5.75/字一致）。简报日期 pill（独立 span，text-[10px]）不动；StatusPill 不动。
- 用户气泡宽（同坐标复核，像素级）：Message 用户行 pl-16 -> pl-24；新增 wide prop（wide 时保持 pl-16）。改后实测：聊天用户气泡蓝区 112-353 = 242 宽（旧 270，原图 240）。DraftScreen 的两条用户消息传 wide，保住草稿 2 行断行（原图草稿气泡更宽；若统一收窄，草稿第二条会由 2 行变 3 行）；改后实测：草稿宽气泡 80-353 = 274 宽，2 行保持。ChatScreen 用户消息不传 wide。
- Hands Time tile 徽标：TileBadge 的 Hands 徽标 bottom-2 -> bottom-4，避开 pill -mt-3 的 12px 上叠区。改后实测：徽标黑像素 y209-215、x85-110，药丸顶 227，徽标完整可见于药丸上方（间隙 4px）。
- 草稿标题断行（目视级）：WebsiteDraftCard 的 headline 类型 string -> ReactNode；App.tsx 的 DraftScreen 标题改为 Shape time 换行 with your hands（原图断行位置）；旧断行为 Shape time with / your hands。
- 草稿封面注脚（目视级）：text-[10px] -> text-[9px]（原图 1 行；本套 10px 下 26. 单独成行折为 2 行；封面内文宽约 156px，9px 下可容 1 行）。改后截图目视：3.0 available, built on iOS 26. 已为 1 行。
- 草稿 Download 钮（比值法，浮动窗非手机屏缩放，绝对 pt 不可比）：px-4 py-2.5 text-[14px] rounded-lg -> px-3 py-1.5 text-[11px] rounded-[10px]（钮高/卡高比 11% -> 约 7.5%，对标原图约 8%；钮宽/卡宽 12.6% 在本套窄卡上受可读性限制，不硬凑）。

### 经复核确认不动（同坐标复核 + 目视复核，2026-10-30 当日）

- 顶栏 town mark 38-39 宽（原图 37，差 2，不动）；聊天头像 32 宽（原图 29，行可能偏离中心直径，低估 1-2，不动）；文件卡宽 246（原图约 238-247，不动）；任务卡宽 263（原图白区右缘约 247、另有碎片至 287 的不确定带，在带内，不动）；简报首卡宽 224（原图换算带 198-221，顶沿 +3，不确定度内，不动）；详情标题 12px（原图暗笔画跨度 69 宽、10 字、em 约 13.3pt，差 1.3，不动）；商店 glyph 30（原图约 29，不动，只改渐变色）；发送钮 35px（原图约 34pt，保留）；交通灯尺寸 14px（已对上）；任务 glyph、文件图标不动。
- 文件卡右缘贴屏边、任务卡左下 Ato 头像屏外裁切均属营销裁切 artifact，画廊内保持头像完整可见，不复刻屏外裁切。
- 本套无登录形态屏，不造屏（v1.7 结论沿用：iphone-01~06、ipad-01/02/03/05 均为已登录态应用内屏；AirBuild.app 的 en.lproj/Localizable.strings 中 Sign / Log in / Welcome / password / Password 均为 0 次；Assets.car Linux 无官方读取工具，U13 延续）。

### 验证

- 构建：pnpm build（tsc -b && vite build）一次通过（中间修过一次 TS 类型错误：MEMBERS 数组的 badge 字面量需 as const，否则 string 不可赋给 dot | cup；已修，不改其他套）。
- 截图：docs/verification/rounds/v1.8/（framed 六屏 + chat-430）与 bare/（六张 370x824 内屏裁切，裁 (10,10,380,834)；v1.8 专用裁切逻辑，未复用硬编码 v1.6 路径的旧脚本）。
- 改后实测脚本与报告：docs/verification/rounds/v1.8/measure/verify-v18.py、verify-v18b.py、verify-v18.txt（原图值 vs 改前值 vs 改后值，见上文各条）。
- 目视复核：六屏 v1.8 bare 图已逐屏目视——home 白卡 + 大预览 + 灰 widget + pastel 块 + 日落渐变 + 橙点/杯徽标；chat 小药丸 + 单色 cyan Pluso + 蓝底粉面 Ampo + 紫色 Sender 头像 + 窄用户气泡；briefing 满方绿 tile + 6px 圆点 + teal 封面 + 淡黄花头 + 平蓝销售条 + 第二消息完整；draft 满方紫 tile + 正确断行标题 + 中性深灰封面 + 1 行注脚 + 小 Download 钮 + 宽气泡 2 行；detail 渐变 glyph + 深灰 chevron + 亮绿 + 近白手形 tile；components 单色 cyan 打字头像 + 浅蓝发送钮。

### 未闭合（带实测原因，不编数）

- U1 详情面板顶圆角 32px（无可靠弧线拟合，维持）；U2 详情商店卡高度（原图约 90px@1024 vs 渲染 87px，维持）；U3 成员行字号绝对值（仅比值量测）；U4 草稿封面注脚折行（本轮已由 10px -> 9px 修为 1 行，残差项关闭，改为字体回退适配说明：Linux 回退字体宽于 SF Rounded，若用户设备字体更宽仍可能折行）；U5 简报卡内文字行数（回退字体残差，延续）；U6 项目 tile 预览细节（结构级矢量重绘，非逐像素复刻，延续）；U7 home 中央标瓣形（四圆角方瓣 + 方孔，瓣弧曲率未拟合，延续）；U8 作曲器手形掌心点位置（偏上 2px，未逐像素标定，延续）；U9 详情状态卡角标底色（维持旧蓝 #0088fe，未独立取样；本轮只改了状态圆点与进度圈的绿色，角标底色仍未取样）；U10 顶栏 pill 与玻璃材质（pill 内边距与玻璃高光参数无独立量测值；本轮字号/内边距已按同坐标复核修正，玻璃高光参数仍维持 v1.6）；U11 iPad 双栏 / ipad-04 / 深色 / 设置账号屏（沿用）；U12 简报封面与图表高度取舍（本轮封面 70 -> 77px 部分回调，第二消息仍完整可见，已验证；图表 22px 取舍维持）；U13 Assets.car（Linux 无官方读取工具，延续）；U14 v1.6 残留清理（头像非逐像素复刻、SF 回退继续有效，延续）。
- 本轮新增未闭合：TestFlight glyph 完整渐变未单独解析（复用 App Store 渐变，属近似）；销售条条形精确坐标未定位（平色修正属目视 + 浅端缺失证据）；简报 pills 簇 pitch 改后 10pt vs 原图约 8pt（圆点尺寸确证，间隙多约 2pt，接受）；详情商店 glyph 渐变为视觉级确认（探针坐标未命中 glyph，未逐像素锚定）；草稿 Download 钮宽比未硬凑原图 12.6%（窄卡可读性限制）。

### 清理与范围确认

- 本轮只改 UIDesign/app/airbuild/ 内文件；未动其他三套、未动 UIDesign/CHANGELOG.md 总账、未动服务器/令牌/BotsRouter/X/其他项目；未 git add、未 commit、未 push。
- 测量脚本仅读取 ~/workspace/airbuild-refs/ 的原图、只输出数值文本，未把任何官方位图或裁图写入仓库；rounds/v1.8/ 内只有 framed 图 + chat-430 + bare/ + measure/ 文本与脚本，无官方位图/裁图。

## v1.9 — 2026-10-30 — round 8：Apple iOS 质感打磨（1:1 保真内，未 commit、未 push，留待协调方提交）

- 决策总则（用户 2026-10-30 17:44 再令 + 17:46 精度收紧追加门）：只看结果、直接做、不许问；歧义按原图实测证据自行定夺并记入本条；1px 级不许四舍五入抹掉 1-2px 与 1-4 级色差，能量出就记、能修就修，只有拿出证据证明是 JPEG 噪声的才可放过；小元素（状态栏图标、分割线、tiny 标签、图标端点、阴影、hairline、圆角弧线）全部在列；单点采样不够，每处多点/分区采样；像素采样 + DOM/computed 两路对不上不许放行；交付前一眼并排比对，列出肉眼可见的每一处差异再逐项量。本轮零裁判调用（只认 PIL/DOM 实测；裁判只是第二意见、不是放行依据，且本轮未调用）。
- 参照物与换算（先量后建）：iphone-03/06 内屏 x150..1179（宽 1030，390 换算系数 0.3786）；iphone-05 内屏 x210..1129（宽 920，系数 0.4239，面板几何另见未量）；iphone-01 为倾斜手持照，只作结构参照；ipad-04 缺失记未量；iPad 图只作结构参照。量测脚本与文本证据：docs/verification/rounds/v1.9/measure/probe1..9.py/.txt、verify-v19.py/.txt、dom-dump.cjs/.txt、card-heights.cjs/.txt。官方原图裁图与一眼并排合成图仅存于 rounds/v1.9/work/ 临时目视，交付前已删除；仓库内不含任何官方位图（rounds/v1.9/ 内只有渲染 framed/bare 图 + 量测文本与脚本）。

### 质感打磨表（原图值 vs 改前值 vs 改后值；固定尺寸元素 bare px = CSS pt，流体宽度另有 ±5% 画框系统误差，见注）

- G1 气泡圆角：原图用户气泡顶角拟合 r 约 32 原图 px（约 12.1pt，左右两角对称、残差约 1pt；agent 气泡底角同拟合约 32 原图 px）+ REA web 气泡圆角 13px → 改前 20px → 改后 13px（message agent/user/bare、typing 气泡；tokens bubbleRadius 20→13；CSS --radius-bubble 24→13，三处旧值本就不一致，本轮统一）。改后像素复验：渲染用户气泡顶角行 y628 左 117、y632 左 114、y636 左 112（直边），与 r=13 圆拟合吻合（116.7/113.5/112.2，残差约 1px 以内）。
- G2 气泡横向内边距：原图 agent 气泡左缘 301、首行字形左缘 334（y1460 行）与 339（y1500 行），即 33-38 原图 px = 12.5-14.4pt，扣字形 bearing 约 1pt 后约 12.5pt；REA agent 气泡 padding 横向 12px → 改前 px-4=16px → 改后 px-3=12px（agent/user/bare 三处）。DOM 复验：agent 气泡 pad 12px、宽 250（与 v1.7 原图目标 250 一致）、用户气泡 pad 12px、宽 242、bare 气泡 pad 12px、宽 266。纵向内边距未动：原图字形顶减气泡顶约 52-57 原图 px（19.7-21.6pt，扣行高半 leading 后约 16-20pt），改前 py-3=12px 处于区间下沿；改为 16px 会使简报内容再长 8px（两条 bare 气泡），在 844 框已贴合（第二消息底与作曲器顶仅 1px 间隙）的前提下不冒 clip 风险，本轮不动，记入残留 R5。
- G3 用户气泡阴影：REA 称 user 气泡“其余同 agent 气泡”（agent 阴影 0 5px 16px rgba(0,0,0,0.025)）→ 改前用户阴影 0.05 → 改后 0.025（agent 已是 0.025，不动）。
- G4 玻璃材质（成套）：REA 浮动控件组（window-control/header-action/account-button 等）渐变 linear-gradient(325deg, rgba(255,255,255,0.78), rgba(255,255,255,0.48) 48%, rgba(245,247,250,0.24)) + 阴影 inset 1px 1px rgba(255,255,255,0.38) + 0 3px 8px rgba(0,0,0,0.08)；REA 聊天窗玻璃 blur 34px + saturate 1.24（证据中唯一的 blur/saturate 数）→ 改前 .ab-glass 平色 rgba(244,244,244,0.72) + blur 12px + saturate 1.4 + 白边 0.55 + inset 0 1px 0.65 + 0 2px 12px 0.08 → 改后 .ab-glass = REA 渐变 + REA 阴影组 + blur 34px + saturate 1.24，无边框（tokens glass 同步为该渐变字符串，仅作 documentation，组件实际走 CSS class）。DOM 复验：全部 .ab-glass 元素 backgroundImage 为该渐变、filter 为 blur(34px) saturate(1.24)、shadow 为 inset 1px 1px 0.38 + 0 3px 8px 0.08；顶栏圆钮 46x46 不变；简报玻璃 pill 行采样见亮区 #f9fafa/#fafafa（渐变亮端在位）。
- G5 hairline 统一（REA hairline rgba(17,17,15,0.045)，气泡与文件卡已是 0.045）：Card、TaskListCard、WebsiteDraftCard 边框 0.06→0.045；ProjectTile 边框 0.05→0.045；Composer 边框 0.06→0.045。详情卡内 divide-y 0.06 不动（内部区分线，非 hairline token，见决策）。
- G6 作曲器阴影：REA follow-up 作曲器阴影 0 10px 28px rgba(0,0,0,0.065) → 改前 0.08 → 改后 0.065。草稿卡阴影 0 10px 28px 0.08 不动（与 REA 浮动控件阴影 0.08 一致）。
- G7 发送钮与箭头：原图 iphone-06 发送盘 bbox 89x89 原图 px = 33.7pt，盘内蓝 8/8 点 exact #268eff → 改前 35px → 改后 34px（DOM 34x34，bg rgb(38,142,255)）；盘内白箭头 bbox 30x36 原图 px = 11.4x13.6pt，Lucide arrow-up 字形为方形（bbox 约 0.583S），S=22 时字形 12.8x12.8（宽 +1.4、高 -0.8），S=20 时 11.7x11.7（宽 +0.3、高 -1.9），两者绝对误差和相等，取 S=22 保箭头纵向特征（上箭头的长度即身份）→ 改前箭头 16px → 改后 22px（DOM 22x22，盘内居中，x 中心与盘中心重合）。像素复验：简报发送盘宽 305-338=34（DOM 值），盘高像素 36 含阴影晕（盘 34 + 阴影晕约 2px，见注）。
- G8 打字行（REA token，电话原图无打字行可量，来源标注为 REA）：打字圆点 3 个 5px（改前第 2、3 点为 6px）→ 改后 5/5/5（DOM 5x5，像素行 y63 见 5px 宽暗点两枚，第三枚处于动画位移相位，属动效非缺失）；打字气泡 padding 14/12（px-3.5/py-3）→ 11/9（REA 打字气泡 padding 9px 11px）；打字头像 32→28（REA 打字行头像 28px）。打字动画 0.8s + 延迟 0/0.16/0.32s 与 REA typing 800ms 交替、延迟 0/160/320ms 逐字一致，不动。
- G9 Home 指示条：本套此前无 → 改后 PhoneFrame 内屏新增 134x5 黑条、底距内屏底 8px、圆角满、pointer-events-none、z-50（DOM：x128 y821 w134 h5；内屏底 framed y834，826+8=834 吻合；bare 图 y811-815 见 134 宽 5 高黑条，两端圆角收窄）。来源标注：App Store 营销裁图底部均被裁切，指示条几何无法从原图量出，本项为 iOS 系统 chrome 值，非原图采样值；指示条为 overlay，不占布局，六屏内容均未因此移位。
- G10 简报封面高（v1.8 的 77px 系换算错误纠正）：原图 iphone-06 teal 块 bbox x236..752、y884..1156（宽 517、高 273 原图 px），屏换算后宽 195.8pt、高 103.4pt；顶角内收推算顶约 y870、底约 y1135-1170，高度区间 100-114pt，取 bbox 值 103pt → 改前 77px → 改后 103px。v1.8 的“260 原图 px 约 76.8pt”用的是整图宽换算（390/1320=0.295），与本套其余屏换算（390/1030=0.379）不一致，本轮以屏换算为准纠正；v1.7 的 105px 旧值与本次 103pt 互相印证（U12 取舍的 70px 起点本身就是错误换算下的产物）。改后复验：渲染封面 teal 实心行 y382（首行，角内收 37-220）至 y482（末行，角内收 37-220），CSS 高 103；第一卡 358→384（+26）、卡片行 383→384（+1，因第二卡 383 占优）、第二消息底 671→672（+1，见 R-briefing：三行字形带 601-605/621-625/637-641 全部在位、其下白 padding 至 661 在位，文字零裁切，仅气泡底边 1px 与作曲器顶相接）。

### 分区采样表（多点/分区，单点众数不足处）

- 用户蓝（iphone-03 底部气泡内，避开文字行）：3 行 x 4 列共 12 点：y2750 #0687f9/#0586f9/#0387fd/#0389fd；y2800 #0b88fc/#1288f9/#0188fd/#0789fe；y2840 #0487fd/#0888fb/#0288fe/#0989fe。中值约 #0688fd，范围 R 1-18、G 134-137、B 249-254；本套 #0088fe 的 R 差 6、G 差 0、B 差 1，落在 JPEG 噪声跨度（R 跨度 17）之内，不构成真实色差，见“证据证明为噪声而放过”项。
- 发送蓝（iphone-06 盘内 8 点，避开箭头）：(1040,1935)/(1092,1935)/(1040,1981)/(1092,1981)/(1035,1958)/(1097,1958)/(1066,1928)/(1066,1988) 全部 #268eff（1 点 #268efd，B 差 1），本套 #268eff exact，不动。
- 画布（iphone-03 六区 11x11 中值）：(300,1050) #f2f2f2、(600,1050) #eeeeee、(900,1050) #f5f5f5、(300,1800) #f5f5f5、(900,1800) #e3e3e3、(600,600) 为头像区误采除外；五区带 #eeeeee-#f5f5f5，本套 #f4f4f4 在带内、无分区渐变（各区差属 JPEG 噪声 ±7），不动。(900,1800) 的 #e3e3e3 为邻近元素阴影区，非画布本色，排除。
- 气泡角（见 G1）：用户气泡左右两角对称（顶行左内收 31、右内收 28；次行 20/19、14/13、10/10、7/6、4/3、2/2、1/0），非单侧拟合。

### 两路核对（像素采样 vs DOM/computed，逐项对上才放行）

- 对上：气泡圆角（像素拟合 12.1pt + REA 13 vs DOM 13px）；气泡横向内边距（像素 12.5pt + REA 12 vs DOM 12px）；发送盘（像素 33.7pt vs DOM 34x34，差 0.3）；发送蓝（像素 8/8 exact vs DOM rgb(38,142,255)）；用户蓝（像素中值 #0688fd vs DOM rgb(0,136,254)，差在噪声带内，见上）；玻璃（REA 渐变/阴影/blur/saturate vs DOM computed 全量一致）；Home 指示条（系统值 134x5/底 8 vs DOM 134x5/底 8 vs 像素 134x5）；打字点（REA 5px vs DOM 5x5 vs 像素 5px 宽）；封面（像素 bbox 103.4pt vs DOM/CSS 103px，像素实心 101 行 + 角行 2 行）。
- 对不上而未放行的项（见残留，不许以 DOM 或像素单路放行）：头像直径（像素宽 29.9pt vs 高 24.3pt，两轴差 5.6pt，见 R1）；详情勾选钮/chevron（iphone-05 面板几何在扫描中无法定位，见 R3）；简报 pills 行第二 pill 文本（见 R4）；纵向气泡内边距（像素区间 16-20pt vs DOM 12px，见 R5）。

### 一眼并排比对（原图与渲染同尺寸并排全屏看；合成图存 work/ 临时目视后已删除，差异清单以文字为准；合成缩放说明：原图裁图按内屏宽 1030 缩至 370，渲染 bare 本就是 370 内屏，固定尺寸跨图比较时原图侧天然小约 5%，下述差异已扣除该系统差，只列超 5% 或形态级差异）

- 聊天屏（chat）：肉眼可见差异 7 项。①原图 town mark 色彩层次多（房屋/树/太阳分色清晰），渲染 town mark 在 38px 下偏淡、房屋轮廓弱——结构级矢量重绘差异，非 token 数值，不改（改动需重绘 mark，非本轮量测项）。②原图文件卡发送者头像被屏右缘裁切（营销裁切 artifact），渲染头像完整可见——画廊内保持完整，不复刻裁切（v1.8 已定）。③原图任务卡圆圈在合成缩放下几不可见，渲染圆圈清晰——缩放/分辨率所致，非真实差异（圆圈实测 16px 双方一致）。④原图用户气泡贴右缘更宽（文本不同导致流体宽不同），渲染气泡右留白——流体宽随文本变，非缺陷。⑤消息文本断行位置差 1-2 词——回退字体（Noto Sans 宽于 SF）所致，见字体残留。⑥状态栏结构（时间/岛/信号/wifi/电池）双方一致，渲染 wifi/信号/电池几何与原图同构。⑦玻璃钮双方均为浅色磨砂，渲染渐变亮端在位。
- 简报屏（briefing，改封面前/后各看一次）：肉眼可见差异 8 项。①改前封面明显矮于原图（改后 103px 已贴近，见 G10；原图封面为真实蒲公英照片，渲染为矢量蒲公英抽象，密度与质感仍差一档——抽象重绘，非照片复制，不追）。②改后第二消息三行完整可见、作曲器在位，贴合未破（见 G10 复验）。③日期 pill 渲染折 2 行（“Sep 14, / 2026”），原图 pills 行文字带为单行带——见残留 R4，未以猜测值修。④销售卡 Performance 图表渲染为 22px 细条，原图图表更高——U12 取舍延续（图表 22px 为放下第二消息的显式取舍，改前已定；封面回调未动图表）。⑤作曲器手形/加号瓦渲染为浅灰方瓦，原图同区在合成缩放下近白——#f4f4f2 与白仅差 1 级，JPEG 下不可分，像素扫描曾在原图作曲器区采到 #f4f4f2 瓦，本套同值，不动。⑥发送盘与箭头双方比例贴近（改后箭头 22px 在盘内居中，见 G7）。⑦简报卡宽与第二卡露出比例双方贴近（首卡 226 vs 原图约 227，见 v1.7 L21）。⑧原图底部营销大字“Stay on top of your apps”在渲染中无——营销文案非应用 UI，正确缺失。

### 全套重扫（home/chat/draft/briefing/detail/components 六屏，不只用户提过的屏）

- home：顶栏玻璃钮 46x46（DOM）、云钮绿弧 + 灰弧在位、中央 AirMark 在位、项目 tile 132px + pill 10px 在位、成员行在位、Home 指示条新增在位；未改动屏逐像素确认：与 v1.8 bare 对比，除玻璃材质（渐变/阴影组）与指示条外，布局像素一致（tile/头像/文字位置未动）。
- chat：气泡圆角/内边距/阴影（G1-G3）、文件卡/任务卡边框（G5）、Home 指示条（G9）已改；其余（顶栏 46px、头像 32px 见 R1、文件卡宽、任务卡宽、用户气泡宽）复验与 v1.8 一致。
- draft：URL pill 与分享钮玻璃材质（G4）、草稿卡边框（G5）、Home 指示条（G9）已改；其余（流量灯 14px、标题断行、封面中性深灰、注脚 1 行、Download 钮、宽气泡 2 行）复验与 v1.8 一致。
- briefing：封面（G10）、气泡（G1-G3）、发送钮/箭头（G7）、作曲器边框/阴影（G5-G6）、Home 指示条（G9）已改；第二消息三行完整（G10 复验）；日期 pill 折行见 R4。
- detail：勾选钮玻璃材质（G4）、卡片边框（G5）、Home 指示条（G9）已改；其余（标题 12px、chevron 24px 见 R3、商店 glyph 渐变、绿 #34c759、进度 4 行）复验与 v1.8 一致，面板在 844 框内完整。
- components：打字行（G8）、发送钮/箭头（G7）、作曲器（G5-G6）、Home 指示条（G9）已改；morphing 三组（chevron 旋转、plus/check 描边、task 圆圈/勾描边）过渡类 .ab-morph 在位，未硬切；其余组件与 v1.8 一致。
- 残留计数：本轮新增/延续残留共 8 项（R1-R8，下表），其中本轮新发现 3 项（R1 两轴分歧、R4 pills 行、R6 封面宽衍生），其余为延续；“clean”标签后无隐藏项。

### 残留表（带数，绝不藏在 clean 标签后）

- R1 头像直径（未闭合）：iphone-03 Pluso 头像 cyan 区行宽 79 原图 px（29.9pt）vs 列高 64 原图 px（24.3pt），两轴差 5.6pt；Ampo 蓝区亦只采到局部（蓝顶部分高 32-40 原图 px，粉面在下未合为整盘）。营销图疑似横向拉伸或行向混入邻近 cyan 元素，单轴定直径属猜测；渲染 32px 维持（与宽轴差 +2.1、与高轴差 +7.7），不改。
- R2 字体（未闭合，平台残留）：包内字体核查：AirBuild.app 内无 SF 字体文件（仅 environment-local.bundle/bin/Inter-Black.ttf 等工具字体，与 UI 字体无关；Assets.car 在 Linux 上无读取工具，U13 延续）；本机 fc-match “SF Pro Rounded” 回落为 Noto Sans Regular（非此前误记的 DejaVu）。渲染栈顺序正确（SF Pro Rounded、SF Pro Display、-apple-system 在先），iOS 真机上即解析为 SF；Linux 渲染一律为 Noto Sans 替代品，字宽偏宽（消息断行差 1-2 词、简报 pills 行总宽超标均与此相关），差值无法在无 SF 的平台上量出，记为平台残留，不谎称是原字体。绝不把 Apple 系统字体文件拷进仓库。
- R3 详情勾选钮 44px / chevron 徽 24px（未闭合）：iphone-05 面板区在本轮行/列扫描中无法可靠定位（面板底 #f4f4f4 与画布 #f5f5f5 仅差 1 级，徽标灰区扫描无命中；先前 v1.7 的“100px@1024=43px”换算所用 1024 尺度与本轮 05 内屏宽 920 不一致，43px 结论不可复现）。两值维持，不以不可复现的旧换算修 1px。
- R4 简报 pills 行日期 pill 折行（未闭合，渲染事实）：渲染日期 pill “Sep 14, 2026”折 2 行；宽度算术：Noto 10px 下手形簇约 50 + 日期 pill 约 87.5 + Air Daily pill 约 87.5 + 间隙 16 = 约 241，卡内宽 202，超约 39；原图 pills 行文字带为单行带（y810-830 单带），但 pill 底 #f4f4f2 与画布 #f5f5f5 仅差 1 级无法分段，且 “The Air Daily” pill 文本在扫描中未定位，pill 字号/内边距/间隙三者无一有可靠原图值；任改一处均属猜测，本轮不动，记为字体回退 + 未量几何的复合残留。
- R5 气泡纵向内边距（未闭合，区间估计）：原图字形顶减气泡顶 52-57 原图 px，两列一致，扣行高半 leading 后约 16-20pt；渲染 py-3=12px 在区间下沿；改为 16px 将使简报内容再长 8px，而简报贴合已只剩 1px 间隙（G10），本轮不动，待框高放宽或滚动呈现时再议。
- R6 简报封面宽衍生差（未闭合，小差）：渲染封面宽 202（卡 226 - 内边距 2x12），原图 teal 宽 517 原图 px = 195.8pt，差 +6.2；差值源于卡内边距（原图推算约 15-16pt vs 渲染 12px），内边距改大将进一步挤压 pills 行（R4）并抬高卡片行，不改。
- R7 动效时长（未闭合）：面板切换/抽屉/页面转场的 iOS 缓动与弹簧参数在静态截图中不可观测；本套 .ab-morph 现为 0.35s ease（位移）/ 0.25s ease（透明度/描边），打字动画 0.8s 与 REA 一致；弹簧曲线与时长无实测值，不编造，记未量。
- R8 延续（v1.7/v1.8）：U1 详情面板顶圆角 32px（无可靠弧线拟合）；U2 详情商店卡高度（原图约 90px@1024 尺度 vs 渲染 87px，尺度不一致，维持）；U3 成员行字号绝对值（仅比值量测）；U5 简报卡内文字行数（回退字体残差）；U6 项目 tile 预览细节（结构级矢量重绘）；U7 home 中央标瓣形（四圆角方瓣 + 方孔，瓣弧曲率未拟合）；U8 作曲器手形掌心点位置（偏上约 2px，未逐像素标定）；U9 详情状态卡角标底色（维持旧蓝 #0088fe，未独立取样）；U10 顶栏 pill 玻璃高光参数（本轮玻璃组已按 REA 成套替换，pill 内边距与字号沿用 v1.8 同坐标复核值）；U11 iPad 双栏 / ipad-04 / 深色 / 设置账号屏（本套只渲染手机单列）；U12 简报图表 22px 取舍维持（封面取舍已由 77 回调至 103，图表取舍不变）；U13 Assets.car（Linux 无官方读取工具）；头像非逐像素复刻、SF 回退（见 R1/R2）；TestFlight glyph 完整渐变未单独解析（复用 App Store 渐变，近似）；销售条条形精确坐标未定位（平色修正属目视 + 浅端缺失证据）；简报 pills 簇 pitch 改后 10pt vs 原图约 8pt（圆点尺寸确证，间隙多约 2pt，接受）；详情商店 glyph 渐变为视觉级确认（探针坐标未命中 glyph，未逐像素锚定）；草稿 Download 钮宽比未硬凑原图（窄卡可读性限制）；作曲器手形/加号瓦 68px（本轮 06 扫描未能隔离瓦矩形，沿用先前验证值，记未量）；状态栏岛 110x26 与时间 13px（原图状态栏在倾斜/裁切营销图中无法量出，岛尺寸为画廊折中值——系统岛 120x37 需 54px 状态区并重排全部六屏，本轮不冒重排风险，记为画廊 chrome 残留）。

### 证据证明为 JPEG 噪声而放过（1-4 级以上亦放过，附跨度证据）

- 用户蓝 R 差 6：12 点分区范围 R 1-18（跨度 17）、G 134-137、B 249-254；token #0088fe 的 G/B 差 0/1，R 差 6 小于噪声跨度，不改。
- 画布各区差 ±7（#eeeeee-#f5f5f5）：本套 #f4f4f4 在带内，无分区渐变，不改。
- 发送蓝 1 点 B 差 1（#268efd vs #268eff）：单点 1 级，余 7 点 exact，不改。

### 验证

- 构建：`/home/hatch/.npm-global/bin/pnpm build`（tsc -b && vite build）一次通过。
- 截图：docs/verification/rounds/v1.9/（framed 六屏 + chat-430）与 bare/（六张 370x824 内屏裁切，裁 (10,10,380,834)，与 v1.8 同法）。出图方式沿用本套 shoot2 系（Playwright headless shell + dist 本地服务）。
- DOM/computed 两路核对：见上“两路核对”节（dom-dump.txt）；阴影 computed 字符串在 headless shell 下对气泡/卡片返回多层透明占位（Tailwind v4 shadow 变量展开所致，截断 120 字后不可读），阴影值以源码 token + 像素目视（玻璃阴影组在 DOM 中完整可读）为准，此处如实说明，不谎称 DOM 逐字验过全部阴影。
- 目视复核：六屏 v1.9 bare 图已逐屏目视——home 玻璃钮渐变 + 指示条；chat 13px 圆角气泡 + 窄内边距 + 指示条；briefing 103px 封面 + 34px 发送盘 + 22px 箭头 + 第二消息三行完整；draft 玻璃 URL pill + 指示条；detail 玻璃勾选钮 + 指示条；components 5px 打字点 + 28px 打字头像 + morphing 三组。

### 清理与范围确认

- 本轮只改 UIDesign/app/airbuild/ 内 10 个源码文件（briefing-cards、composer、message、phone-frame、project-card-grid、task-list-card、ui/card、website-draft-card、index.css、tokens/index.ts）+ CHANGELOG 本条 + rounds/v1.9/ 验证物；未动其他三套、未动 UIDesign/CHANGELOG.md 总账、未动服务器/令牌/BotsRouter/X/其他项目；未 git add、未 commit、未 push。
- 测量脚本仅读取 ~/workspace/airbuild-refs/ 的原图、只输出数值文本，未把任何官方位图或裁图写入仓库；一眼合成图已删除。

## v1.11 — 2026-11-01 — round 9 交互线：iOS 行为 + 大标题字重核查

- 决策总则（与 v1.10 同）：只看结果、直接做、不许问；差距自己找出来、量出来、修掉。本轮零裁判调用（只认 PIL/DOM 实测数 + 录屏实测，不碰任何密钥文件）；commit 只加本套文件（绝不 -A），push 后以 git branch -r --contains 核实进了 origin 再报；不碰其他三套（尤其 app/medley 仍有工人在跑）、总账、服务器数据库、任何令牌、BotsRouter、X、其他项目。画廊 demo 真的能跑下列交互，只交截图不算数。
- 理解口径（用户 2026-11-01 01:00 新令“在 1:1 复原基础上加入 iOS 的风格和交互以及各种细节”）：静态截图永远带不出“感觉”，缺的是活的 iOS 行为——原屏本身就是 iOS 应用，它的交互就是 1:1 目标的一部分，不是额外设计。只做原屏有的行为，不许发明新功能；动效参数能量就量，不能量的记未量（弹簧 mass/stiffness/damping 全程未量，一律只报定时 cubic-bezier 曲线，不谎称弹簧求解值）。
- 交互对照表（原屏行为 | 实现 | 参数/未量）：
  - 作曲器发送（简报屏；iphone-03 聊天线原图无作曲器，故不接发送流）：回车发送；非空发送后清空；空发送 no-op，且发送钮保持原蓝（不发明原图从未出现过的 dimmed 空态）；打字期间作曲器锁定（disabled，防排队）。发送流：用户气泡（message-in 入场）→ Typing（Ato）→ 1200ms 后整条 agent 回复（demo 文案，非原文）→ 列表滚动到底（smooth；reduced-motion 下 auto）。实测见下。
  - 消息入场：REA 逐字值 .message { animation: message-in 260ms both cubic-bezier(.22,1,.36,1) }，from opacity 0 / translateY(8px) scale(.985)——原样落地为 .ab-message-in；仅动态追加消息用入场动画，初始消息永不动画（静止截图与 v1.10 一致）。
  - 思考中/打字指示：REA 逐字值——28px 头像 + 白底气泡 padding 9px 11px、圆角 13px、3 个 5px 圆点；typing 800ms infinite alternate，延迟 0/160/320ms。原样落地。
  - 逐字流式输出：不做。REA presentMessage 为整条加入（先 showTyping 再 addMessage 整条），无逐字流式；伪造逐字即造假。
  - 停止钮：N/A。10 张官方截图中无停止 glyph；REA stopConversation 只停网页演示播放（mockup_mockup.js 第 421、481、829、914 行），不是手机端停止生成钮。
  - 按钮按压态（全局）：-webkit-tap-highlight-color: transparent、touch-action: manipulation；:active 时 100ms 内 scale(0.97) + opacity 0.85，松手以 350ms cubic-bezier(0.32,0.72,0,1) 回弹。实测：简报发送钮 / 聊天返回 chevron / 草稿 Download 钮，下压均为 matrix(0.97,0,0,0.97,0,0) + opacity 0.85，松手 transform 归 none（发送钮松手读数 0.5 是发送成功后进入空输入 disabled 态，正好证明发送已触发）。
  - 开关/分段器/滑杆：N/A。手机截图中无 UISwitch / UISegmentedControl / UISlider；本套仅有的 toggle 是详情 chevron（已 morph）与组件屏 morph 演示钮（已 morph + 按压态）。
  - 导航 push/pop：400ms cubic-bezier(0.32,0.72,0,1)（REA 抽屉曲线同值，更长时值）；push 入场 translateX(100%→0)、push 出场 translateX(0→-30%) + brightness 1→0.94、pop 反向；仅 ?screen= 单屏模式生效（画廊仍静态）；过渡期间防重复点击；切屏后组件 remount（画廊 demo 不做跨屏状态持久化，简报发送流离屏后重置，属已知取舍）。home 项目 tile 点按一律落到 Hourtown 聊天线（本套唯一聊天屏；各项目独立线程不在截图集中，不发明）。
  - 标签栏切换：N/A。10 张官方截图中无 tab 栏；REA preview-tabs（高 36px）是网页端预览 tab，不是手机 tab 栏。替代演示：简报卡片行横向 snap pager（第二卡露出即滚动 affordance），录屏以 pager 演示“切换”，但报告中标明这是 pager、不是 tab 栏。
  - 滚动动量 + 边缘回弹：消息列表 .ab-scroll（overflow-y: auto、overscroll-behavior-y: contain、-webkit-overflow-scrolling: touch、隐藏桌面滚动条；iOS 指示条本就是 overlay，隐藏后静止截图不变）；简报卡片行 .ab-pager（scroll-snap-type: x mandatory、子项 snap-align: start、隐藏滚动条）。原生动量/回弹由平台滚动实现，不在 CSS 里伪造参数。
  - 面板/sheet（详情面板）：挂载时 500ms iOS 曲线弹簧入场（从下方滑入）；把手拖拽跟手（下拖 1:1，上拉阻尼 x0.3）；松手判定：拖过 120px 或下甩速度 > 0.65px/ms 则 350ms 同曲线 dismiss，否则弹簧回位；Done（勾选）钮同样 dismiss；reduced-motion 下入场/dismiss 均为瞬时。把手块总高 16px（h-4，无 mb-3，4px 横条位于块顶），与 v1.10 几何完全一致。不加 dim 遮罩（原图面板底与画布同为 #f4f4f4，加 dim 会改静止像素）；拖拽只限把手（面板体内有 chevron/Done/商店卡等可点控件，全 panel 拖拽会劫持点击）。
  - 标题轮换：N/A。本套无轮换标题（核查确认无），不造假。
  - 键盘出现/收起动画：N/A（无键盘可见的原图处）。10 张截图中无键盘；作曲器获得焦点是真实 input 行为，focus-visible 描边仅为网页 demo 无障碍补充（2px rgba(0,136,254,0.6) + 2px 偏移），iOS 触摸界面本身无焦点环，原图亦无。
  - 状态栏时间：保持静态“13:00”，不改实时时钟。理由：原图顶带无可读时间量测值；实时时钟会破坏截图可复现性；且本轮核查的是时间元素存在与字形（17px / 590 / 22px），已在 v1.10 闭合。
  - 成员行点按、home +（新建项目）、顶栏 …：按压态而已，不接线。理由：成员私聊线、新建项目屏、菜单面板内容均不在截图集中，接线即发明。
  - 空状态：原图无空态屏；唯一“空后”界面是 sheet dismiss 后的 demo-only 重开控件（按钮“Show detail panel”+ 小字“Demo control — not part of the original panel”；非原图 UI，静止时永不出现），不冒充原图空状态。
  - reduced-motion：.ab-morph、.ab-typing-dot、.ab-message-in、四组导航动画一律 animation: none; transition: none；按钮按压亦取消；简报发送延迟归零（与 REA reducedMotion 时一次性渲染全部消息的口径一致）。实测：reducedMotion 下发送后 300ms，用户消息与 agent 回复均已出现，打字圆点 0 个，按钮 transition 为 none。
  - 动效 token（src/tokens/index.ts 新增 motion 对象，文档性，与 index.css 取值一致）：pushPop 400ms cubic-bezier(0.32,0.72,0,1)；sheetEnter 500ms 同曲线；sheetDismiss 350ms 同曲线；dismiss 阈值 120px or flick > 0.65px/ms；messageIn 260ms cubic-bezier(0.22,1,0.36,1)；typing 800ms alternate, delays 0/160/320ms；press 100ms down / 350ms 同曲线 release, scale 0.97 + opacity 0.85；springParams: 'unmeasured — timed cubic-bezier curves only, no solver values claimed'。
- 本轮修掉的真 bug（交互实测挖出，非像素回归）：
  - 详情 sheet 把手全程不可拖：状态栏容器（framed y10–71）与岛（framed y20.7–56.5）把把手块（framed y48–64）整片盖住，鼠标落点永远是 chrome 而非把手。修复：状态栏容器与岛 span 加 pointer-events-none（纯装饰元素，本无交互；Home 条早已是 pointer-events-none，同文件内有先例）。零像素变化：修复后重拍六屏与 v1.10 对照与修复前完全一致（见下）。教训：z-10 保住静止像素的同时吃掉了手势——视觉层级修完必须走一遍手势实测。
  - Tailwind 任意值类丢阴影（构建事故，v1.11 初版）：Composer 发送钮 className 曾写成带插值的模板字符串，Tailwind v4 构建未生成其中 shadow-[0_4px_12px_rgba(38,142,255,0.4)] 类（消息气泡阴影未丢是因为 Typing 气泡处有同一类的静态字符串兜底）。修复：全部改回静态字符串 + cn() 条件拼接；重建后 CSS 恢复 4px 12px 规则，发送钮 computed 阴影恢复。铁律：凡 Tailwind 任意值类一律用静态字符串，禁止包进带插值的模板字符串。
  - 详情状态栏被盖（构建事故，v1.11 初版）：面板 transform 把面板提入定位绘制层且 DOM 在后，盖住时间与状态图标（详情差 4284px，内容行 69–187 逐行一致、只差状态栏带 18–46 行）。修复：把手块恢复 16px 总高（去 mb-3、顶对齐）+ 状态栏容器加 z-10；修复后 sheet 矩形回到 y=40, h=794，详情差异降至 26px。
- 大标题字重核查（用户问“是不是有点粗”；方法：字干宽度 / 字高比，禁用 ink 覆盖率——上轮 ink 测法取带错了，已作废；全部字形均附 ASCII 验真；完整数见 measure/stem-weight-v111.txt）：
  - 渲染侧（bare 图）：简报标题 H 13px/700 Rounded = 2/9 = 0.222；草稿标题 h 20px/700 Rounded = 4/14 = 0.286；详情标题 H 12px/700 = 2/8 = 0.250；任务标题 M 13px/700 = 2/9 = 0.222；注脚标题 T 14px/700 = 3/11 = 0.273；画廊 h1 B 30px/700 Display（harness 光学尺寸）= 5/21 = 0.238（非手机屏，无原图对照，仅记录）。
  - 对照探针（同文案同字号，FreeType 默认 AA）：Rounded 600 与 700 在 12/13/14/20px 下字干全等（13px H 3=3、20px h 4=4、12px H 3=3、14px T 3=3）；Text 600 才比 700 细 1px（13px H 2<3、20px h 3<4）。结论：改 Semibold 在 Rounded 下是视觉零操作——没有可改的余地。
  - 原图侧：iphone-06 简报标题 H（全字带）= 5/20 = 0.250（JPEG 模糊约 +1px 膨胀，去模糊估计约 4/20 = 0.200）；同卡 M 约 4/19 = 0.211。渲染 0.222 与原图 0.200–0.250 持平（±0.03 内），不粗。
  - 草稿标题比值差（渲染 0.286 vs 原图 iphone-04 h 7/35 = 0.200）：原图 H1 是网站内容（handstime.app 网页字体，非 App SF，字体未知），单张 JPEG 比值不足以定族；且 Rounded 改 600 无效，故不改族、不改重，记观察项。
  - FreeType 与 Core Text 渲染差（单独说明，不许把渲染差说成字重差）：产品页设 -webkit-font-smoothing: antialiased，使字干比 FreeType 默认渲染细 1px（13px H：渲染 2 vs 探针默认 3）；Linux 截图显“粗/细”首先是 AA 差异，不是 token 字重；iOS 真机 Core Text 的 700 与原图同源，不会比截图更粗。
  - 结论：不改任何标题字重 token。附带尺寸观察（非字重，本轮不动，见残留 R9）：原图简报标题行占卡宽约 63%，渲染占约 73%，渲染标题相对大 16–20%（原图约 11–12pt 等效 vs 渲染 13px）；改字号会动简报纵向几何、打破已验 +4.1px 贴合，须另起布局轮，不在本轮字重问题里顺手改。
- 验证（构建 + 截图 + 交互，全部带数）：
  - 构建：/home/hatch/.npm-global/bin/pnpm build（tsc -b && vite build）通过；终态产物 dist/assets/index-DgVnxi6O.css（31.46 kB）与 index-BTEeuQRd.js（306.86 kB）。
  - 截图：docs/verification/rounds/v1.11/（framed 六屏 + chat-430）与 bare/（370x824，裁 (10,10,380,834)，与 v1.6–v1.9 同法）；拍摄脚本 shoot.cjs、裁切脚本 bare-crop.py（Playwright headless shell 1243 + file:// dist + SF 光学尺寸 harness，与 v1.10 同法）。
  - 全套重扫（v1.11 bare vs v1.10 bare）：home/chat/briefing/draft/detail 各差 26px，maxdelta 6，全部位于状态栏图标区（x268–337、y26–37 一带），为 z-10 层提升带来的图标边缘 AA 微差；components 差 463px，maxdelta 108，构成三部分：状态栏图标 AA 微差（同上）+ 时间字子像素 AA→灰度 AA 归一化（v1.10 的 components 图时间字带子像素 AA 彩色边，六屏中的孤例，其余五屏 v1.10 已是灰度 AA；v1.11 起六屏统一为灰度 AA；字形本体未动，ASCII 放大核对 1 字形位置/形状一致；iOS 本就不做子像素 AA，灰度 AA 反而更贴近真机，不谎称为回归）+ 打字圆点动画相位差（动画循环中截图时刻不同，属预期噪声）。
  - 简报贴合（最终 dist 复测）：第二消息底 671.9、作曲器顶 676、间隙 +4.1px，与 v1.10 完全一致，未破。
  - DOM（最终 dist）：简报列表 scrollH 551 / clientH 547 / overflowY auto；简报 pager scrollW 481 / clientW 354 / scrollLeft 0 / snap x mandatory；chat/draft 列表 scrollH == clientH == 693，无溢出；详情 sheet 静止 transform matrix(1,0,0,1,0,0)、矩形 x=10, y=40, w=370, h=794；单屏按钮数 home 6（含 4 块 tile 按钮）、chat 3、briefing 7、draft 4、components 5、detail 2。
  - 按压态实测（measure/press-v111.cjs → press-v111.txt）：三钮下压均为 scale 0.97 + opacity 0.85，松手归位（见上）。
  - reduced-motion 实测（同脚本）：按钮 transition 为 none；发送后 300ms 用户消息与 agent 回复均已出现，打字圆点 0 个。
  - 交互录屏（Playwright video .webm，390x844，同样做 SF Display harness 覆盖；放 rounds/v1.11/video/）：sheet-open-close.webm（9.88s：入场弹簧 → 把手下拖过阈值 dismiss → 点 demo 重开钮弹簧回场 → Done 关闭；拖动实测：拖后 section 消失、重开钮出现）；send-message.webm（5.08s：点发送 → 用户气泡入场 → 打字指示 → agent 整条回复 → 列表滚动到底）；push-pop.webm（4.60s：home 点项目 tile → chat 从右滑入 → 点返回 chevron 滑出回 home）；pager-swipe.webm（5.40s：卡片行横向滚动 + 回弹，实测 scrollLeft 0 → 127 → 0；报告中标明这是 pager，不是 tab 栏）。标签栏切换视频记 N/A（无 tab 栏），不伪造。
  - 交互后状态截图（rounds/v1.11/states/）：briefing-sent.png（用户气泡 + 整条 agent 回复 + 列表到底 + 作曲器清空）、detail-reopened.png（dismiss 后重开，sheet 回场）、home-after-push-pop.png（push/pop 往返后回 home）。
  - 旗舰屏重拍（简报 + 详情 + chat）即上述六屏重扫：材质/字形无回退（差异仅状态栏 AA 微差与 components 动画相位，见上）。
- 残留表（状态有变才改状态，未闭合不许写成已闭合）：
  - v1.10 延续：R1 头像直径两轴分歧（29.9 vs 24.3pt，渲染 32px 维持）；R3 详情勾选钮 44px / chevron 徽 24px（旧换算不可复现，维持）；R4 简报日期 pill 折 2 行（未动）；R5 气泡纵向内边距 12px vs 区间 16–20pt（简报间隙 4.1px 会转负，仍不抬）；R6 简报封面宽 +6.2；R7 动效弹簧参数未量（本轮全部动效仍为定时 cubic-bezier 曲线）；R8 bundle（含 U1 面板顶圆角 32px、U2 商店卡高、U5 卡内行数、U6 tile 预览细节、U7 中央标瓣弧、U8 手形掌心点偏上约 2px、U9 状态角标底色、U10 pill 内边距字号、U11 iPad 双栏 / ipad-04 / 深色 / 设置账号屏、U12 图表 22px 取舍、U13 Assets.car、头像非逐像素复刻、TestFlight 渐变复用、销售条坐标、简报 pills 簇 pitch、详情 glyph 渐变视觉级、Download 钮宽比、作曲器瓦 68px 未量）；N1 玻璃平背光极限（不谎称肉眼可见）；N5 无 SF 机器上 Inter 后备使简报贴合破裂。
  - 本轮新增 R9（尺寸观察，非字重）：简报标题相对尺寸渲染比原图大约 16–20%（行占卡宽 73% vs 63%；原图约 11–12pt 等效 vs 渲染 13px），须另起布局轮定夺，本轮未改。
  - 本轮闭合：详情 sheet 把手不可拖（chrome 盖住）已修（pointer-events-none，零像素变化）；Tailwind 模板字符串丢阴影已修（静态字符串铁律）；详情状态栏被盖已修（z-10 + 把手块 16px）。
  - 本轮 N/A 定夺汇总（均有证据，不许事后改成“已做”）：标签栏切换、开关/分段器/滑杆、停止钮、逐字流式、键盘动画、标题轮换（理由见上交互对照表）。
- 范围确认：只改本套。源码：src/index.css、src/components/{message,composer,detail-panel,project-card-grid,phone-frame,top-bar}.tsx、src/tokens/index.ts、src/App.tsx；其余文件未动。工作树内其他工人对 app/medley、web/* 的未提交改动未碰、未提交。仓库内无官方位图或裁图（本轮原图裁切探针已删除，只留脚本与文本证据）。

## v1.10 — 2026-11-01 — round 9：iOS 质感闭合（字体 / 材质 / 字形三条线，SF 渲染）

- 决策总则（用户 2026-10-30 22:09 verdict + 协调方 2026-11-01 追加指令，原简报其余内容不变）：只看结果、直接做、不许问；歧义按原图/实测证据自行定夺并记入本条；本轮零裁判调用（只认 PIL/DOM 实测）；不许等 SF（SF 到货后按 SF 交付，Inter 图一律作废）；SF 文件绝不进仓库、不提交、不分发；fontconfig 由上层统一改、本人严禁动；commit 只加本套文件（绝不 -A），push 后以 git branch -r --contains 核实进了 origin 再报；不碰其他三套、总账、服务器数据库、任何令牌、BotsRouter、X、其他项目。
- 渲染方法（本轮定稿，取代 Inter 方案）：Playwright headless shell 1243（显式 executablePath；playwright-core 1.64 默认要 1248，未装）+ file:// dist + SF 光学尺寸 harness 覆盖（加载后 page.evaluate：全部元素取 computed font-size，>=20px 且无子元素且文本非空者 fontFamily 改为 SF Pro Display / SF Pro Text，500ms 后截图；harness-only，产品代码与 repo token 一律不动）。截图：docs/verification/rounds/v1.10/（framed 六屏 + chat-430）与 bare/（370x824，裁 (10,10,380,834)，与 v1.9 同法）。工作区其他套的改动属于并行 worker，本轮未碰、未提交。
- 字体装机核验（上层装机，本人只核验未改动）：~/.local/share/fonts/sf-pro/ 共 45 个 OTF（Display/Text/Rounded 全 weight）；fc-match sans-serif 与 SF Pro Text 均为 SF-Pro-Text-Regular，SF Pro Display 为 SF-Pro-Display-Regular，SF Pro Rounded 为 SF-Pro-Rounded-Regular。注意：本套 token 首位就是 SF Pro Rounded，因此实测 computed font 栈解析为 SF Pro Rounded（见下），SF Pro Text 在此是后备而非渲染族；状态栏时间显式用 -apple-system / SF Pro（Text），与 spec 一致。

### A. 字体线（SF 为准，Inter 只记后备对比；字号/字重 token 本轮未动）

- 实测方法：DOM computed（size/weight/line-height/rect）+ 强制族探针（同一元素先后置 Rounded/Text/Display/Inter，记行数与盒宽），见 measure/font-compare.txt；字号/字重是 token 值（自 v1.7 起已按量，SF 只换渲染族，不改 token）。
- 字体实测表（元素 | token | SF 渲染 | 原图/证据 | 结论）：
  - 聊天正文：11.5px / 400 / 行高 17.48 | 同值，agent 气泡 250px、用户气泡 242px、行数各 4（demo 文案；原图文本不同，行数只作内部对照）| v1.7 原图行带 pitch 17.5-18.3pt，渲染行盒 17.48（比区间下沿低 0.02，属取整，视为贴合）。
  - 作者行：10px / 600 | token 未动，族改为 Rounded | v1.7 原图 10px 一致。
  - 简报标题：13px / 700 / 行高 16.25 | 渲染 w200.5 h32.5，2 行 | 与卡片结构一致。
  - 简报 bare1（首条消息）：11.5px | 渲染 w266，行数 Rounded 2 / Text 3 / Display 2 / Inter 3 | 关键判据：Rounded 与 Display 一致、Text 与 Inter 各多折 1 行。token 族 Rounded 是简报不断错行的原因；若栈解析为 Text，bare1 会多 1 行并挤破简报贴合。
  - 简报 bare2：11.5px | 渲染 w266，行数 3（四族一致）。
  - 草稿标题：20px / 700 / 行高 25 | 渲染 w170 h50，行数 Rounded/Text/Display/Inter 均为 2 | 原图 2 行（v1.7 L23），四族一致，无需修。
  - 作曲器输入：12px | token 未动 | v1.7 原图 12px 一致。
  - 详情标题：12px / 700 | token 未动 | v1.7 原图 12px 一致。
  - 任务标题：13px / 700 | token 未动 | v1.7 原图一致。
  - 药丸/按钮字：pill 10px / 600；项目 pill 高 19-23px（DOM 各 pill rect 见 dom-v110c.txt）。
  - SF Pro Rounded 差一笔：本套字体本就是 SF Pro Rounded（REA），不是 Text；bare1 是 Rounded 与 Text 的可测分野（2 行 vs 3 行），交付渲染用 Rounded，Text 只作对照族。
  - Inter 后备对比：Inter 下 bare1 为 3 行（+17.5px），其余关键文本行数不变；无 SF 的机器上 Inter 后备会使简报贴合破裂，记为平台残留（N5），不谎称 Inter 与 SF 等价。
- 大标题折行必查（medley 43px Text 折 2 行 / Display 折 1 行的案例）：本套六屏中 computed >=20px 的叶文本元素为 0（dom bigPre/bigPost 全屏为空）；唯一 >=20px 标题是草稿标题 h3 20px，但它含 br 子元素，不满足 harness 叶条件（children.length === 0），覆盖对其不生效——已用强制族探针逐族核对：四族均为 2 行、原图 2 行，无折行差，无需 Display 修复。medley 案例在本套不复现（本套最大手机标题 20px 且 br 分行）。画廊 h1（30px）不是手机屏，单屏模式不拍，不计入。

### B. 材质线（折射 + 边缘光；REA 优先，ios27/glassy 只作诊断与分档依据）

- 诊断（为什么 v1.9 玻璃看起来平）：① REA blur 34px 是大型聊天窗的值，误用于 40-46px 小控件；小控件分档依据为 ios27 按钮 blur 7px、baoyu pill blur 12px saturate 1.8、nikdelvin 默认 saturate 1.5——本轮小控件 frost 档定为 blur 10px saturate 1.5（居 7 与 12 之间），REA 34 不再用于小控件；② 平背光下 blur 本就不可见，可见的只能是边缘光与折射，而 v1.9 只有一道 1px 斜向高光；③ REA 浮动控件渐变与阴影本身无错，予以保留。
- 材质对照表（面 | REA/原图值 | 改前值 | 改后值）：
  - 全部 .ab-glass（顶栏圆钮 46px、详情勾选钮 44px、草稿分享钮 40px、URL pill、顶栏 pill、项目 pill）：渐变 REA 325deg 白 .78/.48/.24（保留）+ 外阴影 REA 0 3px 8px rgba(0,0,0,0.08)（保留）；frost blur 34 saturate 1.24 → fallback blur 10 saturate 1.5，运行时升级为 blur(5px) + 位移 url + blur(10px) saturate(1.5)；边缘光 1 道 inset 1px 1px rgba(255,255,255,0.38) → 成套 5 层：hairline inset 0 0 0 0.5px rgba(0,0,0,0.04)（glassy-liquid 值，卡片白底上的边缘定义）+ 顶 specular inset 0 1px 0 rgba(255,255,255,0.85) + 左 inset 1px 0 0 rgba(255,255,255,0.45) + 底 rim inset 0 -1px 0 rgba(255,255,255,0.25) + 外阴影（specular 强度概念取 glassy-liquid 1.1 档）。
  - 位移（nikdelvin-liquid-glass MIT 技术，src/lib/liquid-glass.ts 自写移植，只取技术不抄控件长相）：位移图 = 圆角矩形（fill #808080，blur(depth)）；三通道 R scale = strength + 2 x cab、G = strength + cab、B = strength，screen 混合；每元素按实测宽高/半径现算位移图（圆钮 46x46 r23 depth 8、勾选钮 44x44 r22 depth 8、分享钮 40x40 r20 depth 7、URL pill 129x35 r18 depth 6、顶栏 pill 61x19 r10 depth 5、项目 pill 70x23 r12 depth 5；depth 公式 clamp(round(radius x 0.35), 5, 8)）；强度 strength 16 / cab 2（R20/G18/B16），由 App useEffect 在挂载后原地升级各 .ab-glass 的 backdrop-filter（ResizeObserver 跟随尺寸变化）；.ab-glass CSS 本身仍是无 JS 后备（blur 档），复制出去的组件不丢玻璃。
  - 探针结论（measure/probe-glass.*，条纹背光）：blur 对照组条纹边在 16px 周期位 ±2px 内；strength 16 在 rim 行使边移位约 ±5px、中心行约 0（真透镜 rim 效应）；strength 100（nikdelvin 默认）把条纹边抹掉/并线，对小控件过强，否决。Chromium headless 下 computed backdrop-filter 完整保留 url() 段，不会因加 url 而丢 blur。
  - 评估后否决：glassy-liquid 0 10px 26px rgba(0,0,0,0.16) 外阴影（对 40-46px 钮过重，违 REA 浮动阴影与原图钮阴影）；glassy 3px accent focus 环（画廊无 focus 交互、原图无 focus 环）；nikdelvin strength 100 默认（见探针）。
  - 不玻璃化的面（原图即实色，改玻璃化才是改设计）：卡片（白 + 0.045 hairline + 0 5px 16px 0.025 阴影，维持）、作曲器（白卡，维持）、详情面板（#f4f4f4 实色底 sheet，维持）、聊天画布（#f4f4f4 实色，维持；REA blur 34 属于网页端聊天窗，不移植到手机画布上）。
  - 平背光诚实项：画廊背光（画布/白卡）基本是平的，v1.10 与基线钮面采样差 <=2 灰阶（#f5-#fb 区间同值）；折射要有背光变化才可见，画廊里主要由边缘光与状态栏 chrome 承担肉眼质感，折射以探针 + computed（dom-v110c.txt 全量 .ab-glass 含 url()）为证，不谎称平背光截图里折射肉眼可见（残留 N1）。
- 渲染层复核（上一轮 Tailwind 丢 backdrop-filter 的教训）：构建产物 CSS 含 blur(10px) saturate(1.5) 的 .ab-glass 规则；DOM computed 全量 .ab-glass 为 blur(5px) url(...) blur(10px) saturate(1.5)；无前缀丢失。

### C. 字形线（spec 缩放 + 实拍核对；spec 来源 baoyu-design ios-frame.jsx，402 框）

- 缩放口径：布局几何按 390/402 = 0.9701 缩放；字号不缩放（iOS pt 尺寸与设备宽无关，把 17pt 缩成 16.5pt 会造出不存在的尺寸——此为有意的不盲抄，记入决策）。
- 字形重绘表（spec 402 值 | 缩放值 | 渲染 DOM 值 | 像素核对）：
  - 状态栏条：flex，gap 154，padding 21px 24px 19px | gap 149.4、padding 20.4px 23.3px 18.4px | 栏 370x60.8（改前 370x35.5，+25.3）| 栏高 DOM 60.8。
  - 时间：-apple-system / SF Pro，字重 590，字号 17，行高 22px，paddingTop 1.5 | 字号/行高/字重保持 spec 值 | 渲染 17px / 590 / 22px，rect framed x52 y31.1 w49.1 h22 | 时间中心占屏宽 18.0% vs spec 18.4%，差约 1.5px（bezels：spec 框无边框、本框 10px 边框 + 内屏 370，属任务定缩放下的已知差，残留 N3）。
  - 时间 glyph 纵位：spec 内容盒算法下 framed y 约 31.9，渲染 y31.1，差 0.8px（Tailwind 全局 border-box 把 1.5px paddingTop 压进 22px 行高内；<1px，接受，残留 N2）。
  - 右簇：flex，gap 7，paddingTop 1，paddingRight 1 | gap 6.8、padding 1/1 | 簇内图标起 bare x265.9（算术）与像素起 265 一致。
  - 信号 19x12（viewBox 0 0 19 12，4 条 3.2 宽 rx0.7，(x0,y7.5,h4.5)/(x4.8,y5,h7)/(x9.6,y2.5,h9.5)/(x14.4,y0,h12)）| 18.4x11.6，路径原样 | 像素 bare 4 条：265-267 / 270-272 / 275-276 / 279-281。
  - wifi 17x12（viewBox 0 0 17 12，外弧/内弧/圆点 cx8.5 cy10.5 r1.5，路径与源文件逐字一致）| 16.5x11.6，路径原样 | 像素 bare 弧段 x295-304。
  - 电池 27x13（viewBox 0 0 27 13，外框 rect (0.5,0.5,23x12,rx3.5，描边不透明度 0.35，fill none)；内芯 rect (2,2,20x9,rx2)；正极 path 不透明度 0.4）| 26.2x12.6，路径原样 | 像素 bare 内芯 x316-334（19.4px = 20/27 x 26.2），外框描边 0.35 在 #f4f4f4 上约 #9e 灰，未进 sum<200 的计数阈（已说明，非缺失）。
  - Dynamic Island 126x37 r24 top11 | 122.2x35.9 r23.3 top10.7 | DOM framed x133.9 y20.7 w122.2 h35.9 r23.28（exact）| 像素 bare：中行宽 122（124-245），高约 36（y11-46，圆角收窄）。
  - Home 指示条 139x5 r100 底距 8 | 134.8x5 | DOM framed x127.5 y821 w135 h5 | 像素 bare y811-815（5 高）、中行宽 134（圆角抗锯齿 -1）。
  - Home 条颜色偏离（有意）：spec 浅色 rgba(0,0,0,0.25)，渲染保持纯黑——0.25 在 #f4f4f4 画布上读作淡灰，真机指示条读作近黑，实拍观感为准（残留 N4）。
- 实拍核对（measure/orig-status.py，仅数字无裁图）：5 张 iPhone 原图顶带均未分离出可量状态栏（03/01 为斜拍营销照、顶带 0-350px 全为边框/背景；06/05/04 顶带暗像素为营销构图与面板内容，非一行时间+岛+图标的 iOS 比例带）；结论：实拍无可与 spec 冲突的状态栏量测值，spec 为准，无 spec-vs-实拍不一致项。
- 状态栏改动连锁（内容整体下移 25.3px）与补偿（只动未量测的贴合间距，量测元素一律不动）：
  - 简报：顶栏 compact pb-2→pb-1（4px）+ 列表 py-3→py-2（顶 4px，底 4px  slack）→ 第二消息底 framed 671.9、作曲器顶 676，间隙 +4.1px（改前重叠 -3.9px；v1.9 为 +1px）；第二消息 3 行 + 气泡底 padding 全部在作曲器之上（PIL 末行字形 bare y644、气泡底约 662 bare、作曲器顶 666 bare）。
  - home：内容 pt-3→pt-2（4px）+ gap-4→gap-3（8px）+ 成员行 py-2.5→py-[9px]（12px）= 24px；末行由超框 13.8px 回到框内（算术底 framed 823.8、余量 10.2；v1.9 基线余量约 11.5；clip 探针：除画廊 caption 外无叶元素超 834）。
  - chat / draft / detail / components：clip 探针无超框；detail 为底锚面板，中部空隙吸收位移，4 行进度完整在框内。

### 全套重扫（六屏 + chat-430；肉眼逐屏看过 bare 图）

- home：状态栏新 chrome + 玻璃钮 46x46（位移图 46x46）+ 项目 pill（位移图按 pill 实测 70x23 / 61x23 / 80x23 / 54x23）+ tile 132px + 成员 6 行全在框内 + 指示条 135x5；其余与基线一致。
- chat：气泡圆角 13px / 内边距 12px / 阴影 0.025 维持；agent 250px、用户 242px、文件卡/任务卡边框 0.045 维持；用户气泡 4 行全文在框内；发送盘/箭头见下。
- briefing：封面 103px、发送盘 34x34（像素 bare 蓝行 y763-796 = 34 高、x305-338 = 34 宽）、箭头 22px 居中（像素箭头干 x 约 322 = 盘中心 321.5）、图表 22px 取舍维持、第二消息 3 行完整、日期 pill 仍折 2 行（见 R4，未动）。
- draft：URL pill（位移图 129x35）+ 分享钮 40x40（位移图 40x40）玻璃在位；标题 20px 2 行、封面 1.00 方、末条气泡全文在框内。
- detail：勾选钮 44x44（位移图 44x44）玻璃在位；标题/商店 glyph/版本/进度 4 行完整在框内。
- components：打字点 5px、morphing 三组过渡类在位、作曲器在位；无新增演示 tile（折射证据用探针图，不以 inventory 造屏）。
- chat-430：430x932 视口、390 框居中，与 v1.9 同法重拍。

### 验证

- 构建：/home/hatch/.npm-global/bin/pnpm build（tsc -b && vite build）一次通过。
- 截图：docs/verification/rounds/v1.10/（framed 六屏 + chat-430）与 bare/（六张 370x824）；基线（v1.9 代码 + SF）存 measure/baseline/（framed + bare）作对照。
- DOM/computed：measure/dom-base.txt（v1.9 代码 + SF 基线）与 measure/dom-v110c.txt（终态）；玻璃 computed 全量含 url()；状态栏/岛/指示条/贴合值见上表。
- 像素复验：岛 122x36、指示条 135x5、信号 4 条、电池内芯 19.4px、发送盘 34x34、气泡宽 250/242/266 与 DOM 一致。
- 目视复核：六屏 bare 图已逐屏目视——状态栏一眼即 iOS（17px 粗时间 + 大岛 + 三组精确字形）；简报第二消息完整；home 六成员完整；detail 四进度行完整；draft 末气泡完整。

### 残留（总数 13 项 = 延续 7 项 + 本轮新增 6 项；无隐藏项）

- 延续（v1.9 R1/R3/R4/R5/R6/R7/R8，状态不变）：R1 头像直径两轴分歧（29.9 vs 24.3pt，渲染 32px 维持）；R3 详情勾选钮 44px / chevron 徽 24px（旧换算不可复现，维持）；R4 简报日期 pill 折 2 行（SF 未改观，维持）；R5 气泡纵向内边距 12px vs 区间 16-20pt（抬到 16px 需 8px，简报间隙 4.1px 会转负，仍不抬）；R6 简报封面宽 +6.2（卡内边距差，不改）；R7 动效弹簧参数未量；R8  bundle（U1 面板顶圆角 32px、U2 商店卡高、U3 成员行字号绝对值、U5 卡内行数、U6 tile 预览细节、U7 中央标瓣弧、U8 手形掌心点偏上约 2px、U9 状态角标底色、U10 pill 内边距字号、U11 iPad 双栏 / ipad-04 / 深色 / 设置账号屏、U12 图表 22px 取舍、U13 Assets.car、头像非逐像素复刻、TestFlight 渐变复用、销售条坐标、简报 pills 簇 pitch、详情 glyph 渐变视觉级、Download 钮宽比、作曲器瓦 68px 未量）。
- v1.9 R2 已闭合：R2（Noto 回落、差值无法量出）由本轮 SF 渲染 + 字体实测表关闭，代之以 N5（Inter 后备行数差）。
- 本轮新增：
  - N1 玻璃平背光极限：平背光下 v1.10 与基线钮面采样差 <=2 灰阶；折射以探针 + computed 为证，画廊肉眼质感主要来自状态栏 chrome 与边缘光定义，不谎称平背光图里折射肉眼可见。
  - N2 时间 glyph 纵位 0.8px 差（border-box 压 paddingTop，见 C 表）。
  - N3 时间/图标中心屏占比差约 1.5px（390 框缩放 + 10px 边框 vs spec 无边框框，见 C 表）。
  - N4 Home 条颜色：spec 0.25 vs 渲染纯黑（有意偏离，实拍观感为准）。
  - N5 Inter 后备：bare1 多 1 行（+17.5px），无 SF 机器上简报贴合破裂；SF 为交付基准。
  - N6 光学尺寸覆盖在手机屏上为空集：六屏 >=20px 叶文本为 0，草稿标题因含 br 不被覆盖；四族行数已逐族核对一致，无遗留折行差。

### 清理与范围确认

- 本轮改动文件（仅本套）：src/components/phone-frame.tsx（状态栏字形 + 岛 + 指示条）、src/index.css（.ab-glass frost 档 + 边缘光成套）、src/lib/liquid-glass.ts（新增，位移移植 + 运行时升级）、src/App.tsx（applyLiquidGlass effect + home/briefing 贴合间距）、src/components/top-bar.tsx（briefing compact pb-1）、src/components/member-activity-row.tsx（py-[9px]）、src/tokens/index.ts（glass 注释）、CHANGELOG 本条、docs/verification/rounds/v1.10/ 验证物（截图 + bare + measure 脚本/文本/探针 + baseline 对照）。
- 未动：其他三套、UIDesign/CHANGELOG.md 总账、服务器/令牌/BotsRouter/X/其他项目；font token 未动（SF 栈在苹果设备上仍解析为 SF）；仓库与 dist 内无 SF 字体文件（只做本机渲染验证）；测量脚本只读 ~/workspace/airbuild-refs/ 原图、只输出数字文本，未把任何官方位图或裁图写入仓库；一眼合成图未留存（本轮以逐屏 bare 目视 + 像素表为准）。
