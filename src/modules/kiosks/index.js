import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import KiosksList from './KiosksList';
import KioskDetails from './KioskDetails';
import KioskEdit from './KioskEdit';

const KiosksScreen = () => (
  <Switch>
    <Route path="/kiosks" exact component={KiosksList} />
    <Route path="/kiosks/detail/:id" exact component={KioskDetails} />
    <Route path="/kiosks/edit/:id" exact component={KioskEdit} />
    <Redirect to="/kiosks" />
  </Switch>
);

export default KiosksScreen;
