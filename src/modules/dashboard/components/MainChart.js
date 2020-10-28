import React, { useState, useEffect } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import Select from 'react-select';
import { connect } from 'react-redux';
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
import { getSalesStatisticState } from '../selectors';

const optionsTime = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Minutely', value: 'minutely' },
  { label: 'Last 24 Hours', value: 'last24Hours' },
  { label: 'Weekly', value: 'weekDays' },
  { label: 'Last 7 Days', value: 'last7Days' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Last 30 Days', value: 'last30Days' },
];

const computeAndFormatData = data => {
  return data;
};

const MainChart = ({ products, kiosksOptions, salesStats }) => {
  const [kioskId, setKiosk] = useState('');
  const [time, setTime] = useState(optionsTime[0].value);
  const [data, setData] = useState(salesStats[time]);

  useEffect(() => {
    setData(computeAndFormatData(salesStats[time]));
  }, [kioskId, time]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            <Header as="h4" color="black">
              <Header.Content>Sales by Fridges</Header.Content>
            </Header>
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
              defaultValue={optionsTime[0]}
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
          {/*{!kioskId && products.map((productName, i) => {
            const name = kiosksOptions.find(el => el.value === productName);
            return (
              <Bar
                key={productName}
                dataKey={productName}
                name={name && name.label}
                stackId="a"
                fill={colorsArr[i % (colorsArr.length - 1)]}
                className="chartTest"
              />
            );
          })}*/}
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

const mapStateToProps = state => ({
  salesStats: getSalesStatisticState(state),
});

export default connect(mapStateToProps)(MainChart);
