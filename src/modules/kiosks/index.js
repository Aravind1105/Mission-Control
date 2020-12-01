import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import KiosksList from './List';
import KioskDetails from './Details';
import KioskEdit from './Edit';
import KioskTempLog from './TempLog';
import KioskActivityLog from './ActivityLog';
import KioskCustomizeScreen from './Screen';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const KiosksScreen = () => (
  <>
    <SemanticToastContainer position='top-right' />
    <Switch>
      <Route path="/kiosks" exact component={KiosksList} />
      <Route path="/kiosks/detail/:id" exact component={KioskDetails} />
      <Route path="/kiosks/edit/:id" exact component={KioskEdit} />
      <Route path="/kiosks/log/temp/:id" exact component={KioskTempLog} />
      <Route path="/kiosks/log/activity/:id" exact component={KioskActivityLog} />
      <Route path="/kiosks/screen/customize/:id" exact component={KioskCustomizeScreen} />
      <Redirect to="/kiosks" />
    </Switch>
  </>
);

export default KiosksScreen;
