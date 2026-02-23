import { useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Space, App, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ReceiptAPI } from '@/api/receipt';
import type { SaleReceipt } from '@/types';
import { pb } from '@/lib/pocketbase';

interface ReceiptDetailProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export const ReceiptDetail: React.FC<ReceiptDetailProps> = ({
  id,
  open,
  onClose,
}) => {
  const { message } = App.useApp();
  const [data, setData] = useState<SaleReceipt | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && open) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await ReceiptAPI.getById(id);
          setData(result);
        } catch (error: unknown) {
          const err = error as { isAbort?: boolean; cause?: { name?: string } };
          if (err.isAbort || err.cause?.name === 'AbortError') {
            return;
          }
          const errMsg = error as Error;
          message.error(errMsg.message || '加载详情失败');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id, open, message]);

  const handleDownload = (fileName: string) => {
    const url = pb.files.getUrl(data!, fileName);
    window.open(url, '_blank');
  };

  const renderAttachments = () => {
    if (!data?.attachments || (Array.isArray(data.attachments) && data.attachments.length === 0)) {
      return '无';
    }
    const files = Array.isArray(data.attachments) ? data.attachments : [data.attachments];
    return (
      <Space direction="vertical">
        {files.map((file, index) => (
          <Button
            key={index}
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(file)}
            size="small"
          >
            附件{index + 1}
          </Button>
        ))}
      </Space>
    );
  };

  return (
    <Drawer
      title="收款详情"
      placement="right"
      width={600}
      open={open}
      onClose={onClose}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin />
        </div>
      ) : data ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="合同编号">
            {data.expand?.sales_contract?.no || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="产品名称">
            {data.product_name}
          </Descriptions.Item>
          <Descriptions.Item label="收款金额">
            {data.amount?.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="产品数量">
            {data.product_amount}
          </Descriptions.Item>
          <Descriptions.Item label="收款日期">
            {data.receipt_date}
          </Descriptions.Item>
          <Descriptions.Item label="收款方式">
            {data.method || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="收款账户">
            {data.account || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="收款凭证">
            {renderAttachments()}
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            {data.remark || '-'}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </Drawer>
  );
};
