# Feature Specification: 销售客户管理

**Feature Branch**: `006-sales-customer`  
**Created**: 2026-02-18  
**Status**: Draft  
**Input**: User description: "@需求文档汇总.md 步骤06"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 客户列表查看与搜索 (Priority: P1)

销售职员需要查看所有客户信息，并通过名称或地区快速搜索目标客户。

**Why this priority**: 客户列表是销售工作的基础，销售人员需要快速找到客户信息才能开展后续合同、发货等业务。

**Independent Test**: Can be fully tested by viewing the customer list page and verifying search filters work correctly.

**Acceptance Scenarios**:

1. **Given** 系统中有多个客户记录，**When** 用户打开客户列表页面，**Then** 表格展示客户名称、联系人、电话、邮箱、地区信息，每页默认显示10条记录
2. **Given** 客户列表有多页数据，**When** 用户点击分页控件，**Then** 正确加载对应页的数据
3. **Given** 系统中存在客户"ABC公司"，**When** 用户在搜索框输入"ABC"并点击搜索，**Then** 表格只显示名称包含"ABC"的客户记录

---

### User Story 2 - 客户新增与编辑 (Priority: P1)

销售职员需要添加新客户或修改已有客户信息。

**Why this priority**: 客户是销售合同的根基，准确维护客户信息是业务开展的前提。

**Independent Test**: Can be fully tested by creating a new customer and verifying it appears in the list.

**Acceptance Scenarios**:

1. **Given** 用户在客户列表页面，**When** 点击"新增客户"按钮，**Then** 弹出新增客户表单对话框
2. **Given** 新增客户表单，**When** 用户填写客户名称并提交，**Then** 客户信息保存成功，列表刷新显示新客户
3. **Given** 客户名称为空，**When** 用户提交表单，**Then** 显示错误提示"客户名称为必填项"
4. **Given** 客户列表中有已有客户，**When** 用户点击该客户的编辑按钮，**Then** 弹出预填好的客户信息表单

---

### User Story 3 - 客户详情查看 (Priority: P2)

销售职员需要查看客户的完整信息及其关联的销售合同列表。

**Why this priority**: 了解客户全貌和历史合作情况有助于销售决策和客户服务。

**Independent Test**: Can be fully tested by clicking on a customer and verifying details and related contracts display.

**Acceptance Scenarios**:

1. **Given** 客户列表中有客户记录，**When** 用户点击客户名称或详情按钮，**Then** 跳转到客户详情页面，展示客户完整信息
2. **Given** 客户有关联的销售合同，**When** 用户查看客户详情，**Then** 页面下方显示该客户关联的销售合同列表

---

### User Story 4 - 客户删除 (Priority: P2)

销售职员需要删除不再合作的客户记录。

**Why this priority**: 维护客户数据准确性，清理无效客户信息。

**Independent Test**: Can be fully tested by deleting a customer and verifying removal from list.

**Acceptance Scenarios**:

1. **Given** 客户列表中有客户记录，**When** 用户点击删除按钮，**Then** 弹出确认对话框要求确认删除操作
2. **Given** 客户有关联的销售合同，**When** 用户尝试删除该客户，**Then** 显示提示"该客户有关联合同，无法删除"

---

### Edge Cases

- 当客户名称与其他已有客户重复时，系统应给出提示
- 当搜索条件无匹配结果时，页面显示"暂无数据"提示
- 当网络请求失败时，显示错误提示并提供重试选项
- 删除客户时若有关联合同，应阻止删除并提示用户

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须支持客户列表分页展示，每页显示10条记录
- **FR-002**: 系统必须支持按客户名称模糊搜索
- **FR-003**: 系统必须支持按客户所在地区筛选
- **FR-004**: 系统必须支持新增客户，包含字段：名称(必填)、联系人、电话、邮箱、地址、行业、地区、开户银行、银行账号、备注
- **FR-005**: 系统必须支持编辑客户信息
- **FR-006**: 系统必须支持删除客户（无关联合同时可删除）
- **FR-007**: 系统必须验证客户名称为必填字段
- **FR-008**: 系统必须展示客户详情页面，包含完整信息和关联销售合同列表
- **FR-009**: 系统必须只显示当前用户创建的客户记录（销售人员只能管理自己创建的客户）

### Key Entities

- **客户**: 销售客户档案，包含基本信息（名称、联系人、联系方式、地址）和财务信息（开户银行、银行账号）
- **销售合同**: 与客户关联的销售合同，记录合同编号、产品、金额、进度等信息

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 销售职员可以在5秒内加载完客户列表页面
- **SC-002**: 搜索响应时间在1秒以内
- **SC-003**: 100%的新增客户可以在提交后立即出现在客户列表中
- **SC-004**: 客户详情页面在2秒内加载完成

## Clarifications

### Session 2026-02-18

- Q: UI设计规范是否需要遵循需求文档中的页面样式设计部分？ → A: 是的，需要遵循需求文档汇总.md第四部分"网站页面样式设计"中的规范

## UI/UX Design Requirements

### Design Style
- Design philosophy: 极简现代、专业商务风，无冗余装饰，强调信息层级和操作效率

### Color System
| Purpose | Color | Hex Code |
|---------|-------|----------|
| Main Background | Pure White | #FFFFFF |
| Primary Text | Dark Gray/Black | #333333 |
| Secondary Text | Light Gray | #999999 |
| Selected/Highlight | Light Gray Background | #F5F5F5 |
| Primary Button | Dark (Near Black) Background | #1A1A1A |
| Button Text | White | #FFFFFF |

### Typography
- Font: Sans-serif fonts (Inter, PingFang SC, Helvetica)

### Layout Structure
- Desktop (≥1200px): Fixed left sidebar ~280px, white background; Main content area on right
- Mobile (≤767px): Top nav with hamburger menu, slide-out sidebar 70-80% screen width

### Navigation Menu
- Icons before each menu item, ~12px gap between icon and text
- Selected state: Light gray background (#F5F5F5), bold or darker text
- Padding: ~16px vertical, ~24px horizontal

### Components
- Data Cards: White background, 12px border-radius, subtle shadow `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`, padding 24px vertical, 20px horizontal
- Primary Button: Dark background, 8px border-radius, padding 12px 24px, 16px white text
- Secondary Button: Light gray border, 16px border-radius, padding 6px 12px, 14px text
