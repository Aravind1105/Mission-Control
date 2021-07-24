/* eslint-disable radix */
import React from 'react';
import PropTypes from 'prop-types';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import get from 'lodash/get';

const CellHeartbeat = ({ temperature, showTime, boldFont }) => {
  const value = get(temperature, 'updated', 0);
  const dif = differenceInMinutes(new Date(), new Date(value));
  let style = { color: '#DB2828' };
  let text = 'Offline';

  // if (dif <= 60) {
  if (dif <= 10) {
    style = { color: '#7cb122' };
    text = 'Online';
  } else if (showTime) {
    let time = parseInt(dif / 60);
    if (time === 0) text += ` > ${dif} minutes`;
    else if (time < 24) {
      text += ` > ${time} ${time === 1 ? 'hour' : 'hours'}`;
    } else {
      time = parseInt(time / 24);
      text += ` > ${time} ${time === 1 ? 'day' : 'days'}`;
    }
  }

  if (boldFont) {
    text = (
      <b>
        &nbsp;
        {text}
      </b>
    );
  }

  return <span style={style}>{text}</span>;
};

CellHeartbeat.propTypes = {
  temperature: PropTypes.shape({
    updated: PropTypes.string,
  }),
};

export default CellHeartbeat;
