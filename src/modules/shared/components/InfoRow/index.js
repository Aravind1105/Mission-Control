import React from 'react';
import PropTypes from 'prop-types';
import { GridColumn } from 'semantic-ui-react';

import './styles.less';

const InfoRow = ({ title, description }) => (
  <>
    <GridColumn width={5} className="info-cell">
      {title && <b>{`${title}:`}</b>}
    </GridColumn>
    <GridColumn width={11} className="info-cell">
      {description}
    </GridColumn>
  </>
);

InfoRow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InfoRow;
