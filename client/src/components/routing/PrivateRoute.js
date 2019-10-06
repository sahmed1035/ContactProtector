import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// authContext to know if we are logged in or not. also loading value to see if it is loading done or not.
import AuthContext from "../../context/auth/authContext";

// ...rest for anything else passed in
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    /**if user is not authenticated AND STATE is done loading */
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
