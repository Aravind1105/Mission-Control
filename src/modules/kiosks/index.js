import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import KiosksList from './KiosksList';
import KioskDetails from './KioskDetails';

const KiosksScreen = () => (
  <Switch>
    <Route path="/kiosks/list" exact component={KiosksList} />
    <Route path="/kiosks/:id" exact component={KioskDetails} />
    <Redirect to="/kiosks/list" />
  </Switch>
);

export default KiosksScreen;
