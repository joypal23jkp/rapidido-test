import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { MerchantLogin, StoreMerchant } from "../app/api/merchant";
import { ClientLogin, ClientLoginVerification } from "../app/api/client";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  accessToken: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  clientLogin: () => Promise.resolve(),
  clientLoginVerification: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const user = window.localStorage.getItem("userObject");
        if (accessToken && user != undefined && user != null) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user),
              accessToken: accessToken
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              accessToken: null
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            accessToken: null
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (payload) => {
    const response = await MerchantLogin(payload);
    const { user } = response.payload;

    window.localStorage.setItem("userObject", JSON.stringify(user));
    window.localStorage.setItem("accessToken", user.token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
    return response;
  };

  const clientLogin = async (payload) => {
    const response = await ClientLogin(payload);

    return response;
  };
  const clientLoginVerification = async (payload) => {
    const response = await ClientLoginVerification(payload);
    const { user, token } = response.payload;

    window.localStorage.setItem("userObject", JSON.stringify(user));
    window.localStorage.setItem("accessToken", token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });

    return response;
  };

  const register = async (payload) => {
    const response = await StoreMerchant(payload);
    dispatch({
      type: "REGISTER",
      payload: {
        user: null,
      },
    });
    return response;
  };

  const logout = async () => {
    window.localStorage.removeItem("userObject");
    window.localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        clientLogin,
        clientLoginVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
