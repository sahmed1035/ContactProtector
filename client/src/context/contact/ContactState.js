import React, { useReducer } from "react"; //useReducer hook so that we can have access to state and also dispatch.
//dispatch to our reducer
import uuid from "uuid"; // to generate a random id
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

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

// creating initial states
const ContactState = props => {
  //creating a variable called initialState and setting that to an object
  const initialState = {
    // ultimately this is going to be empty and then we're going to make
    //a request to our backend and fill this up. for now putting some hard coded  contacts
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },

      {
        id: 2,
        name: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@gmail.com",
        phone: "333-333-3333",
        type: "professional"
      },
      {
        id: 4,
        name: "Emad Ahmed",
        email: "emad@gmail.com",
        phone: "444-444-4444",
        type: "personal"
      }
    ]
  };

  // pulling out the state and dispatching from our reducer by using the useReducer hook.
  // state allows us to access anything in our state. Dispatch allows us to dispatch objects to the reducer.
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ALL OF OUR ACTIONS>>>

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // clear Current Contact

  // Update Contact

  // Filter Contacts

  // clear Filter

  // Return our providers so that we can wrap our entire application with this context.

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
