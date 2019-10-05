/**
 * check to see if token is passed in.
 * if it is then we're going to set it to the global header (defaults.header).
 * if NOT then we're going to delete it from the global header.
 */
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
