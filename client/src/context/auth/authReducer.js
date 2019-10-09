import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    // Both have the same effect as both return a token
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //putting the token inside the local storage
      localStorage.setItem("token", action.payload.token);
      return {
        ...state, //return the current state
        ...action.payload, // it has the token
        isAuthenticated: true, // changing it from null to true
        loading: false // changing it true to false
      };

    // same for 4 cases. remove the token
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // call it in the Navbar
      // remove the token from local storage
      localStorage.removeItem("token");

      // reset everything
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload //from AuthState payload is going to have the error msg
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
