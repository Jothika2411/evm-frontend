import React from "react";
import ATable from "../../components/antd/Table/Table";
const Events = () => {
  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  const data = [
    {
      key: "1",
      event: "John Brown",
      venue: 32,
      date: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      event: "John Brown",
      venue: 32,
      date: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      event: "John Brown",
      venue: 32,
      date: "New York No. 1 Lake Park",
    },
  ];
  return (
    <div>
      <ATable
      columns={columns}
      dataSource={data} />
    </div>
  );
};

export default Events;
