import React from 'react';
import { Message } from 'semantic-ui-react';

const WarningMessage = () => (
  <Message negative>
    <p>Funktioniert nur in Verbindung mit einer MSAM Händler Karte</p>
  </Message>
);

export default WarningMessage;
