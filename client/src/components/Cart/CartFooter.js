import styled from "styled-components";

const CartFooter = ({ total }) => {
  return (
    <Wrapper>
      <span>Total:</span>
      <span style={{ fontWeight: "bold" }}>{total}$</span>
      <BuyButton type="button">Buy Now!</BuyButton>
    </Wrapper>
  );
};

export default CartFooter;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    padding: 15px;
  }
`;

const BuyButton = styled.button``;
