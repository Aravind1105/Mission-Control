import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import KiosksToolbar from './components/KiosksToolbar';
import KiosksContent from './components/KiosksContent';

const KiosksScreen = () => {
  return (
    <>
      <Route
        exact
        path="/kiosks"
        render={() => (
          <>
            <KiosksToolbar />
            <KiosksContent />
          </>
        )}
      />
    </>
  );
};

export default KiosksScreen;
