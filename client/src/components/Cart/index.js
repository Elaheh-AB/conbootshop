import styled from "styled-components";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";
import { UserContext } from "../../UserContext";

const Cart = () => {
  const {
    state: { currentUser },
  } = useContext(UserContext);
  const {
    state: { id, itemIds, items },
    actions: {
      getCartInfoFromDb,
      errorFromServer,
      fetchCartItems,
      updateCartQuantity,
    },
  } = useContext(CartContext);

  useEffect(() => {
    const fetchCartById = async () => {
      await fetch(`/api/get-cart/${currentUser.cartId}`)
        .then((res) => res.json())
        .then((data) => {
          getCartInfoFromDb(data, { status: "idle" });
        })
        .catch((error) => {
          errorFromServer(error);
        });
    };
    currentUser && fetchCartById();
  }, [currentUser]);

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      <CartContainer>
        {itemIds &&
          itemIds.map((id, index) => {
            console.log("MAP", id.itemId);
            return (
              <CartItem
                id={id.itemId}
                item={items[index]}
                fetchCartItems={fetchCartItems}
                itemQuantity={itemIds[index].quantity}
                updateCartQuantity={updateCartQuantity}
              />
            );
          })}
        <CartFooter />
      </CartContainer>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

const CartContainer = styled.div`
  height: 100%;
  width: 100%;
  background: white;
`;
