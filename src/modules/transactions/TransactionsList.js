import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import Toolbar from './components/Toolbar';
import TransactionsContent from './components/TransactionsContent';
import {
  getTransactionsTableState,
  getTotalTransactionsCount,
} from './selectors';
import { getAllTransactions } from './actions';

const sort = [
  {
    column: 'created',
    direction: 'ASC',
  },
];

const ProductsList = ({
  transactions,
  isLoading,
  total,
  getAllTransactions,
}) => {
  const [search, changeSearch] = useState('');
  const [dateRange, changeDate] = useState('');
  const [category, changeCategory] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || category || dateRange) {
      const name = search ? { product: { $regex: search } } : {};
      const cat = category ? { category: { $regex: category } } : {};
      const date = dateRange ? { created: dateRange } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...date,
      });
    }

    if (sort) {
      data.sort = sort;
    }

    getAllTransactions({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, category, dateRange]);

  return (
    <>
      <Toolbar
        changeDate={changeDate}
        changeSearch={changeSearch}
        changeCategory={changeCategory}
        changePage={changePage}
      />
      <TransactionsContent
        transactions={transactions}
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
  transactions: getTransactionsTableState(state),
  total: getTotalTransactionsCount(state),
  isLoading: state.transactions.isLoading,
});

const mapDispatchToProps = {
  getAllTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
