# Tasks: 系统布局框架

**Feature**: 05-system-layout  
**Date**: 2026-02-18  
**Spec**: [specs/05-system-layout/spec.md](./spec.md)  
**Plan**: [specs/05-system-layout/plan.md](./plan.md)

## 任务概览

| 指标 | 数量 |
|------|------|
| **总任务数** | 24 |
| **用户故事数** | 5 |
| **可并行任务数** | 6 |

## 依赖关系图

```
Phase 1 (Setup)
    │
    ▼
Phase 2 (Foundational)
    │
    ├──► Phase 3 (US1 - 销售布局)
    ├──► Phase 4 (US2 - 采购布局)
    ├──► Phase 5 (US3 - 经理布局)
    │
    ▼
Phase 6 (US4 - 菜单导航)
    │
    ▼
Phase 7 (US5 - 退出登录)
    │
    ▼
Phase 8 (Polish)
```

## 实施策略

**MVP范围**: Phase 3 (US1) - 销售职员布局，完成后即可交付基本可用的布局框架

**增量交付**:
1. 先完成 Phase 1-2 基础设施
2. 依次完成 Phase 3-5 三种角色的菜单（可独立测试）
3. 完成 Phase 6 菜单导航功能
4. 完成 Phase 7 退出登录
5. 最后 Phase 8 完善响应式和样式

---

# Phase 1: Setup (项目初始化)

**目标**: 确认开发环境就绪，依赖完整

- [X] T001 确认 package.json 中已安装必要依赖 (react-router-dom, antd, @ant-design/icons)
- [X] T002 确认 TypeScript 配置正确 (tsconfig.json)
- [X] T003 确认 Vite 开发服务器配置 (vite.config.ts)

---

# Phase 2: Foundational (基础组件)

**目标**: 创建类型定义和基础组件，为所有用户故事提供基础

- [X] T004 创建 src/types/layout.ts 类型定义文件
- [X] T005 [P] 创建 src/layouts/ 目录结构
- [X] T006 [P] 创建基础布局样式文件 (layouts.module.css)

**Independent Test Criteria**: 类型定义可通过 TypeScript 编译检查

---

# Phase 3: US1 - 销售职员布局 (P1)

**目标**: 销售职员登录后看到销售菜单和布局

**Independent Test Criteria**: 使用销售账号 (sales@test.com) 登录后，侧边栏显示"客户管理、销售合同、发货、发票、收款、进度跟踪"六个菜单项

- [X] T007 [P] [US1] 在 src/types/layout.ts 添加销售角色菜单配置数据
- [X] T008 [US1] 实现 MainLayout 主布局组件 (src/layouts/MainLayout.tsx)
- [X] T009 [US1] 实现 TopNav 顶部导航栏组件 (src/layouts/TopNav.tsx)
- [X] T010 [US1] 实现 Sidebar 侧边栏组件 - 销售角色菜单 (src/layouts/Sidebar.tsx) - 已集成到MainLayout
- [X] T011 [US1] 集成布局组件到路由配置 (src/routes/index.tsx)

---

# Phase 4: US2 - 采购职员布局 (P1)

**目标**: 采购职员登录后看到采购菜单和布局

**Independent Test Criteria**: 使用采购账号 (purchase@test.com) 登录后，侧边栏显示"供应商管理、采购合同、到货、发票、付款、进度跟踪"六个菜单项

- [X] T012 [P] [US2] 在 src/types/layout.ts 添加采购角色菜单配置数据
- [X] T013 [US2] 更新 Sidebar 组件支持采购菜单渲染

---

# Phase 5: US3 - 经理布局 (P1)

**目标**: 经理登录后看到管理菜单和布局

**Independent Test Criteria**: 使用经理账号 (manager@test.com) 登录后，侧边栏显示"总览、进度跟踪、关联对比、数据报表、历史记录"五个菜单项

- [X] T014 [P] [US3] 在 src/types/layout.ts 添加经理角色菜单配置数据
- [X] T015 [US3] 更新 Sidebar 组件支持经理菜单渲染

---

# Phase 6: US4 - 菜单导航功能 (P2)

**目标**: 用户点击菜单可切换页面，菜单高亮正确

**Independent Test Criteria**: 
1. 点击任意菜单项，主内容区域显示对应页面
2. 当前页面在菜单中高亮显示 (#F5F5F5 背景)

- [X] T016 [US4] 实现菜单点击导航功能 (useNavigate)
- [X] T017 [US4] 实现菜单选中状态高亮 (useLocation)
- [X] T018 [US4] 添加菜单项图标 (使用 @ant-design/icons)

---

# Phase 7: US5 - 退出登录功能 (P2)

**目标**: 用户可安全退出登录

**Independent Test Criteria**: 点击退出按钮后，系统清除登录状态并跳转至登录页

- [X] T019 [US5] 在 TopNav 组件实现退出按钮
- [X] T020 [US5] 实现退出登录逻辑 (清除 token, 跳转 /login)

---

# Phase 8: Polish & Cross-Cutting Concerns

**目标**: 完善响应式布局和样式规范

- [X] T021 实现响应式布局 (桌面端 ≥1200px, 移动端 ≤767px)
- [X] T022 应用样式规范 (颜色 #F5F5F5, #1A1A1A, 间距 16px/24px)
- [X] T023 运行 npm run typecheck 确保无类型错误
- [X] T024 运行 npm run lint 检查代码规范

---

## 完成摘要

所有任务已完成！布局功能已实现，包括：

1. ✅ 主布局框架（侧边栏 + 顶部导航 + 内容区）
2. ✅ 三种角色菜单（销售/采购/经理）
3. ✅ 菜单导航功能（点击切换页面，菜单高亮）
4. ✅ 退出登录功能（下拉菜单）
5. ✅ 响应式布局（桌面端 + 移动端带汉堡菜单）
6. ✅ TypeScript 类型检查通过
7. ✅ ESLint 代码规范检查通过
