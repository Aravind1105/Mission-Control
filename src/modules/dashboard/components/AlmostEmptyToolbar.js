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
  kioskFilter,
  isKiosksLoading,
  products,
  productFilter,
  isProductsLoading,
  manufacturersOptions,
  supplierFilter,
  isManufacturesLoading,
}) => {
  const handleKioskChange = value => {
    changeKiosk(value);
  };
  const handleProductChange = value => {
    changeProduct(value);
  };
  const handleChangeManufacturer = value => {
    changeSupplier(value);
  };
  return (
    <Grid stackable>
      <Grid.Row verticalAlign="middle">
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <SelectCheckBoxes
            title="Kiosks"
            options={kiosks}
            value={kioskFilter}
            allOptionKey="all"
            className="full-width"
            onClickApply={handleKioskChange}
            isLoading={isKiosksLoading}
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <SelectCheckBoxes
            title="Products"
            options={products}
            value={productFilter}
            allOptionKey="all"
            className="full-width"
            onClickApply={handleProductChange}
            isLoading={isProductsLoading}
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <SelectCheckBoxes
            title="Manufacturers"
            options={manufacturersOptions}
            value={supplierFilter}
            allOptionKey="all"
            className="full-width"
            onClickApply={handleChangeManufacturer}
            isLoading={isManufacturesLoading}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  products: getProductsDropdownList(state),
  manufacturersOptions: selectorGetManufacturer(state),
  kiosks: getKioskOptionsForTableDropdown(state),
  isManufacturesLoading: state.products.isManufacturesLoading,
  isKiosksLoading: state.kiosks.isKiosksListLoading,
  isProductsLoading: state.products.isLoading,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
