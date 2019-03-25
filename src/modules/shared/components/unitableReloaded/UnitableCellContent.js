import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const UnitableCellContent = ({ icon, value, postfix }) => {
  return (
    <span>
      {icon && <Icon name={typeof icon === 'function' ? icon(value) : icon} />}
      {value}
      {typeof postfix === 'function' ? postfix(value) : postfix}
    </span>
  );
};

UnitableCellContent.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  postfix: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

UnitableCellContent.defaultProps = {
  icon: null,
  postfix: '',
  value: 'N.A.',
  style: {},
};

export default UnitableCellContent;
