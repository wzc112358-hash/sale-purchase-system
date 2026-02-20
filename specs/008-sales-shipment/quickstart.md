# Quickstart: 销售发货管理功能开发

## 概述

本文档为开发人员提供销售发货管理功能的快速开发指南。

## 前置依赖

1. **已完成功能**:
   - 步骤 01-05: 项目初始化、SDK集成、路由认证、登录页面、系统布局
   - 步骤 06: 客户管理
   - 步骤 07: 销售合同管理

2. **后端依赖**:
   - PocketBase 服务运行中 (http://127.0.0.1:8090)
   - `sales_shipments` 集合已创建并配置 API 规则
   - 销售合同执行进度自动更新钩子已配置

## 技术栈

| 技术 | 版本 |
|------|------|
| React | 18+ |
| TypeScript | 5.x |
| Vite | - |
| Ant Design | 5.x |
| PocketBase SDK | latest |

## 开发步骤

### 1. 创建类型定义

在 `src/types/sales-shipment.ts` 中添加发货记录类型：

```typescript
export interface SalesShipment {
  id: string;
  product_name: string;
  sales_contract: string;
  tracking_contract_no: string;
  date: string;
  quantity: number;
  logistics_company: string;
  shipment_address: string;
  delivery_address: string;
  freight: number;
  freight_status: 'paid' | 'unpaid';
  freight_date?: string;
  invoice_status: 'issued' | 'unissued';
  remark?: string;
  attachments?: string[];
  creator: string;
  created: string;
  updated: string;
  expand?: {
    sales_contract?: {
      id: string;
      no: string;
      product_name: string;
      total_quantity: number;
      executed_quantity: number;
    };
  };
}

export interface SalesShipmentFormData {
  product_name: string;
  sales_contract: string;
  tracking_contract_no: string;
  date: string;
  quantity: number;
  logistics_company: string;
  shipment_address: string;
  delivery_address: string;
  freight: number;
  freight_status: 'paid' | 'unpaid';
  invoice_status: 'issued' | 'unissued';
  remark?: string;
  attachments?: File[];
}

export interface SalesShipmentListParams {
  page?: number;
  per_page?: number;
  search?: string;
  freight_status?: string;
  invoice_status?: string;
  sales_contract?: string;
}
```

### 2. 创建 API 封装

在 `src/api/sales-shipment.ts` 中添加发货 API：

```typescript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

import type { SalesShipment, SalesShipmentFormData, SalesShipmentListParams } from '@/types/sales-shipment';

export const SalesShipmentAPI = {
  list: async (params: SalesShipmentListParams = {}) => {
    const filters: string[] = [];
    if (params.freight_status) filters.push(`freight_status = "${params.freight_status}"`);
    if (params.invoice_status) filters.push(`invoice_status = "${params.invoice_status}"`);
    if (params.sales_contract) filters.push(`sales_contract = "${params.sales_contract}"`);
    if (params.search) {
      filters.push(`(tracking_contract_no ~ "${params.search}" || product_name ~ "${params.search}" || logistics_company ~ "${params.search}")`);
    }
    
    return pb.collection('sales_shipments').getList<SalesShipment>(
      params.page || 1,
      params.per_page || 10,
      {
        filter: filters.join(' && '),
        sort: '-created',
        expand: 'sales_contract',
      }
    );
  },

  getById: async (id: string) => {
    return pb.collection('sales_shipments').getOne<SalesShipment>(id, {
      expand: 'sales_contract',
    });
  },

  create: async (data: SalesShipmentFormData) => {
    const formData = new FormData();
    formData.append('product_name', data.product_name);
    formData.append('sales_contract', data.sales_contract);
    formData.append('tracking_contract_no', data.tracking_contract_no);
    formData.append('date', data.date);
    formData.append('quantity', String(data.quantity));
    formData.append('logistics_company', data.logistics_company);
    formData.append('shipment_address', data.shipment_address);
    formData.append('delivery_address', data.delivery_address);
    formData.append('freight', String(data.freight));
    formData.append('freight_status', data.freight_status);
    formData.append('invoice_status', data.invoice_status);
    if (data.remark) formData.append('remark', data.remark);
    if (data.attachments?.length) {
      data.attachments.forEach(file => formData.append('attachments', file));
    }
    return pb.collection('sales_shipments').create<SalesShipment>(formData);
  },

  update: async (id: string, data: Partial<SalesShipmentFormData>) => {
    const formData = new FormData();
    // 只添加需要更新的字段
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'attachments') {
        formData.append(key, String(value));
      }
    });
    if (data.attachments?.length) {
      data.attachments.forEach(file => formData.append('attachments', file));
    }
    return pb.collection('sales_shipments').update<SalesShipment>(id, formData);
  },

  delete: async (id: string) => {
    return pb.collection('sales_shipments').delete(id);
  },
};
```

### 3. 创建页面组件

在 `src/pages/sales/` 下创建:

- `ShipmentList.tsx` - 发货列表页面
- `ShipmentDetail.tsx` - 发货详情页面

### 4. 配置路由

在路由配置中添加发货管理页面路由。

## 关键业务逻辑

1. **发货数量校验**: 发货数量不能超过合同剩余可发货数量
2. **合同状态检查**: 只能为"执行中"状态的合同创建发货
3. **自动进度更新**: 发货创建后，后端自动更新销售合同执行进度

## 验证清单

- [ ] npm run build 成功
- [ ] npm run lint 无错误
- [ ] 可以正常查看发货列表
- [ ] 可以正常创建发货记录
- [ ] 可以正常编辑发货记录
- [ ] 可以正常删除发货记录
- [ ] 搜索和筛选功能正常
- [ ] 附件上传下载功能正常
- [ ] 合同执行进度自动更新
