import React from "react";
import { Form, Select } from "antd";

const PrefixSelector = ({ name, value, options }) => {
  return (
    <Form.Item name={name} initialValue={value} noStyle>
      <Select style={{ width: 70 }}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PrefixSelector;
