import React from 'react';
import PropTypes from 'prop-types';
import { GridRow, GridColumn, Header } from 'semantic-ui-react';

const FormGroupTitle = ({ title }) => (
  <GridRow stretched>
    <GridColumn>
      <Header as="h3" className="form-title">
        {title}
      </Header>
    </GridColumn>
  </GridRow>
);

FormGroupTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FormGroupTitle;
