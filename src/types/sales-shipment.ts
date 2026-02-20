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
      customer: string;
      total_amount: number;
      total_quantity: number;
      executed_quantity: number;
      execution_percent: number;
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
  contractNo?: string;
  freight_status?: string;
  invoice_status?: string;
  sales_contract?: string;
}
