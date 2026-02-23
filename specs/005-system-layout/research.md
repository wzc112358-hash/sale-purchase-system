# Research: 系统布局框架

**Feature**: 05-system-layout  
**Date**: 2026-02-18

## 技术选型决策

### 1. UI组件库选型

| 决策项 | 选择 | 理由 |
|--------|------|------|
| UI组件库 | Ant Design | AGENTS.md推荐，提供完整的组件生态，与React深度集成 |
| 图标库 | @ant-design/icons | 随Ant Design一起安装，图标风格统一，专业商务风格 |

**Alternatives considered**:
- Material-UI (MUI): 功能完备，但样式偏向Material Design风格，与需求文档中的"极简现代、专业商务风"不完全匹配
- Tailwind CSS: 需要额外配置，组件需要自己构建，不适合快速开发

### 2. 样式方案选型

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 样式方案 | CSS Modules | 组件级样式隔离，避免全局样式冲突，原生支持无需额外配置 |
| 响应式 | CSS Media Queries | 原生支持，无需额外依赖，与React生态兼容良好 |

**Alternatives considered**:
- Styled Components: 需要安装额外依赖，增加bundle体积
- Tailwind CSS: 配置复杂，与现有Ant Design组件可能冲突

### 3. 路由方案选型

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 路由库 | react-router-dom v6 | 业界标准，AGENTS.md已推荐，React 18兼容 |

**Alternatives considered**:
- Next.js App Router: 适用于SSR场景，本项目为纯SPA不需要
- wouter: 轻量级，但生态不如react-router-dom完善

## 依赖分析

### 已有依赖（确认在package.json中）

根据AGENTS.md和项目初始化阶段，以下依赖应该已经安装：
- react: ^18.x
- react-dom: ^18.x
- react-router-dom: ^6.x
- antd: ^5.x
- @ant-design/icons: ^5.x
- typescript: ^5.x
- vite: ^5.x

### 本功能新增依赖

无（所有依赖已在项目初始化时安装）

## 最佳实践参考

### React布局最佳实践

1. **组件分解**: 将布局拆分为Header/Sidebar/Content三个独立组件，便于维护和测试
2. **状态提升**: 用户信息和退出函数通过props传递，不使用Context（简单场景）
3. **路由集成**: 侧边栏菜单使用NavLink，自动处理高亮状态
4. **响应式设计**: 使用CSS Media Query，组件内部通过window监听resize事件

### Ant Design Layout组件使用

- 使用`<Layout>`、`<Header>`、`<Sider>`、`<Content>`组件构建基础结构
- Menu组件支持`mode="inline"`用于侧边栏
- 使用`<Menu theme="light">`保持白色主题
- 图标使用`icon`属性传入`<Menu.Item icon={<Icon />}>`

### 性能优化

1. 使用React.memo包装静态子组件
2. 侧边栏使用`collapsible`属性支持收起功能
3. 菜单使用虚拟滚动处理大量菜单项（如果需要）

## 设计规范参考

根据需求文档汇总.md中的第四部分：网站页面样式设计

### 色彩体系

| 用途 | 色值 |
|------|------|
| 主背景 | #FFFFFF |
| 文本（主要） | #333333 |
| 文本（次要） | #999999 |
| 选中/高亮 | #F5F5F5 |
| 按钮（主按钮） | #1A1A1A |
| 按钮文字 | #FFFFFF |

### 布局尺寸

- 侧边栏宽度: 280px
- 顶部导航高度: 64px（标准）
- 桌面端断点: ≥1200px
- 移动端断点: ≤767px

### 菜单样式

- 图标与文字间距: 12px
- 菜单项上下padding: 16px
- 菜单项左右padding: 24px
- 选中状态背景: #F5F5F5

### 组件样式

- 数据卡片圆角: 12px
- 数据卡片阴影: 0 2px 8px rgba(0,0,0,0.08)
- 主按钮圆角: 8px
- 次要按钮圆角: 16px
