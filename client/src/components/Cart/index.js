import styled from "styled-components";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";

const Cart = () => {
  const {
    total,
    state: { itemIds, items, status },
    actions: {
      fetchCartItems,
      updateCartQuantity,
      deleteCartItem,
      loadingFunc,
    },
  } = useContext(CartContext);

  // const changeTotal = (data) => {
  //   setCartTotal(data);
  // };
  console.log(items, "ITEMS");
  console.log(itemIds, "IDS");
  return (
    <Wrapper>
      <h2>Your Cart</h2>
      <CartContainer>
        {itemIds &&
          itemIds.map((item, index) => {
            const itemToDisplay = items.filter((data) => {
              return item.itemId == data._id;
            });

            return (
              <CartItem
                id={item.itemId}
                item={itemToDisplay[0]}
                fetchCartItems={fetchCartItems}
                itemQuantity={itemIds[index].quantity}
                updateCartQuantity={updateCartQuantity}
                deleteCartItem={deleteCartItem}
                loadingFunc={loadingFunc}
                status={status}
              />
            );
          })}
        <CartFooter total={total} />
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
