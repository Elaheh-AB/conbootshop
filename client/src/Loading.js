import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <Spinner className="loading-spinner"></Spinner>
    </Wrapper>
  );
};

const spinning = keyframes`
0% {
    transform: rotate(0deg);
    }
100% {
    transform: rotate(360deg);
    }

`;
const Spinner = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 5px solid black;
  border-top: 5px solid red;
  border-radius: 50%;
  animation: ${spinning} 1.5s linear infinite;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

export default Loading;
