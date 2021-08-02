/* eslint-disable radix */
import React from 'react';
import PropTypes from 'prop-types';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import get from 'lodash/get';

const CellHeartbeat = ({ heartbeat, showTime, boldFont }) => {
  const value = get(heartbeat, 'updated', 0);
  const dif = differenceInMinutes(new Date(), new Date(value));
  let style = { color: '#DB2828' };
  let text = 'Offline';

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
  heartbeat: PropTypes.shape({
    updated: PropTypes.string,
  }),
};

export default CellHeartbeat;
