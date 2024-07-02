import React from "react";
import { Form, Input } from "antd";
import { Field } from "formik";

const FormItem = ({ name, rules, prefix, type, placeholder, label }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <Form.Item
          name={name}
          rules={rules}
          label={label}
          validateStatus={
            form.errors[name] && form.touched[name] ? "error" : ""
          }
          help={form.errors[name] && form.touched[name] ? form.errors[name] : ""}
        >
          <Input
            {...field}
            prefix={prefix}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              form.setFieldValue(name, e.target.value);
            }}
          />
        </Form.Item>
      )}
    </Field>
  );
};

export default FormItem;
