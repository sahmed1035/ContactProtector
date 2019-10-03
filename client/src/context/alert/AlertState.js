import React, { useReducer } from "react";
import uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  //initial state will have array of objects
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert Action
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4(); // generate random id
    // dispatch to our reducer
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    // alert disappears after a certain amount of time. payload will be id to know which one to remove
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
