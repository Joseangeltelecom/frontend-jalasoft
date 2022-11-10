import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="WelcomeContainer">
      <h2>Welcome</h2>
      <button onClick={() => navigate("/dashboard")}>Go to DashBoard</button>
    </div>
  );
};

export default Welcome;
