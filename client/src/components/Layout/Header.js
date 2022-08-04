import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../CartContext";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { total } = useContext(CartContext);

  return (
    <Wrapper>
      <WrapperFirstSection>
        <NavigationLinkLogo to="/">
          <img src="\logo-no-bg.png" alt="logo - return home page" />
        </NavigationLinkLogo>
        <NavigationLink to="/products">Products</NavigationLink>
        <NavigationLink to="/onSale">Sale</NavigationLink>
        <WrapperCategories>
          <ButtonCategories to="/category">Category</ButtonCategories>
          <DropdownContent className="dropdown-content">
            {/* Fake endpoint only for design purpose*/}
            <NavigationLink to="/products/fitness">Fitness</NavigationLink>
            <NavigationLink to="/products/medical">Medical</NavigationLink>
            <NavigationLink to="/products/lifestyle">Lifestyle</NavigationLink>
            <NavigationLink to="/products/entertainement">
              Entertainment
            </NavigationLink>
          </DropdownContent>
        </WrapperCategories>
      </WrapperFirstSection>

      <WrapperSecondSection>
        {toggle && <SearchInput type="text" />}
        <SearchButton
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <BsSearch />
        </SearchButton>
        <NavigationLink to="/profile">My Account</NavigationLink>
        <NavigationLink to="/cart"> {total}$</NavigationLink>
        <NavigationLink to="/cart">
          <BsCart />
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
  overflow: hidden;
  background: white;
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
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  flex-basis: 60vw;
`;

const SearchButton = styled.button`
  outline: none;

  :hover {
    text-decoration: underline;
  }
`;

const SearchInput = styled.input`
  min-width: 350px;
`;

const WrapperCategories = styled.div`
  float: left;
  overflow: hidden;

  a {
    float: none;
    display: block;
    text-align: left;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  z-index: 1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  background: white;
  :hover {
    display: block !important;
  }
`;
const ButtonCategories = styled.button`
  outline: none;
  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    background: none;
    outline: none;
  }

  :hover + .dropdown-content {
    display: block;
  }
`;

const NavigationLink = styled(NavLink)``;
const NavigationLinkLogo = styled(NavLink)`
  background: transparent !important;

  img {
    height: 150px;
  }
`;
export default Header;
