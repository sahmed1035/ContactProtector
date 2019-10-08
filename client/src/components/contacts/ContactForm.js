import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;

/***This ConcatForm will be used to add and update contacts.
 * need to bring in useState because this is a form and we need some component level state.
 * instead of setting each field to its own piece of state, we are going to have a single
 * piece of state called contact which will be an object with all the fields.
 */

/**
 * this contact is the sate of the form. whenever we cahnge an input these change. that's we will be passing.
 * and that's what we'll get submitted to the update function.
 * once it gets submitted, it's gonna get called in the ContactState. UpdateContact is going to get passed in.
 * It's going to dispatch to the reducer the updated contact. Then Reducer will catch it.
 */

// onChange METHOD.
/**
 * putting whatever we type in to the fields into that part of the state.
 *  our state is a single contact object. so we need to target the specific item to change.
 * takes in an event parameter
 * It is not a single form field where we can just put in a string. We have to put the object in.
 * we have to copy the rest of the state by spreading it accross. using ... operator
 * we want to take the current value that is being changed by using the name attribute. e.target.name. this is the key.
 * value is whatever we type in. e.target.value
 */

/**
 * OnSUBMIT METHOD.
 * condition. if current is empty then add  contact. else update contact.
 */
