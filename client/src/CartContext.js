import { useEffect, useState } from "react";
import { createContext } from "react";
import NotFound from "./NotFound";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [currentCart, setCurrentCart] = useState({});
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/get-cart/82638433-3b75-4969-a0e8-2969b3872cf8")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCurrentCart(data);
        setStatus("idle");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  if (status === "error") {
    return <NotFound />;
  }

  return (
    <CartContext.Provider value={{ currentCart, status }}>
      {children}
    </CartContext.Provider>
  );
};
