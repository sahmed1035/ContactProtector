import React from "react";

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className="my-1">
        This is contact protector application where a user can register, login
        and manage contacts. Each contact is associated with a user. So one user
        cannot edit another user’s contacts.
      </p>
      <h2>Technologies Specification:</h2>
      <ul>
        <li>built a complete backend API that can interact with React.</li>
        <li>
          used JASON (JavaScript Object Notation) Web Tokens (JWT) for
          authentication.
        </li>
        <li>implemented MongoDB Atlas cloud database.</li>
        <li>
          kept it strictly React (no Redux) with the contextAPI along with
          useReducer and useContext hooks.
        </li>
        <li>implemented Middleware that only pertains to protected-routes.</li>
      </ul>
      <p className="bg-dark p">
        <strong>Version</strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
