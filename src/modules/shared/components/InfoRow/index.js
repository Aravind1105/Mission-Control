import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import './styles.less';

const InfoRow = ({ title, description }) => (
  <>
    <Grid.Column mobile={16} tablet={16} computer={5} className="info-cell">
      {title && <b>{`${title}:`}</b>}
    </Grid.Column>
    <Grid.Column mobile={16} tablet={16} computer={11} className="info-cell">
      {description}
    </Grid.Column>
  </>
);

InfoRow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InfoRow;
