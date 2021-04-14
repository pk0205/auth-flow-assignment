import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = ({ history }) => {
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    <h1 className="container mt-5">Welcome {userInfo && userInfo.name}</h1>
  );
};

export default Dashboard;
