import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import NotFound from "../NotFound";
import Home from "./Home";
import Products from "./Products";
import Sale from "./Sale";
import Profile from "./Profile";
import Cart from "./Cart";
import Landing from "./Landing";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";
import Confirmation from "./Confirmation";

const App = () => {
  const {
    state: { currentUser, status },
    actions: { loginUser },
  } = useContext(UserContext);

  const {
    state: {},
    actions: { getCartInfoFromDb, errorFromServer },
  } = useContext(CartContext);

  useEffect(() => {
    //Login a fake user with a cart_id that exist in MongoDb
    const fetchUser = async () => {
      await loginUser({
        currentUser: {
          _id: "82638433-3b75-4969-a0e8-2969b3872cf2",
          name: "Richard Belliveau",
          email: "richard.belivo@gmail.com",
          cartId: "4cf61881-d47f-4d88-9925-252d4dd09055",
        },
        status: "idle",
      });
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/products"
              element={<Products start={1} limit={50} />}
            />
            <Route path="/onSale" element={<Sale />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
