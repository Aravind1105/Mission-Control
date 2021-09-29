import React from 'react';
import { Segment, Grid, Button, Icon } from 'semantic-ui-react';

import StatisticBlock from './StatisticBlock';

const titles = {
  deposit: 'Cash deposits',
  dividends: 'Invested dividends',
  gains: 'Capital gains',
};
const iconOptions = {
  circular: true,
  inverted: true,
  size: 'large',
  style: { margin: 'auto 12px auto auto' },
};
const icons = {
  deposit: () => <Icon color="orange" name="laptop" {...iconOptions} />,
  dividends: () => <Icon color="red" name="graduation cap" {...iconOptions} />,
  gains: () => <Icon color="green" name="building outline" {...iconOptions} />,
};

const PortfolioContainer = ({ statistic }) => {
  const statisticKey = statistic ? Object.keys(statistic) : [];

  return (
    <Segment.Group raised>
      <Segment>
        <Grid>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={10}>Portfolio Performance</Grid.Column>
            <Grid.Column width={6} textAlign="right">
              <Button basic>View All</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment>
        <Grid>
          <Grid.Row columns="equal">
            {statisticKey.map(key => (
              <Grid.Column key={key}>
                <StatisticBlock
                  title={titles[key]}
                  value={statistic[key].value}
                  description={statistic[key].percent}
                  icon={icons[key]}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment textAlign="center">
        <Button color="blue">
          <Icon name="circle outline" />
          View Complete Report
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default PortfolioContainer;
