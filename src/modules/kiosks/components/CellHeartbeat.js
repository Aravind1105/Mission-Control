/* eslint-disable radix */
import React from 'react';
import PropTypes from 'prop-types';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import get from 'lodash/get';

const CellHeartbeat = ({ temperature, heartbeat, showTime, boldFont }) => {
  const tempValue = get(temperature, 'updated', null);
  const heartbeatValue = get(heartbeat, 'updated', null);
  const tempdif = differenceInMinutes(new Date(), new Date(tempValue));
  const heartdif = differenceInMinutes(new Date(), new Date(heartbeatValue));
  let style = { color: '#DB2828' };
  let text = 'Offline';

  if (tempValue || heartbeatValue) {
    if (tempdif <= 10 || heartdif <= 10) {
      style = { color: '#7cb122' };
      text = 'Online';
    } else if (showTime) {
      let time = parseInt(tempdif / 60);
      if (time === 0) text += ` > ${tempdif} minutes`;
      else if (time < 24) {
        text += ` > ${time} ${time === 1 ? 'hour' : 'hours'}`;
      } else {
        time = parseInt(time / 24);
        text += ` > ${time} ${time === 1 ? 'day' : 'days'}`;
      }
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
