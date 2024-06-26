import React, { useState } from "react";
import FormItem from "../../components/antd/FormItem";
import ConfirmPassword from "../../components/antd/ConfirmPassword";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegistrationPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register/userRegister",
        values
      );
      console.log("Registration Success:", response.data);
      form.resetFields();
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error.response.data);
      setError(error.response.data.error || "Registration failed");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="register-page">
      <Form
        className="register-form"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <FormItem
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        />
        <FormItem
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        />
        <FormItem
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
        />
        <FormItem
          name="password"
          type="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        />

        <ConfirmPassword dependencies={["password"]} />

        <Form.Item
          name="mobile"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <FormItem
          name="employeeId"
          label="Employee ID"
          rules={[
            {
              required: true,
              message: "Please input your Employee ID!",
            },
          ]}
        />

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        {error && (
          <div
            className="error"
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
      </Form>
    </div>
  );
};
export default RegistrationPage;
