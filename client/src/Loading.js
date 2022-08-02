import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div>
        <Spinner className="loading-spinner"></Spinner>
        <Logo src="/logo.png" />
      </div>
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

const Wrapper = styled.div`
  background: transparent;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  margin: 0 auto;
  width: 85px;
  height: 85px;
  border: 5px solid var(--font-color);
  border-top: 5px solid var(--warning);
  border-radius: 50%;
  animation: ${spinning} 1.5s linear infinite;
  z-index: 999;
`;

const Logo = styled.img`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 75px;
  border-radius: 50%;
`;

export default Loading;
