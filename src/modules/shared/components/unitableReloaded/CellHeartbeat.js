import React from 'react';
import PropTypes from 'prop-types';
import differenceInMinutes from 'date-fns/differenceInMinutes';

const CellHeartbeat = ({ value }) => {
  const lastTime = new Date(value);

  const dif = differenceInMinutes(new Date(), lastTime);
  return (
    <>
      {dif <= 5 ? (
        <span style={{ backgroundColor: 'lightgreen' }}>&#60;= 5 minutes</span>
      ) : dif <= 120 ? (
        <span style={{ backgroundColor: 'lightyellow' }}>&#60;= 2 hours</span>
      ) : (
        <span style={{ backgroundColor: '#FF6347' }}>&#62; 2 hours</span>
      )}
    </>
  );
};

CellHeartbeat.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
};

CellHeartbeat.defaultProps = {
  value: 'N.A.',
  style: {},
};

export default CellHeartbeat;
