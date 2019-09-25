// need to import types
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state, // return the current contact
        contacts: [...state.contacts, action.payload] // since state is immutable, we have to copy what's already there by spread operator
        // we want to add our data which we sent in the payload.
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        //take the contactS array and set that to map. for each contact check the condition to match the id.
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
        //action.payload has the updated contact.
      };
    default:
      return state;
  }
};
