import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {useAuth} from './context'


const PrivateRoute = ({ children, ...rest }: {
    [x: string]: any;
    children: React.ReactNode;
}) => {
    const {isAuth} = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

const AuthRoute = ({ children, ...rest }: {
    [x: string]: any;
    children: React.ReactNode;
}) => {
    const {isAuth} = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          !isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}
