import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";

const CartItem = ({ id, fetchCartItems }) => {
  let item = null;
  const fetchCartItem = async () => {
    item = await fetchCartItems(id);

    return item;
  };

  useEffect(() => {
    fetchCartItem();
  }, [id]);

  console.log(item);
  console.log(id);

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
                // value={itemQuantity}
                // onChange={(e) => handleQuantityChange(e)}
              />
              <label>Quantity</label>
            </QuantityWrapper>
            <ItemTotal>
              <span>Item Total:</span>
              <span style={{ fontWeight: "bold" }}></span>
            </ItemTotal>
            <BsCartX
              className="svg"
              //  onClick={handleCartClick}
            />
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

// const [itemQuantity, setItemQuantity] = useState(item.numInCart);
// const [itemTotalPrice, setItemTotalPrice] = useState(
//   Number(item.price.replace("$", ""))
// );

// const handleQuantityChange = (e) => {
//   setItemQuantity(e.target.value);
//   setItemTotalPrice(
//     (
//       Math.round(Number(item.price.replace("$", "")) * e.target.value * 100) /
//       100
//     ).toFixed(2)
//   );
// };

// const handleCartClick = () => {
//   setItemQuantity(0);
//   setItemTotalPrice(0.0);
// };
