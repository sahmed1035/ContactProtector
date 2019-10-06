// the Home is going to hold a few components from the contact filter, the contacts themselves.
import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

// for the layout of homepage, half page will be form and half will be contacts. will use grid
const Home = () => {
  const authContext = useContext(AuthContext);

  // run it as soon as the component loads. we are going to stay authenticated no matter if we reload.
  useEffect(() => {
    authContext.loadUser();

    //eslint-disable-next-line
  }, []); //putting [] so it only loads when the component loads. to handle dependency error put eslint
  return (
    <div className="container" style={{ background: "white", width: "80%" }}>
      <div className="grid-2">
        {/**First column starting */}
        <div>
          <ContactForm />
        </div>
        {/**First column ending */}
        {/**Second column starting */}
        <div>
          <ContactFilter />
          <Contacts />
        </div>
        {/**Second column starting */}
      </div>
    </div>
  );
};

export default Home;
