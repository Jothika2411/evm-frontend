import React from "react";
import { DatePicker } from "antd";

const Datepicker = ({ name, value, onChange, onBlur }) => {
  return (
    <DatePicker
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Datepicker;
