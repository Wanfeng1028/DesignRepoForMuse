# Medley 设计参数（DESIGN TOKENS）

来源：DesignRepoForMuse 仓库 Doubao/ 文件夹 3 张拼图。
参考框：手机屏宽 390px（渲染基准）。原图屏宽高比实测 0.456–0.457（det 220×481、cn 287×632），
渲染统一用 390×852。
标注规则：[实测] = PIL 像素采样/量取；[视觉估计] = 按原图比例换算，JPEG 模糊处已注明未确认。

## 一、复原清单（18 块独立屏，拼图去重后）

总览拼图 medley-15-screens-overview.jpg（900×1194，5 列 × 3 行）：
1. welcome-dark 欢迎页（深色）—— ov_r0_c0；高清同款见中文图 cn_r0_c0
2. home-light-en 首页英文（浅色）—— ov_r0_c1；高清同款见细节图 det_r0_c1
3. chat-dark-lisbon-en 里斯本行程对话（深色）—— ov_r0_c2；高清同款 det_r0_c0
4. chat-light-train-en 巴黎–巴塞罗纳火车飞机对比对话（浅色）—— ov_r0_c3
5. chat-light-savings-en 储蓄计算对话（浅色）—— ov_r0_c4
6. chat-dark-kyoto-en 京都行程对话（深色）—— ov_r1_c0
7. chat-light-router-en 路由器设置对话（浅色）—— ov_r1_c1
8. chat-info-sheet 对话信息半屏（浅色）—— ov_r1_c2
9. search-drawer-dark 搜索/历史抽屉（深色）—— ov_r1_c3
10. model-picker-a 选模型 A（深色）—— ov_r1_c4；高清同款 det_r0_c2
11. model-picker-b-thinking 选模型 B 含 Thinking 分段（深色）—— ov_r2_c0
12. pricing-dark 定价页（深色）—— ov_r2_c1；高清同款 det_r0_c3
13. credits-light 积分页（浅色）—— ov_r2_c2；高清同款 det_r0_c4
14. suspended-light 账号停用页（浅色）—— ov_r2_c3
15. agent-team-dark 多智能体任务页（深色）—— ov_r2_c4

细节拼图 medley-5-screens-detail.jpg（1400×581）：5 屏均为总览屏的高清重复（3、2、10、12、13），不另计。
中文拼图 medley-chinese-screens.jpg（1200×656）新增 3 屏：
16. home-light-cn 首页中文（浅色）—— cn_r0_c1
17. chat-dark-lisbon-cn 里斯本行程对话中文（深色）—— cn_r0_c2
18. language-light 语言设置页（浅色）—— cn_r0_c3
（中文图第 1 屏欢迎页 = 第 1 屏高清版，不另计。）

## 二、颜色 [实测，JPEG 采样近似值 ±3]

深色主题：
- dark-bg 屏幕底：#121316（各屏实测区间 #06070B–#1C1818：里斯本 #0D0E12、京都 #18191D、选模型顶部 #06070B、欢迎 #1C1818 疑受污染；取 #121316 为括号共识值，不追单屏噪声）
- dark-card 卡片/气泡底：#1E1F23（picker 行采样 #2F3034 为高亮行，普通卡片取 #1E1F23）
- dark-input 输入条底：#1F2024 [实测：det 里斯本输入条中部 x60–180, y435–455 中位数 (31,32,36)]
- user-bubble-dark 深色用户气泡底：#191A1E [实测：深色气泡上下 padding 区 y59–68 与 y92–95 一致 (25,26,30)；旧 #26272B 作废，该值现只属于输入条]
- dark-divider 分隔线：#2A2C31（视觉估计）
- dark-text 主文字：#F5F5F7 [视觉匹配：JPEG 里 1–2px 笔画严重混合，里斯本正文最亮 2% 仅 #B1B2B6，远低于真值；近白结论来自笔画峰值外推，非十六进制实测]
- dark-sub 次文字：#9A9BA2 [视觉匹配：同上，笔画混合所限]
- dark-dim 弱文字：#6B6C72 [视觉匹配：同上]

浅色主题：
- light-bg 屏幕底：#F5F6F8（实测）
- light-card 卡片底：#FFFFFF（输入条实测 #FFFFFF；内容卡片同白）
- light-row 行底：#F5F6F8（与底同色，靠分隔线区分）
- light-divider 分隔线：#E6E7EA（视觉估计；火车屏 y210–217 的灰带是建议行区域、非 1px 分隔线，本轮未量到分隔线样本）
- light-text 主文字：#17181C [视觉匹配：JPEG 笔画混合，火车正文最暗 2% 仅 #707175，远高于真值；近黑结论来自笔画峰值外推]
- light-sub 次文字：#6B6C72 [视觉匹配：同上]
- light-dim 弱文字：#9A9BA2 [视觉匹配：同上]

强调与功能：
- accent-orange 品牌橙（Let's discover 后圆点、发送按钮）：#E2A181 [实测：det 里斯本 mic 圆心 6×6 中位数 (226,161,129)；旧 #E4754A (228,117,74) 仅 R 位吻合，G/B 差 44/55，且 JPEG 混合只能压暗不能提亮，故旧值作废；ModelDots 首点与 ModelDot 默认色同步跟随此值]
- black-btn 黑按钮：#111214（视觉估计；火车屏黑色 mic 圆被总览裁切切掉右半，圆心落在裁切外，无干净采样点；黑色笔画 JPEG 压暗方向反推真值约 #111214，暂留估计）
- white-btn 白按钮：#FFFFFF，黑字（视觉估计）
- chart-amber 积分柱状图：#8C553C [实测：积分柱体像素簇 (128,64,64) 512px + (128,64,32) 379px；旧 #B07A3B (176,122,59) 过亮过金，作废；柱体为多色堆叠，棕金为主 + 粉/青小段]
- chart-line 储蓄曲线：#17181C 实线 / #9A9BA2 虚线（视觉估计）
- model-dot 模型彩点：Claude #B0703C、GLM #C65D7B、Kimi #9A9A3E、DeepSeek #5B8A99、GPT #3FA34D [实测近似：彩点仅 4–5px 原生尺寸，JPEG 4:2:0 色度抽样破坏色度，无法给十六进制精确值；沿用放大图采样值，不虚构精度]

## 三、字体 [视觉估计，390 框换算]

- 字族：系统无衬线栈（-apple-system / Inter / PingFang SC / Noto Sans SC）[未确认：本轮未执行逐字形态比对——可用最大字母样本（欢迎标题/问候语）在 JPEG 里笔画粘连、无干净单字，候选无法证伪也无法证实；如用户能提供单字高清截图可再比对]
- welcome-title 欢迎大标题：38px / 700 / 行高 1.15
- greeting 问候：27px / 700 / 行高 1.25
- page-title 页标题：20px / 700 / 行高 1.3
- section-title 分区标题：16px / 700 / 行高 1.4
- body 正文：16px / 400 / 行高 1.55 [行高实测：里斯本 AI 正文行距 14 native = 24.8 render = 16×1.55]
- 用户气泡行高：1.35 [实测：气泡行距 12 native = 21.3 render = 16×1.33，取 1.35]
- body-bold 正文加粗段首：16px / 700 / 行高 1.55
- list-item 列表项：15px / 500 / 行高 1.45
- secondary 次要文字：13px / 400 / 行高 1.45
- caption 说明/脚注：12px / 400 / 行高 1.45
- huge-number 巨型数字（12,480 / $58,164）：44px / 700 / 行高 1.1
- status-bar 状态栏：13px / 600（时间 10:24）[实测：10:24 字高 5 native → 8.9 render 字帽 → 约 12.4px，取 13]

## 四、间距 / 圆角 / 阴影 [视觉估计，390 框]

- page-padding 页面左右边距：20px [实测：经逐屏裁切偏移修正后，里斯本正文左沿 11 native ×1.7727 = 19.5，首页问候 12 native ×1.7727 = 21.3；此前 58px 读数是裁切偏移假象]
- section-gap 分区之间：28px
- row-gap 列表行内边距上下：14px
- card-gap 卡片之间：12px
- input-height 输入条高：52px [实测：里斯本 pill y436–466 = 30 native → 53.2 render]；input-radius：26px（全圆角胶囊）
- button-height 按钮高：52px；button-radius：26px（全圆角胶囊）
- bubble-radius 对话气泡：20px（用户气泡右上收小角）[对比验证：火车气泡右角被总览裁切切掉，左角在 1px 精度下无可见弧线，无法像素量取；20px 来自两轮并排对比]
- card-radius 内容卡片：16px
- sheet-radius 半屏顶部圆角：24px
- chip-radius 小胶囊（建议、标签）：20px
- avatar-dot 模型彩点直径：8px
- shadow：浅色卡片轻阴影 0 2px 12px rgba(0,0,0,0.06)（视觉估计）；深色无阴影
- status-bar 高：约 44px；home-indicator 高：约 20px 区域

## 五、布局

- 手机框：390×852，圆角 44px，边框 2px #222（展示用）
- 顶部栏：左图标 / 中部胶囊 / 右图标三段式，高约 56px
- 底部输入条：固定底部，左右边距 16px，距底 12px
- 建议行：通栏行 + 底部分隔线，左图标 20px
- 对话：用户气泡右对齐（深色底 #191A1E [实测] / 浅色底 #EDEEF0 [实测：火车气泡字间灰带 230–240]）；AI 正文通栏
- 表格：三列对比表，首列弱文字，后两列主文字，行分隔线
- 图表：柱状图约 20 根柱；折线图双线（实线+虚线）

## 六、未确认项（2026-10-27 细节收尾轮后，逐项结论）

- 字族：仍未确认（原因见第三节；无干净单字样本，无法逐字比对）。
- 字重细节、阴影参数：仍为[视觉估计]/[对比验证]——JPEG 笔画无法量字重，无可采样阴影样本。
- 模型彩点精确色值：仍为[实测近似]（4–5px 点 + 4:2:0 色度抽样，十六进制精度不可达；沿用放大图采样值）。
- 部分小字文案：已解决——火车 4h 30m（8× 表格裁切确认，上一轮 50m 误读纠正）、火车 subline read 6 pages（8× 裁切确认，代码原 4 pages 已改）、积分 590/4,620（上一轮已确认）、里斯本 T/L/V（6× 芯片裁切确认）、chat-info 脚注全文（4× 裁切确认，代码已是该文案）、agent-team 耗时 31s/9s/7s/6s/21s/8s（右列 4× 裁切 + 步骤行裁切互证；Reviewer 8s 的 s 为推断，见第九节）。
- model-picker-b 分区归属：已解决——GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5 三行在原图里无分区标题，直接跟在 Thinking 块之后（第 3 轮并排对比确认）；渲染保持无标题行，不虚构分区名。
- chat-info 半屏弱化背景：已解决——可见内容只有状态栏 + 顶栏（汉堡、Auto pill、圆图标、编辑图标）+ 用户气泡“Turn this into a 3-day plan with costs”+“Claude Sonnet 5.5 • Auto”模型行，无 AI 正文（3× 裁切确认）；代码现状（顶栏 + 气泡 + 模型行）已匹配。
- picker-b Thinking 小费用数字：穷尽方法仍不可解（已试方法见第九节）；渲染不写任何倍率数字，不虚构。

## 七、读图方式说明

- kimi-k3 视觉：2026-10-26 21:00–21:10（CST）实测 BotsRouter 的 moonshotai/kimi-k3 通道连续失败
  （HTTP 522 上游超时、HTTP 500 do request failed），文本与传图均失败；glm-4.7 通道 429 限额
  （2026-10-30 01:14:56 重置，硬停）；qiniu/conatus-free 通道 525；仅 spark-x2.6 通道正常。
  因此本文件数值全部来自 PIL 像素实测 + 编排者直接看图换算，未采用 k3 视觉输出；
  k3 恢复后可再跑一轮视觉复核。
- 代码生成同样先探 k3，k3 不通则用 spark-x2.6 兜底，最终报告中写清。
- 订正（2026-10-26 21:20 CST）：k3 失败根因找到——k3 只接受 temperature=1，调用器默认 0.2 触发
  HTTP 400。改 --temperature 1 后 k3 文本与传图均恢复正常；k3 视觉复核首页（det_r0_c1）结果与
  本文件一致：背景 #EEF0F1→#F8F9FA（本文 #F5F6F8）、主文字 #1F1F1F（本文 #17181C）、
  图标灰 #5F6368（本文 #6B6C72）、标题 28–32pt（本文 27px）、正文 15–16pt（本文 15–16px），
  文案清单全对。因此本文数值现为 PIL 实测 + 编排者看图 + k3 视觉三方互认；后续代码生成
  优先走 k3（--temperature 1），仍不通再用 spark-x2.6。
- 续订（2026-10-27 细节收尾轮）：k3free（BotsRouter 七牛云 moonshotai/kimi-k3-free，temperature=1）探活成功并承担本轮视觉理解；但其小字视觉不可靠（footnote/agent-times/mult 两轮均不收敛，推理过程外泄进输出，第二次调用曾 429）；本轮所有数值结论均以 PIL 实测 + 编排者直接看图为准，k3free 仅作交叉参考，不一致时以实测为准。

## 八、对照轮次订正（第 1–2 轮，渲染图与原图并排比对后修正）

- 文案纠正：中文对话标题为“里斯本穷游三天”（非“本游”）；积分页 By model：GLM-5 为
  590 messages（非 290）、DeepSeek V4.1 Flash 为 4,620（非 4,420），与各模型单价 -31/-11
  乘消息数完全对应（590×31≈18,300、420×11=4,620）。
- AI 头规则：AiMeta 一律单模型圆点（非 5 点簇）；5 点簇只出现在 Auto pill 与定价圆点行。
  模型单点色（放大图实测近似）：Claude #B0703C、GLM #C65D7B、Kimi #9A9A3E、
  DeepSeek #5B8A99、GPT #3FA34D。
- 输入条按钮四种形态：circle（默认：深色橙圆 mic、浅色黑圆 mic）、plain（灰色线形 mic，
  无圆底）、stop（白圆 + 内 12px 黑方块）、sendDark（黑圆 mic，旧逻辑保留）。
- 选模型页：Auto 行用 ModelDots 多色圆点簇；Fable 的 Pro 角标为灰色描边（非橙色）。
- 积分页：顶栏左对齐（back + Credits 靠左、info 在右）；柱状图为按模型分段堆叠的多色柱
  （底部棕金为主 + 粉/青小段，约 20 根）；图表区有 Oct 15, upgraded to Pro 标注与虚线。
- 停用页：标题 26px（保单行）、正文 14px（两行）；“You can still:”三行左侧配小图标。
- 多智能体页：标题在原图里断为两行（“Compare the pricing of 12 note-taking / apps”），
  渲染侧用 17px + 手动换行复现该断行；各行右侧耗时数字原图模糊，渲染省略。
- 半屏页：背景区高 150px，半屏顶边约在 194px（原约 200px）；上半区弱化背景里是否还有
  AI 正文不可辨，渲染只放顶栏 + 用户气泡 + 模型行。
- 其余第 1 轮修正：火车对比表字号 14px、列结构 label 固定 100px + 两列均分；火车建议项
  去胶囊改纯文字行；储蓄实线 stroke 1.5；京都卡片内边距收紧；抽屉宽 84%（右侧弱化条
  62px）；导航图标换专用线形图标；定价页去套餐卡片边框并收紧间距使页脚完整入框。
- 残差（第 3 轮后，逐项结论）：
  - Medley 标志 M 形：已解决——中文欢迎页最大 logo 实例 marching-squares 描摹：双白环（左楔 37 点 + 主体 95 点）+ 斜向 swoosh 负空间切口 + 右上橙块 rect (30,47,2,5)，SVG viewBox "19 43 17 19" 已替换原 clean-M 近似形。
  - “N sources”芯片：已解决——里斯本 T/L/V 三字母徽标 + “3 sources”（6× 芯片裁切确认 T/L/V；徽标底色不可辨，用中性深色占位）；火车 3 空徽标 + “4 sources”（字母经 6× Lanczos + 锐化 + k3free 两读均不可辨，空徽标 + 文字是诚实上限）。
  - picker-b Thinking chip 下方小费用数字：穷尽方法仍不可解（见第九节）；分段渲染保持单行标签，不写倍率。
  - 储蓄折线：已解决——实线改为复利公式采样折线（30 点，$200/月、6%/年、按月复利；FV(15 年)=58,163.7 ≈ 原图 $58,164；网格搜索拟合 MSE 1.89，残差 ±3.3px）；虚线改为 (0,104)–(278,47.6)，对应 $36,000 线性线（检查点吻合）；滑块填充改为实测 16%/44%（月供轨 x13..148，填充至 x33/x73）。
  - 对话页滚动位置：部分解决——各屏首屏内容与原图抓取瞬间一致；滚动偏移本身是抓取瞬间状态，无法复原，渲染取自然首屏（属原图状态而非设计参数）。
  - 状态栏图标：已解决——信号条 3px → 2.5px、wifi 线宽 1.6 → 1.4、电池改实心圆角矩形 + 实心 nub（中文图 4× 状态栏裁切确认：信号为 4 根细升条、wifi 为扇形 + 圆点、电池无描边间隙）。
  - 字族：仍未确认（见第三节）。
  - 本轮新增修正（第 3 轮并排对比后）：agent-team 顺序纠正（进度条在积分行上方，原代码顺序反了）+ Step 3 of 8（原代码 5 错误）+ 进度条 20% [实测：填充 x7..35 / 轨道 x7..148；与 1240/6000=20.7% 吻合、与 1240/5000=24.8% 及 3/8=37.5% 均不吻合，渲染按实测 20%]；积分“1,240 of 6,000”经字形（6 无顶横、5 必有顶横）+ 进度条双重验证，代码原值正确（上一轮“5,000”误读纠正）；火车 subline read 6 pages（原代码 4 pages 错误）；里斯本顶栏补 Claude 模型圆点（第 3 轮对比发现遗漏）；深色气泡 #191A1E、输入条 #1F2024、品牌橙 #E2A181、积分棕金 #8C553C、气泡行高 1.35、正文加粗段首行高 1.55（储蓄/京都）。

## 九、本轮细节收尾方法与证据（2026-10-27）

- k3free 探活：BotsRouter 七牛云渠道 moonshotai/kimi-k3-free，temperature=1 必带；文本探活成功（100 prompt / 100 completion，全为 reasoning_tokens；教训：max-tokens 必须给大，否则输出在 reasoning 里截断）。视觉调用 5 次：footnote（4×，1008 completion tokens，读数差）、agent-times（4×，2156 tokens，6 个时间全 [?]）、train-chip（6×，确认 3 徽标 + 4 sources，字母不可辨）、picker 首轮（进程消失、无输出）、picker 次轮（8,211 字节，推理外泄、多假设自相矛盾）、mult2（10× 行裁切，第二次 429 后重试成功，结论仍为多假设不收敛 + 误认 UI 为风扇控制）。k3free 视觉结论：小字（≤3px 字形）不可靠，凡 k3free 与 PIL 实测不一致处以实测为准。
- 裁切放大：3 张原图每屏按原生分辨率裁出，3–10× Lanczos + UnsharpMask（radius 2, percent 140–200），小字/数字/图标一律走放大裁切；本轮新增裁切 20+ 张（regions/ 下 picker-thinking、picker-caption、picker-multipliers、picker-mult-row、agent-bar、agent-bar2、agent-credits-line2、chatinfo-footnote、agent-times-right、chip-lisbon、chip-train、train-subline2、train-table 等）。
- 跨图互证：同一屏在总览/细节/中文图多次出现时以最清晰者为准；里斯本（det 220×481）、首页（det）、选模型 A（det）、定价（det）、积分（det）的高清版优先；picker-b、火车、储蓄、agent-team 仅总览版（154px），以该版为准。
- PIL 像素实测：颜色（中位数/像素簇）、线宽（行扫描）、圆角（失败项如实记）、间距（裁切偏移修正）、字号（字高换算）、行高（行距换算）、曲线（沿 x 采样深色像素 + 公式网格搜索拟合）、滑块（填充行扫描）、进度条（填充/轨道行扫描）全部有记录；本轮纠正的旧值：dark-input #26272B→#1F2024、accent #E4754A→#E2A181、chart-amber #B07A3B→#8C553C、储蓄滑块 38%/30%→16%/44%、agent-team 顺序/Step/进度条、火车 4 pages→6 pages、积分 5,000→6,000（纠正上一轮误读）。
- 数值勾稽：积分 590×31≈18,300、420×11=4,620（上一轮）；储蓄 FV 公式 58,163.7≈58,164（本轮）；agent-team 进度条 20%≈1240/6000=20.7%（本轮，佐证 6,000）。
- 几何描摹：logo 双环 marching-squares（logo_ms.py 可复现）、储蓄曲线公式采样（非手绘）、状态栏图标线宽量取。
- 字体比对：未执行（无干净单字样本，见第三节）；不虚构字族结论。
- 多轮对比：第 3 轮 Playwright 重渲染 18 屏（shot-screens.mjs），5 屏并排对比（agent-team、picker-b、储蓄、里斯本、火车）+ 2 屏局部复验（里斯本顶栏圆点、火车 subline）；差异清单：本轮修正 9 项（见第八节），遗留差异仅“picker-b 倍率小字缺失”与“字族未确认”两项不可解 + 滚动偏移状态项。
- 仍不可解项的完整已试方法（picker-b Thinking 倍率小字）：① 8×/10× Lanczos + 强锐化裁切直接看图（字形 3px 高，笔画粘连）；② 逐像素灰度位图分析（6 个分段倍率区 y211–213，blob 宽 5–7px，无法稳定拆字）；③ k3free 视觉两轮（首轮多假设 1x/0x/1.5x/2x/3x/4x 与 1x/0x/2x/4x/8x/16x 自相矛盾；次轮 1.6x/0x/1.0x/1.5x/2.0x/2.5x 且误认 UI 为风扇控制）；④ 跨图互证（picker-b 仅总览版，无细节/中文高清同款）；⑤ figma-queue.json 排查（20MB 内嵌截图均为另一桌面/Web/CLI 应用，与 Medley 移动端无关）；⑥ 429 限流后重试（成功返回但仍不收敛）。结论：无任何一轮给出可复现的六值，渲染不写倍率；用户若能提供 picker-b 高清截图可立即补齐。
- agent-team 行内圆点色彩：3px 尺度下全卡色度扫描（>30 阈值）仅在 x22–24, y98–99 检出浅粉像素簇，无法定性；渲染沿用约定（Running 绿/Done 白/Queued 灰），不虚构色值。
