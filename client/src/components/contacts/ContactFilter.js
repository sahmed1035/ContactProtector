// contacts filter is going to be a form. useRefreference an actual DOM object. alternative for simple forms
import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  // initializing
  const contactContext = useContext(ContactContext);
  // initializing ref value
  const text = useRef("");

  // deconstructing
  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  // onChange method. getting the value text.current.value
  const onChange = e => {
    if (text.current.value !== "") {
      fiterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
