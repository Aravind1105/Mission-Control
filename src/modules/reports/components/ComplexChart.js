import React from 'react';
import { Segment, Header, Grid } from 'semantic-ui-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import TotalStatistic from './TotalStatistic';

const margin = {
  top: 10,
  right: 20,
  left: -20,
  bottom: 10,
};

const CustomLabel = ({ value, x, y, color }) => (
  <g x={x} y={y} fill={color} stroke="#FFF" strokeWidth="1">
    <rect x={x - 12} y={y - 13} width="25" height="20" rx="5" ry="5" />
    <text x={x} y={y} strokeWidth="0.6" fontSize={10} textAnchor="middle">
      {value}
    </text>
  </g>
);

const ComplexChart = ({ data }) => {
  const chartData = data ? data.report : [];

  return (
    <Segment>
      <div style={{ height: 400 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={margin}>
            <defs>
              <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3682df" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3682df" stopOpacity={0.15} />
              </linearGradient>
              <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6ed99f" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6ed99f" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis axisLine={false} />
            <Area
              type="monotone"
              dataKey="Name1"
              stroke="#3682df"
              fill="url(#colorOne)"
              fillOpacity={1}
              strokeWidth={3}
              label={<CustomLabel color="#3682df" />}
            />
            <Area
              type="monotone"
              dataKey="Name2"
              stroke="#6ed99f"
              fill="url(#colorTwo)"
              fillOpacity={1}
              strokeWidth={3}
              label={<CustomLabel color="#6ed99f" />}
            />
            <Legend iconType="circle" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Header as="h3">Target Sales</Header>

      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <TotalStatistic title="Name1" value={85} color="blue" basic />
          </Grid.Column>
          <Grid.Column>
            <TotalStatistic title="Name2" value={52} color="green" basic />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default ComplexChart;
