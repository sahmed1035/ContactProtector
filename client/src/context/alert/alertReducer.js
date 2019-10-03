import { SET_ALERT, REMOVE_ALERT } from "../types";
/**
 * export default which takes in state and action.
 * run a switch on the action.type
 * for default we will just return the sate as is.
 * for case SET_ALERT, we are returning the state array directly.
 * so returning state inside the array (any other alerts) and action.payload which is the alert that gets sent.
 * for case REMOVE_ALERT filter out the correct alert by id. For each alert check the alert.id and if it is not equal to action.paylod, filter it.
 */
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
