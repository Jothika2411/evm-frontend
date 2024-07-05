import React from "react";
import { TimePicker } from "antd";

const { RangePicker } = TimePicker;

const TimeRangePickerComponent = ({ onTimeRangeChange, value }) => {
  const onChange = (time, timeString) => {
    onTimeRangeChange(time);
  };

  return (
    <div>
      <h3>Select Time Range:</h3>
      <RangePicker onChange={onChange} format="HH:mm" value={value} />
    </div>
  );
};

export default TimeRangePickerComponent;
