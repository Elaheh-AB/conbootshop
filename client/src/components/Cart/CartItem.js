import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";

const CartItem = ({
  id,
  fetchCartItems,
  item,
  itemQuantity,
  updateCartQuantity,
  deleteCartItem,
}) => {
  const idFix = Number(id);

  const fetchCartItem = async () => {
    await fetchCartItems(idFix);
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  const handleQuantityChange = async (e) => {
    e.preventDefault();

    const product = { itemId: idFix, quantity: e.target.value };

    if (e.target.value > 0) {
      await updateCartQuantity(product);
    } else {
      await deleteCartItem({ itemId: idFix });
    }
  };
  return (
    <>
      {item && (
        <Wrapper>
          <ImgWrapper>
            <img src={item.imageSrc} alt={item.name} key={`img-${item._id}`} />
          </ImgWrapper>
          <DescriptionWrapper>{item.name}</DescriptionWrapper>
          <StatsWrapper>
            <ItemPrice>
              <span>Item price:</span>
              <span style={{ fontWeight: "bold" }}>{item.price}</span>
            </ItemPrice>
            <QuantityWrapper>
              <ItemQuantity
                min={0}
                max={item.numInStock}
                type="number"
                value={itemQuantity}
                onChange={(e) => handleQuantityChange(e)}
              />
              <label>Quantity</label>
            </QuantityWrapper>
            <ItemTotal>
              <span>Item Total:</span>
              <span style={{ fontWeight: "bold" }}></span>
            </ItemTotal>
            <button onClick={() => deleteCartItem({ itemId: item._id })}>
              <BsCartX className="svg" />
            </button>
          </StatsWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default CartItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ImgWrapper = styled.div`
  margin-left: 25px;

  img {
    width: 100px;
    height: 100px;
  }
`;

const DescriptionWrapper = styled.div`
  margin-left: 50px;
  height: 100%;
  width: 100%;
  position: relative;
  align-items: center;
`;

const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  width: 100%;
  height: 100%;

  .svg {
    color: red;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;

const ItemQuantity = styled.input`
  text-align: center;
  margin-right: 15px;
`;

const ItemTotal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;
