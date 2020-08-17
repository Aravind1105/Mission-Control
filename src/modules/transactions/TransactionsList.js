import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Pagination from 'modules/shared/components/Pagination';
import StatsCard from 'modules/shared/components/StatsCard';
import Toolbar from './components/Toolbar';
import TransactionsContent from './components/TransactionsContent';
import {
  getTransactionsTableState,
  getTotalTransactionsCount,
  getWidgetDataState,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import { getAllTransactions, getTransactionsWidgetsData } from './actions';

const sortDefault = [
  {
    column: 'created',
    direction: 'DESC',
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
  getTransactionsWidgetsData,
  widgetsData,
}) => {
  const [search, changeSearch] = useState('');
  const [dateRange, changeDate] = useState('');
  const [category, changeCategory] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [kiosk, changeKiosk] = useState('');
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    const widgetPayload = {};

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
    console.log(sort[0].column);
    console.log('inner', JSON.stringify(sort));
    if (dateRange || kiosk) {
      widgetPayload.period = dateRange;
      widgetPayload.kioskId = kiosk;
    }
    getAllTransactions({ data });
    getTransactionsWidgetsData({ ...widgetPayload });
  };

  useEffect(() => {
    getTransactionsWidgetsData();
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(sort));
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
      <Grid>
        <Grid.Row stretched className="custom-widgets">
          <Grid.Column mobile={8} computer={4} tablet={8}>
            <StatsCard
              icon="money"
              color="green"
              text="Total Net Sales"
              amount={`€ ${widgetsData.totalNetIncome} `}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="boxes"
              color="orange"
              text="Total Products sold"
              amount={widgetsData.totalNumberOfProductsSold}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="credit card"
              color="blue"
              text="Total Transactions"
              amount={widgetsData.totalNumberOfTransactions}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="tag"
              color="purple"
              text="Average Purchase Value"
              amount={`€ ${widgetsData.averagePurchaseValue}`}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
  widgetsData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getAllTransactions,
  getTransactionsWidgetsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
