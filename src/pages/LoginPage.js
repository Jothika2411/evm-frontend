import React from "react";
import { Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import FormItem from "../components/antd/FormItem";
import RememberMe from "../components/antd/RememberMe";
import { Link } from "react-router-dom";
import SubmitButton from "../components/antd/SubmitButton";

const App = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <FormItem
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-mail"
        />
        <FormItem
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        <Form.Item>
          <RememberMe />
          <Link className="login-form-forgot" to="/forgotPassword">
            Forgot Password?
          </Link>
        </Form.Item>
        <Form.Item>
          <SubmitButton text="Log in" /> Or
          <Link to="/register">Register!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
