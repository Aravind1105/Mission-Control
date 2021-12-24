import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
  getProductsDropdownList,
  selectorGetManufacturer,
} from 'modules/products/selectors';
import { getKioskOptionsForTableDropdown } from 'modules/kiosks/selectors';
import SelectCheckBoxes from 'modules/shared/components/SelectCheckBoxes';
import './styles.less';

const Toolbar = ({
  changeSupplier,
  changeProduct,
  changeKiosk,
  kiosks,
  products,
  manufacturersOptions,
  manufacturer,
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
              options={products}
              className="full-width"
              onChange={handleProductChange}
            />
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <div className="manufactur-toolbar-dropdown">
            {/* <SelectCheckBoxes
              title="Manufacturers"
              options={manufacturersOptions}
              allOptionKey="all"
              onClickApply={handleChangeManufacturer}
              isLoading={isManufacturesLoading}
              value={manufacturer}
            /> */}
            <Dropdown
              placeholder="All Manufacturers"
              selection
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
