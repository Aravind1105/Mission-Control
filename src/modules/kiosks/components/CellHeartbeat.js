import React from 'react';
import PropTypes from 'prop-types';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import get from 'lodash/get';
import { primaryColor } from '../../../lib/colors';

const CellHeartbeat = ({ temperature, showTime, boldFont }) => {
  const value = get(temperature, 'updated', 0);
  const dif = differenceInMinutes(new Date(), new Date(value));
  let style = { color: '#DB2828' };
  let text = 'Offline';

  if (dif <= 60) {
    style = { color: '#7cb122' };
    text = 'Online';
  } else if (showTime) {
    // eslint-disable-next-line radix
    const time = parseInt(dif / 60);
    text += ` > ${time} ${time === 1 ? 'hour' : 'hours'}`;
  }

  if (boldFont) {
    text = (
      <b>
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
