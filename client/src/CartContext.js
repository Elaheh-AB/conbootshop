import { useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import NotFound from "./NotFound";

export const CartContext = createContext(null);

const initialState = {
  id: null,
  itemIds: [],
  status: "loading",
  items: [],
  total: null,
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
      return { ...state, items: [...state.items, action.data] };
    }
    case "add-item-to-cart": {
      //finding index of element to update in itemIds if exist to update qty
      const index = state.itemIds.findIndex(
        (item) => item.itemId === action.data.itemId
      );

      if (index >= 0) {
        //making a new array
        const newArray = [...state.itemIds];
        //changing value in the new array
        newArray[index].quantity = action.quantity + 1;

        return {
          ...state,
          itemIds: newArray,
        };
      } else {
        // add a new line in the object cart
        return {
          ...state,
          itemIds: [...state.itemIds, action.data],
        };
      }
    }
    case "update-cart-quantity": {
      //finding index of element to update in itemIds
      const index = state.itemIds.findIndex(
        (item) => item.itemId == action.itemId
      );
      //making a new array
      const newArray = [...state.itemIds];
      //changing value in the new array
      newArray[index].quantity = action.quantity;

      return {
        ...state,
        itemIds: newArray,
      };
    }
    case "delete-cart-item": {
      return {
        ...state,
        itemIds: state.itemIds.filter((item) => item.itemId !== action.itemId),
        items: state.items.filter((item) => item._id !== action.itemId),
      };
    }
    case "loading": {
      return {
        ...state,
        status: "loading",
      };
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

  const getCartItemsFromDb = (data) => {
    dispatch({
      type: "get-cart-items-from-db",
      ...data,
    });
  };

  const fetchCartItems = async (data) => {
    await fetch(`/api/get-item/${data}`)
      .then((res) => res.json())
      .then((data) => {
        getCartItemsFromDb(data);
      })
      .catch((error) => {
        errorFromServer(error);
      });
  };

  const addItemToCart = async (data) => {
    let objectToSave = {};

    //finding index of element to update in itemIds
    const index = state.itemIds.findIndex((item) => item.itemId == data.itemId);

    if (index >= 0) {
      //making a new array
      const newArray = [...state.itemIds];
      //changing value in the new array
      const qty = parseInt(data.quantity) + 1;
      newArray[index].quantity = qty.toString();

      objectToSave = {
        _id: state.id,
        itemIds: [...newArray],
      };
    } else {
      objectToSave = {
        _id: state.id,
        itemIds: [...state.itemIds, { ...data }],
      };
    }

    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToSave),
    };
    await fetch(`/api/update-cart`, params)
      .then((res) => res.json())
      .then((data) => {
        addItemSuccess(data);
      })
      .catch((error) => {
        errorFromServer(error);
      });
  };

  const addItemSuccess = async (data) => {
    dispatch({
      type: "add-item-to-cart",
      data,
    });
  };

  const updateCartQuantity = async (data) => {
    dispatch({
      type: "update-cart-quantity",
      ...data,
    });
  };

  const successDeleteCartItem = async (data) => {
    dispatch({
      type: "delete-cart-item",
      ...data,
    });
  };
  const deleteCartItem = async (data) => {
    let objectToSave = {};
    //finding if element exit

    //finding index of element to delete in itemIds
    const newArray = state.itemIds.filter((item) => item.itemId != data.itemId);

    objectToSave = {
      _id: state.id,
      itemIds: [...newArray],
    };

    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToSave),
    };
    await fetch(`/api/update-cart`, params)
      .then((res) => res.json())
      .then((data) => {
        successDeleteCartItem(data);
      })
      .catch((error) => {
        errorFromServer(error);
      });
  };

  const errorFromServer = (data) => {
    dispatch({
      type: "error-from-server",
      ...data,
    });
  };

  const loadingFunc = () => {
    dispatch({
      type: "loading",
    });
  };

  let total = 0;
  state.items.forEach((item) => {
    let quantity = state.itemIds.find(
      (id) => Number(id.itemId) === item._id
    )?.quantity;

    total += Number(item?.price?.replace("$", "")) * quantity;
    total = Math.round((total + Number.EPSILON) * 100) / 100;
  });

  return (
    <CartContext.Provider
      value={{
        total,
        state,
        actions: {
          getCartInfoFromDb,
          errorFromServer,
          fetchCartItems,
          addItemToCart,
          updateCartQuantity,
          deleteCartItem,
          loadingFunc,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
