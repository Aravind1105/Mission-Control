import React from 'react';
import { Grid } from 'semantic-ui-react';

import TotalStatistic from './TotalStatistic';

const titles = {
  income: 'Income target',
  expenses: 'Expenses target',
  spending: 'Spending target',
  total: 'Total target',
};

const colors = {
  income: 'red',
  expenses: 'green',
  spending: 'orange',
  total: 'blue',
};

const TotalStatisticContainer = ({ statistic }) => (
  <Grid>
    <Grid.Row columns="equal">
      {Object.keys(statistic).map(key => (
        <Grid.Column key={key}>
          <TotalStatistic
            title={titles[key]}
            value={statistic[key]}
            color={colors[key]}
          />
        </Grid.Column>
      ))}
    </Grid.Row>
  </Grid>
);

TotalStatisticContainer.defaultProps = {
  income: 0,
  expenses: 0,
  spending: 0,
  total: 0,
};
export default TotalStatisticContainer;
