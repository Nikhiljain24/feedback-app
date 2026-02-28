import React from 'react';
import { Modal, Form, Input, Button, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

interface AuthModalProps {
    visible: boolean;
    onCancel: () => void;
    onLoginSuccess: (token: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onCancel, onLoginSuccess }) => {
    const [form] = Form.useForm();

    const handleAuth = async (values: any, type: 'login' | 'signup') => {
        try {
            const endpoint = type === 'login' ? 'login' : 'signup';

            let body;
            let headers: any = {};

            if (type === 'login') {
                // OAuth2PasswordRequestForm expects form-data
                const formData = new FormData();
                formData.append('username', values.username);
                formData.append('password', values.password);
                body = formData;
            } else {
                body = JSON.stringify(values);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(`http://localhost:8000/auth/${endpoint}`, {
                method: 'POST',
                headers,
                body,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Authentication failed');
            }

            if (type === 'login') {
                onLoginSuccess(data.access_token);
                message.success('Welcome back!');
                onCancel();
            } else {
                message.success('Registration successful! Please login.');
                form.resetFields();
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const items = [
        {
            key: 'login',
            label: 'Login',
            children: (
                <Form layout="vertical" onFinish={(values) => handleAuth(values, 'login')}>
                    <Form.Item name="username" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}>
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
                    <Form.Item name="username" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ type: 'email' }]}>
                        <Input prefix={<MailOutlined />} placeholder="Email (Optional)" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
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
        <Modal
            title="Join FeedbackApp"
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <Tabs defaultActiveKey="login" items={items} />
        </Modal>
    );
};

export default AuthModal;
