import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
// every component is going to be functional component with hooks. racf
// 2 properites title and icon

const Navbar = ({ title, icon }) => {
  // initializing variable
  const authContext = useContext(AuthContext);

  // pulling out from the authContext
  const { isAuthenticated, logout, user } = authContext;

  //onLogout
  const onLogout = () => {
    logout();
  };

  //divide up the links based on if we are logged in or not.

  //LOGEDIN USER
  const authLinks = (
    <Fragment>
      {/* make sure if there is a user then show user.name 
    @Todo: make a Greetings function which says goodmorning, goodafternoon...based on computer time or location instead of just Hello.
    */}
      <li>Hello {user && user.name}</li>
      {/**Logout Link. on small screen only icon */}
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  // GUEST USERS
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1 style={{ "margin-left": "1%" }}>
        <i className={icon} /> {title}
      </h1>
      <ul style={{ "padding-right": "10%" }}>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

// ptsr pts short emmets. propTypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};
// Default
Navbar.defaultProps = {
  title: " Contact Protector",
  // icon: "fas fa-id-card-alt"
  icon: "fas fa-phone-alt fa-lg fa-spin"
};

export default Navbar;
