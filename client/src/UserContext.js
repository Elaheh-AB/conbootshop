import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const initialState = {
  currentUser: null,
  purchasesHistory: null,
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login-user": {
      return {
        ...state,
        currentUser: action.currentUser,
        status: action.status,
      };
    }
    case "get-user-buying-history": {
      return {
        ...state,
        purchasesHistory: action.data,
        status: action.status,
      };
    }
    case "set-loading": {
      return {
        ...state,
        status: action.status,
      };
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = (data) => {
    dispatch({
      type: "login-user",
      ...data,
    });
  };

  const setLoading = (data) => {
    dispatch({
      type: "set-loading",
      ...data,
    });
  };

  const getUserBuyingHistory = async () => {
    await fetch("/api/get-purchase/" + state.currentUser._id)
      .then((response) => response.json())
      .then((buying) => {
        dispatch({
          type: "get-user-buying-history",
          ...buying,
          status: "idle",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          loginUser,
          getUserBuyingHistory,
          setLoading,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
