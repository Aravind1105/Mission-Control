import React from 'react';
import PropTypes from 'prop-types';
import { GridColumn } from 'semantic-ui-react';

import './styles.less';

const UserInfoRow = ({ title, description, description2 }) => (
  <>
    <GridColumn mobile={8} computer={6} className="info-cell">
      {title && <b>{`${title}:`}</b>}
    </GridColumn>
    <GridColumn mobile={8} computer={10} className="info-cell">
      {description && description} {description2 && description2}
    </GridColumn>
  </>
);

UserInfoRow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UserInfoRow;
