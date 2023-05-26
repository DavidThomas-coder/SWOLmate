import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, match }) => {
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (user !== null) {
    return <Component user={user} match={match} />;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AuthenticationCheck
          user={user}
          component={Component}
          match={props.match}
        />
      )}
    />
  );
};

export default AuthenticatedRoute;

