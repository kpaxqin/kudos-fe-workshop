import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './shared/constants/routes';
import Account from './account';
import Kudos from './kudos';
import { connectRedirectDefault } from './shared/auth/index';
import { withRedux } from './shared/redux';

const RedirectDefault = withRedux()(connectRedirectDefault(() => <div />));

function getRoutes() {
  return (
    <Switch>
      <Route exact path={routes.SIGN_IN} component={Account.Login} />
      <Route exact path={'/hello'} component={Kudos.Hello} />
      <Route
        exact
        path={routes.DASHBOARD}
        component={RedirectDefault}
      />
    </Switch>
  );
}

export default getRoutes;
