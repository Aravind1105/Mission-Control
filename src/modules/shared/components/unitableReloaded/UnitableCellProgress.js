import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';

const UnitableCellProgress = ({ value }) => {
  return (
    <Progress
      size="tiny"
      percent={value}
      success={value >= 50}
      warning={value < 50}
      error={value < 30}
    />
  );
};

UnitableCellProgress.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UnitableCellProgress.defaultProps = {
  value: 'N.A.',
};

export default UnitableCellProgress;
