import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const initialState = {
  currentUser: null,
  userBuyingHistory: null,
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
        userBuyingHistory: action.data,
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

  const getUserBuyingHistory = async(data) => {
   
    await fetch("/api/users/new")
      .then((response) => response.json())
      .then((buying) => {
        console.log(buying);
      })
      .catch((err) => {
        console.log(err);
      });
  

    dispatch({
      type: "get-user-buying-history",
      ...data,
    });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          loginUser,
          getUserBuyingHistory,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
