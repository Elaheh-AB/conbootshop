import MainBanner from "./MainBanner";
import DiscountBanner from "./DiscountBanner";
import ServicesBanner from "./ServicesBanner";
import styled from "styled-components";
import LatestProducts from "./LatestProducts";
import SocialMedia from "./SocialMedia";
const Landing = () => {

  return (
    <Wrapper>
      <MainBanner />
      <DiscountBanner />
      <ServicesBanner />
      {/* <LatestProducts />
      */}
      <SocialMedia />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

export default Landing;
