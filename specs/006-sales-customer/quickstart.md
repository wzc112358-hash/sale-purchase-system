# Quickstart: 销售客户管理

## 前置条件

1. 后端PocketBase服务运行在 `http://127.0.0.1:8090`
2. 已配置customers集合和API规则
3. 测试账号: sales@test.com / 12345678

## 快速开始

### 1. 安装依赖

确保项目已安装Ant Design:
```bash
npm install antd @ant-design/icons
```

### 2. 创建API模块

在 `src/api/customer.ts` 创建客户API模块:

```typescript
import { pb } from '@/lib/pocketbase';

export interface Customer {
  id: string;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  industry?: string;
  region?: string;
  bank_name?: string;
  bank_account?: string;
  remark?: string;
  creator: string;
}

export const CustomerAPI = {
  list: async (params?: { page?: number; per_page?: number; search?: string; region?: string }) => {
    const filters: string[] = [];
    if (params?.search) {
      filters.push(`name ~ "${params.search}"`);
    }
    if (params?.region) {
      filters.push(`region = "${params.region}"`);
    }
    
    return pb.collection('customers').getList<Customer>(params?.page || 1, params?.per_page || 10, {
      filter: filters.join(' && '),
      sort: '-created',
    });
  },
  
  create: async (data: Partial<Customer>) => {
    return pb.collection('customers').create(data);
  },
  
  update: async (id: string, data: Partial<Customer>) => {
    return pb.collection('customers').update(id, data);
  },
  
  delete: async (id: string) => {
    return pb.collection('customers').delete(id);
  },
  
  getById: async (id: string) => {
    return pb.collection('customers').getOne<Customer>(id, { expand: 'creator' });
  },
  
  getContracts: async (customerId: string) => {
    return pb.collection('sales_contracts').getList(1, 100, {
      filter: `customer = "${customerId}"`,
      expand: 'customer',
    });
  },
};
```

### 3. 创建类型定义

在 `src/types/customer.ts`:

```typescript
export interface Customer {
  id: string;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  industry?: string;
  region?: string;
  bank_name?: string;
  bank_account?: string;
  remark?: string;
  creator: string;
}

export interface CustomerFormData {
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  industry?: string;
  region?: string;
  bank_name?: string;
  bank_account?: string;
  remark?: string;
}
```

### 4. 创建页面组件

在 `src/pages/sales/customers/` 目录创建:
- `CustomerList.tsx` - 客户列表页面
- `CustomerDetail.tsx` - 客户详情页面
- `CustomerForm.tsx` - 客户表单组件

## UI样式参考

根据需求文档汇总.md第四部分:

```css
/* 主按钮 */
.ant-btn-primary {
  background-color: #1A1A1A;
  border-radius: 8px;
}

/* 次要按钮 */
.ant-btn-default {
  border-radius: 16px;
  border-color: #d9d9d9;
}

/* 表格 */
.ant-table {
  background: #FFFFFF;
}

/* 选中行 */
.ant-table-row-selected {
  background-color: #F5F5F5;
}

/* 数据卡片 */
.ant-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
```

## 验证步骤

1. 使用销售账号登录系统
2. 进入客户管理页面
3. 验证客户列表显示正常
4. 测试搜索和筛选功能
5. 测试新增客户
6. 测试编辑客户
7. 测试删除客户（无关联合同时可删除）
8. 验证客户详情页面
