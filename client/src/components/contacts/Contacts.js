/***
 * we want to pull in the contacts from the state into the Contacts Commponent
 * and then we'll loop through them creating a list and output a contact item for each one.
 */

import React, { Fragment, useContext } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  // initializing ontactContext by setting it to useContext hook and pass in ContactContext that we brought in.
  // now we will have access to any state or actions associated with this context.
  const contactContext = useContext(ContactContext);

  // pulling out with destructuring
  const { contacts } = contactContext;
  // in the return we will have an expression to map through the contacts. for each one we will call it contact
  // we need to embed this to our homepae.
  // embadding ContactItem, passing in specific contact as a prop. key for the specific contact
  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
