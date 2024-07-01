import React from "react";
import { Table } from "antd";

const ATable = ({ columns, dataSource }) => (
  <Table columns={columns} dataSource={dataSource} />
);
export default ATable;
