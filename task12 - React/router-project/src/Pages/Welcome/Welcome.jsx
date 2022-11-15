import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <WelcomeContainer>
      <Title>Welcome</Title>
      <Button onClick={() => navigate("/dashboard/comments")}>
        Go to DashBoard
      </Button>
    </WelcomeContainer>
  );
};

export default Welcome;

const WelcomeContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: bisque;
`;

const Title = styled.h2`
  font-size: 100px;
  font-family: sans-serif;
  color: rgb(6, 20, 108);
`;

export const Button = styled.button`
  font-size: 15px;
  padding: 15px 20px;
  border-radius: 20px;
  border: none;
  color: rgb(6, 20, 108);
  cursor: pointer;

  &:hover {
    background-color: azure;
  }
`;
