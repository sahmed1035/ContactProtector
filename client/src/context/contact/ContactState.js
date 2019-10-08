import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

/**
 * useReducer hook so that we can have access to state and also dispatch.
 * dispatch to our reducer
 */

//importing types
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  CLEAR_FILTER,
  CLEAR_CONTACTS
} from "../types";

// creating initial states
const ContactState = props => {
  //creating a variable called initialState and setting that to an object
  const initialState = {
    // ultimately this is going to be empty and then we're going to make
    //a request to our backend and fill this up. for now putting some hard coded  contacts
    contacts: null,
    // state current for the form input with default value of null. when clicking on Edit button, the contact should be put in to the "current"
    current: null,
    filtered: null, // an array of filtered contacts.
    error: null
  };

  /**
   * pulling out the state and dispatching from our reducer by using the useReducer hook.
   * state allows us to access anything in our state. Dispatch allows us to dispatch objects to the reducer.
   */

  const [state, dispatch] = useReducer(contactReducer, initialState);

  /****** ALL OF OUR ACTIONS*****/

  // Get Contacts
  // hit the backend api/contacts with the GET request
  const getContacts = async () => {
    // sending post request in the try catch block. going to send contact that is passed in the form and config
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      }); // sending the response from the server.
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  }; // need to add it to the value in the return.

  // Add Contact
  const addContact = async contact => {
    // headers becuse sending data. we need content type application/jason.
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // sending post request in the try catch block. going to send contact that is passed in the form and config
    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      }); // sending the response from the server.
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  }; // need to add it to the value in the return.

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact. pass in the current contact to set
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // clear Current Contact. setting the form back to null
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts.  will take a piece of text to filter. dispatch the type: of FILTER_CONTACT
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear Filter.  setting CLEAR_FILTER back to null.
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Return our providers so that we can wrap our entire application with this context.

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        getContacts,
        clearContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
