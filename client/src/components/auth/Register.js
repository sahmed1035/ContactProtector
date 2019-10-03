import React, { useState } from "react";
// useState is for using component level states. for the form input values

const Register = () => {
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

  // onSubmit method
  const onSubmit = e => {
    e.preventDefault();
    console.log("Register form submitted.");
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
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
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
