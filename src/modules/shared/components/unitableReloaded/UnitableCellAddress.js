import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const UnitableCellAddress = ({ icon, value, postfix }) => {
  if (!value[0]) return 'N.A.';
  return <span>{`${value[0].properties.city}, ${value[0].properties.line1}`}</span>;
};

UnitableCellAddress.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  postfix: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.array]),
  style: PropTypes.object,
};

UnitableCellAddress.defaultProps = {
  icon: null,
  postfix: '',
  value: 'N.A.',
  style: {},
};

export default UnitableCellAddress;
