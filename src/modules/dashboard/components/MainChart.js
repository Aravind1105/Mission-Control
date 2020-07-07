import React, { useState, useEffect } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import Select from 'react-select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { colorsArr } from 'lib/colors';
import CustomizedAxisTick from './CustomizedAxisTick';
import CustomTooltip from './CustomTooltip';

const optionsTime = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
];

const MainChart = ({ data, products, kiosksOptions, getSalesStatistic }) => {
  const [kioskId, setKiosk] = useState('');
  const [time, setTime] = useState(optionsTime[1].value);

  useEffect(() => {
    getSalesStatistic({ kioskId, time });
  }, [kioskId, time]);

  const handlerChangeKiosk = ({ value }) => {
    setKiosk(value);
  };

  const handleChangeTime = ({ value }) => {
    setTime(value);
  };

  return (
    <Segment>
      <Grid verticalAlign="middle" className="dashboard-header">
        <Grid.Row>
          <Grid.Column width={8}>
            <h3 className="dashboard-title">Sales by Fridges</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <Select
              onChange={handlerChangeKiosk}
              options={kiosksOptions}
              defaultValue={kiosksOptions[0]}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Select
              onChange={handleChangeTime}
              options={optionsTime}
              defaultValue={optionsTime[1]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ left: 10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={({ date }) => {
              return date;
            }}
            height={100}
            interval={0}
            tickSize={10}
            tick={<CustomizedAxisTick />}
          />
          <YAxis />
          <Tooltip
            content={<CustomTooltip />}
          />
          <Legend />
          {!kioskId && products.map((productName, i) => {
            const name = kiosksOptions.find(el => el.value === productName);
            return (
              <Bar
                key={productName}
                dataKey={productName}
                name={name && name.label}
                stackId="a"
                fill={colorsArr[i % (products.length - 1)]}
                className="chartTest"
              />
            );
          })}
          {kioskId
            && (
            <Bar
              key={kioskId}
              dataKey="amount"
              name={kiosksOptions.find(el => el.value === kioskId).label}
              stackId="a"
              fill={colorsArr[1]}
            />
            )
          }
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};

export default MainChart;
