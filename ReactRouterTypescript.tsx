import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {useAuth} from './context'



//////////////////////////////////////////////  Children //////////////////////////////////////////////
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

//////////////////////////////////////////////  Component //////////////////////////////////////////////

const BaseRoute = ({ children, ...rest }: {
    [x: string]: any;
    children: React.ReactNode;
}) => {
    const isAuth = true
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

const BaseRoute2 = ({ component: Component, ...rest }: any) => {
    const isAuth = true
    return (
      <Route
          {...rest}
          render={(props) => !isAuth ? 
            <Component {...props} /> : 
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />}
        />
    );
}


const BackToTop = () => {
  const urlPath = useLocation()
  useEffect(() => {
    (()=> window.scrollTo(0,0))()
  }, [urlPath])

  return null
}
