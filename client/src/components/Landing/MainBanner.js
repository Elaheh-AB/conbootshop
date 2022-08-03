import styled from "styled-components";
import Sale from "../../assets/sale.jpg";

import { NavLink } from "react-router-dom";

const MainBanner = () => {
  return (
    <Wrapper>
      <WrapperText>
        <LinkBanner to="/12345">Shop Deal</LinkBanner>
      </WrapperText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${Sale});
  width: 100%;
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  @media (max-width: 960px) {
    background-size: fill;
    min-height: 350px;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 600px) {
    background-size: fill;
    min-height: 250px;
  }

  @media (max-width: 600px) {
    background-size: fill;
    min-height: 150px;
  }
`;

const WrapperText = styled.div`
  text-align: center;
  position: absolute;
  top: 90%;
  left: 20%;
  transform: translate(-50%, -50%);
  color: white;
`;

const LinkBanner = styled(NavLink)`
  color: white;
  outline: 1px solid white;
  width: 10vw;
  
  :hover {
    background: var(--warning);
    outline: 1px solid var(--warning);
    color: black;
  }
`;

export default MainBanner;
