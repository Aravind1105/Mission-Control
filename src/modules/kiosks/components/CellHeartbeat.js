import React from 'react';
import PropTypes from 'prop-types';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import get from 'lodash/get';

const CellHeartbeat = ({ temperature }) => {
  const value = get(temperature, 'updated', 0);
  const dif = differenceInMinutes(new Date(), new Date(value));
  let style = { backgroundColor: '#FF6347' };
  let text = '> 2 hours';

  if (dif <= 5) {
    style = { backgroundColor: 'lightgreen' };
    text = '<= 5 minutes';
  } else if (dif <= 120) {
    style = { backgroundColor: 'lightyellow' };
    text = '<= 2 hours';
  }

  return <span style={style}>{text}</span>;
};

CellHeartbeat.propTypes = {
  temperature: PropTypes.shape({
    updated: PropTypes.string,
  }),
};

export default CellHeartbeat;
