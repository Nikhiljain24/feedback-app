import React from 'react';
import { Form, Input, Button, message, Tabs, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { AuthService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleAuth = async (values: any, type: 'login' | 'signup') => {
        try {
            let data;
            if (type === 'login') {
                const formData = new FormData();
                formData.append('username', values.username);
                formData.append('password', values.password);
                data = await AuthService.login(formData);
                localStorage.setItem('token', data.access_token);
                message.success('Login successful!');
                navigate('/');
            } else {
                await AuthService.signup(values);
                message.success('Registration successful! Please login.');
                form.resetFields();
            }
        } catch (error: any) {
            message.error(error.message || 'Authentication failed');
        }
    };

    const items = [
        {
            key: 'login',
            label: 'Login',
            children: (
                <Form layout="vertical" onFinish={(values) => handleAuth(values, 'login')}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Login</Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: 'signup',
            label: 'Sign Up',
            children: (
                <Form form={form} layout="vertical" onFinish={(values) => handleAuth(values, 'signup')}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ type: 'email', message: 'Please input a valid email!' }]}>
                        <Input prefix={<MailOutlined />} placeholder="Email (Optional)" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Create Account</Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Col xs={24} sm={16} md={12} lg={8} xl={6} xxl={4}>
                <Card
                    title={<div style={{ textAlign: 'center', fontSize: '24px' }}>Welcome</div>}
                    bordered={false}
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}
                >
                    <Tabs defaultActiveKey="login" items={items} centered />
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;
