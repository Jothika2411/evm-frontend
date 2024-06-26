import React, { useState } from "react";
import { Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import FormItem from "../../components/antd/FormItem";
import RememberMe from "../../components/antd/RememberMe";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/antd/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register/userLogin",
        values
      );
      console.log("Login Success:", response.data);
      onLogin(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Invalid credentials. Please try again.");
    }
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
          name="firstName"
          rules={[{ required: true, message: "Please input your Username!" }]}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="First Name"
        />
        <FormItem
          name="email"
          rules={[{ required: true, message: "Please input your E-mail!" }]}
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
          <Link to="/auth/register">Register!</Link>
        </Form.Item>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </Form>
    </div>
  );
};
export default App;
