import React from "react";
import { Form, Checkbox } from "antd";

const RememberMe = () => {
  return (
    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form.Item>
  );
};

export default RememberMe;
