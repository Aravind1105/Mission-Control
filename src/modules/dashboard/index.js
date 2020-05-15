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
import StatsCard from './components/StatsCard';
import Ranking from './components/Ranking';
import MainChart from './components/MainChart';
import ProductStats from './components/ProductStats';
import './styles.less';

// Mock Data
import { rankingOne, rankingTwo } from './mocks/ranking';
import { productsMockData } from './mocks/products';

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

      <Grid.Row stretched className="no-padding">
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="users"
            color="blue"
            text="Customers Today"
            amount="459"
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="box"
            color="orange"
            text="Products sold today"
            amount="578"
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="shopping cart"
            color="teal"
            text="Revenue today"
            amount="€ 5k"
          />
        </Grid.Column>
        <Grid.Column mobile={8} computer={4}>
          <StatsCard
            icon="trash alternate"
            color="pink"
            text="∅ Expiration Rate"
            amount="15 %"
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={11}>
          <MainChart
            data={salesStat}
            products={products}
            kiosksOptions={kiosksOptions}
            getSalesStatistic={getSalesStatistic}
          />
        </Grid.Column>
        <Grid.Column mobile={16} computer={5}>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <Ranking title="Topsellers" data={rankingOne} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Ranking title="Lowsellers" data={rankingTwo} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <ProductStats data={productsMockData} />
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
