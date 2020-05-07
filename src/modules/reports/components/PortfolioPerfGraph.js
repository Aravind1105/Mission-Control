import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
// import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import CircleChart from 'modules/shared/components/CircleChart';
import StatisticBlock from './StatisticBlock';

// const randomColor = () => `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
// const colors = Array.from({ length: 5 }).map(() => randomColor());

const PortfolioPerfGraph = ({ data }) => (
  <Segment>
    <Header as="h3">Portfolio Performance</Header>
    {data ? (
      <>
        <StatisticBlock
          title="Capital Gains"
          value={data.gains.value}
          description={data.gains.percent}
          icon={() => (
            <CircleChart
              className="performance-graph"
              progressColor="darkblue"
              size={54}
              percent={data.gains.percent}
            />
          )}
        />
        <StatisticBlock
          title="Capital Gains"
          value={data.dividends.value}
          description={data.dividends.percent}
          icon={() => (
            <CircleChart
              className="performance-graph"
              progressColor="lightblue"
              size={54}
              percent={data.dividends.percent}
            />
          )}
        />
      </>
    ) : null}
  </Segment>
);

export default PortfolioPerfGraph;
