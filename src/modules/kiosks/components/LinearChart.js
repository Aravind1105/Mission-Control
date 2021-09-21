import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Header, Divider } from 'semantic-ui-react';
import './styles.less';
import moment from 'moment';

const margin = {
  top: 10,
  right: 20,
  left: -20,
  bottom: 10,
};

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={10} dy={4} textAnchor="middle" fill="#333">
      {payload.value}
    </text>
  </g>
);
const CustomTooltip = ({ active, payload, label, LegendArray }) => {
  if (active && payload && payload.length) {
    const SensorValues = [];
    Object.keys(payload[0].payload).map(function(key, index) {
      if (payload[0].payload[key] !== null) {
        SensorValues.push(payload[0].payload[key]);
      }
    });
    const listSensors = LegendArray.map(item => (
      <li style={{ color: `${item.color}` }}>{item.value}: </li>
    ));
    const listValue = SensorValues.slice(2).map(item => (
      <li>{Number(item).toFixed(1)} °C</li>
    ));
    let date = moment(payload[0].payload.time).format('MMM D yyyy, HH:mm ');
    return (
      <div className="custom_tool_tip">
        <div className="custom_tool_tip_container">{`${date}`}</div>
        <div className="custom_tool_tip_container_parent">
          <div className="custom_tool_tip_container_narrow">
            <ul
              style={{
                'list-style-type': 'none',
                padding: 0,
                margin: '10px 0 10px 14px',
                width: '100px',
                textAlign: 'left',
              }}
            >
              {listSensors}
            </ul>
          </div>
          <div className="custom_tool_tip_container_wide">
            <ul
              style={{
                'list-style-type': 'none',
                margin: '10px 15px 0px 0px',
                padding: 0,
                textAlign: 'left',
              }}
            >
              {listValue}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const LinearChart = ({ data }) => {
  let LegendArray = [];
  if (typeof data[0] !== 'undefined') {
    for (const [key, value] of Object.entries(data[0])) {
      if (key == 'Sensor1' && value !== null) {
        const item = {
          id: 'Sensor1',
          value: 'Sensor 1',
          type: 'square',
          color: '#219653',
        };
        LegendArray.push(item);
      } else if (key == 'Sensor2' && value !== null) {
        const item = {
          id: 'Sensor2',
          value: 'Sensor 2',
          type: 'square',
          color: '#7DB040',
        };
        LegendArray.push(item);
      } else if (key == 'Sensor3' && value !== null) {
        const item = {
          id: 'Sensor3',
          value: 'Sensor 3',
          type: 'square',
          color: '#2F80ED',
        };

        LegendArray.push(item);
      } else if (key == 'Sensor4' && value !== null) {
        const item = {
          id: 'Sensor4',
          value: 'Sensor 4',
          type: 'square',
          color: '#56CCF2',
        };
        LegendArray.push(item);
      }
    }
  }

  return (
    <>
      <Header size="small">Last 7 days</Header>
      <Divider fitted style={{ marginBottom: '48px' }}></Divider>
      <div style={{ height: 474 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="5 5" />
            <XAxis
              height={60}
              tickSize={10}
              dataKey="timeXaxis"
              minTickGap={95}
              reversed
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              tickCount={7}
              tickSize={10}
              tickFormatter={value =>
                new Number(Intl.NumberFormat().format(value)).toFixed() + '°C'
              }
              padding={{ top: 1 }}
              type="number"
              domain={[
                dataMin => 0 - Math.abs(dataMin),
                dataMax => dataMax * 2,
              ]}
            />
            <Tooltip content={<CustomTooltip LegendArray={LegendArray} />} />

            <Legend
              payload={LegendArray.map(item => ({
                id: item.id,
                type: 'square',
                value: item.value,
                color: item.color,
              }))}
            />
            <Line
              type="monotone"
              dataKey="Sensor1"
              stroke="#219653"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Sensor2"
              stroke="#7DB040"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Sensor3"
              stroke="#2F80ED"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Sensor4"
              stroke="#56CCF2"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LinearChart;
