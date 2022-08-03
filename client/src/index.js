import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";

ReactDOM.render(
  <ProductsProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductsProvider>,
  document.getElementById("root")
);
