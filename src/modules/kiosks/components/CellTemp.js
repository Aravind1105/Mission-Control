/* eslint-disable radix */
import React from 'react';

const CellTemp = ({ temperature }) => {
  let style = {};
  if (temperature.value >= 7) {
    style = { color: '#DB2828' };
  } else {
    style = { color: '#2D9CDB' };
  }

  return <span style={style}>{temperature.value}</span>;
};

export default CellTemp;
