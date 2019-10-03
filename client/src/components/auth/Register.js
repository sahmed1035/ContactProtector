import React, { useState, useContext } from "react";
// useState is for using component level states. for the form input values
import AlertContext from "../../context/alert/alertContext"; // alert for password match

const Register = () => {
  // initializing alertContext
  const alertContext = useContext(AlertContext);

  // pulling out setAlert from alertContext
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    //passing in an object with the fields of name and email
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  // destructuring so that we can use them as variables
  const { name, email, password, password2 } = user;

  // onChange method. spread operator to get the current value of the user. e.target.name to GET the label(attribute). e.target.value to SET the value
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  // onSubmit method: checking for required fiels and password match.
  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("All fields are required", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      console.log("Register form submitted.");
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-dark">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
