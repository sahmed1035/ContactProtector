import React, { useContext } from "react";

import ContactContext from "../../context/contact/contactContext";

import PropTypes from "prop-types";
/**
 * ContactItem.js is for each individual contact in the list to have its own component.
 * bringing ContactContext becuase we need to call a method to delete from there.
 */

const ContactItem = ({ contact }) => {
  // initializing contactContext
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  /**
   * destructuring the contact prop that is passed in.
   * badge class to show personal or professional.
   * span that is dynamic. dependant on the type. using turnary to check if personal or professional
   */

  const { _id, name, email, phone, type } = contact;

  // ON Delete METHOD
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "personal" ? "badge-primary" : "badge-success")
          }
        >
          {/* making first letter of type upperCase. concatinating with rest of the letters. */}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      {/* rest of the fields. Email not required so if it is provided then show it with the icon */}
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      {/* buttons for CRUD */}
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>

        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};
export default ContactItem;
