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

    case REGISTER_SUCCESS:
      //putting the token inside the local storage
      localStorage.setItem("token", action.payload.token);
      return {
        ...state, //return the current state
        ...action.payload, // it has the token
        isAuthenticated: true, // changing it from null to true
        loading: false // changing it true to false
      };

    // same for both cases
    case REGISTER_FAIL:
    case AUTH_ERROR:
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
