import React, { useState, useContext, useEffect } from "react";
// useState is for using component level states. for the form input values
import AlertContext from "../../context/alert/alertContext"; // alert for password match
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  // initializing alertContext
  const alertContext = useContext(AlertContext);

  // initializing authContext
  const authContext = useContext(AuthContext);

  // pulling out setAlert from alertContext
  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  //showing error in the UI. we want this to run when the error is added to state. need to add error value as a depencency to useEffect
  useEffect(() => {
    //if isAuthenticated true then redirect. in react to redirect we use props.history.push
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Email already exists!") {
      setAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //error value as a dependency. clearError in the AuthState.js

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
      register({
        //register method with formData of name, email and password
        name,
        email,
        password
      });
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
