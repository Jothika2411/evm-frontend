import React, { useState } from "react";
import { Form, Input, Select } from "antd";

const FormItem = ({ name, label, rules }) => {
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
  return (
    <div
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item name={name} label={label} rules={rules} />
      <Input />
    </div>
  );
};

export default FormItem;
