import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

ReactDOM.render(
  <ProductsProvider>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </ProductsProvider>,
  document.getElementById("root")
);
