import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// every component is going to be functional component with hooks. racf
// 2 properites title and icon

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1 style={{ "padding-left": "40%" }}>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
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
