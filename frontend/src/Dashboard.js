import React from "react";

const Dashboard = () => {
  const userInfo = localStorage.getItem("userInfo");
  return (
    <h1 className="container mt-5">Welcome {userInfo && userInfo.name}</h1>
  );
};

export default Dashboard;
