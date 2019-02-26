import React from 'react';
import { Segment } from 'semantic-ui-react';

import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';

const loadKiosksTest = () => {
  const accessToken = LivelloLS.getItem(TOKEN_STORAGE_KEY);

  fetch('/api/v1/fridges', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  }).then(res => {
    res.json().then(body => {
      console.log(body);
    });
  });
};

const KiosksScreen = () => {
  loadKiosksTest();

  return (
    <>
      <Segment style={{ height: 2200 }}>Kiosks</Segment>
    </>
  );
};

export default KiosksScreen;
