/* eslint-disable radix */
import React from 'react';
import determineColorCode from './determineColorCode';
const CellDoorStatus = ({ doorStatus, session }) => {
  const color = determineColorCode(doorStatus, session);
  let style = { color };
  let text = 'Unknown';
  if (doorStatus === 'open') {
    text = 'Opened';
  } else if (doorStatus === 'closed') {
    text = 'Closed';
  }
  return <span style={style}>{text}</span>;
};

export default CellDoorStatus;
