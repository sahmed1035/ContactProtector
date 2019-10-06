import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_SUCCESS
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

  // ACTION Load User.
  /**
   * going to take care of checking which user is logged in by hitting auth endpoint and get the user data
   * need to set our token into a global header. instead  within  headers to every route that is protected,
   * set it as a global header within axios. with a special file
   */

  const loadUser = async () => {
    // check local storage. if true then in the setAuthToken method pass in localstorage.token.
    if (localStorage.token) {
      setAuthToken(localStorage.token); // also need in App.js.
    }

    // to make a request, do a try catch
    try {
      const res = await axios.get("/api/auth"); // private route needs a token to make a request. under route/auth.js

      dispatch({
        type: USER_LOADED,
        payload: res.data // actual user data
      });
      //calling loadUser method
      loadUser();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // ACTION Register User.
  //Need to call register method in the Register Component. sign the user up. get a token back. post request. sending data, we need content type headers in json
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // await on the axios post request which return a promise. res.data is going to have the token
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg //msg coming from api route
      });
    }
  }; // 2-need to handle this in the authReducer.

  //ACTION Login User. Log the user in. get the token. 1. take formData. send the request to /api/auth
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // ACTION Logout. this will destory the token and clear everything up.
  const logout = () => dispatch({ type: LOGOUT });

  //ACTION Clear Errors. clear out any errors in the state.

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // adding state value in the Provider. all the actions will be added here as well.
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
