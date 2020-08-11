import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
  getProductsDropdownList,
  selectorGetSupplier,
} from 'modules/products/selectors';
import { getKioskOptionsForTableDropdown } from 'modules/kiosks/selectors';

const Toolbar = ({
  changeSupplier,
  changeProduct,
  changeKiosk,
  kiosks,
  products,
  supplier,
}) => {
  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
  };
  const handleProductChange = (e, { value }) => {
    changeProduct(value);
  };
  const handleSupplierChange = (e, { value }) => {
    changeSupplier(value);
  };
  return (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={4}>
          <Dropdown
            placeholder="All Kiosks"
            selection
            options={kiosks}
            className="full-width"
            onChange={handleKioskChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Dropdown
            placeholder="All Products"
            selection
            options={products}
            className="full-width"
            onChange={handleProductChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Dropdown
            placeholder="All Suppliers"
            selection
            options={supplier}
            className="full-width"
            onChange={handleSupplierChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  products: getProductsDropdownList(state),
  supplier: selectorGetSupplier(state),
  kiosks: getKioskOptionsForTableDropdown(state),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
