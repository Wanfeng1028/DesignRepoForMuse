# v1.7 颜色采样证据（photo-9.jpg → 渲染验证）

源图：~/workspace/user/media_library/image/photo-9.jpg，1170x2532。
屏边界实测（非精确对半，右列两屏右缘被裁切）：左列屏 x 约 65–700；右列屏
x 约 730–1170；上排 y 约 105–1335；注脚带 y 约 1340–1440；下排 y 约 1460–2532。

## 原图采样（photo-9 坐标）

| 元素 | 采样点/区域 | 原图值 | 备注 |
|---|---|---|---|
| 品牌簇绿点 | (133,199) | #a4d2c7 | JPEG 高光混合，token 去混合估计 #5ec8a7 |
| 品牌簇蓝点 | (144,194) | #b0c5d6 | 高光混合，token #8fb0d8 |
| 品牌簇品红点 | (156,189) | #d3afc9 | 高光混合，token #d98cb4 |
| 标题光标 | 约 (527,613) 点体 | #93c8f0 / #aed2f2 | 高光混合，token #6ea9dd |
| 上部蓝晕 | 峰值 (620,558)；样点 (580,520)；patch 中值 | #1f2f46；#1a2a3a；#121a23 | 径向渐变，中心相对 78%/30% |
| 左下暖光 | 峰值 (182,1012)；patch 中值 | #482b1d；#41261e | 径向渐变，中心相对 21%/76% |
| 右下绿光 | 峰值 (536,1296)；patch 中值 | #193d33；#203b35 | 径向渐变，中心相对 82%/92% |
| 基底 | 左上 patch 中值 | #0d0e10 | round 6 token #111518 不变 |
| Kimi K3 点 | 顶栏中心 (301,1680)；核 | #e8dea3；#d8d19b | token #d8c25a |
| GPT-6.1 Sol 点 | 顶栏核；消息头核 (813,2166) | #548d7c；#3d7c6b | token #4a8a76 |

## 渲染验证（v1.7 bare 截图，390x844，像素精确命中）

- welcome-dark：绿 (27,67) #5ec8a7；蓝 (35,64) #8fb0d8；品红 (41,60) #d98cb4；
  光标整盘 #6ea9dd（中心 (330,318)）；暖 patch (40,580,180,720) #3c291f；
  绿 patch (260,720,380,830) #1a332e；蓝 patch (240,180,380,330) #1c2a37；
  基底 patch #111518。
- home-light-en Auto 簇：#5ec8a7 (158–161,57–60)；#8fb0d8 (163–166,54–57)；
  #d98cb4 (168–171,51–54)，斜排上升。
- chat-dark-kyoto-en：#d8c25a 两点（顶栏 + AiMeta）。
- chat-light-router-en：#4a8a76 两点（pill + AiMeta）。
- model-picker-a：#d8c25a (20–26,673–677)；model-picker-b：#4a8a76 (20–26,566–572)。
- chat-dark-lisbon-en 流式点：#fd6718 (60–66,711–717)，旧 HD 值保留。

## 辉光渐变（welcome-dark.tsx 容器 background）

- 蓝：radial-gradient(ellipse 320px 260px at 78% 30%, rgba(52,86,120,0.45), transparent 70%)
- 暖：radial-gradient(ellipse 300px 240px at 21% 76%, rgba(114,66,40,0.55), transparent 70%)
- 绿：radial-gradient(ellipse 280px 220px at 82% 92%, rgba(38,94,78,0.55), transparent 70%)
- 教训：辉光不得用绝对定位 overlay div（会压过静态标题，把光标染成 #5b8fbd）；
  本轮已改为容器背景，修后光标精确命中 #6ea9dd。

## 裁切证据（本目录）

- crop-welcome-logo.png / crop-welcome-cursor.png / crop-home-auto.png /
  crop-kyoto-top.png / crop-router-top.png：photo-9 局部 3x 放大。
- hd5-topleft.png / hd15-overview.png / hd15-credits-leg.png：旧 HD 条对照。
- shot-v1.7.mjs / shot-welcome-only.mjs：截图脚本（Playwright 自带 headless shell；
  /opt/meta-chromium/chrome 本机已无法启动，报 Hatch WebGL domain policy）。
