import { useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import NotFound from "./NotFound";

export const CartContext = createContext(null);

const initialState = {
  id: null,
  itemIds: null,
  status: "loading",
  items: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "get-cart-info-from-db": {
      return {
        ...state,
        id: action.data._id,
        itemIds: action.data.itemIds,
        status: action.status,
      };
    }
    case "get-cart-items-from-db": {
      return { ...state, items: [...state.items, action.items] };
    }
    case "error-from-server": {
      return {
        status: action.status,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCartInfoFromDb = (data) => {
    dispatch({
      type: "get-cart-info-from-db",
      ...data,
    });
  };

  const errorFromServer = (data) => {
    dispatch({
      type: "error-from-server",
      ...data,
    });
  };

  const getCartItemsFromDb = (data) => {
    dispatch({
      type: "get-cart-items-from-db",
      ...data,
    });
  };

  const fetchCartItems = async (data) => {
    console.log(data);
    await fetch(`/api/get-item/${data.itemIds}`)
      .then((res) => res.json())
      .then((data) => {
        getCartItemsFromDb(data);
      })
      .catch((error) => {
        errorFromServer(error);
      });
  };

  // useEffect(() => {
  //   fetch("/api/get-cart/4cf61881-d47f-4d88-9925-252d4dd09055")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCurrentCart(data.data);
  //       setStatusCart("idle");
  //     })
  //     .catch(() => {
  //       setStatusCart("error");
  //     });
  // }, []);

  // if (statusCart === "error") {
  //   return <NotFound />;
  // }

  return (
    <CartContext.Provider
      value={{
        state,
        actions: { getCartInfoFromDb, errorFromServer, fetchCartItems },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
