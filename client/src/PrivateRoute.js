import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Login/Auth';

const PrivateRoute = ({ 
  component: Component, 
  ...rest 
}) => {
  const isAuthenticated = Auth.isAuthenticated();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
           <Component {...props} />
        ) : (
          <Redirect 
            to={{ 
              pathname: '/login', 
              state: { 
                from: props.location 
              } 
            }} 
          />
        )
      }
    />
  );
};

export default PrivateRoute;
