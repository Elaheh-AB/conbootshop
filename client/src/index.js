import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ProductsProvider } from "./ProductsContext";

ReactDOM.render(
  <ProductsProvider>
    <App />
  </ProductsProvider>,
  document.getElementById("root")
);
