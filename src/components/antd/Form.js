import React from "react";
import LoginPage from "../../pages/LoginPage";

const Form = () => {
  return (
    <div>
      <LoginPage
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "The input is not a valid email!" },
        ]}
      ></LoginPage>
    </div>
  );
};

export default Form;
