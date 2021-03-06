import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Account from './account';
import Kudos from './kudos';

function getRoutes() {
  return (
    <Switch>
      <Route exact path={'/sign-in'} component={Account.Login} />
      <Route exact path={'/hello'} component={Kudos.Hello} />
    </Switch>
  );
}

export default getRoutes;
