import styled from "styled-components";

const Confirmation = () => {
  const reservation = JSON.parse(window.localStorage.getItem("reservations"));

  return (
    <Wrapper>
      <h2>
        Your purchase is confirmed
        <hr />
      </h2>
      {reservation && (
        <TextWrapper>
          <p>
            Hello Richard Belliveau, <br />
            <br />
            Thank you for your order #1412531345. We appreciate your business
            and will be thrilled to send you all informations related to items
            and shipping as soon as possible.
          </p>

          <p>Items: #16161651</p>
          <p>price: $149.99</p>

          <p>
            An email with all informations will be sent to you once your order
            is treated and ship.
          </p>

          <p>Thanks again, and we look forward to seeing you soon.</p>

          <p>Conboot Shop</p>
        </TextWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  background-color: white;
  width: 100%;
  margin: auto;
  padding: 20px;

  h2 {
    padding-bottom: 20px;
    color: var(--color-cadmium-red);
  }

  hr {
    border: 1px solid var(--color-cadmium-red);
  }
`;

const TextWrapper = styled.div`
  border: 3px solid var(--font-color);
  max-width: 450px;
  border-radius: 5px;
  padding: 20px;
  p {
    padding: 10px 0;
  }
`;

export default Confirmation;
