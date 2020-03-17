import React from 'react';
import PropTypes from 'prop-types';

const CellPrice = ({ value, postfix }) => (
  <span>
    {value}
    {typeof postfix === 'function' ? postfix(value) : postfix}
  </span>
);

CellPrice.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array]),
  postfix: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  style: PropTypes.object,
};

CellPrice.defaultProps = {
  value: 'N.A.',
  postfix: ' €',
  style: {},
};

export default CellPrice;
