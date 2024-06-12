import React from "react";
import { Form, Input, Button } from "antd";

const LoginPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values", values);
  };

  return (
    <div className="login-page">
      <Form
        className="login-form"
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          className="form-label"
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>
        <Form.Item
          className="form-label"
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className="custom-input" />
        </Form.Item>

        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
