import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import { getAlmostEmptyKiosksForTable } from 'modules/kiosks/selectors';
import { getAlmostEmptyKiosks } from 'modules/kiosks/actions';
import { getProductListSaga } from 'modules/products/actions';
import AlmostEmptyKiosks from './components/AlmostEmptyKiosksTable';
import {
  setAlmostKiosk as changeKiosk,
  setAlmostProduct as changeProduct,
  setAlmostSupplier as changeSupplier,
  setAlmostPage as changePage,
  setAlmostPerPage as changePerPage,
  setAlmostFilter as changeFilter,
  setAlmostSort as changeSort,
} from './actions';
import { getManufacturers } from '../products/actions';

const sortValue = {
  product: 'product',
  amount: 'amount',
  scale: 'scale',
  kiosk: 'kiosk',
};

const AlmostEmptyKiosksPage = ({
  getAlmostEmptyKiosks,
  almostEmptyKiosks,
  kiosks,
  getProductListSaga,
  isProductsLoading,
  isKioskLoading,
  paginationState,
  changeKiosk,
  changeProduct,
  changeSupplier,
  changePage,
  changePerPage,
  changeFilter,
  changeSort,
}) => {
  const {
    product,
    kiosk,
    supplier,
    filter,
    page,
    perPage,
    sort,
  } = paginationState;

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    if (product || kiosk || supplier) {
      const prod = product ? { productLineId: product } : {};
      const kio = kiosk ? { kioskId: kiosk } : {};
      const sup = supplier ? { manufacturer: supplier } : {};
      data.filter = {
        ...prod,
        ...kio,
        ...sup,
      };
      const supplierIndex = isEqual(supplier, filter.supplier);
      const kioskIndex = isEqual(kiosk, filter.kiosk);
      const productIndex = isEqual(product, filter.product);

      if (!supplierIndex || !kioskIndex || !productIndex) {
        data.skip = 0;
        changePage(0);
        changeFilter({
          ...filter,
          supplier,
          kiosk,
          product,
        });
      }
    }

    if (sort && sortValue[sort[0].column]) {
      let sortDate = {
        quantity: sort[0].direction === 'ASC' ? 1 : -1,
      };
      data.sort = sortDate;
    }
    getAlmostEmptyKiosks({ ...data });
  };

  useEffect(() => {
    getProductListSaga();
    getManufacturers();
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, product, kiosk, supplier]);

  return (
    <Grid className="dashboard">
      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <AlmostEmptyKiosks
            almostEmptyKiosks={almostEmptyKiosks}
            fullTable
            kiosks={kiosks}
            changeKiosk={changeKiosk}
            changeProduct={changeProduct}
            changeSupplier={changeSupplier}
            getData={getData}
            page={page}
            perPage={perPage}
            kioskFilter={kiosk}
            productFilter={product}
            supplierFilter={supplier}
            changePage={changePage}
            changePerPage={changePerPage}
            isKioskLoading={isKioskLoading}
            setSortByInCaller={sort => changeSort([sort])}
            sortFilter={sort}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  isKioskLoading: state.kiosks.isAlmostEmptyLoading,
  isProductsLoading: state.products.isLoading,
  paginationState: state.dashboard.almostEmptyPagination,
});

const mapDispatchToProps = {
  getAlmostEmptyKiosks,
  getProductListSaga,
  changeKiosk,
  changeProduct,
  changeSupplier,
  changePage,
  changePerPage,
  changeFilter,
  changeSort,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlmostEmptyKiosksPage);
