import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

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
  alertsLog,
  kiosksOptions,
  getSalesStatistic,
  getAlmostEmptyKiosks,
  getWidgetTodayData,
  getWidgetMonthlyData,
  widgetData,
  salesStatistics,
  isSalesStatLoading,
}) => {
  useEffect(() => {
    const data = {
      skip: 0,
      limit: 17,
    };
    getSalesStatistic();
    getAlmostEmptyKiosks({ ...data });
    getWidgetTodayData();
    getWidgetMonthlyData();
  }, []);
  return (
    <Grid stackable className="dashboard">
      <Grid.Row>
        <Grid.Column>
          <Alerts list={alertsLog} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row stretched className="custom-widgets">
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="users"
            customColor="#2D9CDB"
            text="Customers Today"
            amount={widgetData.totalNumberOfCustomers
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="boxes"
            customColor="#F2994A"
            text="Products Sold Today"
            amount={widgetData.totalNumberOfProducts
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="credit card"
            customColor="#219653"
            text="Revenue Today"
            amount={`${widgetData.totalGrossIncome
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="tag"
            customColor="#9B51E0"
            text="Monthly Revenue"
            amount={`${widgetData.totalMonthlyGrossIncome
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row stretched only="computer">
        <Grid.Column computer={16}>
          {!isSalesStatLoading && !isEmpty(salesStatistics) && (
            <MainChart kiosksOptions={kiosksOptions} />
          )}
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
  kiosksOptions: getKioskOptions(state),
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  widgetData: getWidgetDataState(state),
  isSalesStatLoading: state.dashboard.isSalesStatLoading,
  salesStatistics: getSalesStatisticState(state),
});

const mapDispatchToProps = {
  getSalesStatistic,
  getAlmostEmptyKiosks,
  getWidgetTodayData,
  getWidgetMonthlyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
