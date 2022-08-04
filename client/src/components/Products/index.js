import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";
import { ProductsContext } from "../../ProductsContext";
import { useEffect, useContext } from "react";
import Loading from "../../Loading";
import { CartContext } from "../../CartContext";

const Products = ({ start, limit, discount }) => {
  const {
    state: { products, status },
    actions: {
      receiveProductsFromServer,
      errorFromServer,
    },
  } = useContext(ProductsContext);

  const {
    state: {},
    actions: { addItemToCart },
  } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch(`/api/get-items?start=${start}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          receiveProductsFromServer(data, { status: 200 });
        })
        .catch((err) => {
          errorFromServer(err);
          return console.log({ status: "error" });
        });
    };
    const fetchOnSaleProducts = async () => {
      await fetch("/api/get-onSale-items")
        .then((res) => res.json())
        .then((data) => {
          receiveProductsFromServer(data, { status: 200 });
        })
        .catch((err) => {
          errorFromServer(err);
          return console.log({ status: "error" });
        });
    };
    if (discount === true) {
      fetchOnSaleProducts();
    } else {
      fetchProducts();
    }
  }, [discount]);
  const discountCalc = (price, discount) => {
    //change price from string to float
    const floatPrice = price.substr(1).replace(",", ".") * 1;
    //calculate discounted price
    const discountedPrice = floatPrice - floatPrice * (discount / 100);
    //change float price to string price format
    const finalPrice = discountedPrice.toLocaleString("en-us", {
      minimumFractionDigits: 2,
    });
    return finalPrice;
  };
  const handleSubmit = async (isBuyNow, productId) => {

    const qty = 1;
    const product = { itemId: productId.toString(), quantity: qty.toString() };

    if (isBuyNow) {
      //add to cart
      console.log("Buy now", product);
    } else {
      await addItemToCart(product);
    }
  };

  return (
    <>
      
      <Wrapper>
        {status === "loading" && <Loading />}
        {products &&
          products.map((product) => {
            return (
              <CardWrapper
                className="card"
                companyId={product.companyId}
                key={`card-${product._id}`}
              >
                <ImgWrapper className="imgBx" key={`card-${product._id}`}>
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    key={`img-${product._id}`}
                  />
                </ImgWrapper>
                <div></div>

                <ContentWrapper
                  className="contentBx"
                  key={`contentWrapper-${product._id}`}
                >
                  <WrapperPrice>
                    {discount === false && <PriceTag>{product.price}</PriceTag>}
                    {discount === true && (
                      <>
                        {" "}
                        <LastPriceTag>{product.price}</LastPriceTag>
                        <OnSalePriceTag>
                          ${discountCalc(product.price, product.onSale)}
                        </OnSalePriceTag>
                      </>
                    )}
                  </WrapperPrice>
                  <h2 key={`h2-${product._id}`}>{product.name}</h2>

                  <DescriptionWrapper
                    className="description"
                    key={`descriptionWrapper-${product._id}`}
                  >
                    <h3 key={`descriptionWrapper-h3-${product._id}`}>
                      Category :
                    </h3>
                    <span key={`descriptionWrapper-span-${product._id}`}>
                      {product.category}
                    </span>
                  </DescriptionWrapper>

                  <StatsWrapper
                    className="stats"
                    key={`statsWrapper-${product._id}`}
                  >
                    <h3 key={`statsWrapper-h3-${product._id}`}>Location :</h3>
                    <span key={`statsWrapper-span-${product._id}`}>
                      {product.body_location}
                    </span>
                  </StatsWrapper>

                  <ActionsWrapper
                    className="actions"
                    key={`actionsWrapper-${product._id}`}
                  >
                    <ButtonBuyNow
                      onClick={() => handleSubmit(true, product._id)}
                      key={`buttonBuyNow-${product._id}`}
                    >
                      Buy Now
                    </ButtonBuyNow>

                    <ButtonAddCart
                      onClick={() => handleSubmit(false, product._id)}
                      key={`buttonAddCart-${product._id}`}
                    >
                      <BsCartPlus key={`bsCartPlus-${product._id}`} />
                    </ButtonAddCart>
                  </ActionsWrapper>
                </ContentWrapper>
              </CardWrapper>
            );
          })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  place-items: center;

  .card:hover .contentBx {
    height: 195px;
  }

  .card:hover .imgBx {
    top: 1%;
    transform: translateY(-25%) scale(0.9);
  }

  .card:hover .stats,
  .card:hover .description,
  .card:hover .actions {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.25s;
  }
`;
const CardWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 390px;
  background: var(--primary-color);
  border-radius: 5px;
  overflow: hidden;
  margin: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--warning);
    clip-path: circle(150px at 85% 35%);
    transition: 0.5s ease-in-out;
  }

  :hover:before {
    clip-path: circle(300px at 80% -20%);
  }

  // compagny name behind card
  :after {
    content: "${(props) => props.companyId.toString()}";
    position: absolute;
    top: 70%;
    left: 15%;
    font-size: 5em;
    font-weight: 800;
    font-style: italic;
    color: rgba(255, 255, 255, 0.04);
  }

  :hover {
    cursor: pointer;
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
  transition: 0.5s;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: contain;
    width: 200px;
    height: 200px;
    border-radius: 5px;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
  transition: 1s;
  z-index: 90;

  h2 {
    position: relative;
    font-weight: 400;
    letter-spacing: 1px;
    color: (--font-color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;

  h3 {
    color: (--font-color);
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 10px;
  }
`;
const StatsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;

  h3 {
    color: (--font-color);
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 10px;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
`;

const PriceTag = styled.h2`
  padding-bottom: 10px;
  font-size: 1.5em;
`;

const ButtonBuyNow = styled.button`
  height: 30px;
  font-size: 20px;
`;
const ButtonAddCart = styled.button`
  font-size: 20px;
  margin-left: 20px;
  height: 30px;
`;
const WrapperPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LastPriceTag = styled.h2`
  padding-bottom: 10px;
  font-size: 1em;
  text-decoration: line-through;
`;
const OnSalePriceTag = styled.h2`
  padding-bottom: 10px;
  font-size: 1.25em;
`;
export default Products;
