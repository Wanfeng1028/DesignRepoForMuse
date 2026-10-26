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
- dark-bg 屏幕底：#121316（welcome 采样 #111518；chat 顶部 #17181A，取中间值）
- dark-card 卡片/气泡底：#1E1F23（picker 行采样 #2F3034 为高亮行，普通卡片取 #1E1F23）
- dark-input 输入条底：#26272B（实测）
- dark-divider 分隔线：#2A2C31（视觉估计）
- dark-text 主文字：#F5F5F7（视觉估计，近白）
- dark-sub 次文字：#9A9BA2（视觉估计，灰）
- dark-dim 弱文字：#6B6C72（视觉估计）

浅色主题：
- light-bg 屏幕底：#F5F6F8（实测）
- light-card 卡片底：#FFFFFF（输入条实测 #FFFFFF；内容卡片同白）
- light-row 行底：#F5F6F8（与底同色，靠分隔线区分）
- light-divider 分隔线：#E6E7EA（视觉估计）
- light-text 主文字：#17181C（视觉估计，近黑）
- light-sub 次文字：#6B6C72（视觉估计）
- light-dim 弱文字：#9A9BA2（视觉估计）

强调与功能：
- accent-orange 品牌橙（Let's discover 后圆点、发送按钮）：#E4754A（实测采样 RGB 228,117,74）
- black-btn 黑按钮：#111214（视觉估计）
- white-btn 白按钮：#FFFFFF，黑字（视觉估计）
- chart-amber 积分柱状图：#B07A3B 系（视觉估计，棕金色）
- chart-line 储蓄曲线：#17181C 实线 / #9A9BA2 虚线（视觉估计）
- model-dot 模型彩点：多色小圆点（Claude 橙红、GLM 蓝、DeepSeek 蓝绿、Kimi 紫、GPT 绿），具体色值未确认

## 三、字体 [视觉估计，390 框换算]

- 字族：系统无衬线（-apple-system / Inter / PingFang SC / Noto Sans SC），未确认
- welcome-title 欢迎大标题：38px / 700 / 行高 1.15
- greeting 问候：27px / 700 / 行高 1.25
- page-title 页标题：20px / 700 / 行高 1.3
- section-title 分区标题：16px / 700 / 行高 1.4
- body 正文：16px / 400 / 行高 1.55
- body-bold 正文加粗段首：16px / 700 / 行高 1.55
- list-item 列表项：15px / 500 / 行高 1.45
- secondary 次要文字：13px / 400 / 行高 1.45
- caption 说明/脚注：12px / 400 / 行高 1.45
- huge-number 巨型数字（12,480 / $58,164）：44px / 700 / 行高 1.1
- status-bar 状态栏：13px / 600（时间 10:24）

## 四、间距 / 圆角 / 阴影 [视觉估计，390 框]

- page-padding 页面左右边距：20px
- section-gap 分区之间：28px
- row-gap 列表行内边距上下：14px
- card-gap 卡片之间：12px
- input-height 输入条高：52px；input-radius：26px（全圆角胶囊）
- button-height 按钮高：52px；button-radius：26px（全圆角胶囊）
- bubble-radius 对话气泡：20px（用户气泡右上收小角，未确认）
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
- 对话：用户气泡右对齐（深色底 #26272B / 浅色底 #EDEEF0，未确认）；AI 正文通栏
- 表格：三列对比表，首列弱文字，后两列主文字，行分隔线
- 图表：柱状图约 20 根柱；折线图双线（实线+虚线）

## 六、未确认项（不许当实测用）

- 全部字族、字重细节、阴影参数、模型彩点精确色值、部分小字文案（总览图 154px 宽处模糊）
- model-picker-b 中 Thinking 分段下的分区归属（GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5 的分区标题模糊）
- chat-info 半屏底部脚注小字、agent-team 页各行右侧耗时数字（模糊）
- 细节以渲染对照轮次的实测为准，本文档随对照结果修订

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
- 残差（原图模糊或无法精确复原，渲染侧如实处理、不谎称 1:1）：Medley 标志 M 形为 SVG
  近似（原图带斜向 swoosh 与右上橙块）；“N sources”芯片上的 T/L/V 等来源小字母标省略
  为纯文字；picker-b Thinking chip 下方小费用数字省略；储蓄折线为示意曲线（非描摹）、
  滑块填充百分比为视觉估计；对话页滚动位置与原图抓取瞬间不完全一致；状态栏信号/
  电池图标为通用线形图标（略粗于原图）；字族未确认（系统无衬线栈）。
