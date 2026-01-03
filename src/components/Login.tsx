import React from "react";
import { Card, Form, Input, Button, Col, Row } from "antd";

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { username: string; password: string }) => {
    console.log("Form Values:", values);
    // Call your API here
  };

  return (
    <Row justify="center" style={{ minHeight: "100vh", alignItems: "center" }}>
        <Col span={24}>
    <Card title="Register">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </Col></Row>
  );
};

export default Login;
