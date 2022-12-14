import { createContext, useReducer } from "react";

export const ProductsContext = createContext(null);

const initialState = {
  products: null,
  selectedProduct: null,
  onSaleProducts: null,
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "receive-products-from-server": {
      return {
        ...state,
        products: action.data,
        status: action.status,
      };
    }
    case "receive-onSale-products-from-server": {
      return {
        ...state,
        onSaleproducts: action.data,
        status: action.status,
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
        ...state,
        status: action.status,
      };
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveProductsFromServer = (data) => {
    
    dispatch({
      type: "receive-products-from-server",
      ...data,
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

  return (
    <ProductsContext.Provider
      value={{
        state,
        actions: {
          receiveProductsFromServer,
          errorFromServer,
          loadingFunc,
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
