import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { loadKiosksSaga } from 'modules/kiosks/actions';
import Alerts from './components/Alerts';
import StatsCard from './components/StatsCard';
import Ranking from './components/Ranking';
import ExampleChart from './components/ExampleChart';
import ProductStats from './components/ProductStats';

// Mock Data
import { rankingOne, rankingTwo } from './mocks/ranking';
import { productsMockData } from './mocks/products';

const DashboardScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadKiosksSaga());
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Alerts />
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
          <ExampleChart />
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

export default DashboardScreen;
