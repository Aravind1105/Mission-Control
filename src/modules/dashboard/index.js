import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { getKiosksAlertsDashboard } from 'modules/kiosks/selectors';
import { getKioskOptions } from 'modules/kiosks/selectors';
import {
  getSalesStatisticState,
  getStatisticProductsListState,
} from './selectors';
import { getSalesStatistic } from './actions';
import Alerts from './components/Alerts';
import MainChart from './components/MainChart';
import './styles.less';

const Dashboard = ({
  salesStat,
  products,
  alertsLog,
  kiosksOptions,
  getSalesStatistic,
}) => {
  return (
    <Grid className="dashboard">
      <Grid.Row>
        <Grid.Column>
          <Alerts list={alertsLog} />
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
    </Grid>
  );
};

const mapStateToProps = state => ({
  alertsLog: getKiosksAlertsDashboard(state),
  salesStat: getSalesStatisticState(state),
  products: getStatisticProductsListState(state),
  kiosksOptions: getKioskOptions(state),
});

const mapDispatchToProps = {
  getSalesStatistic,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
