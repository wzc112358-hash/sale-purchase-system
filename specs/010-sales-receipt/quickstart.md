# Quick Start: 销售-收款管理

## 前. 后置条件

1端 PocketBase 服务运行中 (`http://127.0.0.1:8090`)
2. 前端开发服务器运行中 (`http://localhost:5173`)
3. 已完成 `sale_receipts` 集合的创建和数据规则配置

## 开发步骤

### 1. 创建 API 模块

在 `src/api/` 目录下创建 `receipt.ts`:

```typescript
import { pb } from '@/lib/pocketbase';
import type { SaleReceipt } from '@/types';

export const ReceiptAPI = {
  list: (params?: QueryParams) => 
    pb.collection('sale_receipts').getList<SaleReceipt>(params),
  
  get: (id: string) => 
    pb.collection('sale_receipts').getOne<SaleReceipt>(id),
  
  create: (data: CreateReceiptDTO) => 
    pb.collection('sale_receipts').create(data),
  
  update: (id: string, data: UpdateReceiptDTO) => 
    pb.collection('sale_receipts').update(id, data),
  
  delete: (id: string) => 
    pb.collection('sale_receipts').delete(id),
};
```

### 2. 创建类型定义

在 `src/types/` 目录下添加 `receipt.ts`:

```typescript
export interface SaleReceipt {
  id: string;
  product_name: string;
  sales_contract: string;
  amount: number;
  product_amount: number;
  receipt_date: string;
  method?: string;
  account?: string;
  remark?: string;
  attachments: string[];
  creator: string;
  created: string;
  updated: string;
  expand?: {
    sales_contract: {
      id: string;
      no: string;
      total_amount: number;
    };
  };
}
```

### 3. 创建收款页面组件

在 `src/pages/sales/` 目录下创建 `Receipt.tsx`:

- 使用 Ant Design Table 展示列表
- 使用 Modal + Form 实现新增/编辑
- 使用 Drawer 展示详情
- 实现搜索筛选和分页

### 4. 配置路由

在 `src/routes/` 中添加收款页面路由:

```typescript
{
  path: '/sales/receipt',
  element: <Receipt />,
}
```

## 验证清单

- [ ] 收款列表正确显示
- [ ] 可以新增收款记录
- [ ] 可以编辑收款记录
- [ ] 可以删除收款记录
- [ ] 可以查看收款详情
- [ ] 可以上传/下载收款凭证
- [ ] 搜索筛选功能正常
- [ ] 分页功能正常
- [ ] 关联合同的收款进度自动更新

## 常见问题

**Q: 收款金额超过合同总额怎么办?**
A: 前端添加校验提示，后端可通过钩子限制

**Q: 凭证上传失败怎么办?**
A: 检查 PocketBase 文件上传规则配置

**Q: 删除收款后进度未更新?**
A: 检查后端钩子是否正确配置
