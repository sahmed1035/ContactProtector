/***This ConcatForm will be used to add and update contacts.
 * need to bring in useState because this is a form and we need some component level state.
 * instead of setting each field to its own piece of state, we are going to have a single
 * piece of state called contact which will be an object with all the fields.
 */
import React, { useState, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  // initializing to have access to any methods or state. need to have access to the method call Add Contact.
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  // onChange METHOD. putting whatever we type in to the fields into that part of the state.
  // our state is a single contact object. so we need to target the specific item to change.
  /**
   * takes in an event parameter
   * It is not a single form field where we can just put in a string. We have to put the object in.
   * we have to copy the rest of the state by spreading it accross. using ... operator
   * we want to take the current value that is being changed by using the name attribute. e.target.name. this is the key.
   * value is whatever we type in. e.target.value
   */
  // OnCHANGE METHOD
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  // OnSUBMIT METHOD
  const onSubmit = e => {
    e.preventDefault();
    contactContext.addContact(contact); // passing contact state
    //clearing the form
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
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
      {/* submit button. on submit we want to add to our contacts state. need to bring contactContext */}
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
