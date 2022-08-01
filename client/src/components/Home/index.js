import styled from "styled-components";
import Header from "../Layout/Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <p>Home page</p>

      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-content: center;
  padding: 5px var(--page-horizontal-padding);
`;

export default Home;
