import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

function RootLayout() {
  return (
    <>
      <div>
        <NavBar />
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
}

export default RootLayout;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
  max-width: 100vw;
`;
