import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/auth';

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败，请检查邮箱和密码');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}
    >
      <Card
        style={{ width: 400 }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            企业采购销售管理系统
          </h1>
          <p style={{ color: '#999' }}>请登录您的账号</p>
        </div>
        <Form
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="邮箱地址"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: '#1A1A1A',
                borderColor: '#1A1A1A',
                height: 44,
                fontSize: 16,
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', color: '#999', fontSize: 12 }}>
          <p>测试账号：</p>
          <p>sales@test.com / purchase@test.com / manager@test.com</p>
          <p>密码：12345678</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
