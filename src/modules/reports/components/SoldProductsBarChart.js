import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { Grid, Container } from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import './styles.less';
import { findIndex } from 'lodash';

// This is function to convert time value to to its range i.e. '1' will be converted to '02:00 - 02:59'
const timeToTimerange = type => {
  var time = {
    '0': '01:00 - 01:59',
    '1': '02:00 - 02:59',
    '2': '03:00 - 03:59',
    '3': '04:00 - 04:59',
    '4': '05:00 - 05:59',
    '5': '06:00 - 06:59',
    '6': '07:00 - 07:59',
    '7': '08:00 - 08:59',
    '8': '09:00 - 09:59',
    '9': '10:00 - 10:59',
    '10': '11:00 - 11:59',
    '11': '12:00 - 12:59',
    '12': '13:00 - 13:59',
    '13': '14:00 - 14:59',
    '14': '15:00 - 15:59',
    '15': '16:00 - 16:59',
    '16': '17:00 - 17:59',
    '17': '18:00 - 18:59',
    '18': '19:00 - 19:59',
    '19': '20:00 - 20:59',
    '20': '21:00 - 21:59',
    '21': '22:00 - 22:59',
    '22': '23:00 - 23:59',
    '23': '24:00 - 24:59',
  };
  return time[type];
};

const CustomTooltip = ({ active, payload, label, dateRange }) => {
  if (active && payload && payload.length) {
    let dateTo = dateRange.$lte ? dateRange.$lte : new Date();
    let dateFrom = dateRange.$gte
      ? dateRange.$gte
      : new Date(new Date(new Date().setHours(0, 0, 0)).setDate(1));
    let time = payload[0].payload.hour;
    return (
      <div className="custom_tool_tip_for_BarChart">
        <div className="custom_tool_tip_for_BarChart_container">
          {`${moment(dateFrom).format('MMM D')} - ${moment(dateTo).format(
            'MMM D',
          )}; ${timeToTimerange(time)}`}
        </div>
        <div style={{ width: '200px' }}>
          <p style={{ float: 'left' }} className="tool-tip-quantity">
            {payload[0].payload.amount}
          </p>
          <p style={{ float: 'left' }} className="tool-tip-Product">
            products
          </p>
        </div>
      </div>
    );
  }

  return null;
};
export default function SoldProductsBarChart({ data, dateRange }) {
  console.log('this is Api', data);
  let peekHourAmount = Math.max(...data.map(item => item.amount), 0);
  let indexOfResult = data.findIndex(item => item.amount === peekHourAmount);
  let convertedPeekHours = timeToTimerange(indexOfResult);

  return (
    <>
      <Header size="small">Sold products</Header>
      <Divider fitted style={{ marginBottom: '48px' }}></Divider>
      <Grid>
        <Grid.Column>
          <Container
            textAlign="center"
            style={{
              color: '#56CCF2',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            <p>{convertedPeekHours}</p>
          </Container>
          <Container
            textAlign="center"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <p>peak hour</p>
          </Container>
        </Grid.Column>
      </Grid>
      <br></br>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={250}
            data={data}
            margin={{
              top: 5,
              left: -30,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickFormatter={value => {
                let added = parseInt(value) + 1;
                let strigy = added.toString();
                return strigy.padStart(2, '0');
              }}
            />
            <YAxis tickSize={0} type="number" dataKey="amount" />
            <Tooltip
              cursor={{ fill: '#f6f6f6' }}
              content={<CustomTooltip data={data} dateRange={dateRange} />}
            />
            <Bar dataKey="amount" fill="#56CCF2" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
