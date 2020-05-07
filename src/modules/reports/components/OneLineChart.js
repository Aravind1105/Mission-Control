import React from 'react';
import { Segment } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export const colors = {
  green: '#5eb179',
  blue: '#3b5db9',
  red: '#af2f44',
  orange: '#ecaf49',
};

const OneLineChart = ({ title, data, color }) => {
  const total = data.reduce((prev, { amount }) => prev + amount, 0);
  return (
    <Segment className={`one-line-chart chart-bordered --${color}`}>
      <div className="one-line-chart__header">
        <div>
          <span className="currency-sign">$</span>
          <span className="currency-amount">{total}</span>
        </div>
        <div>{title}</div>
      </div>
      <div style={{ width: '100%', height: '130px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="amount"
              stroke={colors[color]}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Segment>
  );
};

OneLineChart.defaultProps = {
  color: 'blue',
  title: '',
};

export default OneLineChart;
