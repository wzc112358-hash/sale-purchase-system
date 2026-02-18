import { Form, Input, Select, Button, Row, Col, Space } from 'antd';
import type { CustomerFormData } from '@/types/customer';

interface CustomerFormProps {
  form: typeof Form.prototype;
  onFinish: (values: CustomerFormData) => void;
  onCancel: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ form, onFinish, onCancel }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: '',
        contact: '',
        phone: '',
        email: '',
        address: '',
        industry: '',
        region: undefined,
        bank_name: '',
        bank_account: '',
        remark: '',
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="contact" label="联系人">
            <Input placeholder="请输入联系人" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="phone" label="联系电话">
            <Input placeholder="请输入联系电话" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="电子邮箱">
            <Input placeholder="请输入电子邮箱" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="industry" label="所在行业">
            <Select
              placeholder="请选择行业"
              options={[
                { label: '制造业', value: '制造业' },
                { label: '服务业', value: '服务业' },
                { label: '零售业', value: '零售业' },
                { label: '建筑业', value: '建筑业' },
                { label: 'IT行业', value: 'IT行业' },
                { label: '金融业', value: '金融业' },
                { label: '其他', value: '其他' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="region" label="所属地区">
            <Select
              placeholder="请选择地区"
              options={[
                { label: '华东', value: '华东' },
                { label: '华南', value: '华南' },
                { label: '华北', value: '华北' },
                { label: '华中', value: '华中' },
                { label: '西南', value: '西南' },
                { label: '西北', value: '西北' },
                { label: '东北', value: '东北' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="address" label="地址">
        <Input placeholder="请输入地址" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="bank_name" label="开户银行">
            <Input placeholder="请输入开户银行" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="bank_account" label="银行账号">
            <Input placeholder="请输入银行账号" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="remark" label="备注">
        <Input.TextArea rows={3} placeholder="请输入备注" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
