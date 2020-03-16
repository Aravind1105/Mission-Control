import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import KiosksList from './KiosksList';
import KioskDetails from './KioskDetails';
import KioskNew from './KioskEdit';

const KiosksScreen = () => (
  <Switch>
    <Route path="/kiosks/list" exact component={KiosksList} />
    <Route path="/kiosks/new" exact component={KioskNew} />
    <Route path="/kiosks/:id" exact component={KioskDetails} />
    <Redirect to="/kiosks/list" />
  </Switch>
);

export default KiosksScreen;
