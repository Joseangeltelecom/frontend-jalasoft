import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <ErrorContainer>
      <Title>Oops!</Title>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        <i>{error.statusText || error.message}</i>
      </Text>
      <Button onClick={() => navigate("/")}>Go to Welcome</Button>
    </ErrorContainer>
  );
}

const Title = styled.h2`
  font-size: 100px;
  font-family: sans-serif;
  color: rgb(6, 20, 108);
`;

const Text = styled.p`
  font-size: 20px;
`;

const ErrorContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: bisque;
`;

const Button = styled.button`
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
