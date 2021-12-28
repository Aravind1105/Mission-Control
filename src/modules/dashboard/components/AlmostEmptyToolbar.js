import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
  getProductsDropdownList,
  selectorGetManufacturer,
} from 'modules/products/selectors';
import { getKioskOptionsForTableDropdown } from 'modules/kiosks/selectors';
import './styles.less';

const Toolbar = ({
  changeSupplier,
  changeProduct,
  changeKiosk,
  kiosks,
  kioskFilter,
  products,
  productFilter,
  manufacturersOptions,
  manufacturer,
  supplierFilter,
  isManufacturesLoading,
}) => {
  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
  };
  const handleProductChange = (e, { value }) => {
    changeProduct(value);
  };
  const handleChangeManufacturer = (e, { value }) => {
    changeSupplier(value);
  };
  return (
    <Grid stackable>
      <Grid.Row verticalAlign="middle">
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <div className="kiosk-toolbar-dropdown">
            <Dropdown
              placeholder="All Kiosks"
              selection
              options={kiosks}
              value={kioskFilter}
              className="full-width"
              onChange={handleKioskChange}
            />
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <div className="products-toolbar-dropdown">
            <Dropdown
              placeholder="All Products"
              selection
              value={productFilter}
              options={products}
              className="full-width"
              onChange={handleProductChange}
            />
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <div className="manufactur-toolbar-dropdown">
            <Dropdown
              placeholder="All Manufacturers"
              selection
              value={supplierFilter}
              options={manufacturersOptions}
              className="full-width"
              onChange={handleChangeManufacturer}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  products: getProductsDropdownList(state),
  manufacturersOptions: selectorGetManufacturer(state),
  kiosks: getKioskOptionsForTableDropdown(state),
  manufacturer: state.products.manufacturers,
  isManufacturesLoading: state.products.isManufacturesLoading,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
