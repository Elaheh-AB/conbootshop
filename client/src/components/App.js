import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import { ProductsContext } from "../ProductsContext";
import { useEffect, useContext } from "react";
import NotFound from "../NotFound";
import Home from "./Home";
import Products from "./Products";
import Loading from "../Loading";
import Profile from "./Profile";
import Cart from "./Cart";
import Landing from "./Landing";

import Confirmation from "./Confirmation";

const App = () => {
  const {
    state: { products, status },
    actions: { receiveProductsFromServer, errorFromServer },
  } = useContext(ProductsContext);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch("/api/get-items")
        .then((res) => res.json())
        .then((data) => {
          receiveProductsFromServer(data, { status: 200 });
        })
        .catch((err) => {
          errorFromServer(err);
          return console.log({ status: "error" });
        });
    };
    fetchProducts();
  }, []);

  return (
    <>
      <GlobalStyles />
      {status === "loading" && <Loading />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
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
