import styled from "styled-components";
import { NavLink } from "react-router-dom";

const CartFooter = ({ total }) => {
  return (
    <Wrapper>
      <span>Total:</span>
      <span style={{ fontWeight: "bold" }}>{total}$</span>
      <NavLink to="/confirmation">Buy Now!</NavLink>
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
