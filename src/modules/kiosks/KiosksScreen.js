import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import KiosksToolbar from './components/KiosksToolbar';
import KiosksContent from './components/KiosksContent';
import KioskDetails from './components/KioskDetails';

const KiosksScreen = () => {
  return (
    <>
      <Route exact path="/kiosks" render={() => <Redirect to="/kiosks/list" />} />
      <Route
        path="/kiosks/list"
        render={() => (
          <>
            <KiosksToolbar />
            <KiosksContent />
          </>
        )}
      />
      <Route exact path="/kiosks/:id/detail" render={() => <KioskDetails />} />
    </>
  );
};

export default KiosksScreen;
