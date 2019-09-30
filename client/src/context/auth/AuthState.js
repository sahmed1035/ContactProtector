import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    //vinalla javascript to access browsers local storage and get an item called token
    token: localStorage.getItem("token"),
    isAuthenticated: null, //if login or not
    loading: true, //before we feth the data we will be loading. after we get the response, set it to false
    user: null, // which user we are dealing with
    error: null // if we get any errors, put that to this state.
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // ACTION Load User. going to take care of checking which user is logged in by hitting auth endpoint and get the user data

  // ACTION Register User. sign the user up. get a token back.

  //ACTION Login User. Log the user in. get the token.

  // ACTION Logout. this will destory the token and clear everything up.

  //ACTION Clear Errors. clear out any errors in the state.

  // adding state value in the Provider. all the actions will be added here as well.
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
