# Research: 销售客户管理

## Technology Decisions

### Decision 1: UI Component Library

**Chosen**: Ant Design  
**Rationale**: 
- 项目技术栈已选择Ant Design作为UI组件库
- Ant Design提供完整的Table、Form、Modal组件
- 与现有系统保持一致

**Alternatives considered**: Material-UI

---

### Decision 2: PocketBase查询优化

**Chosen**: 使用filter语法和expand  
**Rationale**:
- PocketBase支持filter语法进行模糊搜索和筛选
- 使用expand获取关联数据（如creator用户信息）
- 分页使用page和per_page参数

**Implementation**:
```typescript
// 搜索
filter: 'name ~ "' + keyword + '"'
// 筛选
filter: 'region = "' + region + '"'
// 分页
page: 1, per_page: 10
```

---

### Decision 3: 表单验证

**Chosen**: Ant Design Form + Yup验证  
**Rationale**:
- Ant Design Form内置验证规则支持
- 客户名称为必填字段
- 邮箱、手机等字段可选但有格式验证

**Validation Rules**:
- name: 必填
- email: 可选，格式验证
- phone: 可选，格式验证
- region: 可选

---

### Decision 4: 数据权限

**Chosen**: 后端API规则过滤  
**Rationale**:
- PocketBase支持API规则配置
- 销售人员只能读取/创建/编辑/删除本人创建的客户
- API规则: `creator = @request.auth.id`

---

## UI/UX Implementation Notes

根据需求文档汇总.md第四部分：

1. **色彩体系**: 主背景#FFFFFF，主要文字#333333，主按钮#1A1A1A
2. **布局**: 左侧固定侧边栏280px，右侧内容区域
3. **组件样式**:
   - 数据卡片: 白色背景，圆角12px，轻微阴影
   - 主按钮: 深色背景，圆角8px
   - 次要按钮: 浅灰边框，圆角16px
4. **字体**: 无衬线字体 (Inter, PingFang SC, Helvetica)
5. **导航菜单**: 图标+文字，选中状态背景#F5F5F5

---

## Implementation Approach

1. **客户列表页面**: 使用Ant Design Table组件，配合Form实现搜索筛选
2. **客户表单**: 使用Ant Design Modal + Form组件
3. **详情页面**: 使用Ant Design Descriptions组件展示信息
4. **删除确认**: 使用Ant Design Modal确认对话框
