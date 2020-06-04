import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import KiosksList from './List';
import KioskDetails from './Details';
import KioskEdit from './Edit';
import KioskLog from './Log';

const KiosksScreen = () => (
  <Switch>
    <Route path="/kiosks" exact component={KiosksList} />
    <Route path="/kiosks/detail/:id" exact component={KioskDetails} />
    <Route path="/kiosks/edit/:id" exact component={KioskEdit} />
    <Route path="/kiosks/log/:id" exact component={KioskLog} />
    <Redirect to="/kiosks" />
  </Switch>
);

export default KiosksScreen;
