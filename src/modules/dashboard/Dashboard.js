import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import {
  getKioskOptions,
  getAlmostEmptyKiosksForTable,
} from 'modules/kiosks/selectors';
import StatsCard from 'modules/shared/components/StatsCard';
import { getAlmostEmptyKiosks, getAlertsGrid } from 'modules/kiosks/actions';
import { getWidgetDataState } from './selectors';
import {
  getSalesStatistic,
  getWidgetTodayData,
  getWidgetMonthlyData,
} from './actions';
import AlmostEmptyTable from './components/AlmostEmptyKiosks';
import Alerts from './components/Alerts';
import MainChart from './components/MainChart';
import './styles.less';
import { getKiosksAlertsForTable } from '../kiosks/selectors';

const Dashboard = ({
  alerts,
  kiosksOptions,
  getSalesStatistic,
  getAlmostEmptyKiosks,
  getAlertsGrid,
  getWidgetTodayData,
  getWidgetMonthlyData,
  widgetData,
  almostEmptyKiosks,
}) => {
  useEffect(() => {
    const almostEmptyData = {
      skip: 0,
      limit: 17,
      sort: {
        quantity: 1,
      },
    };
    const alertData = {
      data: {
        skip: 0,
        limit: 6,
        search: '',
        sort: {
          column: 'startDate',
          direction: 'DESC',
        },
      },
    };
    getSalesStatistic();
    getAlertsGrid({ ...alertData });
    getAlmostEmptyKiosks({ ...almostEmptyData });
    getWidgetTodayData();
    getWidgetMonthlyData();
  }, []);
  return (
    <Grid stackable className="dashboard">
      <Grid.Row>
        <Grid.Column>
          <Alerts alerts={alerts} />
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

      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <MainChart kiosksOptions={kiosksOptions} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <AlmostEmptyTable almostEmptyKiosks={almostEmptyKiosks} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  kiosksOptions: getKioskOptions(state),
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  widgetData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getSalesStatistic,
  getAlmostEmptyKiosks,
  getAlertsGrid,
  getWidgetTodayData,
  getWidgetMonthlyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
