import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { Header, Divider } from 'semantic-ui-react';

const margin = {
  top: 10,
  right: 20,
  left: -20,
  bottom: 10,
};

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// };

const LinearChart = ({ data }) => {
  let LenendArray = [];
  if (typeof data[0] !== 'undefined') {
    for (const [key, value] of Object.entries(data[0])) {
      if (key == 'Sensor1' && value !== null) {
        const item = {
          id: 'Sensor1',
          value: 'Sensor 1',
          type: 'square',
          color: '#219653',
        };
        LenendArray.push(item);
      } else if (key == 'Sensor2' && value !== null) {
        const item = {
          id: 'Sensor2',
          value: 'Sensor 2',
          type: 'square',
          color: '#7DB040',
        };
        LenendArray.push(item);
      } else if (key == 'Sensor3' && value !== null) {
        const item = {
          id: 'Sensor3',
          value: 'Sensor 3',
          type: 'square',
          color: '#2F80ED',
        };

        LenendArray.push(item);
      } else if (key == 'Sensor4' && value !== null) {
        const item = {
          id: 'Sensor4',
          value: 'Sensor 4',
          type: 'square',
          color: '#56CCF2',
        };
        LenendArray.push(item);
      }
    }
  }

  return (
    <>
      <Header size="small">Last 30 days</Header>
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
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis
              tickFormatter={value =>
                new Intl.NumberFormat().format(value) + '°C'
              }
            />
            <Tooltip />

            <Legend
              payload={LenendArray.map(item => ({
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
            />
            <Line
              type="monotone"
              dataKey="Sensor2"
              stroke="#7DB040"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Sensor3"
              stroke="#2F80ED"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Sensor4"
              stroke="#56CCF2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LinearChart;
