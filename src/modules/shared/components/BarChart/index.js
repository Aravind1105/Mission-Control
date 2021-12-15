import React, { useEffect, useState } from 'react';
import { Header, Divider, Grid, Container } from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  Text,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import * as R from 'ramda';
import './styles.less';

const graphTypes = ['daily', 'weekly'];
const graphTypesTitle = ['Daily', 'Weekly'];

const CustomBarChart = ({
  data,
  dateRange,
  yAxisLegend,
  xAxisLegend,
  defaultGraphType,
  barColor,
  widgetTextColor,
  toolTipTextColor,
  widgetLegend,
  xAxisDataKey,
  yAxisDataKey,
}) => {
  const [selectedGraphType, setSelectedGraphType] = useState(defaultGraphType);
  const [selectedData, setSelectedData] = useState(data[defaultGraphType]);
  const [convertedPeekHours, setConvertedPeakHours] = useState(null);

  useEffect(() => {
    const highestAmount = Math.max(...selectedData.map(item => item.amount));
    const peakTimeIndex = R.findIndex(R.propEq('amount', highestAmount))(
      selectedData,
    );
    if (selectedData.length > 0) {
      if (selectedGraphType === graphTypes[0]) {
        setConvertedPeakHours(
          timeToTimeRange(selectedData[peakTimeIndex][xAxisDataKey]),
        );
      } else {
        setConvertedPeakHours(
          dayToDayName(selectedData[peakTimeIndex][xAxisDataKey])[0],
        );
      }
    }
  }, [selectedData]);

  useEffect(() => {
    setSelectedData(data[selectedGraphType]);
  }, [selectedGraphType]);

  const renderLegend = () => (
    <div className="custom-legend-barchart">
      {xAxisLegend[selectedGraphType]}
    </div>
  );

  const CustomizedLabelForMsg = ({ kapi, metric, viewBox }) => (
    <Text
      x={0}
      y={0}
      dx={-130}
      dy={10}
      textAnchor="middle"
      fontSize={'14px'}
      transform="rotate(-90)"
      fill={'#7B7B7B'}
    >
      {yAxisLegend[selectedGraphType]}
    </Text>
  );

  const CustomTooltip = ({ active, payload, label, dateRange }) => {
    if (active && payload && payload.length) {
      let dateTo = dateRange.$lte ? dateRange.$lte : new Date();
      let dateFrom = dateRange.$gte
        ? dateRange.$gte
        : new Date(new Date(new Date().setHours(0, 0, 0)).setDate(1));
      let time = payload[0].payload[xAxisDataKey];

      return (
        <div className="custom_tool_tip_for_BarChart">
          <div className="custom_tool_tip_for_BarChart_container">
            {`${moment(dateFrom).format('MMM D')} - ${moment(dateTo).format(
              'MMM D',
            )}; ${
              selectedGraphType === graphTypes[0]
                ? timeToTimeRange(time)
                : dayToDayName(time)[0]
            }`}
          </div>
          <div style={{ width: '200px' }}>
            <p style={{ float: 'left' }} className="tool-tip-qty-refills-bar">
              {payload[0].payload.amount}
            </p>
            <p
              style={{ float: 'left' }}
              className="tool-tip-products-refills-bar"
            >
              products
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Header size="small">Refills</Header>
      <Divider fitted style={{ marginBottom: '48px' }}></Divider>
      {graphTypes.length > 1 && (
        <div className="graph-type-switch-container">
          <div
            className={
              selectedGraphType === graphTypes[0]
                ? 'switch switch-selected'
                : 'switch'
            }
            onClick={() => {
              setSelectedGraphType(graphTypes[0]);
            }}
          >
            {graphTypesTitle[0]}
          </div>
          <div
            className={
              selectedGraphType === graphTypes[1]
                ? 'switch switch-selected'
                : 'switch'
            }
            onClick={() => setSelectedGraphType(graphTypes[1])}
          >
            {graphTypesTitle[1]}
          </div>
        </div>
      )}
      <Grid>
        <Grid.Column width="16">
          <div
            className="bar-chart-widget-value"
            style={{
              color: widgetTextColor,
            }}
          >
            <p>{convertedPeekHours}</p>
          </div>
          <Container
            textAlign="center"
            className="bar-chart-widget-legend-container"
          >
            <p>{widgetLegend[selectedGraphType]}</p>
          </Container>
        </Grid.Column>
      </Grid>
      <br></br>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={250}
            data={selectedData}
            margin={{
              top: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisDataKey}
              tickFormatter={value => {
                if (selectedData.length === 0) {
                  return;
                } else if (selectedGraphType === graphTypes[0]) {
                  let added = parseInt(value) + 1;
                  return added.toString().padStart(2, '0');
                }
                return dayToDayName(value) && dayToDayName(value)[1];
              }}
            />
            <YAxis axisLine={false} label={<CustomizedLabelForMsg />} />

            <YAxis
              tickSize={0}
              type="number"
              dataKey={yAxisDataKey}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: toolTipTextColor }}
              content={
                <CustomTooltip data={selectedData} dateRange={dateRange} />
              }
            />
            <Legend content={renderLegend} />
            <Bar dataKey="amount" fill={barColor} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CustomBarChart;

// This is function to convert time value to to its range i.e. '1' will be converted to '02:00 - 02:59'
const timeToTimeRange = type =>
  ({
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
  }[type]);

const dayToDayName = type =>
  ({
    '1': ['Mondays', 'Mon'],
    '2': ['Tuesdays', 'Tue'],
    '3': ['Wednesdays', 'Wed'],
    '4': ['Thursdays', 'Thu'],
    '5': ['Fridays', 'Fri'],
    '6': ['Saturdays', 'Sat'],
    '7': ['Sundays', 'Sun'],
  }[type]);
