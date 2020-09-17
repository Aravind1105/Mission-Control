/* eslint-disable radix */
import React from 'react';

const CellTemp = ({ temperature }) => {
  const tempText = Number.isNaN(temperature.value)
    ? ''
    : ` ${temperature.value} °C`;
  let style = {};
  if (temperature.value > 7) {
    style = { color: '#DB2828' };
  } else if (temperature.value < 3) {
    style = { color: '#2D9CDB' };
  } else {
    style = { color: '#7cb122' };
  }

  return <span style={style}>{tempText}</span>;
};

export default CellTemp;
