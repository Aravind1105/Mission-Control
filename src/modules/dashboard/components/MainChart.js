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

import colorGenerator from 'lib/colorGenerator';
import { colorsArr } from 'lib/colors';
import CustomizedAxisTick from './CustomizedAxisTick';

const optionsTime = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

const MainChart = ({ data, products, kiosksOptions, getSalesStatistic }) => {
  const [kioskId, setKiosk] = useState('');
  const [time, setTime] = useState(optionsTime[2].value);

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
              defaultValue={optionsTime[2]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ left: 10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={({ name }) => {
              // TODO: remove next lines after backend will return name of kiosk
              if (kioskId) return name.slice(0, 10);
              const item = kiosksOptions.find(el => el.value === name);
              return item ? item.label.slice(0, 10) : 'unknown';
            }}
            height={100}
            interval={0}
            tickSize={10}
            tick={<CustomizedAxisTick />}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {products.map((productName, i) => (
            <Bar
              key={productName}
              dataKey={productName}
              name={productName}
              stackId="a"
              fill={colorsArr[i] || colorGenerator()}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};

export default MainChart;
