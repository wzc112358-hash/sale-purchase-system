import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

import type { 
  SalesContract, 
  SalesContractFormData, 
  SalesContractListParams,
  SalesShipment,
  SaleInvoice,
  SaleReceipt
} from '@/types/sales-contract';

export const SalesContractAPI = {
  list: async (params: SalesContractListParams = {}) => {
    return pb.collection('sales_contracts').getList<SalesContract>(
      params.page || 1,
      params.per_page || 10,
      {}
    );
  },

  getById: async (id: string) => {
    return pb.collection('sales_contracts').getOne<SalesContract>(id, {
      expand: 'customer,creator',
    });
  },

  create: async (data: SalesContractFormData) => {
    const formData = new FormData();
    formData.append('no', data.no);
    formData.append('customer', data.customer);
    formData.append('product_name', data.product_name);
    formData.append('unit_price', String(data.unit_price));
    formData.append('total_quantity', String(data.total_quantity));
    formData.append('sign_date', data.sign_date);
    if (data.remark) formData.append('remark', data.remark);
    if (data.attachments && data.attachments.length > 0) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }
    return pb.collection('sales_contracts').create<SalesContract>(formData);
  },

  update: async (id: string, data: Partial<SalesContractFormData>) => {
    const formData = new FormData();
    if (data.no !== undefined) formData.append('no', data.no);
    if (data.customer !== undefined) formData.append('customer', data.customer);
    if (data.product_name !== undefined) formData.append('product_name', data.product_name);
    if (data.unit_price !== undefined) formData.append('unit_price', String(data.unit_price));
    if (data.total_quantity !== undefined) formData.append('total_quantity', String(data.total_quantity));
    if (data.sign_date !== undefined) formData.append('sign_date', data.sign_date);
    if (data.remark !== undefined) formData.append('remark', data.remark);
    if (data.attachments && data.attachments.length > 0) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }
    
    return pb.collection('sales_contracts').update<SalesContract>(id, formData);
  },

  delete: async (id: string) => {
    return pb.collection('sales_contracts').delete(id);
  },

  getShipments: async (contractId: string) => {
    return pb.collection('sales_shipments').getList<SalesShipment>(
      1,
      100,
      {
        filter: `sales_contract = "${contractId}"`,
      }
    );
  },

  getInvoices: async (contractId: string) => {
    return pb.collection('sale_invoices').getList<SaleInvoice>(
      1,
      100,
      {
        filter: `sales_contract = "${contractId}"`,
      }
    );
  },

  getReceipts: async (contractId: string) => {
    return pb.collection('sale_receipts').getList<SaleReceipt>(
      1,
      100,
      {
        filter: `sales_contract = "${contractId}"`,
      }
    );
  },
};
