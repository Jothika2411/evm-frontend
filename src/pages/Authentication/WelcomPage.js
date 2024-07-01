import React from "react";

const WelcomPage = ({ user }) => {
  return (
    <div className="welcome-page">
      Welcome
      {user.firstName}
    </div>
  );
};

export default WelcomPage;
