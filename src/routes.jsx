import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './shared/constants/routes';
import Account from './account';
import Kudos from './kudos';

function getRoutes() {
  return (
    <Switch>
      <Route exact path={routes.SIGN_IN} component={Account.Login} />
      <Route exact path={'/hello'} component={Kudos.Hello} />
    </Switch>
  );
}

export default getRoutes;
