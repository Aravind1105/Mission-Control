import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import {
  getKioskOptions,
  getAlmostEmptyKiosksForTable,
  getKiosksAlertsDashboard,
} from 'modules/kiosks/selectors';
import StatsCard from 'modules/shared/components/StatsCard';
import { getAlmostEmptyKiosks } from 'modules/kiosks/actions';
import {
  getSalesStatisticState,
  getStatisticProductsListState,
  getWidgetDataState,
} from './selectors';
import {
  getSalesStatistic,
  getWidgetTodayData,
  getWidgetMonthlyData,
} from './actions';
import AlmostEmptyTable from './components/AlmostEmptyTable';
import Alerts from './components/Alerts';
import MainChart from './components/MainChart';
import './styles.less';

const Dashboard = ({
  salesStat,
  products,
  alertsLog,
  kiosksOptions,
  getSalesStatistic,
  getAlmostEmptyKiosks,
  getWidgetTodayData,
  getWidgetMonthlyData,
  widgetData,
}) => {
  useEffect(() => {
    const data = {
      skip: 0,
      limit: 17,
    };
    getAlmostEmptyKiosks({ ...data });
    getWidgetTodayData();
    getWidgetMonthlyData();
  }, []);
  return (
    <Grid className="dashboard">
      <Grid.Row>
        <Grid.Column>
          <Alerts list={alertsLog} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row stretched className="no-padding">
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="users"
            color="blue"
            text="Customers Today"
            amount={widgetData.totalNumberOfCustomers}
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="boxes"
            color="orange"
            text="Products Sold Today"
            amount={widgetData.totalNumberOfProducts}
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="credit card"
            color="teal"
            text="Revenue Today"
            amount={`€ ${widgetData.totalGrossIncome}`}
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="tag"
            color="pink"
            text="Monthly Revenue"
            amount={`€ ${widgetData.totalMonthlyGrossIncome}`}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <MainChart
            data={salesStat}
            products={products}
            kiosksOptions={kiosksOptions}
            getSalesStatistic={getSalesStatistic}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <AlmostEmptyTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  alertsLog: getKiosksAlertsDashboard(state),
  salesStat: getSalesStatisticState(state),
  products: getStatisticProductsListState(state),
  kiosksOptions: getKioskOptions(state),
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  widgetData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getSalesStatistic,
  getAlmostEmptyKiosks,
  getWidgetTodayData,
  getWidgetMonthlyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
