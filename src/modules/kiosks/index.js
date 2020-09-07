import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import KiosksList from './List';
import KioskDetails from './Details';
import KioskEdit from './Edit';
import KioskLog from './Log';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const KiosksScreen = () => (
  <>
  <SemanticToastContainer position='top-right'/>
  <Switch>
    <Route path="/kiosks" exact component={KiosksList} />
    <Route path="/kiosks/detail/:id" exact component={KioskDetails} />
    <Route path="/kiosks/edit/:id" exact component={KioskEdit} />
    <Route path="/kiosks/log/:id" exact component={KioskLog} />
    <Redirect to="/kiosks" />
  </Switch>
  </>
);

export default KiosksScreen;
