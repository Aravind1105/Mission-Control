import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import {
  getKioskOptions,
  getAlmostEmptyKiosksForTable,
  getKiosksAlertsDashboard,
} from 'modules/kiosks/selectors';
import { getAlmostEmptyKiosks } from 'modules/kiosks/actions';
import {
  getSalesStatisticState,
  getStatisticProductsListState,
} from './selectors';
import { getSalesStatistic } from './actions';
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
}) => {
  useEffect(() => {
    const data = {
      skip: 0,
      limit: 17,
    };
    getAlmostEmptyKiosks({ ...data });
  }, []);

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
});

const mapDispatchToProps = {
  getSalesStatistic,
  getAlmostEmptyKiosks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
