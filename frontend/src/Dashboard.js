import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Loader from "./Loader";

const Dashboard = ({ history }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <h1 className="container mt-5">Welcome {userInfo && userInfo.name}</h1>
      )}
    </>
  );
};

export default Dashboard;
