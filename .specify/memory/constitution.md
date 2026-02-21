<!--
  Sync Impact Report
  =================
  Version Change: N/A → 1.0.0 (Initial Constitution)
  
  Added Sections:
  - I. TypeScript-First Development
  - II. Component-Based Architecture
  - III. Role-Based Access Control
  - IV. Data Integrity
  - V. UI/UX Standards
  - Technical Standards Section
  - Development Workflow Section
  
  Templates Updated: None (this is the initial constitution)
  
  Rationale: Creating project constitution based on 需求文档汇总.md
-->

# 企业采购销售管理系统 Constitution

## Core Principles

### I. TypeScript-First Development

All code MUST be written in TypeScript with explicit type annotations. The use of `any` type is prohibited except where absolutely necessary. All interfaces and types MUST be properly defined in the `src/types/` directory.

**Rationale**: TypeScript provides compile-time type safety, reduces runtime errors, and improves code maintainability for enterprise applications.

### II. Component-Based Architecture

All UI elements MUST be implemented as reusable React components. Components MUST follow single responsibility principle and be placed in appropriate directories:
- Layout components in `src/layouts/`
- Page components in `src/pages/`
- Common components in `src/components/`
- Feature-specific components in feature directories

**Rationale**: Promotes code reuse, easier testing, and maintainability.

### III. Role-Based Access Control

The system MUST enforce role-based access control (RBAC) with three roles: sales, purchasing, and manager. Access permissions MUST be defined in the permission matrix and enforced at both route and data levels.

**Rationale**: Required by business requirements to ensure data isolation between departments.

### IV. Data Integrity

All data operations MUST follow the defined data model in 需求文档汇总.md. Calculated fields (e.g., execution_percent, receipt_percent) MUST be automatically computed. All monetary values MUST use number type with two decimal places.

**Rationale**: Ensures data consistency and accuracy required for business operations.

### V. UI/UX Standards

All UI components MUST follow the design standards defined in 需求文档汇总.md Part 4:
- Color palette: #FFFFFF background, #333333 primary text, #1A1A1A primary buttons
- Typography: Sans-serif fonts (Inter, PingFang SC, Helvetica)
- Layout: Fixed 280px sidebar, responsive breakpoints at 1200px and 767px

**Rationale**: Ensures consistent professional appearance across the application.

## Technical Standards

### Technology Stack Requirements

| Category | Requirement |
|----------|-------------|
| Language | TypeScript 5.x |
| Framework | React 18+ |
| Build Tool | Vite |
| UI Library | Ant Design |
| State Management | Zustand or React Context |
| Routing | react-router-dom v6 |
| Backend | PocketBase |

### API Standards

- All API calls MUST be wrapped in dedicated API modules under `src/api/`
- PocketBase SDK pattern MUST be followed for all collections
- Authentication via Bearer Token (JWT)

### Error Handling Standards

When using PocketBase SDK in React components with `useEffect`, requests may be automatically aborted when the component unmounts. This causes `ClientResponseError` with status 0. To prevent error popups for these expected cancellations:

```typescript
// Good: Check for aborted requests
try {
  const result = await pb.collection('xxx').getList(...);
} catch (error) {
  const err = error as { response?: { status?: number }; message?: string };
  // Ignore aborted requests (component unmounted during request)
  if (err.response?.status === 0 || err.message?.includes('aborted')) {
    return;
  }
  // Handle actual errors
  console.error('Fetch error:', error);
  message.error('加载失败');
}
```

**Rationale**: Prevents confusing error messages when components unmount during async operations, which is normal React behavior.

### Ant Design Form File Upload

When using Ant Design's `Upload` component inside a `Form`, you MUST properly configure the `Form.Item` to handle file uploads:

```tsx
// Good: Add valuePropName and getValueFromEvent
<Form.Item
  name="attachments"
  label="附件"
  valuePropName="fileList"
  getValueFromEvent={(e: { fileList?: unknown[] } | unknown[]) => {
    if (Array.isArray(e)) return e;
    return e?.fileList || [];
  }}
>
  <Upload beforeUpload={() => false} maxCount={5}>
    <Button icon={<UploadOutlined />}>上传附件</Button>
  </Upload>
</Form.Item>
```

When processing the form submission, access the file list directly from `values.attachments`:

```typescript
// Good: Access fileList directly
const handleFinish = (values: Record<string, unknown>) => {
  const fileList = values.attachments as { originFileObj?: File }[] | undefined;
  const attachments = fileList?.map((f) => f.originFileObj).filter(Boolean) as File[] || [];
  // ... rest of the code
};

// Bad: Nested fileList access (when valuePropName is missing)
const attachments = (values.attachments as { fileList?: { originFileObj?: File }[] })?.fileList?.map(...)
```

**Rationale**: Ant Design's `Upload` component requires `valuePropName="fileList"` to properly bind with Form. Without it, the file list is not correctly stored, resulting in empty attachments on form submission.

### Code Quality

- All components MUST use explicit Prop types with interfaces
- No inline styles (use CSS Modules or Ant Design theme)
- ESLint and TypeScript checks MUST pass before commit
- Build must succeed without errors

## Development Workflow

### Feature Development Process

1. Specification Phase: Create spec.md in specs/[feature]/
2. Planning Phase: Create plan.md with technical decisions
3. Task Generation Phase: Create tasks.md with actionable items
4. Implementation Phase: Implement according to tasks
5. Validation Phase: Run typecheck and lint

### Required Validation

Before any feature is considered complete:
- `npm run build` MUST succeed
- `npm run lint` MUST pass with no errors

### Feature Branch Naming

Features MUST follow the pattern: `[number]-[feature-name]`
Example: `05-system-layout`, `06-sales-customer`

## Governance

### Constitution Amendments

This constitution can be amended through the following process:
1. Propose changes with rationale
2. Document impact on existing features
3. Update version following semantic versioning
4. All team members must be notified of changes

### Versioning Policy

- MAJOR: Backward incompatible changes to core principles
- MINOR: New principles or materially expanded guidance
- PATCH: Clarifications, wording fixes, non-semantic refinements

### Compliance

All project contributors MUST verify compliance with this constitution. Any violations MUST be justified and documented in the complexity tracking section of plan.md.

**Version**: 1.0.0 | **Ratified**: 2026-02-18 | **Last Amended**: 2026-02-21
