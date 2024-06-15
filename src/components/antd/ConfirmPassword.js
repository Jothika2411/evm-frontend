import React from "react";
import { Form, Input } from "antd";

const ConfirmPassword = ({ dependencies }) => {
  return (
    <Form.Item
      name="confirm"
      label="Confirm Password"
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Please confirm your password!",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(dependencies[0]) === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("The new password that you entered do not match!")
            );
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
  );
};

export default ConfirmPassword;
