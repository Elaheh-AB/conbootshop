import { BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import Biker from "../../assets/biker.jpg";
import styled from "styled-components";

const SocialMedia = () => {
  return (
    <>
      <Wrapper>
        <Title>Connect with Us</Title>

        <WrapperLogo>
          <a href="#">
            <BsFacebook />
          </a>
          <a href="#">
            <BsYoutube />
          </a>
          <a href="#">
            <BsInstagram />
          </a>
          <a href="#">
            <BsPinterest />
          </a>
        </WrapperLogo>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-image: url(${Biker});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 250px;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 2em;
  text-align: center;
  padding-bottom: 20px;
  color: white;
`;

const WrapperLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(241, 211, 2, 0.2);
  max-height: 100px;

  a {
    border: 1px solid white;
    border-radius: 50%;
    margin: 5vw;

    :hover {
      background: var(--warning);
      border: 1px solid var(--warning);

      svg {
        color: black;
      }
    }
  }
  svg {
    color: white;
  }
`;

export default SocialMedia;
