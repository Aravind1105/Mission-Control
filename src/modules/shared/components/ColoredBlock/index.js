import React from 'react';
import PropTypes from 'prop-types';

import './coloredBlock.less';

export function defineColor(percent) {
  if (percent === null) return undefined;

  if (percent >= 60) {
    return 'textGreen';
  }
  return percent > 30 ? 'textOrange' : 'textRed';
}

const ColoredBlock = ({ children, type, value }) => {
  const Element = type;
  return <Element className={defineColor(value)}>{children}</Element>;
};

ColoredBlock.propTypes = {
  type: PropTypes.string,
  value: PropTypes.number,
  children: PropTypes.node.isRequired,
};

ColoredBlock.defaultProps = {
  type: 'span',
  value: null,
};

export default ColoredBlock;
