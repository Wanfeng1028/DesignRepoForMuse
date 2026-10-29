# UIDesign — 四套设计系统（1:1 还原）

两套风格 × 两个平台，共四套，每套自成一体：tokens + React 组件 + 轻量画廊演示页，
复制进项目就能直接用。以后新项目的 UI 按这四套来。

| 套 | 目录 | 依据 |
|---|---|---|
| AirBuild 风 × 桌面/web | `web/airbuild/` | 官方网页演示模型实测 token（见 `~/workspace/airbuild-rea/AIRBUILD-REA-20261029.md`）+ 用户桌面三栏照片 + App Store 平板图 |
| AirBuild 风 × 移动端 | `app/airbuild/` | App Store 官方高清截图（iPhone 1320×2868、iPad 2064×2752） |
| Medley 风 × 桌面/web | `web/medley/` | `muse/DESIGN-TOKENS.md` 实测 token + Doubao 三张拼图（布局为桌面重排，见该套 README 开头声明） |
| Medley 风 × 移动端 | `app/medley/` | 同上 token + 18 屏原图 1:1 |

## 技术栈（已拍板，四套统一）

Vite + React + TS + Tailwind CSS v4 + Radix primitives，shadcn 式（组件源码进仓、
自己拥有）。禁 Ant Design / MUI / Next.js。每套 `private: true`，`vite.config.ts`
的 `base` 为 `'./'`。安装与构建（以 web/airbuild 为例）：

```sh
cd web/airbuild
pnpm install
pnpm build   # tsc -b && vite build
pnpm dev
```

## 使用规则

- 组件一律走 props，品牌文案不硬编码进组件；画廊演示文案仅为演示内容。
- 官方位图资产一律不用：图标全部重绘为矢量，角色头像为自家重绘。
- 每套 README 末尾都有“残差”一节：凡是公开证据不足、无法 1:1 的地方都如实
  列在那里，不许把近似当成 1:1。已确认的全局缺失项：
  - 底部模块条无任何官方图：原版是右侧模块列，底部条是改编（web/airbuild
    里两者严格区分标注）；
  - 桌面版聊天正文无高清可读文本；全部公开图均为浅色，深色模式是否存在未知；
  - Medley picker-b 思考倍率小字（约 3px）此前已证不可辨读，四套均不渲染该数值；
  - BotsTalk 的 `design-airbuild.css` 只是近似（#f6f6f7、12px 圆角），不是 1:1，
    不得作为 AirBuild 两套的依据。
- 截图方法说明：本机受管 Chromium（`/opt/meta-chromium/chrome`）因 WebGL 域
  策略无法启动，四套的验证截图均改用 Playwright 自带 headless shell 对同一份
  `dist/` 产物拍摄（file:// + `--allow-file-access-from-files`），各套
  `docs/verification/` 下有复现脚本与比对结论。
