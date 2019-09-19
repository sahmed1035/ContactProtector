// the Home is going to hold a few components from the contact filter, the contacts themselves.
import React from "react";
import Contacts from "../contacts/Contacts";

// for the layout of homepage, half page will be form and half will be contacts. will use grid
const Home = () => {
  return (
    <div className="grid-2">
      {/**First column starting */}
      <div>{/**ContactForm */}</div>
      {/**First column ending */}
      {/**Second column starting */}
      <div>
        <Contacts />
      </div>
      {/**Second column starting */}
    </div>
  );
};

export default Home;
