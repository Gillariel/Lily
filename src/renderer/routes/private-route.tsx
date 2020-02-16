import * as React from 'react';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

const PrivateRoute = (props: ProtectedRouteProps) => {
  let redirectPath: string = '';
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route { ...props } component = { renderComponent } render = { undefined } />;
  } else {
    return <Route { ...props } />;
  }
}

export default PrivateRoute;