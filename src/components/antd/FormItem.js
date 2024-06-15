import React from "react";
import { Form, Input } from "antd";

const FormItem = ({ name, rules, prefix, type, placeholder , label}) => {
  return (
    <Form.Item name={name} rules={rules} label={label}>
      <Input prefix={prefix} type={type} placeholder={placeholder} />
    </Form.Item>
  );
};

export default FormItem;
