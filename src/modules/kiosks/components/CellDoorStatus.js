/* eslint-disable radix */
import React from 'react';

const CellDoorStatus = ({ doorStatus, session }) => {
  let style = {};
  let text = doorStatus;

  if (doorStatus === 'open') {
    if (session && session._id) {
      style = { color: '#2D9CDB' };
      text = 'Open - active session';
    } else {
      style = { color: '#DB2828' };
      text = 'Open - no session';
    }
  } else if (doorStatus === 'closed') {
    style = { color: '#7cb122' };
    text = 'Closed';
  }

  return <span style={style}>{text}</span>;
};

export default CellDoorStatus;
