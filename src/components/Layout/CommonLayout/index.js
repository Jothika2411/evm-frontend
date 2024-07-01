import React from "react";

const CommonLayout = ({ children }) => (
  <React.Fragment>
    <div className="layout-body">{children}</div>
  </React.Fragment>
);
export default CommonLayout;
