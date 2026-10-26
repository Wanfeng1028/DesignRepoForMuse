# Medley 截图 1:1 复原（React）

把 `Doubao/` 文件夹里 3 张拼图中的 18 块 Medley 手机屏，用 React + TypeScript
1:1 复原的画廊工程。原图是多屏拼图（总览 15 屏、细节 5 屏、中文 4 屏），去重后
18 块独立屏；细节拼图的 5 屏均为总览屏的高清重复，不另计。

## 18 屏清单（每屏来自哪张图，见 DESIGN-TOKENS.md 第一节）

- 欢迎 / 首页：welcome-dark、home-light-en、home-light-cn
- 对话：chat-dark-lisbon-en、chat-dark-lisbon-cn、chat-light-train-en、
  chat-light-savings-en、chat-dark-kyoto-en、chat-light-router-en
- 其它：chat-info-sheet、search-drawer-dark、model-picker-a、model-picker-b、
  pricing-dark、credits-light、suspended-light、agent-team-dark、language-light

## 运行

```bash
pnpm install
pnpm dev      # 本地预览画廊
pnpm build    # 类型检查（tsc -b）+ 构建
```

画廊首页按固定顺序列出 18 屏，每屏一个 390×852 手机框，可单独对照原图。

## 结构

- `src/tokens/`：主题/token 代码化，与 DESIGN-TOKENS.md 一一对应
- `src/components/`：Phone 框、状态栏、TopBar、InputBar、气泡、图标等共享组件
- `src/screens/`：每块屏一个组件（`meta = { id, title, source }`）
- `src/App.tsx`：画廊组装（自动发现 screens）
- `DESIGN-TOKENS.md`：颜色 / 字体 / 间距 / 圆角 / 阴影 / 布局参数，
  每项注明来源屏与实测/视觉估计；第八节记录两轮对照订正与残差清单

## 对照方法

渲染截图与原图裁切并排对比（左原图、右渲染、中间红线），已做两轮：
第 1 轮 18 屏全量比对并修复，第 2 轮复验 6 处打磨点后全部通过。
实在复原不了的局部（原图模糊的小字、标志 swoosh 细节、来源字母标等）
见 DESIGN-TOKENS.md 第八节残差清单，不谎称 1:1。
