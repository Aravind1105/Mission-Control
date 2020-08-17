import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import Toolbar from './components/Toolbar';
import TransactionsContent from './components/TransactionsContent';
import {
  getTransactionsTableState,
  getTotalTransactionsCount,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import { getAllTransactions } from './actions';

const sortDefault = [
  {
    column: 'created',
    direction: 'ASC',
  },
];

const sortValue = {
  kioskName: 'kioskName',
  created: 'created',
  status: 'status',
  productName: 'product',
  loadCell: 'loadCell',
  weight: 'weight',
  total: 'total',
};

const ProductsList = ({
  transactions,
  isLoading,
  total,
  getAllTransactions,
  kiosks,
}) => {
  const [search, changeSearch] = useState('');
  const [dateRange, changeDate] = useState('');
  const [category, changeCategory] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [kiosk, changeKiosk] = useState('');
  const [sort, setSort] = useState([sortDefault]);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || category || dateRange || kiosk) {
      const name = search ? { product: { $regex: search } } : {};
      const cat = category ? { category: { $regex: category } } : {};
      const date = dateRange ? { created: dateRange } : {};
      const kio = kiosk ? { kiosk } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...date,
        ...kio,
      });
    }

    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAllTransactions({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, category, dateRange, kiosk]);

  return (
    <>
      <Toolbar
        changeDate={changeDate}
        changeSearch={changeSearch}
        changeCategory={changeCategory}
        changePage={changePage}
        kiosks={kiosks}
        changeKiosk={changeKiosk}
      />
      <TransactionsContent
        transactions={transactions}
        isLoading={isLoading}
        getData={getData}
        setSortByInCaller={sort => setSort([sort])}
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
  transactions: getTransactionsTableState(state),
  total: getTotalTransactionsCount(state),
  isLoading: state.transactions.isLoading,
  kiosks: getKioskOptionsForTableDropdown(state),
});

const mapDispatchToProps = {
  getAllTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
