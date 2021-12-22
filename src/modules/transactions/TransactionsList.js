import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import moment from 'moment';
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

const startOfMonth = moment()
  .startOf('month')
  .toDate();
const currentDay = new Date();
const date = [startOfMonth, currentDay];

const sortDefault = [
  {
    column: 'created',
    direction: 'DESC',
  },
];
const defaultFilterValues = { dateRange: '', kiosk: '' };

const sortValue = {
  kioskName: 'kioskName',
  created: 'created',
  status: 'status',
  productName: 'product',
  loadCell: 'loadCell',
  weight: 'weight',
  total: 'total',
};

const TransactionsList = ({
  transactions,
  isLoading,
  total,
  getAllTransactions,
  kiosksOptions,
  getTransactionsWidgetsData,
  widgetsData,
}) => {
  const [dateRange, changeDate] = useState({
    $gte: date[0],
    $lte: date[1],
  });
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [kiosk, changeKiosk] = useState([]);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaultFilterValues);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    const widgetPayload = {};

    if (dateRange || kiosk) {
      const date = dateRange ? { created: dateRange } : {};
      const kio = kiosk.length > 0 ? { kiosk: { $in: kiosk } } : {};

      data.search = JSON.stringify({
        ...date,
        ...kio,
      });
      const dateRangeIndex = isEqual(dateRange, filter.dateRange);
      const kioskIndex = isEqual(kiosk, filter.kiosk);

      widgetPayload.period = dateRange;
      widgetPayload.kioskId = kiosk;

      if (!dateRangeIndex || !kioskIndex) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filter,
          dateRange,
          kiosk,
        });
      }
    }

    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }

    getAllTransactions({ data });
    getTransactionsWidgetsData({ ...widgetPayload });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, dateRange, kiosk]);

  return (
    <>
      <Toolbar
        changeDate={changeDate}
        kiosks={kiosksOptions}
        changeKiosk={changeKiosk}
        dateRange={date}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              customColor="#219653"
              text="Total Net Sales"
              amount={`${widgetsData.totalNetIncome
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              customColor="#219653"
              text="Total Gross Sales"
              amount={`${widgetsData.totalGrossIncome
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              icon="boxes"
              customColor="#F2994A"
              text="Total Products sold"
              amount={widgetsData.totalNumberOfProductsSold
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Grid.Column>

          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              icon="credit card"
              customColor="#2F80ED"
              text="Total Transactions"
              amount={widgetsData.totalNumberOfTransactions
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={16}>
            <StatsCard
              icon="tag"
              customColor="#9B51E0"
              text="Average Purchase Value"
              amount={`${widgetsData.averagePurchaseValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
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
      <br></br>
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
  kiosksOptions: getKioskOptionsForTableDropdown(state),
  widgetsData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getAllTransactions,
  getTransactionsWidgetsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
