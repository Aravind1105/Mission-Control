import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Settings from './General';
import Playlist from './Playlist';
import KiosksList from './List';
import KioskDetails from './Details';
import KioskEdit from './Edit';
import KioskTempLog from './TempLog';
import KioskActivityLog from './ActivityLog';
import KioskCustomizeScreen from './Settings';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { Segment } from 'semantic-ui-react';

const KiosksScreen = () => (
  <>
    <Segment>
      <SemanticToastContainer position="top-right" />
      <Switch>
        <Route path="/kiosks" exact component={KiosksList} />
        <Route path="/kiosks/detail/:id" exact component={KioskDetails} />
        <Route path="/kiosks/edit/:id" exact component={KioskEdit} />
        <Route path="/kiosks/log/temp/:id" exact component={KioskTempLog} />
        <Route
          path="/kiosks/log/activity/:id"
          exact
          component={KioskActivityLog}
        />
        <Route
          path="/kiosks/settings/:id"
          exact
          component={KioskCustomizeScreen}
        />
        <Route exact path="/kiosks/settings/:id/general" component={Settings} />
        {/* <Route exact path="/kiosks/settings/:id/playlist" component={Playlist} /> */}
        <Redirect to="/kiosks" />
      </Switch>
    </Segment>
  </>
);

export default KiosksScreen;
