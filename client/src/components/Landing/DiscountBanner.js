import styled from "styled-components";
import Vr from "../../assets/vr.png";
import { NavLink } from "react-router-dom";

const DiscountBanner = () => {
  return (
    <Wrapper>
      <FirstSection>
        <VrImage src={Vr} alt="vr headseat" />
      </FirstSection>
      <SecondSection>
        <h3>Sale!</h3>
        <p>10% Off On All Products!</p>
        <NavigationLink to="/discount">Shop Now</NavigationLink>
      </SecondSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
  background: linear-gradient(to left, var(--secondary-color) 70%, white 30%);
`;

const FirstSection = styled.div`
  width: 30%;
  text-align: center;
`;
const SecondSection = styled.div`
  width: 70%;
  text-align: center;

  h3 {
    color: var(--red-alert);
    font-size: 2em;
  }
  p {
    margin: 20px;
    font-size: 1.25em;
    color: white;
  }
  button {
    color: white;
    outline: 1px solid white;

    :hover {
      color: var(--font-color);
      outline: 1px solid var(--font-color);
    }
  }
`;
const NavigationLink = styled(NavLink)`
  color: white;
  outline: 1px solid white;
  width: 10vw;
`;

const VrImage = styled.img`
  width: 90%;
`;

export default DiscountBanner;
