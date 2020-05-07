import React from 'react';
import PropTypes from 'prop-types';
import { GridColumn } from 'semantic-ui-react';

import './styles.less';

const InfoRow = ({ title, description }) => (
  <>
    <GridColumn width={4} className="info-cell">
      <b>{`${title}:`}</b>
    </GridColumn>
    <GridColumn width={12} className="info-cell">
      {description}
    </GridColumn>
  </>
);

InfoRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InfoRow;
