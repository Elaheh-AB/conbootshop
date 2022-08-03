import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const initialState = {
  currentUser: null,
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login-user": {
      return {
        currentUser: action.currentUser,
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

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          loginUser,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
