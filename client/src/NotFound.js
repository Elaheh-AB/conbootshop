import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title> Not NotFound </Title>
      <Return
        className=" secondary round"
        type="button"
        onClick={() => navigate(`/`)}
      >
        Return to Home page
      </Return>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  position: absolute;
  z-index: 999;
`;

const Return = styled.button`
  z-index: 999;
  margin-top: 200px;
`;
export default NotFound;
