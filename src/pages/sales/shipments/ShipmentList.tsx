import { useState, useEffect } from 'react';
import { Table, Button, Space, Form, Input, Select, App, Popconfirm, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SalesShipmentAPI } from '@/api/sales-shipment';
import type { SalesShipment } from '@/types/sales-shipment';
import { ShipmentForm } from './ShipmentForm';

export const ShipmentList: React.FC = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [data, setData] = useState<SalesShipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [contractNo, setContractNo] = useState('');
  const [freightStatus, setFreightStatus] = useState<string | undefined>();
  const [invoiceStatus, setInvoiceStatus] = useState<string | undefined>();
  const [formVisible, setFormVisible] = useState(false);
  const [editingShipment, setEditingShipment] = useState<SalesShipment | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await SalesShipmentAPI.list({
        page,
        per_page: pageSize,
        search: search || undefined,
        contractNo: contractNo || undefined,
        freight_status: freightStatus,
        invoice_status: invoiceStatus,
      });
      setData(result.items);
      setTotal(result.totalItems);
    } catch (err) {
      const error = err as { name?: string; message?: string; cause?: { name?: string } };
      const isAborted =
        error.name === 'AbortError' ||
        error.name === 'CanceledError' ||
        error.message?.includes('aborted') ||
        error.message?.includes('autocancelled') ||
        error.cause?.name === 'AbortError';
      if (isAborted) {
        return;
      }
      console.error('Fetch shipments error:', err);
      message.error('加载发货列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, contractNo, freightStatus, invoiceStatus]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handleAdd = () => {
    setEditingShipment(null);
    setFormVisible(true);
  };

  const handleEdit = (record: SalesShipment) => {
    setEditingShipment(record);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await SalesShipmentAPI.delete(id);
      message.success('删除成功');
      fetchData();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err.response?.data?.message || '删除失败');
    }
  };

  const handleView = (record: SalesShipment) => {
    navigate(`/sales/shipments/${record.id}`);
  };

  const handleFormFinish = async (values: Record<string, unknown>) => {
    const data = Object.fromEntries(
      Object.entries(values).filter(
        ([, v]) => v !== undefined && v !== '' && v !== null
      )
    );
    try {
      if (editingShipment) {
        await SalesShipmentAPI.update(editingShipment.id, data as Parameters<typeof SalesShipmentAPI.update>[1]);
        message.success('更新成功');
      } else {
        await SalesShipmentAPI.create(data as unknown as Parameters<typeof SalesShipmentAPI.create>[0]);
        message.success('创建成功');
      }
      setFormVisible(false);
      fetchData();
    } catch (error) {
      const err = error as Error;
      message.error(err.message || (editingShipment ? '更新失败' : '创建失败'));
    }
  };

  const columns = [
    {
      title: '运输合同号',
      dataIndex: 'tracking_contract_no',
      key: 'tracking_contract_no',
    },
    {
      title: '品名',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: '合同编号',
      dataIndex: ['expand', 'sales_contract', 'no'],
      key: 'contract_no',
    },
    {
      title: '物流公司',
      dataIndex: 'logistics_company',
      key: 'logistics_company',
    },
    {
      title: '发货日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '运费状态',
      dataIndex: 'freight_status',
      key: 'freight_status',
      render: (status: string) => (status === 'paid' ? '已付' : '未付'),
    },
    {
      title: '发票状态',
      dataIndex: 'invoice_status',
      key: 'invoice_status',
      render: (status: string) => (status === 'issued' ? '已开' : '未开'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: SalesShipment) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="确定删除此发货记录？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item>
            <Input
              placeholder="搜索运输合同号/品名/物流公司"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 250 }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="关联合同编号"
              value={contractNo}
              onChange={(e) => setContractNo(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 180 }}
            />
          </Form.Item>
          <Form.Item>
            <Select
              placeholder="运费状态"
              value={freightStatus}
              onChange={(value) => {
                setFreightStatus(value);
                setPage(1);
              }}
              allowClear
              style={{ width: 120 }}
              options={[
                { label: '已付', value: 'paid' },
                { label: '未付', value: 'unpaid' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Select
              placeholder="发票状态"
              value={invoiceStatus}
              onChange={(value) => {
                setInvoiceStatus(value);
                setPage(1);
              }}
              allowClear
              style={{ width: 120 }}
              options={[
                { label: '已开', value: 'issued' },
                { label: '未开', value: 'unissued' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增发货
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
        }}
        locale={{ emptyText: '暂无数据' }}
      />

      <Modal
        title={editingShipment ? '编辑发货' : '新增发货'}
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
        width={700}
      >
        <ShipmentForm
          initialValues={editingShipment ? {
            ...editingShipment,
            attachments: undefined,
          } : undefined}
          onFinish={handleFormFinish}
          onCancel={() => setFormVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default ShipmentList;
