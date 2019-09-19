// ContactItem.js is for each individual contact in the list to have its own component.
import React from "react";

const ContactItem = ({ contact }) => {
  // destructuring the contact prop that is passed in.
  // badge class to show personal or professional. span that is dynamic. dependant on the type. using turnary to check if personal or professional
  const { id, name, email, phone, type } = contact;
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={
            "badge" +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type}
        </span>
      </h3>
    </div>
  );
};

export default ContactItem;
