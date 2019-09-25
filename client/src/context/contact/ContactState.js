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
    ],
    // state current for the form input with default value of null. when clicking on Edit button, the contact should be put in to the "current"
    current: null
  };

  // pulling out the state and dispatching from our reducer by using the useReducer hook.
  // state allows us to access anything in our state. Dispatch allows us to dispatch objects to the reducer.
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ALL OF OUR ACTIONS>>>

  // Add Contact
  const addContact = contact => {
    // contact comes in
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact }); // directly sending it to the payload
  }; // need to add it to the value in the return.

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  //pass in the current contact to set
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear Current Contact
  //setting the form back to null
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts

  // clear Filter

  // Return our providers so that we can wrap our entire application with this context.

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
