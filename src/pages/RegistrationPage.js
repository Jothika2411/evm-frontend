import React from "react";
import FormItem from "../components/antd/FormItem";
import ConfirmPassword from "../components/antd/ConfirmPassword";
import { Button, Form, Input, Select } from "antd";
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
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          name="phone"
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
          name="employeeID"
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
      </Form>
    </div>
  );
};
export default RegistrationPage;
