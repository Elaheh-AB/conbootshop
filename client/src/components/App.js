import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import NotFound from "../NotFound";
import Home from "./Home";
import Products from "./Products";
import Sale from "./Sale";
import Profile from "./Profile";
import Cart from "./Cart";
import Landing from "./Landing";

const App = () => {
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
