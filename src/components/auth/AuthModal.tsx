import React from 'react';
import { Modal, Form, Input, Button, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { AuthService } from '../../services/api';

interface AuthModalProps {
    visible: boolean;
    onCancel: () => void;
    onLoginSuccess: (token: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onCancel, onLoginSuccess }) => {
    const [form] = Form.useForm();

    const handleAuth = async (values: any, type: 'login' | 'signup') => {
        try {
            let data;
            if (type === 'login') {
                const formData = new FormData();
                formData.append('username', values.username);
                formData.append('password', values.password);
                data = await AuthService.login(formData);
            } else {
                data = await AuthService.signup(values);
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
