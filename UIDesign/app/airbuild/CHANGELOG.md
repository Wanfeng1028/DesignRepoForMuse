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
