import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BiCart } from "react-icons/bi";

const Header = () => {
  return (
    <Wrapper>
      <WrapperFirstSection>
        <NavigationLinkLogo to="/">
          <img src="\logo.png" />
        </NavigationLinkLogo>
        <NavigationLink to="/category">Category</NavigationLink>
        <NavigationLink to="/product">Products</NavigationLink>
      </WrapperFirstSection>

      <WrapperSecondSection>
        <NavigationLink to="/profile">My Account</NavigationLink>
        <NavigationLink to="/cart"> 0.00$</NavigationLink>
        <NavigationLink to="/cart">
          <BiCart />
        </NavigationLink>
      </WrapperSecondSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: var(--header-height);
`;

const WrapperFirstSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const WrapperSecondSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const NavigationLink = styled(NavLink)``;
const NavigationLinkLogo = styled(NavLink)`
  background: transparent !important;

  img {
    height: 75px;
  }
`;
export default Header;
