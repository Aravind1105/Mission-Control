import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Pagination from 'modules/shared/components/Pagination';
import {
  getAlmostEmptyKiosksForTable,
  getAlmostEmptyKiosksTotal,
} from 'modules/kiosks/selectors';
import { getAlmostEmptyKiosks } from 'modules/kiosks/actions';
import { getProductListSaga } from 'modules/products/actions';
import AlmostEmptyKiosks from './components/AlmostEmptyKiosks';
import Loader from 'modules/shared/components/Loader';
import { isEqual } from 'lodash';

const sortDefault = [
  {
    column: 'product',
    direction: 'ASC',
  },
];

const defaultFilterValues = { supplier: '', kiosk: '', product: '' };

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
  total,
  isLoading,
}) => {
  const [product, changeProduct] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [supplier, changeSupplier] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaultFilterValues);

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
        setFilters({
          ...filter,
          supplier,
          kiosk,
          product,
        });
      }
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAlmostEmptyKiosks({ ...data });
  };

  useEffect(() => {
    getProductListSaga();
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, product, kiosk, supplier]);

  return (
    <>
      {isLoading && <Loader />}
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
              setSortByInCaller={sort => setSort([sort])}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Pagination
              totalCount={total}
              page={page}
              perPage={perPage}
              changePage={changePage}
              changePerPage={changePerPage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  total: getAlmostEmptyKiosksTotal(state),
  isLoading: state.kiosks.isLoading,
});

const mapDispatchToProps = {
  getAlmostEmptyKiosks,
  getProductListSaga,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlmostEmptyKiosksPage);
