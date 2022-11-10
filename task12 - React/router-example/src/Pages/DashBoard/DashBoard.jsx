import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";

const DashBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="DashboardContainer">
      <h2 className="title">Welcome to the Dashboard</h2>
      <button onClick={() => navigate("/")}>Go to Back</button>
    </div>
  );
};

export default DashBoard;
