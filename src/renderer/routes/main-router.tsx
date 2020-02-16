import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './private-route';
import { ROUTES } from './routes';
import Login from './login';
import Welcome from './welcome';
import Emulators from './emulators';

export default function subRouter(props: { logged: boolean }) {
  return (
    
      <Switch>
        {/* <PrivateRoute authenticated={props.logged} path={ROUTES.RUNES} Component={RunesList} />
        <PrivateRoute authenticated={props.logged} path={ROUTES.FOODS} Component={TracksList} /> */}
        <Route exact path={ROUTES.ROOT} component={Welcome} />
        <Route path={ROUTES.LOGIN} component={Login} />

        <Route path={ROUTES.EMULATORS} component={Emulators} />

        <Route path="*" component={() => <div>404 Not found</div>} />
      </Switch>
  )
}