import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import RefillsToolbar from './components/RefillsToolbar';
import RefillsContent from './components/RefillsContent';
import {
  getGridRefillsTableState,
  getTotalGridRefillsCount,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import { getGridRefills } from './actions';
import { getProductListSaga } from '../products/actions';
import { getProductsDropdownList } from '../products/selectors';

const sort = [
  {
    column: 'created',
    direction: 'ASC',
  },
];

const sortValue = {
  kioskName: 'kiosk',
  date: 'created',
  productName: 'product',
  count: 'count',
  loadCell: 'loadCell',
  weight: 'weight',
  total: 'totalPrice',
  price: 'defaultPrice',
};

const ReplenisherList = ({
  refills,
  isLoading,
  total,
  getGridRefills,
  kiosks,
  getProductListSaga,
  productsList,
}) => {
  const [search, changeSearch] = useState('');
  const [dateRange, changeDate] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [product, changeProduct] = useState('');

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || kiosk || dateRange || product) {
      const name = search ? { product: { $regex: search } } : {};
      const cat = kiosk ? { kiosk: { $regex: kiosk } } : {};
      const date = dateRange ? { created: dateRange } : {};
      const prod = product ? { product } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...date,
        ...prod,
      });
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getGridRefills({ data });
  };

  useEffect(() => {
    getProductListSaga();
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, kiosk, dateRange, product]);

  return (
    <>
      <RefillsToolbar
        changeDate={changeDate}
        changeSearch={changeSearch}
        changeKiosk={changeKiosk}
        changePage={changePage}
        kiosks={kiosks}
        productsList={productsList}
        changeProduct={changeProduct}
      />
      <RefillsContent
        refills={refills}
        isLoading={isLoading}
        getData={getData}
      />
      <Pagination
        totalCount={total}
        page={page}
        perPage={perPage}
        changePage={changePage}
        changePerPage={changePerPage}
        isLoading={isLoading}
      />
    </>
  );
};

const mapStateToProps = state => ({
  refills: getGridRefillsTableState(state),
  total: getTotalGridRefillsCount(state),
  isLoading: state.transactions.isLoading,
  kiosks: getKioskOptionsForTableDropdown(state),
  productsList: getProductsDropdownList(state),
});

const mapDispatchToProps = {
  getGridRefills,
  getProductListSaga,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplenisherList);
