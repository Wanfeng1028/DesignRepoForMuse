# UIDesign 全面审查总表 20261030（只审不改）

- 审查对象：UIDesign 四套（web/airbuild v1.1、app/airbuild v1.5、web/medley v1.2、app/medley v1.4），分支 main，基线提交 909dee0。
- 方法：实测数据为唯一依据。行级数据直接摘自四套 audit 文件原文（仅去表头、分隔行与 web/airbuild 的“一致”行），未改任何数值；各套明细证据、量测记录、token 对照表见各套 audit 文件。
- 归一化：不同分辨率图片比较前一律归一化（长度同时报原始 px 与占屏宽百分比）；字体报 cap 高与 cap/0.72 换算估计字号（注明假设）；颜色为 5x5 patch 均值。
- 基准局限（四套一致）：AirBuild 包内 xcassets 仅含 AppIcon 与 MadeWithAirBuild，无聊天室 token；Assets.car 在 Linux 上无官方工具可读，未引用其数值；用户视频截帧仅作结构参照，不作像素基准；Medley 以三张用户 HD 原图为准。
- 本文件只审不改，不含任何 src/样式/token 改动；设计决策一律留给用户。

## 0. 总计（行级摘录核验）

| 套 | 差距行数 | critical | major | minor | 含待量标记行 |
|---|---|---|---|---|---|
| web/airbuild | 36 | 2 | 9 | 10 | 17 |
| app/airbuild | 30 | 5 | 21 | 4 | 4 |
| web/medley | 58 | 5 | 40 | 13 | 3 |
| app/medley | 40 | 7 | 14 | 19 | 0 |

差距行合计：164 行（critical 19、major 84、minor 46；其中 24 行同时带待量标记）。纯待量行（无严重度等级）15 行，全部在 web/airbuild（36 = 2 + 9 + 10 + 15）。
另：各套待量事项清单（独立于差距行，见各套文件）：web/airbuild 17 项、app/airbuild 17 项（T01–T17）、web/medley 21 项、app/medley 16 项（T1–T16），合计 71 项。

## 1. 各套差距总表（原文摘录）

### web/airbuild（证据：UIDesign/web/airbuild/docs/verification/audit-20261030.md）

#### 1.1 布局结构

| L03 | S | sidebar-collapsed 会话补偿 | REA 表述：侧栏宽 0、会话左 padding 补 174px | 顶栏会话区 padding-left 174px 已落实；但消息流 padding 仍为 16px（README 自述 stream unshifted） | 口径不明 | minor | 待量（需确认 REA 的 174px 指顶栏还是消息流） | - |
| L04 | M | 窗口右列内容 | 用户照片右列：服务模块列（AirFeedback / AirPayment / AirRouter / AirKnowledge / AirTraffic，彩色小图标加右侧圆形钮） | 窗口预览列为 iPhone 预览（270px 手机框），服务列只在画廊第 5 节单独出现，不在窗口内 | 内容完全不同 | major | 已证实 | - |
| L05 | P | bottom module bar 存在性 | FAIL 判决称渲染里有底部模块条 | 三张窗口截图里全无；代码上 AppWindow 从不渲染 BottomModuleBar（仅画廊第 5 节） | 判决对象不存在 | critical（判决问题，非渲染缺陷） | 已证实 | Q1/Q2/Q3 |
| L06 | P | 右侧 avatar blob 存在性 | FAIL 判决称底部条右侧头像 blob 被画成实色块 | preview-collapsed 右侧带无头像列；可见头像均为左侧 28px 圆盘加两眼（A02），非实色块 | 判决对象不存在 | critical（判决问题，非渲染缺陷） | 已证实 | Q1 |
| L07 | M | 中央交付物卡 | 用户照片中央：Save for Later 卡（深色手机 mockup 加红色按钮） | 消息流里为任务卡（Make the first session rewarding），无 Save for Later 卡 | 卡片类型不同 | major | 已证实 | - |
| L08 | ALL | 侧栏项目呈现 | 用户照片左列：项目为带名 pill 卡（OrbitRead） | 侧栏为 3 列 icon-only 方块（无名标签，名仅在 aria-label/title） | 呈现方式不同 | major | 已证实（vs REA 网页模型则一致，见 1.1 注） | - |
| L09 | ALL | iPad 左列项目格 | ipad-01 左列：2 列带名照片贴片（Hands Time / Hourtown / Sleepy Coffee / Casehot，贴片下挂名签） | 3 列 icon-only 矢量小图标，无名签、无照片贴片 | 列数与呈现均不同 | major | 已证实（iPad 参照；vs REA 网页模型一致） | - |
| L11 | M | 任务卡结构 | ipad-01 任务卡：无进度轨、无状态行，右下有 View task 链接 | 渲染任务卡：标题加状态行加步骤加底部 4px 进度轨，无 View task 链接 | 结构不同 | major | 已证实（README 残差 10 已自认；vs REA 网页模型一致） | - |
#### 1.2 字体

| F01 | M | 正文 12px/1.38 | REA：12px | 截图正文首行深色核心行 y94-100（7px），含抗锯齿 fringe y92-93，cap 约 8px（图宽 1200，x250-500，y92-103 行廓）；估计字号 8/0.72 = 11.1px | -7.5% | minor | 已证实（方法误差约 1px，即 10.0-12.5px 区间） | - |
| F03 | ALL | 侧栏名 11px/600、角色 em、简介 8px、组标题 10px/700 | REA：名 11px/600，简介 8px，组标题 10px/700/0.06em | 代码值与 REA 相同；截图未做侧栏文字行廓量测 | 未量 | - | 待量（缺侧栏文字行廓：名行、简介行、组标题行的 cap 高） | - |
| F04 | ALL | 预览 tab 10px/500、手机状态栏 8px/700、手机应用栏 12px/700、feed 名 9px/600 | REA：同左 | 代码值与 REA 相同；截图手机内文字过小未做行廓量测 | 未量 | - | 待量（缺 tab 标签与手机内三处文字的 cap 高） | - |
| F05 | ALL | 字体 family | REA：SF Pro Rounded 首选 | 代码栈与 REA 相同；但本 VM 无 SF 字体，截图实际走 Helvetica Neue / Arial 回落，无法从截图证明 SF 形态 | 回落 | minor | 待量（需 Apple 设备实测 SF Pro Rounded 下的形态） | - |
| F06 | M | 正文 vs iPad HD 参照 | ipad-01 正文行：核心行 y1466-1479（14 行含下行字母），cap 约 12px（图宽 2064，屏宽 1584）；归一化 12/1584 = 0.758% 屏宽 | 渲染 cap 约 8px；归一化 8/1200 = 0.667% 屏宽 | -12.0%（归一化） | major（仅作 iPad 参照；vs REA 声明值见 F01） | 已证实（附形态差异提醒：原生 iPad 字号本就大于网页演示模型） | - |
| F07 | M | 作者行 vs iPad HD 参照 | ipad-01 作者行：核心行 y1401-1410（10px），含 fringe y1397-1400，cap 约 12px；归一化 12/1584 = 0.758% | 渲染作者 cap 约 7px；归一化 7/1200 = 0.583% | -23.1%（归一化） | major（仅作 iPad 参照；vs REA 声明值见 F02） | 已证实（同 F06 提醒） | - |
#### 1.3 颜色

| C02 | M | 用户气泡蓝 vs 原生 iPad | ipad-01 用户泡众数色 (0,136,254) 约 #0088fe（x1150-1650，y1250-1330 采样） | #1987f7 | R 差 25，B 差 7 | minor | 已证实（原生蓝更亮更偏纯蓝；渲染跟随 REA 网页 token，非原生值） | - |
| C09 | ALL | 在线绿点 | REA：#2ecb70 | 代码 8px #2ecb70；截图圆点过小未做隔离取色 | 未量 | - | 待量（缺侧栏在线圆点的隔离 5x5 取色） | - |
| C10 | M | 非激活 tab 底 | REA：#f7f7f5 | 本轮主截图仅一个激活 tab（透明底），非激活 tab 未出现 | 未量 | - | 待量（缺含非激活 tab 的截图或 tab 区的隔离取色） | - |
#### 1.4 按钮纹理

| B02 | M | 胶囊渐变质感 | REA：linear-gradient(325deg, rgba(255,255,255,0.78), 0.48, rgba(245,247,250,0.24))，加 inset 高光 | 截图胶囊抽点：(100,10) #eef0ef、(100,30) #f1f2f1、(150,20) #f6f7f6，亮度差仅约 3 单位，渐变方向不可分辨 | 未量 | - | 待量（缺可分辨渐变的方向与强度量测：浅底上的 64x32 小胶囊无法从平截图反推渐变参数） | - |
| B04 | M | 作曲器附加钮 24px | 代码：24px、#ededeb | 截图附加钮未做隔离 bbox 量测（仅目视约 24px） | 未量 | - | 待量（缺附加钮的隔离 bbox 与 #ededeb 抽点） | - |
| B05 | ALL | 侧栏底部圆钮 36px | REA：36px（窄容器 32px）圆形 | 代码 36px；截图底部三钮未做隔离 bbox 量测 | 未量 | - | 待量（缺底部三钮的隔离 bbox；窄容器 32px 形态未渲染） | - |
| B07 | - | iPhone 发送钮直径 | iphone-06 底部输入条：蓝色圆形上箭头钮（索引自述完整，但本轮量测未能隔离） | 渲染 24px（B03） | 无法比 | - | 待量（iphone-06 底部右区 y2720-2868、x900-1320 无隔离蓝区；此前 y2604-2726 的蓝 bbox 为消息泡与发送钮混叠，需重切输入条局部图再量） | - |
| B08 | ALL | 窗口玻璃（blur/saturate） | REA：blur(34px) saturate(1.24)，底 rgba(244,246,244,0.42) | 代码 index.css 与 tokens.ts 均有 blur(34px) saturate(1.24)；截图窗底与页底复合色一致（C04/C05），但平截图底后无内容，无法反推 blur 半径与饱和度 | 未量 | - | 待量（缺窗后有内容时的玻璃量测：需在窗后放测试图再截） | - |
| B09 | ALL | 控件 inset 高光与阴影 | REA：inset 1px 1px rgba(255,255,255,0.38) 等 | 代码 controlShadow 含 inset 高光与 0 4px 10px 阴影；截图 1px 级 inset 无法分辨 | 未量 | - | 待量（缺放大截图下的 inset 高光与阴影抽点） | - |
| B10 | M | 作曲器 backdrop blur 16px | REA 表 A：作曲器无 blur 项（仅底色、边框、阴影、inset 高光） | 代码 FollowUpComposer 另加 backdrop-filter blur(16px) | 附加项 | minor | 已证实（代码 vs REA 表：附加玻璃，非 REA 声明值） | - |
| B11 | ALL | project-tile / agent-row hover 态 | REA：tile hover 0.58 加上移 1px，激活 0.72；agent-row hover/激活 0.5 | 代码仅有激活态（tile 0.72、row 0.5），无 hover 规则（全套 grep 仅 button ghost 有 hover） | hover 缺失 | minor | 已证实（代码审查；静态截图无法呈现 hover） | - |
#### 1.5 元素尺寸 / 长宽比 / 间距 / 内边距 / 圆角 / 阴影

| S13 | M | 预览 tab 高 | REA：36px | 代码 36px；截图激活 tab 为透明底，无法隔离 bbox | 未量 | - | 待量（缺 tab 钮的隔离 bbox：需含非激活 tab 的截图） | - |
| S14 | ALL | resizer 宽 | REA：8px，col-resize | 代码 Resizer 宽 8px（透明底）；截图中透明分隔不可见 | 未量 | - | 待量（缺 resizer 的可见量测：透明元素平截图不可见，需悬停或框线图） | - |
| S15 | ALL | 窗圆角 | REA：18px | 代码 18px；截图窗角与页底色差过小（页底约 (236,237,236)，窗底复合约 (240,241,240)），弧线抽点无结论 | 未量 | - | 待量（缺窗角弧线量测：需深色页底下的截图） | - |
| S16 | M | 手机框阴影 alpha | REA：0 24px 48px rgba(0,0,0,0.24)，加 inset 0 0 0 1px #fefefe | 代码 Preview.tsx：0 24px 48px rgba(0,0,0,0.14)，加同值 inset | alpha 0.24 到 0.14（-42%） | minor | 已证实（代码 vs REA 表；截图阴影 alpha 未精量，见 B09） | - |
#### 1.6 元素位置

| P04 | ALL | 会话区顶栏项目图标居中 | README 自述：main 447px、sidebar-collapsed 约 432px、preview-collapsed 约 678px（48px 条补偿后） | 截图 y20 行 tint 段：main 约 x431-463（中心约 447）；sidebar-collapsed x414-446（中心约 430，与自述差 2px）；preview-collapsed x665-695（中心约 680，与自述差 2px，另按内容盒 (198+1152)/2 = 675 计差 5px） | main 0，sb -2px，pc +2 到 +5px | minor（pc 一项） | 已证实（近似：tint 段含图标字形不对称，中心有约 3px 读数容差） | - |
#### 1.7 头像

| A01 | ALL | 头像形态 | 官方头像：插画人物（ipad-01：Pluso 蓝色笑脸、Camo 黄色形象、Qesto 粉色形象等完整面部插画；用户照片左列同为彩色圆头像插画人物；REA 证据有 avatar-{key}.webp 六张） | 渲染 AvatarBlob：着色圆盘加淡化 blob 加两眼（代码自述近似头像，非官方位图；本套按复制规则不拷官方位图，形态差异属已知改编） | 形态完全不同（简化几何 vs 插画面部） | major | 已证实（README 残差 4 已自认；属设计决策：是否接受简化 blob，或重绘自有插画人物） | - |
| A03 | M | 手机 feed 头像 26px | REA：feed 头像 26px | 代码 26px；截图手机 feed 首行头像盘左沿 x832（= 手机外沿 813 + 框 7 + 内边距 12），左沿精确；宽度分割受手机贴片同色 tint 干扰未隔离 | 左沿 0，宽未量 | - | 待量（缺 feed 头像的隔离宽度：需 feed 行局部放大图） | - |
| A04 | ALL | 成员头像相对尺寸 | ipad-01 成员头像：x352-426、y1680-1755（75x76px，图宽 2064）；左列宽约 462px（屏左 238 到线程分界约 700），头像占左列 16.2%，占屏宽 4.7% | 渲染侧栏头像 28px，占侧栏 198px 的 14.1% | 列相对 -13.0%（屏宽相对不可比：iPad 为双列、桌面为三栏） | minor | 已证实（列相对归一化；跨形态，仅作参照） | - |
#### 1.8 图标形态（总览；Lucide 逐项核对见第 2 节，morphing 见第 3 节）

| I01 | ALL | 全部图标 vs Lucide 标准 | 用户新口径：图标一律 Lucide（项目既有标准，MIT 协议） | 本套 29 个图标组件均为自绘矢量（base：24x24 viewBox、fill none、stroke currentColor、线宽 1.8、round caps/joins，与 Lucide 惯例同构）；逐项核对：7 同形、21 近形、1 无确切同形（DeviceInbound）；Lucide 默认线宽 2.0 vs 本套 1.8（+11%） | 多项小差，个别中差（gear 齿形、route 弧线、iphone 宽度） | minor | 已证实（Lucide 对照见第 2 节；不确定项已标待确认，未编造） | - |
| I02 | ALL | 项目小图标 vs iPad | ipad-01 项目贴片：照片贴片加名签 | 渲染项目图标：clock / house / cup / grid 四个矢量小图标（无照片、无名签） | 呈现完全不同 | major | 已证实（iPad 参照；vs REA 网页模型图标贴片则一致） | - |
| I04 | M | 手机状态栏字形 | iPhone 状态栏信号/wifi/电池字形 | 代码以矩形条与边框手绘信号格与电池框；截图过小未做像素比对 | 未量 | - | 待量（缺手机状态栏字形的放大比对） | - |

### app/airbuild（证据：UIDesign/app/airbuild/docs/verification/audit-20261030.md）

#### 字体（2 项）

- F1 / chat / 字体 / 正文：原图 cap 高 20px（图宽 1320，内屏 1020，占屏宽 1.96%，估计字号约 10.6 逻辑 px）/ 渲染 cap 高 10px（图宽 390，占屏宽 2.56%，估计字号约 13.9px，声明 15px）/ +31% / critical / 已证实 / Q5 相关（正文字号不在 Q5 候选清单内，为本轮新量出项）
- F2 / chat / 字体 / 作者名：原图 cap 高 20px（占屏宽 1.96%）/ 渲染 cap 高 9px（占屏宽 2.31%，声明 13px）/ +18% / major / 已证实 / Q5（注意：Q5 候选“作者名 13 改 14px”与实测方向相反，渲染已比原图大，再加大将扩大差距，是否执行由用户定）
#### 按钮纹理（4 项，均为玻璃质感缺失）

- T1 / chat / 按钮纹理 / 顶栏返回键与 … 键：原图半透明磨砂玻璃（填充与屏底同色，5x5 patch 约 245,245,245，带内高光与柔和阴影）/ 渲染实色白底加 1px 边框加 0 2px 10px rgba(0,0,0,0.06) 阴影 / 纹理错误 / major / 已证实 / Q6 新增同类（Q6 原指 draft 屏，chat 屏同款按钮同病）
- T2 / draft / 按钮纹理 / handstime.app 药丸与分享键：原图半透明磨砂玻璃药丸与玻璃圆钮 / 渲染实色 #f4f4f2 药丸与分享钮 / 纹理错误 / major / 已证实 / Q6 新增
- T3 / chat / 按钮纹理 / Hourtown pill：原图玻璃质感 pill（填充与屏底相近，全图无纯白区，见量测记录）/ 渲染纯白 pill 加边框加阴影 / 纹理错误 / major / 已证实 / Q5 相关
- T4 / detail / 按钮纹理 / 右上勾选圆钮：原图玻璃圆钮 / 渲染实色白圆（白区约 40px，声明 44px）/ 纹理错误 / major / 已证实 / Q6 新增同类
#### 尺寸 / 长宽比 / 间距 / 内边距 / 圆角 / 阴影（4 项）

- S1 / draft / 长宽比 / 封面块：原图正方形 529x529px（比 1.00，占自身卡宽约 43%）/ 渲染约 148x244px（比 1.65，占自身卡宽约 41%）/ 比值 +65% / critical / 已证实 / Q6（用户已定按原图来；另注意：原图照片高远超其左侧标题栏高，Q6 选项 A“封面改到与标题栏等高”与原图实测不符，见量测记录）
- S2 / briefing / 尺寸 / 发送钮：原图蓝圆直径 92px（图宽 1320，内屏 1020，占屏宽 9.0%）/ 渲染蓝区 50x50px（占屏宽 12.8%，声明 52px）/ +42% / critical / 已证实 / 清单外新项
- S3 / briefing / 圆角 / 首卡圆角：原图角半径约 39px（内屏 1020，占屏宽 3.8%，折合逻辑约 15px，圆弧拟合见量测记录）/ 渲染声明 24px（占屏宽 6.2%，白区实测约 21px）/ +41%（按白区实测）至 +61%（按声明值）/ critical / 已证实 / 清单外新项
- S4 / briefing / 尺寸 / 第二卡可见宽：原图可见约 350px（占屏宽 34.3%，为卡全宽约 599px 的 58%）/ 渲染可见约 112px（占屏宽 28.7%，为卡全宽约 234px 的 48%）/ 可见宽 -16% / major / 已证实 / 清单外新项（注：此为横向滚动偏移量，非 token 缺陷，是否接受由用户定）
#### 元素位置与底部裁切（2 项）

- P1 / chat / 底部裁切 / 末条用户气泡：原图可见 4 整行（至 “rather than”，第 5 行被营销图底切）/ 渲染气泡顶 y=752，框底切于 y=833，仅见 3 整行加第 4 行局部 / 少约 1 行 / major / 已证实 / 清单外新项（原图与渲染皆切，但渲染切得更多）
- P2 / draft / 底部裁切 / 末条用户气泡：原图末条气泡完整可见（单行 “Keep it simple and focus on the app.” 全文）/ 渲染气泡顶 y=797，框底切于 y=833，仅见首行，次行 “app.” 被切掉 / 内容丢失 / critical / 已证实 / 清单外新项
#### 头像（7 项，逐成员；形态均为插画人物 vs 统一笑脸圆）

- A1 / chat / 头像 / Pluso：原图 cyan blob 插画人物（cyan 区 80x81px，占屏宽 7.8%）/ 渲染统一笑脸圆（声明 32px，占屏宽 8.2%，纯色区 28px）/ 形态错误，尺寸 +5% / major（形态）/ 已证实 / 清单外新项（用户 2026-10-30 已指出头像差距大）
- A2 / chat / 头像 / Ampo：原图紫底橙色人物插画 / 渲染紫色统一笑脸圆（声明 32px，纯色区 32x32px）/ 形态错误 / major / 已证实 / 同上
- A3 / draft / 头像 / Colo：原图紫底戴帽人物插画（带调色板）/ 渲染紫色统一笑脸圆 / 形态错误 / major / 已证实 / 同上
- A4 / briefing / 头像 / Ato：原图绿底粉色人物插画 / 渲染绿色统一笑脸圆 / 形态错误 / major / 已证实 / 同上
- A5 / home / 头像 / Camo：原图黄色插画人物 / 渲染黄色统一笑脸圆 / 形态错误 / major / 已证实（透视近似，尺寸待量）/ 同上
- A6 / home / 头像 / Qesto：原图粉色插画人物 / 渲染粉色统一笑脸圆 / 形态错误 / major / 已证实（透视近似，尺寸待量）/ 同上
- A7 / home / 头像 / Leto：原图橙色插画人物 / 渲染橙色统一笑脸圆 / 形态错误 / major / 已证实（透视近似，尺寸待量）/ 同上
#### 图标形态（7 项；Lucide 对照详见后文图标节）

- I1 / briefing 与 components / 图标形态 / 手形键：原图黑色实心手掌图形 / 渲染 HandIcon 描边手加掌心圆点 / 形态错误 / major / 已证实 / 清单外新项（Lucide hand 近形，掌心圆点为官方特征，Lucide 无此点）
- I2 / detail / 图标形态 / 应用图标手：原图黑色手掌照片（暗区 75x67px，占屏宽 8.2%）/ 渲染浅绿 tile（52x52px）内描边手图标 / 形态错误 / major / 已证实 / 清单外新项（照片手 vs 线性手；tile 尺寸接近，形态为差距）
- I3 / detail / 图标形态 / 商店 glyph：原图 App Store 蓝底白 A 与 TestFlight 蓝底白螺旋桨品牌图标 / 渲染蓝底白线条通用 glyph（店面檐篷与螺旋桨示意）/ 形态错误 / major / 已证实 / 清单外新项（品牌资产不可拷，Lucide 亦无品牌图标，只能自绘）
- I4 / home / 图标形态 / 云朵钮：原图云朵线条图标 / 渲染 CloudIcon 自绘云（路径与 Lucide cloud 不同）/ 近形，路径差异 / minor / 已证实 / 清单外新项
- I5 / home / 图标形态 / 中央四叶标：原图淡灰四叶品牌标 / 渲染 CloverIcon 填充式自绘四叶 / 近形，填充与描边差异 / minor / 已证实 / 清单外新项（官方 MadeWithAirBuild.svg 亦为四叶形徽标，仅作形态参照，未复制）
- I6 / chat / 图标形态 / 文件图标：原图文档图标加 “First Focus Experience.md” / 渲染 DocIcon（文件加折角加横线）/ 近形，折角与线位差异 / minor / 已证实 / 清单外新项
- I7 / chat / 图标形态 / 任务列表图标：原图任务列表 glyph（圆点加横线）/ 渲染 TaskListIcon（双圆圈加横线加竖连线）/ 近形，结构差异 / minor / 已证实 / 清单外新项（Lucide 无同形，最接近 list-checks，见图标节）
#### 布局结构（1 项）

- L1 / draft / 布局结构 / 草稿卡：原图为悬浮浏览器窗（超出手机屏宽，卡宽约 1220px/1320 图宽，含流量灯行与 URL 药丸）/ 渲染为聊天流内全宽卡（-mx-4，卡宽约 358px/390）/ 结构差异 / major / 已证实 / 清单外新项（收进聊天流属平台适配取舍，是否接受由用户定；封面比 S1 不受此影响，比值本身仍可比）
#### 封面与卡片内容（3 项）

- C1 / draft / 封面内容 / 封面块：原图天鹅黑白照片 / 渲染深绿渐变加 “3.0 available, built on iOS 26.” 白字 / 内容与纹理错误 / major / 已证实 / Q6 相关（照片不可拷，修复方向只能是矢量或抽象替代，由用户定）
- C2 / briefing / 封面内容 / 首卡配图块：原图蒲公英照片（teal 核心区 517x157px，宽占屏宽 50.7%）/ 渲染深青渐变块（宽约 193px，占屏宽 49.5%，声明高 110px）/ 宽度 -2%，内容照片变渐变 / major（内容）/ 已证实 / 清单外新项
- C3 / home / 卡片内容 / 项目卡：原图卡内为应用预览图（Hands Time widget 界面、Hourtown 小镇地图、Sleepy Coffee 应用界面、Casehot 落日横幅）/ 渲染字母块（H/H/S/C，tile 高 132px）/ 内容错误 / major / 已证实（透视近似，tile 高待量）/ 清单外新项（与 chat 字母块同类问题）

### web/medley（证据：UIDesign/web/medley/docs/verification/audit-20261030.md）

#### 字体

| F1 | Pricing | 标题字号 | cap 约 22px@600 宽（带 251-276，含 p 降部，cap 约 22；估计字号约 20-23.5px@390 假设） | cap 19px（pricing.png 87-105 行；代码 text-greeting=27px） | 渲染大 +15-35%（下限已超 major） | major | 已证实 | - |
| F2 | Credits | 大数字字号 | 数字干高 56px@600 宽（hd5-credits 182-237 行；CSS 约 36px@390，范围 34-39） | 干高 31px（credits.png 24-54 行；代码 text-huge-number=44px，cap 约 32px） | 渲染小约 15%（范围 8-24%，随手机宽假设浮动） | major | 已证实 | - |
| F3 | Agent | 标题字号 | 首行带 175-198@660 宽（含 p 降部，cap 约 21-22；估计字号约 17.5-20px） | 代码 text-[17px]，首行带 106-118（13 行，cap 约 12px） | 渲染小 0-15%，中心约 -8% | minor | 已证实 | - |
| F4 | Welcome | 标题字号 | L 干列 600-649（cap 50px@660 宽；估计字号约 41px@390，范围 38-44） | L 干列 124-150（cap 27px；代码 text-welcome-title=38px） | 渲染小约 7%（范围 -14% 至 +0%） | minor | 已证实 | - |
| F8 | Welcome | 脚注字号 | 行带 12px@660 宽（1401-1412 行；估计字号约 10-11px） | 代码 text-caption=12px | 渲染大約 10% | minor | 已证实 | - |
#### 颜色

| C1 | Welcome | 标题圆点颜色 | CN HD 源：均值 (217,94,39) 鲜艳橙红，25x25px@600 宽（cn4-welcome-cn 424-448,493-517）；EN 源：淡蓝灰 blob（见源冲突节） | token accent #E2A181 蜜桃色，核 10x10px（welcome.png 323-332,134-143；代码 h-3 w-3=12px） | 色相完全不同（橙红/蓝灰 vs 蜜桃）；尺寸相对 CN 源小约 50%，相对 EN 源小约 12% | major | 已证实（源冲突见后） | Q12 |
| C2 | Drawer | 1 running 圆点 | 白色（ov-drawer 目视） | bg-accent #E2A181（search-drawer.tsx） | 色相错误 | major | 已证实 | - |
| C3a | Credits | 图例 Claude | 棕褐约 (150,105,85)（by-model 同模型采样，hd5-credits x=52 列 y860） | #E4754A（data.ts creditsLegend） | 饱和度/色相偏离 | major | 已证实 | - |
| C3b | Credits | 图例 GLM | 粉约 (145,100,120)（y928-936） | #4A7DE4 蓝（creditsLegend） | 色相错误（粉 vs 蓝） | major | 已证实 | - |
| C3c | Credits | 图例 Kimi | 橄榄约 (129,125,87)（y1004） | #9B5DE5 紫（creditsLegend） | 色相错误（橄榄 vs 紫） | major | 已证实 | - |
| C3d | Credits | 图例 DeepSeek | 蓝约 (95,120,140)（y1072-1076） | #2EB5A5 青（creditsLegend） | 色相错误（蓝 vs 青） | major | 已证实 | - |
| C4a | Chat info | GLM chip 圆点 | 粉红/红（ov-chatinfo 目视） | #4A7DE4 蓝（data.ts chatInfo） | 色相错误 | major | 已证实 | - |
| C4b | Chat info | DeepSeek chip 圆点 | 蓝（ov-chatinfo 目视） | #2EB5A5 青（chatInfo） | 色相错误 | major | 已证实 | - |
| C5a | Drawer | Recent Cell 圆点 | 紫（ov-drawer 目视） | #2EB5A5 青（drawerRecent） | 色相错误 | major | 已证实 | - |
| C5b | Drawer | Recent Cover 圆点 | 橙（ov-drawer 目视） | #3FA34D 绿（drawerRecent） | 色相错误 | major | 已证实 | - |
| C5c | Drawer | Recent Spanish 圆点 | 粉（ov-drawer 目视） | #4A7DE4 蓝（drawerRecent） | 色相错误 | major | 已证实 | - |
| C5d | Drawer | Recent Lisbon 圆点数 | 2 点（ov-drawer 目视） | 1 点（drawerRecent 单 dot 字段） | 缺 1 点 | major | 已证实 | - |
| C5e | Drawer | Recent Q3 圆点数 | 2 点（ov-drawer 目视） | 1 点 | 缺 1 点 | major | 已证实 | - |
| C6 | Train | DeepSeek 圆点 | 蓝（ov-train 目视） | #5B8A99 青灰（tokens modelDeepseek） | 色相错误 | major | 已证实 | - |
| C7 | Composer | 深色 mic 圆钮底色 | 鲜艳橙圈（hd5-lisbon 底部 composer 目视） | #E2A181 蜜桃（composer.tsx dark circle） | 色相错误（与 C1 同 token 根因） | major | 已证实 | Q12 |
| C8 | Welcome | Google 按钮填充 | 约 #ECEEF2（5x5 均值 (237,238,242)，ov-welcome y1200-1260 多点采样，避开 G 标与文字） | #FFFFFF 纯白（welcome.png y320/350 多点 (255,255,255)；代码 whiteBtn） | 浅灰 vs 纯白 | minor | 已证实 | - |
| C9 | Credits | 柱段配色 | 多色堆叠，含绿段，逐柱不一（hd5-credits 目视） | 固定三段：amber #8C553C 55% + 粉 #C65D7B 30% + 青 #5B8A99 15%（credits-panel.tsx） | 配色/分段简化 | minor | 已证实 | - |
| C10 | Pricing | 圆点行点数 | 顶部行 6 点（hd5-pricing 140-215 带连通域：x105,138,171,204,237,270）；Pro 卡行 6 点（795-820 带：x164,184,207,225,245,266） | 5 点 + 5 点（ModelDots 固定 5 点；medley-mark.tsx） | 各缺 1 点；色系近似（缺粉） | minor | 已证实 | - |
#### 文案数值

| T1 | Train | 副标题页数 | "Searched 9 sites, read 4 pages, thought for 6s"（ov-train 目视） | "read 6 pages"（App.tsx TrainChat 硬编码） | 4 vs 6 | major | 已证实 | - |
| T2 | Router | 积分 | "64 credits"（ov-router 目视） | "44 credits"（App.tsx RouterChat ActionRow） | 64 vs 44 | major | 已证实 | - |
| T3 | Picker | 价格符号 | "~5/~11/~31/~80/~120/~400"（hd5-pickerA 目视，波浪形 glyph；pickerB 同） | "-5/-11/-31/-80/-120/-400"（data.ts pickerA/BSections） | - vs ~（6 行全错） | major | 已证实 | Q13 |
| T4 | Picker | Fable 徽标 | "Pro+"（hd5-pickerA：锁标 + Pro+） | "Pro"（data.ts badge） | 缺 + | major | 已证实 | - |
| T5 | Picker | Thinking 说明 | "Auto picks the level for each message."（zoom-pickerB-thinking 目视） | "Auto picks the ideal for each message."（model-picker.tsx:171） | level vs ideal | major | 已证实 | - |
| T6 | Picker | Thinking 档位数字 | Auto 110 / Off 10 / Low 110 / Med 140 / High 200 / Max 400（ov-pickerB + zoom 目视；Thinking 行符号字形模糊，见待量） | 无数字，仅 Auto/Off/Low/Med/High/Max 裸 Tabs（model-picker.tsx） | 整列数据缺失 | critical | 已证实 | - |
| T7 | Pricing | Pro 特性行 | "Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3"（hd5-pricing 目视） | "Claude Sonnet and Opus, GPT-5.1, GLM-5, Kimi K3"（data.ts pricingPlans） | 两处错：GPT-5.1 应为 GPT-6.1 Sol；多余 GLM-5 | major | 已证实 | - |
| T8 | Pricing | 脚注标点 | "...No ads on any plan. No weekly plans."（hd5-pricing 目视，plan 后句号） | "...No ads on any plan, no weekly plans."（App.tsx footnote，逗号） | 句号 vs 逗号 | minor | 已证实 | - |
| T9 | Credits | 日期起点 | "Sep 26"（hd5-credits x 轴目视） | "Sep 28"（App.tsx dateRange） | 26 vs 28 | major | 已证实 | - |
| T10 | Agent | 评审词 | "Auto-review"（ov-agent 目视，带连字符） | "Auto review"（App.tsx meta） | 缺连字符 | minor | 已证实 | - |
| T11 | Agent | 步骤 | "Step 3 of 6"（ov-agent 右侧目视） | "Step 3 of 8"（App.tsx stepLine） | 6 vs 8 | major | 已证实 | - |
| T12 | Agent | 第三卡首词 | "Boar: 2 plans found"（ov-agent 目视；低分辨率下不排除为 "Board" 截断，见待量） | "Done: 2 plans found"（data.ts agentRows） | 首词不同 | major | 已证实 | - |
| T13 | Chat info | Sonnet 回复时间 | "10:31"（ov-chatinfo 目视） | "10:21"（data.ts latestReply） | 31 vs 21 | major | 已证实 | - |
| T14 | Chat info | DeepSeek 行 | "10:19, 41 credits, 0.9s"（ov-chatinfo 目视） | "10:17, 41 credits, 3.5s"（data.ts replies） | 时间 + 耗时错，积分一致 | major | 已证实 | - |
| T15 | Kyoto | 周日气温 | "15° rain"（ov-kyoto 目视，Sun, Nov 2） | "16° rain"（data.ts kyoto.days） | 15 vs 16 | major | 已证实 | - |
#### 结构与元素

| S1 | 全部聊天 thread | 底部 composer | Lisbon/Train/Savings/Kyoto/Router 五 thread 底部均有 composer（"Message …/Ask anything" + mic/stop 钮，ov/hd5 各屏目视）；Agent 屏底部有 "Add an instruction" + 上箭头钮（ov-agent 目视） | Chat 区 LisbonChat/TrainChat/KyotoChat/RouterChat/SavingsCard 均无 composer；AgentTeamPanel 止于 Pause/Stop，无 instruction composer（App.tsx、agent-team-panel.tsx） | 6 处 composer 缺失 | critical | 已证实 | Q10 |
| S2 | Credits | 导航头 | 返回箭头 + "Credits" 标题 + info 图标（hd5-credits 顶部目视） | 无头（credits-panel.tsx 直接从 12,480 起；代码无 header） | 头整缺 | critical | 已证实 | Q11 |
| S3 | Agent | 导航 chrome | 左上返回箭头 + 右上 "..."（ov-agent 顶部目视） | 无（agent-team-panel.tsx 无 back/menu） | 头整缺 | critical | 已证实 | Q11 |
| S4 | Chat info |  backdrop 顶栏 | 顶栏（hamburger/Auto/clock/edit）+ 用户气泡 + 模型行（ov-chatinfo 顶部目视） | 仅气泡 + 模型行（chat-info-sheet.tsx ChatInfoBackdrop；其 docstring 称含顶栏，与代码不符） | 顶栏缺失 | minor | 已证实 | Q11 |
| S5 | Drawer | Pinned 圆点 | "Thesis outline" 行右侧 2 点（ov-drawer 目视） | 0 点（search-drawer.tsx Pinned 卡无 dot） | 缺 2 点 | major | 已证实 | - |
| S6 | Drawer | messages-left chevron | "About 240 messages left" 右侧 chevron ›（ov-drawer 目视） | 无 chevron（search-drawer.tsx messagesLeft 卡纯文本） | 缺 chevron | major | 已证实 | - |
| S7 | Drawer | 用户 Pro 形态 | "Alex" 下方小字 "Pro" 副文本（ov-drawer 目视） | "Alex" 旁 Pro pill 徽标（search-drawer.tsx userBadge chip） | 副文本 vs pill | major | 已证实 | - |
| S8 | Train | 来源字母 | "S R K" 三字母方块 + "4 sources"（ov-train 目视） | 3 个空白方块（App.tsx TrainChat [0,1,2] 空 span；source-chips.tsx docstring 称 blank 正确，与原图不符） | 字母缺失 | critical | 已证实 | - |
| S9 | Savings | 卡片 "..." 菜单 | "Savings growth" 卡右上 "..."（ov-savings 目视） | 无（savings-card.tsx 无 more 元素） | 缺菜单 | minor | 已证实 | - |
| S10 | Savings | 曲线终点圆点 | Balance 曲线终点黑点 + "Balance" 标注（ov-savings 目视） | 曲线 + "Balance" 文本，无终点圆点（savings-card.tsx 仅 2 path + 2 text） | 缺圆点 | minor | 已证实 | - |
| S11 | Agent | Pause/Stop 图标 | "Pause all" 前双竖线图标、"Stop all" 前方框图标（ov-agent 目视） | 纯文本两钮，无图标（agent-team-panel.tsx） | 图标缺失 | major | 已证实 | - |
| S12 | Credits | By-model 圆点 | 4 行行首均有圆点（hd5-credits 目视；颜色见 C3 系采样） | 0 点（credits-panel.tsx models 行无 dot） | 缺 4 点 | major | 已证实 | - |
| S13 | Credits | Activity 圆点 | "Lisbon on a budget" 行首圆点（hd5-credits 目视） | 0 点（credits-panel.tsx activity 行无 dot） | 缺 1 点 | major | 已证实 | - |
| S14 | Credits | 虚线标记 | "Oct 15, upgraded to Pro" 仅作 x 轴标注，无竖直虚线（hd5-credits 目视） | 60% 处竖直虚线 + 线上标注（credits-panel.tsx absolute dashed line） | 多余元素 | minor | 已证实 | - |
#### 按钮纹理与图标形态

| B1 | Pricing | 分段控件选中态 | Yearly 侧深灰底高亮，"Save 20%" 为普通小字（hd5-pricing 目视） | 白色 pill + 蜜桃色 "Save 20%" badge（pricing-panel.tsx：白 pill + bg-accent badge） | 填充反转 + 多余 badge | major | 已证实 | - |
| B5 | Drawer | 搜索行菜单位置 | 搜索 pill 右内 edit 标；hamburger 在 pill 下方右侧独立一行（ov-drawer 目视） | 搜索 pill 内 edit + 同行末尾 menu（search-drawer.tsx） | 菜单位置不同 | minor | 已证实 | - |
| I1 | Agent | Running 状态点 | 白/浅色圆点（ov-agent 目视） | #3FA34D 绿点（agent-team-panel.tsx StatusDot） | 颜色错误 | major | 已证实 | - |
| I2 | Agent | Done 状态形 | 对勾圆圈图标（ov-agent 目视） | 白色实心圆点（StatusDot Done=darkText） | 图标 vs 圆点 | major | 已证实 | - |
| I3 | Agent | Queued 状态形 | 时钟图标（ov-agent 目视） | 灰色实心圆点（StatusDot Queued=darkSub） | 图标 vs 圆点 | major | 已证实 | - |
| M-stop | Composer | 生成态 stop 钮底色 | Lisbon-EN 生成态：橙圈 + 深色方块（hd5-lisbon 底部目视） | stop 态：白圈 + 黑方块（composer.tsx mic="stop"） | 底色不同（状态映射未在源码对应到具体原图屏，见待量） | major | 已证实（映射待确认） | - |

### app/medley（证据：UIDesign/app/medley/docs/verification/audit-20261030.md）

| G01 | welcome-dark | 字体 | 标题 Let's discover 大写 L cap 高 | 43px（560 宽图，y454-496）→ 29.9px@390；估计字号 41.5px | 26px（390 宽图，y316-341）；代码 38px；估计字号 36.1px | -13% | major | 已证实 | — |
| G02 | welcome-dark | 字体 | 副文案 Every 首字母 E cap 高 | 16px（560 宽图，y537-552）→ 11.1px@390；估计字号 15.4px | 12px（390 宽图，y371-382）；代码 16px | +8% | minor | 已证实 | — |
| G03 | welcome-dark | 位置 | 脚注左缘（相对按钮左缘） | 脚注 x39（560 宽）→ 27.2px@390；按钮左缘 x34 → 23.7px@390；脚注比按钮内缩约 3.5px | 脚注 x23；按钮左缘 x22；内缩约 1px | 脚注绝对位置 -15% | major | 已证实 | — |
| G04 | welcome-dark | 尺寸 | MedleyMark 标志高 | 约 36px（560 宽图，y92-127）→ 25.1px@390 | 26px（代码 size=26） | +4% | minor | 已证实 | — |
| G05 | pricing-dark | 位置 | 定价顶部 ModelDotsArc 弧线起点（距内容左缘） | 约 4px（条带：内容左缘约 1608，首点中心 1612；面板 380 宽）→ 约 4px@390 | 77px（页面 padding 20px + ml-[72px]，首点中心 x97） | 起点右移约 73px，远超 25% | critical | 已证实（推翻 v1.4 P1  placement 结论；颜色/抬升见第 2 节） | — |
| G06 | pricing-dark | 尺寸 | ModelDotsArc 弧线点距（pitch） | 24.2px（条带点中心 1612/1636/1661/1684/1709/1733）→ 24.8px@390 | 19.8px（点中心 97/117/137/157/176/196） | -20% | major | 已证实 | — |
| G07 | pricing-dark | 尺寸 | ModelDotsArc 弧线总抬升 | 34px（条带 y156→122）→ 34.9px@390 | 33px（y94→61） | -5% | minor | 已证实（逐点落差偏差 ≤1.2px） | — |
| G08 | pricing-dark | 尺寸 | ModelDotsArc 单点直径 | 约 7-10px（条带，阈值腐蚀下限）→ 7.2-10.3px@390 | 10px（代码 size=10） | 上限吻合，下限 -28%（腐蚀可解释大部） | minor | 已证实 | — |
| G09 | pricing-dark | 颜色 | Pro 卡内 ModelDots 五点色 | 原图 Pro 卡圆点行为淡 pastel 系（与顶部弧线同系） | 饱和五点 #e2a181/#4a7de4/#2eb5a5/#9b5de5/#3fa34d（代码 ModelDots） | 饱和度系差，颜色错误 | major | 已证实（与 G32 同根因：模型圆点 token 饱和化） | — |
| G10 | pricing-dark | 布局 | Pro 卡特性行折行 | 原图单行（Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3） | VM 下折两行（Kimi K3 另起一行） | 折行 | minor | 已证实（VM 字体度量，已知残差类） | — |
| G11 | pricing-dark | 布局 | 页脚链接（Restore/Terms/Privacy）首屏位置 | 原图首屏内 | 渲染首屏外（VM 字体偏宽所致） | 首屏外 | minor | 已证实（已知残差类） | — |
| G12 | home-light-cn | 布局 | 底部输入条（双行高条 vs 单行 52px） | 双行：占位行 y1094-1112 + 控制行 y1153-1170（行距 41px，575 宽裁切图）；条总高约 120-126px → 约 87-91px@390 | 单行 InputBar h-[52px]，占位与控制同行 | 高度 +67-75%，且缺一行结构 | critical | 已证实 | Q18 |
| G13 | home-light-cn | 颜色 | 页面底色 | 原图平坦区 (255,255,255)（中文条 home-cn 面板） | (245,246,248) #f5f6f8（token lightBg） | 约 -10/通道 | minor | 已证实（注：5 屏条 home-en 原图底色约 246，与渲染吻合；中文条白色可能含条带白平衡因素） | — |
| G14 | home-light-en | 字体 | 问候 Good evening, Alex 行高盒 | 21px（410 宽裁切图行带 y523-543）→ 21.5px@390 | 20px（390 宽图行带 y489-508） | -7% | minor | 已证实 | — |
| G15 | chat-dark-lisbon-en | 图标 | 顶栏模型名后下拉箭头尺寸 | 8px 宽（420 宽裁切图，中灰像素包围盒 x266-273，y76-81）→ 8.2px@390 | 9px 宽（390 宽图，中灰包围盒 x267-275，y70-75）；代码 svg 16px | +10% | minor | 已证实（L1 修复在位，尺寸 minor） | Q16 |
| G16 | chat-dark-lisbon-en | 尺寸 | 输入停止钮圆底直径 | 40px（420 宽裁切图，桃色包围盒 x332-371，y803-842）→ 41.0px@390 | 35px（390 宽图，桃色包围盒 x325-359，y779-813）；代码 h-9 w-9 = 36px | -15% | major | 已证实（L3 修复在位：桃色圆底 + 黑方块形态对，尺寸偏小） | Q16 |
| G17 | chat-dark-lisbon-en | 尺寸 | 输入停止钮内黑方块边长 | 9x8px（420 宽裁切图）→ 9.2x8.2px@390 | 11x11px（390 宽图，x337-347，y791-801）；代码 h-3 w-3 = 12px（实测 11px） | +19-34% | major | 已证实（L3 形态对，方块偏大） | Q16 |
| G18 | chat-dark-lisbon-en | 颜色 | AiMeta GLM-5 圆点色 | 淡粉 (225,179,199)（420 宽裁切图，x27-32，y220-225） | 饱和 (198,93,123) #c65d7b（token modelGlm，8px） | 饱和度系差，颜色错误 | major | 已证实 | Q21 |
| G19 | chat-dark-lisbon-en | 颜色 | AiMeta Claude Sonnet 5.5 圆点色 | 淡桃 (223,193,173)（420 宽裁切图，x25-31，y607-611） | 饱和棕橙 (176,112,60) #b0703c（token modelClaude，8px） | 饱和度系差，颜色错误 | major | 已证实 | Q21 |
| G20 | chat-dark-lisbon-en | 字体 | 正文 Here's 首行大写 H cap 高 | 9px（420 宽裁切图，阈值腐蚀值；真值约 10-11px）→ 9.2-11.3px@390 | 11px（390 宽图，行带 y230-240）；代码 16px | 腐蚀修正后约 -0-10% | minor | 已证实（腐蚀 allowance 内，方向与用户“渲染正文偏大”印象一致但量级小） | — |
| G21 | chat-dark-lisbon-en | 尺寸 | 底部输入条高（单行） | 约 55px（420 宽裁切图，输入 pill 行带）→ 56.4px@390 | 52px（代码 h-[52px]）+ 外层 pt-3 | -8% | minor | 已证实（本屏原图确为单行，与 home-cn/lisbon-cn 双行不同） | — |
| G22 | chat-dark-lisbon-cn | 尺寸 | 顶栏左钮圆钮直径 | 约 63px（585 宽裁切图，圆盘包围盒 x15-78，y约 76-116；圆心约 (46,97)）→ 约 45.5px@390（面板 540 宽换算） | 36px（390 宽图，包围盒 x18-53，y55-90）；代码 h-9 w-9 | +26%（原图偏大；测量容差 ±3px 时可回落至 major 下限） | critical | 已证实（L4 形状对：原图确为圆钮，尺寸偏小） | — |
| G23 | chat-dark-lisbon-cn | 布局 | 顶栏中部 pill 容器（标题 + 旅行副行） | 有：x108-246（585 宽裁切图，行 y125）→ 宽约 100px@390，高约 27px@390，底色 (28,32,38) | 无：标题直接落在屏底色上 | 元素缺失 | critical | 已证实 | Q20 |
| G24 | chat-dark-lisbon-cn | 布局 | 顶栏右侧 pill 容器（编辑 + 更多） | 有：x432-509（585 宽裁切图，行 y125）→ 宽约 56px@390，底色 (26,32,42) | 无：两图标裸置 | 元素缺失 | critical | 已证实 | Q20 |
| G25 | chat-dark-lisbon-cn | 布局 | 底部输入条（双行高条 vs 单行） | 双行：占位行 y1094-1112 + 控制行 y1153-1170，与 home-cn 同款结构（585 宽裁切图） | 单行 InputBar：占位 + Sonnet 5.5 pill + 白色停止钮同行（行带 y779-813） | 高度约 +67%，且缺一行结构 | critical | 已证实 | Q20 |
| G26 | chat-dark-lisbon-cn | 尺寸 | 底部白色停止钮（圆 + 方块） | 白圆宽 40px（585 宽裁切图，x480-519）→ 28.9px@390；内黑方块 13x13px → 9.4px@390 | 白圆 35px（390 宽图，x325-359）；内黑方块 11x11px | 圆 +21%，方块 +17% | major | 已证实（形态对：白圆底 + 黑方块，与 lisbon-en 桃色版区分正确） | — |
| G27 | chat-dark-lisbon-cn | 颜色 | AiMeta 行模型圆点 | 原图 GLM-5 自动行与 Claude Sonnet 5.5 行均无圆点（阈值搜索 + 目视双无；淡色腐蚀不能解释整点消失） | 两行均有 8px 饱和圆点（#c65d7b / #b0703c） | 多余元素 + 颜色 | major | 已证实（注意与 lisbon-en 相反：en 原图有圆点，cn 原图无圆点；AiMeta 组件两屏同逻辑是错因） | — |
| G28 | chat-dark-lisbon-cn | 布局 | 第三条 bullet 折行 | 原图单行到底（傍晚去 Senhora do Monte 看日落。+ timeout/+1 角标同行） | 渲染折两行（“看日 / 落。”+ 角标第二行） | 折行 | minor | 已证实（VM 字体偏宽类） | — |
| G29 | chat-dark-lisbon-cn | 布局 | 来源行 TLV 角标 chip | 原图有 pill 容器内 T L V + “3个来源” | 渲染只有 “3个来源 28积分 1.1秒 71 tok/s” 纯文本行，T/L/V 全缺 | 子元素缺失 | critical | 已证实（与 lisbon-en 的 SourcesChip 齐全形成对照：cn 屏代码未用 SourcesChip） | — |
| G30 | model-picker-a | 字形 | 积分数字前缀 | ~（波浪号）：~5/~11/~31/~80/~120/~400（430 宽裁切图 ASCII 字形确认为波浪线） | -（减号）：-5/-11/-31/-80/-120/-400（代码 ModelCost value="-5" 等） | 字形错误（约数 vs 负值，语义不同） | major | 已证实 | Q19 |
| G31 | model-picker-a | 位置 | Fable Pro+ 角标位置 | 与 ~400 同行同基线（430 宽裁切图：Pro+ 文本 x约 298-317，成本 x约 340-390，同行带 y803-822） | 叠在成本上方（390 宽图：角标行 y751-757，成本行 y784-814，右对齐上下叠放） | 错位（同行 → 上下叠放） | major | 已证实（角标在位本身见第 2 节 Q17；位置是另一项差距） | Q17 |
| G32 | model-picker-a | 颜色 | 模型行圆点色 | 淡 pastel 系：(161,191,211) 淡蓝、(203,171,151) 淡桃、(212,218,159) 淡黄绿、(220,179,160) 淡桃（430 宽裁切图门洞采样） | 饱和色 #4a7de4/#2eb5a5/#e2a181/#9b5de5（代码 ModelRow dot） | 饱和度系差，颜色错误 | major | 已证实（与 G18/G19/G09 同根因） | — |
| G33 | model-picker-a | 尺寸 | 模型行圆点直径 | 约 4-7px（430 宽裁切图，阈值腐蚀值）→ 约 4-7px@390 | 8px（代码 ModelDot8 h-2 w-2） | 约 +14-100%（腐蚀可解释大部） | minor | 已证实（腐蚀 allowance 内取 minor） | — |
| G34 | model-picker-a | 字体 | 分区标题 Everyday 首字 cap 高 | 约 10-11px（条带，腐蚀修正后约 11-12px）→ 约 11-12px@390 | 约 12-13px（390 宽图，标题行带 y63-77，代码 16px） | 约 -8% | minor | 已证实 | — |
| G35 | model-picker-a | 布局 | 顶部拖动手柄（sheet 小横条） | 有：顶部中央小灰横条 | 无：标题 Choose a model 直接顶头 | 元素缺失（小） | minor | 已证实 | — |
| G36 | model-picker-b | 布局 | Thinking 段下倍率小字 | 原图段下有小字说明（v1.0 备案：源小字不可分辨） | 未渲染（代码注释：No multiplier numbers are rendered） | 元素缺失（备案残差） | minor | 已证实（备案延续，非新发现） | — |
| G37 | credits-light | 字体 | 巨号 12,480 数字高 | 约 35px（条带第二位数字列 x2115，行带 y232-266）→ 约 35.9px@390 | 31px（390 宽图，第一位数字主干列 x35，行带 y115-145）；代码 44px | -14% | major | 已证实 | — |
| G38 | language-light | 字体 | 标题 App language 首字母 A cap 高 | 18px（545 宽裁切图，y86-103）→ 12.9px@390；估计字号 17.9px | 14px（390 宽图，y111-124）；代码 20px；估计字号 19.4px | +8% | minor | 已证实 | — |
| G39 | language-light | 颜色 | 页面底色 | 原图平坦区 (253,253,253)（545 宽裁切图） | (242,243,245)（390 宽图行区采样；Phone lightBg token 为 (245,246,248)） | 约 -10/通道 | minor | 已证实（行区采样含分隔线影响，取 minor） | — |
| G40 | 多屏（train/savings/credits/agent-team/search-drawer/info-sheet） | 布局 | 折叠边缘内容（第三建议、卡片脚注、Activity 行、Pause/Stop 行、Alex 行、脚注尾） | 原图首屏内或折叠位置不同 | 渲染首屏外约一截（VM Noto 字体偏宽 + 滚动快照） | 首屏外 | minor | 已证实（已知残差类，v1.2/v1.3 沿用；非设计参数） | — |

## 2. 最严重的 10 项（全部有实测数）

1. **app/airbuild S1 draft 封面比 +65%（critical，Q6）**：原图正方形 529x529（比 1.00）vs 渲染约 148x244（比 1.65）。用户已定“按原图来”；但 Q6 选项 A“封面改到与标题栏等高”与原图实测不符（原图照片高远超左侧标题栏高），执行以 1.00 为准。
2. **web/airbuild L05+L06 preview 争议 FAIL 被证伪（critical，Q1）**：窗口预览折叠截图底带扫描（x0–1200，y620–668）只有会话底色 + 白色 composer，唯一蓝色元素是 composer 发送钮，无药丸条、无“adaptation”标注行；右带扫描（x1100–1200）无头像列、无模块列；代码证实折叠时 preview=null、showServiceColumn 默认 false。两项均标 critical（判决问题，非渲染缺陷）——上一轮 FAIL 的对象在图里不存在。
3. **web/medley S1 线程底 composer 缺失（critical，Q10）**：Lisbon / Train / Savings / Kyoto / Router 五线程 + Agent “Add an instruction” composer，渲染全部没有。
4. **web/medley S2+S3 导航 chrome 缺失（critical，Q11）**：Credits 缺回退箭头 + “Credits”标题 + info 图标；Agent 缺左上回退箭头 + 右上“...”。
5. **app/medley G12+G25 双行输入条缺失（critical，Q18/Q20）**：原图双行条约 87–91px@390 vs 渲染单行 52px InputBar，home-cn 与 lisbon-cn 两屏同病。
6. **app/medley G23+G24 lisbon-cn 顶栏药丸缺失（critical，Q20）**：中 pill（标题 + 旅行 subline，bg 约 (28,32,38)）与右 pill（edit + more，bg 约 (26,32,42)）双缺。
7. **app/airbuild F1 chat 正文字号 +31%（critical）**：原图 cap 20px（占屏宽 1.96%）vs 渲染 cap 10px（占屏宽 2.56%），归一化 +31%。这是用户 11:25 一眼看出的“渲染正文比原图大且粗”的实证。
8. **头像形态（10 项，major）**：原图插画人物 vs 渲染字母块/统一笑脸圆。web/airbuild A01（major）+ app/airbuild A1–A7（7 major，逐成员：Pluso/Ampo/Colo/Ato/Camo/Qesto/Leto）。用户 11:26 亲指“人家的头像是啥样子的你的是啥样子的”。
9. **玻璃质感缺失（按钮纹理 14 项中的核心，major）**：原图半透明磨砂（draft handstime.app 药丸、chat 顶栏返回/…钮、Hourtown pill、detail 勾选圆钮）vs 渲染实色扁平。用户 11:24 亲指“你的按钮貌似没有玻璃质感”。
10. **web/medley J1 圆点源冲突（Q12）**：CN 源圆点鲜艳橙红（均值 217,94,39，25x25px@600）vs EN 源同位置仅淡蓝灰 blob（147,180,205），全图无近 (244,104,41) 像素；渲染蜜桃 #E2A181 两者都不沾。且 accent token 一 token 承载四处不同色（welcome 圆点、composer 圆钮、drawer 运行点、ModelDots 首点），单 token 改色无法四处全中。

其余 critical（共 19 项，10 项在上，9 项在此）：app/airbuild S2 briefing 发送钮 +42%（原图 92px/9.0% vs 渲染 50px/12.8%）、S3 首卡圆角 +41%（白区实测）至 +61%（声明值）、P2 draft 底部裁切内容丢失（次行 “app.” 被切掉）；web/medley S8 Train 来源字母缺失（原图 “S R K” + “4 sources”，渲染 3 个空白方块）、T6 Picker Thinking 档位数列缺失（Auto 110 / Off 10 / Low 110 / Med 140 / High 200 / Max 400，渲染只有裸 Tabs）；app/medley G05 pricing arc 起点错位（原图距内容左缘约 4px vs 渲染 77px）、G22 lisbon-cn 顶栏左钮偏小（原图约 45.5px@390 vs 渲染 36px）、G29 lisbon-cn 来源行 TLV 角标缺失（原图 pill 含 T L V + “3个来源”，渲染只有纯文本）。

## 3. 按维度汇总（差距行 164 行）

| 维度 | web/airbuild | app/airbuild | web/medley | app/medley | 合计 |
|---|---|---|---|---|---|
| 字体 | 6 | 2 | 5 | 7 | 20 |
| 颜色 | 3 | 0 | 18 | 7 | 28 |
| 文案数值 | 0 | 0 | 15 | 0 | 15 |
| 结构/布局 | 8 | 1 | 14 | 11 | 34 |
| 按钮纹理 | 8 | 4 | 2 | 0 | 14 |
| 尺寸/长宽比/间距/圆角/阴影 | 4 | 4 | 0 | 10 | 18 |
| 位置 | 1 | 2 | 0 | 3 | 6 |
| 头像 | 3 | 7 | 0 | 0 | 10 |
| 图标形态 | 3 | 7 | 4 | 1 | 15 |
| 封面与卡片内容 | 0 | 3 | 0 | 0 | 3 |
| 字形 | 0 | 0 | 0 | 1 | 1 |
| 合计 | 36 | 30 | 58 | 40 | 164 |

## 4. 按屏汇总（差距行 164 行）

- web/airbuild：ALL（全屏通用）17、M（主窗口）15、P（预览）2、S（侧栏折叠）1、未标屏 1。
- app/airbuild：chat 9、draft 6、home 6、briefing 5、detail 3、briefing 与 components 1。
- web/medley：Credits 11、Drawer 10、Agent 9、Pricing 5、Chat info 5、Welcome 4、Picker 4、Train 3、Composer 2、Savings 2、Router 1、Kyoto 1、全部聊天 thread 1。
- app/medley：chat-dark-lisbon-cn 8、pricing-dark 7、chat-dark-lisbon-en 7、model-picker-a 6、welcome-dark 4、home-light-cn 2、language-light 2、home-light-en 1、model-picker-b 1、credits-light 1、多屏（train/savings/credits/agent-team/search-drawer/info-sheet）1。


## 5. 修复计划（按优先级；只审不改，本节是候选项，不决策）

### P0——用户决策先行（无决策无法动手；每项附实测证据，不重复问事实）

- Q1：接受 preview 误判吗？像素证据已证明 FAIL 对象不存在（见第 2 节第 2 项）。接受则 web/airbuild v1.1 的 preview 项不再 block；不接受则需另给判决标准。
- Q12：J1 圆点以哪个源为准？CN 源鲜艳橙 vs EN 源淡蓝灰，二者互斥；且 accent token 是否拆分（现一 token 四处不同色）。改色前必须先定源与拆分方式，否则改一处错四处。
- Q10：线程底 composer 纳入还是排除？缺失已量化（5 线程 + Agent）。纳入是结构补齐；排除则记为 gallery 设计取舍。
- Q11：桌面面板保留手机导航 chrome 还是不带？缺失已量化（Credits、Agent 顶栏）。保留是 1:1，排除是平台适配声明。
- Q4：chat 项目标识矢量小镇还是保留字母块？位置/尺寸已一致，只差形态；小镇图不可拷位图，只能矢量重绘或抽象替代。
- Q7：briefing 页角一卡还是两卡？首卡缺失确认，第二卡目视也有折痕。
- Q8：detail 法官图去边框出图还是保留边框 + 忽略提示？内屏与 PASS 一致，边框只是 gallery 装帧。
- Q16：lisbon-en contested 交付接受吗？A 接受（6 项晚期 FAIL 皆无据，3 项修复已由后判 overtaken）；B 换法官/换 prompt 重判（需预算与口径）。
- Q17：picker-a contested 交付接受吗？A 接受（Fable Pro+ 在位确认，仅位置差 G31）；B 重判。
- Q18：home-cn 双行输入条加变体还是记为残留？缺失已量化（87–91px vs 52px），加变体影响 home-cn + lisbon-cn 两屏。
- Q20：lisbon-cn 全对齐还是仅保留已修左钮？缺失已量化（中/右 pill + 双行输入），全对齐改动面大。
- Q21：AiMeta 圆点淡化还是保留？根因已定位（原图淡 pastel vs 渲染饱和；且 token 调色板与 ModelDots/picker 硬编码调色板不一致，待查）。全局影响，不建议轻动。
- Q13/Q19：picker 前缀符号 ~ 还是 -？模型行 ~ 已确认，Thinking 行字形模糊待量；app/medley G30 已确认 ~ vs - 是字形错误（约数 vs 负值，语义不同）。
- Q3：若接受 preview FAIL，改什么？窗口内无目标，只能改 gallery section 5（BottomModuleBar/ServiceModuleColumn）或新增窗口形态，需用户定方向。
- Q2：preview 重跑吗？证据表明重跑只测判决稳定性，改变不了“元素不存在”的事实；建议不重跑，仍由用户定。

### P1——已量出、可直接动手（无需新决策；数值见第 1 节行表）

- draft 封面比改到 1.00（用户已定；Q6-A 标题栏等高方向作废，不执行）。
- app/airbuild F1 chat 正文字号回调（归一化 +31%）；F2 作者名 13→14px 候选作废（渲染已大 +18%，再加大扩大差距）。
- app/medley G05 pricing arc 起点 77px → 约 4px（内容左缘）；G06 点距 -20% 回调；G16/G17/G22/G26 停止钮尺寸（圆与方块各向回调）；G31 Fable Pro+ 改与成本同行同基线。
- app/airbuild S2 briefing 发送钮 50px → 92px 归一化（9.0% 屏宽）；S3 首卡圆角 24px → 约 15px 逻辑；P2 draft 底部裁切（框底/内容区改动，次行 “app.” 不可再丢）。
- web/medley T6 Thinking 档位数列补齐（Auto 110 / Off 10 / Low 110 / Med 140 / High 200 / Max 400）。
- app/medley G29 lisbon-cn 来源行 TLV 角标补齐；G27 lisbon-cn AiMeta 多余圆点去除（en 原图有圆点、cn 原图无圆点，两屏同逻辑是错因）。
- 不动项（已证实一致或已闭合）：web/medley D-01（Appeal/Contact support 全页差 2310px 仅按钮文字区）；app/medley W3 按钮底色 #edeef2（两屏 exact）；web/airbuild 用户蓝 #1987f7、三栏边界 198/696/1200、电话框 270px/7px 边框/约 38px 圆角、发送钮 24x24、Toast 居中（中心 599 vs 600，底 30px）。

### P2——补量清单（先量后改；71 项，详见各套文件待量节）

- web/airbuild 17 项：F03 侧栏文本 cap 高、F04 标签 + 机内文本 cap 高、F05 SF Pro Rounded 在 Apple 设备下的形态、C09 在线绿点孤立色、C10 非激活标签底色、B02 胶囊渐变强度、B04 附加钮 bbox、B05 底部圆钮 bbox 与窄容器 32px 形、B07 机内发送钮直径（需输入条局部重切）、B08 窗口玻璃 blur/saturate 量测、B09 内高光放大采样、S13 标签高 bbox、S14 拖拽条可见量测、S15 窗口角弧、I04 机内状态栏字形、A03 机内 feed 头像孤立宽、L03（REA “会话左 padding +174px”指顶栏还是消息流，需口径确认）。
- app/airbuild 17 项（T01–T17）：顶栏玻璃钮原图直径、药丸原图尺寸、气泡内边距原图值、任务卡/文件卡宽、draft 流量灯直径、detail 商店卡高 + 勾选钮直径、home 透视尺寸、briefing 照片块四边、气泡圆角原图值、Assets.car 内容、Lucide 精确路径、morphing 插值细节、iPad 双栏像素、组件屏独立原图缺失等（逐项见该套文件）。
- web/medley 21 项：手机 CSS 宽 390px 假设（全部字号换算依赖它）、正文/辅助档 cap 精确值、Savings 大数字 cap（渲染 40px vs credits 44px 分裂是否与原图一致）、Suspended 顶图标内字形（斜杠 vs 双竖线）、Router 提示图标字形、Home 顶栏右侧时钟形态、MedleyMark 原图形态、Thinking 档数字前缀符号（模型行 ~ 已确认，Thinking 行字形模糊）、Agent 第三卡首词 “Boar” vs “Board” 截断、圆角精确值、composer 条高、Credits 图例行像素调色、chat info chip 圆点像素调色、drawer 圆点像素调色、Home Auto pill 原图圆点数像素分离计数、Lisbon-EN 生成态停止底色映射、Lucide 现行版本形态复核（cards/gear/edit/folder 变体、Agent Done/Queued 现行名）、J1 源冲突决策（Q12）、Credits 柱总（高柱区可分 11 组，左侧低点区与基线/噪声不可分；渲染 20 条均匀 ramp vs 原图先平后陡形状差目视确认）、Home 内边距（约 -37%@390 假设，未计入总数）、桌面布局适配项逐项确认。
- app/medley 16 项（T1–T16）：welcome G 角标直径、welcome Try pill 高/描边、lisbon-en 引用角标原图尺寸、lisbon-en 末点补丁、lisbon-cn 末点补丁、home-cn 分段控件宽 + 顶图标圆、home-en Auto pill 圆点色、credits 图例圆点色、kyoto Kimi 圆点 + caps、总览 8 屏字号 caps（总览缩放未知）、总览背景纯区重采样、总览其他逐元素像素、pricing CTA 在面板框锚定后的边距、全部圆角、数字字重（方法极限）、picker 描述/模型名行 caps。

### P3——图标与动效（Lucide 为准，矢量为准，不拷官方位图）

- Lucide 核对合计 101 项：web/airbuild 29 项（同形 7、近形 21、无精确对应 1：DeviceInbound）、app/airbuild 12 项（同形 6、近形 5、无同形 1：任务列表，最近 list-checks）、web/medley 30 项（同形 12、近形 16、待定/复合 2：cards 无精确单图标等价、searchOrbit = Search + 轨道弧复合衍生）、app/medley 30 项（同形 9、近形 16、差异较大 1：gear 羽毛风 vs 现行 Lucide settings、名不符 1：本套 send 几何上是 Lucide arrow-up 而非 send、无对应 3：pdf、cards、searchOrbit）。
- 代码卫生先行：web/medley Icon.back / Icon.send / Icon.info 全仓库零引用（与 S2/S3 缺失同源；Suspended 内联 info SVG 与 Icon.info 重复不一致）；web/airbuild 10 个未用导出；app/airbuild、web/medley、app/medley 均无 lucide-react 包（grep 无引用），全部 Lucide 对照均为知识比对，接包后必须逐字复核，存疑项仍标 pending。
- morphing 分档（状态切换图标一律过渡动画，不硬切）：
  - 纯插值可行：chevron down/up（app/airbuild M1、app/medley M3、web/medley M4）、Plus→X 旋转（web/airbuild M04）。
  - 需重绘或自定义动画：menu↔close 分段变换（web/medley M1、app/medley M1）、task 圆点→对勾（web/airbuild M01：圆元素 vs 折线，不可插值，需重绘或淡入）、plus→check（app/airbuild M2、web/medley M5、app/medley M4，需同槽语义确认）、menu↔back（app/medley M2，中等）、mic↔stop 多元素编排（web/medley M2）、poll 环→点（app/medley M10）。
  - 需产品决策先行：mic↔send（web/medley M3 需先接线死代码 Icon.send；app/medley M6 语义确认）、pause↔stop（web/medley M6 需单按钮决策）、back↔menu（web/medley M7 需统一按钮）、play↔pause（app/medley 本套无此对；web/airbuild M05–M08 为规划项）。


## 6. 上一轮 22 项选择题对照（已能量化的已标注题号，不重复问事实；只剩决策本身）

- Q1 preview 误判：已量化证伪（见第 2 节第 2 项）。剩决策：接受误判与否。
- Q2 preview 重跑：证据表明重跑只测判决稳定性，改变不了“元素不存在”的事实。建议不重跑，仍由用户定。
- Q3 若接受 FAIL 改什么：窗口内无目标；只能改 gallery section 5（BottomModuleBar/ServiceModuleColumn）或新增窗口形态。需用户定方向。
- Q4 chat 小镇图：位置/尺寸基本一致，只差形态。剩决策：矢量小镇还是保留字母块。
- Q5 chat 其余 5 项：作者名方向颠倒（渲染已大 +18%，13→14px 候选作废）；顶栏直径、药丸尺寸、气泡内边距、文件卡尺寸无新量出支撑，转 P2 待量。
- Q6 draft 封面：已量化（1.00 vs 1.65），用户已定按原图来。纠正一点：Q6-A“封面改到标题栏等高”与原图实测不符，执行以 1.00 为准。按钮玻璃为同类新增（chat 顶栏、pill、detail 勾选钮）。
- Q7 briefing 页角：首卡页角缺失确认；第二卡目视也有折痕。剩决策：一卡还是两卡。
- Q8 detail 法官图：内屏与 PASS 一致，边框只是 gallery 装帧。剩决策：去边框出图还是保留边框 + 忽略提示。
- Q9 裁切重切：错位属实（home：2600 起切漏掉 2540–2740 顶栏；language：11550 起切漏掉 11480 首行；picker：5350 起切漏掉“Choose a model”标题行，为本轮新发现的同类错位）。建议全部按面板边界重切并重验 J2/J11b/J6。
- Q10 线程底 composer：已量化缺失（5 线程 + Agent）。剩决策：纳入还是排除。
- Q11 桌面导航 chrome：已量化缺失（Credits、Agent 顶栏）。剩决策：保留手机 chrome 还是桌面不带。
- Q12 J1 圆点：源冲突（CN 鲜艳橙 vs EN 淡蓝灰，见第 2 节第 10 项）；渲染蜜桃两者都不沾；且 accent token 一 token 四处不同色。剩决策：以哪个源为准 + token 是否拆分。
- Q13 picker 符号：模型行 ~ 已确认；Thinking 行字形模糊待量（web/medley 待量第 8 项）。app/medley G30 已确认 ~ vs - 是字形错误。
- Q14 信任规则：本轮未用裁判，结论不受影响。规则适用于下一轮法官回合（PASS 是否重跑确认）。
- Q15 修复顺序：第 5 节即答案（P0 决策 → P1 已量出 → P2 补量 → P3 图标动效）。
- Q16 lisbon-en contested：6 项晚期 FAIL 皆无据（本轮自量推翻：画像页幻觉、圆点缺失误读、空白图 claim 等）。剩决策：接受 contested 交付（A）还是换法官重判（B）。
- Q17 picker-a contested：Fable Pro+ 在位确认，仅位置差（G31：同行 vs 上下叠放）。剩决策：接受 contested 交付（A）还是重判（B）。
- Q18 home-cn 双行输入：已量化缺失（原图约 87–91px@390 vs 渲染 52px）。剩决策：加双行变体（影响 home-cn + lisbon-cn）还是记为残留。
- Q19 picker 前缀：同 Q13；G30 已确认字形错误（~ 约数 vs - 负值，语义不同）。
- Q20 lisbon-cn 顶栏 + 输入：已量化缺失（中 pill、右 pill、双行输入）。剩决策：全对齐还是仅保留已修左钮。
- Q21 AiMeta 圆点：根因已定位（原图淡 pastel vs 渲染饱和；且 token 调色板与 ModelDots/picker 硬编码调色板不一致，待查）。剩决策：淡化还是保留（全局影响，不建议轻动）。
- Q22 下一轮主裁：本轮未用裁判，不适用；留给修复轮（A nemotron 高 token 上限 + verdict-only + 429 回退 / B claude 高成本稳定 / C 等免费层恢复）。


## 7. 已证实 vs 待量（口径说明）

- 差距行 164 行 = 带严重度等级 149 行（critical 19、major 84、minor 46）+ 纯待量行 15 行（全部在 web/airbuild：36 = 2 + 9 + 10 + 15）。
- 149 行中，24 行同时带待量标记（web/airbuild 17、app/airbuild 4、web/medley 3、app/medley 0），表示“部分已证实、局部待量”（如形态已证实、尺寸待量）。
- 由此：完全已证实 125 行、部分已证实 24 行、纯待量 15 行，合计 164 行。
- 各套待量清单 71 项（web/airbuild 17、app/airbuild 17、web/medley 21、app/medley 16，逐项见第 5 节 P2 与各套文件）是各套的待量登记册，与差距行中的待量标记有重叠，不简单相加。
- 已证实一致项（不在差距数内，不动）：web/airbuild 35 行一致（用户蓝 #1987f7、三栏边界 198/696/1200、电话框 270px 等）；app/airbuild 一致项清单（chat 项目标识位置、顶栏圆钮白区、气泡与画布色等）；web/medley 一致 2 项（Home 问候语、Picker 模型名 CSS 口径吻合）+ D-01 闭合；app/medley v1.4 六修复复核见下。

## 8. 方法学纠正（本轮相对上一轮的修正，全部有证据）

- M-0 归一化纠正（app/medley）：5 屏条面板约 380px 宽，但 round4 裁切图 410–470px（含页边/阴影）。按裁切宽算百分比全错；本轮全部按面板宽重归一化（系数 1.026）或核实裁切系数。直接后果：v1.4 的 pricing arc “24.9%”起点是裁切宽分数，不是屏宽分数——G05 将其推翻（原图距内容左缘约 4px vs 渲染 77px）。
- 裁切错位（web/medley Q9）：home（2600 起切漏掉 2540–2740 顶栏）、language（11550 起切漏掉 11480 首行）已确认；picker（5350 起切漏掉“Choose a model”标题行）为本轮新发现的同类错位。其余 11 个裁切无错位后果；S1/S2/S8 缺失是代码事实，不是裁切 artifact。
- 字号系统性差异（用户 11:25 指出的漏项，本轮逐屏补量）：没有统一的“渲染更大”。app/medley：welcome 标题 -13%、credits 巨号 -14%（渲染更小），正文/辅助多为 +0–10%（渲染稍大）；app/airbuild chat 正文 +31%（渲染更大，实证）。token 缺口：welcomeTitle 38px vs 原图约 41.5px、hugeNumber 44px vs 原图约 51px、pageTitle 20px vs 原图约 17.9px（方向相反）。web/medley 桌面卡片宽约 588px vs 手机 390px，字号 px 相同则相对容器小约 30–40%，属平台适配的必然结果，不单独计差距。
- 上一轮 FAIL 证伪清单（本轮量测/代码推翻，不计入差距）：web/medley J2（home 顶栏缺失）、J11b（language 标题/首行缺失）——裁切错位；J4 六项 + J6 picker header“缺失”——代码在位，法官未定位；app/medley 晚期 6 项 FAIL——自量无据（Q16/Q17）；web/airbuild preview-collapsed FAIL——像素证伪（Q1）。
- v1.4 六修复复核（app/medley）：W3 按钮底色 #edeef2 两屏 exact，确认落地；P1 arc 颜色与弧高确认，但点距 -20%（G06）与起点错位（G05）未落地——只落地一半；L1 顶栏左钮圆钮、L2 引用角标、L3 停止 accent、L4 左钮圆圈形态均在位，尺寸有差（G15/G16/G17/G22）。
- 跨平台两套保真度口径不变：app/airbuild、web/medley 是风格 token/组件 1:1、布局平台适配，绝不谎称截图 1:1。app/airbuild home 原图为倾斜手持照片，只作风格/组件级比较。
- 本轮未用裁判（像素证据已足；裁判只是第二意见）。未碰服务器数据库、令牌、BotsRouter 路由/能力/渠道/分组/定价/结算、X、其他项目；未改任何一套 src/样式/token；未拷任何官方位图进设计系统。

