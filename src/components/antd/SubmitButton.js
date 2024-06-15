import React from "react";
import { Button } from "antd";

const SubmitButton = ({ text }) => {
  return (
    <Button type="primary" htmlType="submit" className="login-form-button">
      {text}
    </Button>
  );
};

export default SubmitButton;
