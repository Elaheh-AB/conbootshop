import styled from "styled-components";
import { BsAward } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { BsHeadphones } from "react-icons/bs";
import { BsShieldCheck } from "react-icons/bs";

const ServicesBanner = () => {
  return (
    <Wrapper>
      <div>
        <BsAward />
        <p>10 Years Experience</p>
      </div>
      <div>
        <BsTruck />
        <p>Flexible Delivery</p>
      </div>
      <div>
        <BsHeadphones />
        <p>After Sales Support</p>
      </div>
      <div>
        <BsShieldCheck />
        <p>1 Years Warranty</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  background: white;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 20vh;
  }

  p {
    padding-top: 10px;
    font-size: 1.5em;
  }

  svg {
    font-size: 4em;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default ServicesBanner;
