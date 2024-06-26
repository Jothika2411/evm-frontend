import React, { useState } from "react";
import Sidebar from "../Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="adminLayoutWrap">
        <Sidebar />
        <div className="contentWrap">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
