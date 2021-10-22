import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import moment from 'moment';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './styles.less';

const CustomTooltip = ({ active, payload }) => {
  let date = payload[0] && payload[0].payload._id;
  let netSales = payload[0] && payload[0].payload.total_sales.toFixed(2);
  let netCost = payload[0] && payload[0].payload.total_cost.toFixed(2);
  let profit = payload[0] && payload[0].payload.profit.toFixed(2);
  if (active && payload && payload.length) {
    return (
      <div className="custom_tool_tip">
        <div className="custom_tool_tip_container">{`${date}`}</div>
        <div className="custom_tool_tip_container_parent">
          <div className="custom_tool_tip_container_narrow">
            <ul
              style={{
                'list-style-type': 'none',
                padding: 0,
                margin: '10px 0px 0px 10px',
                width: '60px',
                textAlign: 'left',
              }}
            >
              <li>Net Sales</li>
              <li>Net Cost</li>
              <li>Profit</li>
            </ul>
          </div>
          <div className="custom_tool_tip_container_wide">
            <ul
              style={{
                'list-style-type': 'none',
                padding: 0,
                margin: '10px 0px 0px 10px',
                width: '60px',
                textAlign: 'left',
              }}
            >
              <li style={{ color: '#2F80ED' }}>{`${netSales}`}</li>
              <li style={{ color: '#EB5757' }}>{`${netCost}`}</li>
              <li style={{ color: '#7b7b7b' }}>{`${profit}`}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={10} dy={4} textAnchor="middle" fill="#333">
      {moment(payload.value).format('MMM D')}
    </text>
  </g>
);

export default function AreaChartComponent({ data }) {
  // Modifying Data For Legent Element
  let LegendArray = [];
  if (typeof data[0] !== 'undefined') {
    for (const [key, value] of Object.entries(data[0])) {
      if (key == 'total_sales' && value !== null) {
        const item = {
          id: 'total_sales',
          value: 'Net Sales',
          type: 'square',
          color: '#2F80ED',
        };
        LegendArray.push(item);
      } else if (key == 'total_cost' && value !== null) {
        const item = {
          id: 'total_cost',
          value: 'Net Cost',
          type: 'square',
          color: '#EB5757',
        };
        LegendArray.push(item);
      }
    }
  }
  //End

  return (
    <>
      <Header size="small">Net Sales / Profit / Net Cost</Header>
      <Divider fitted style={{ marginBottom: '48px' }}></Divider>
      <div style={{ height: 474 }}>
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eb5e73" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#eb5e73" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              height={60}
              tickSize={10}
              padding={{ left: 10, right: 30 }}
              dataKey="_id"
              reversed
              domain={['No Data']}
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              tickCount={6}
              tickSize={0}
              tickFormatter={value => value.toFixed(0) + ' €'}
              type="number"
              interval="preserveEnd"
              axisLine={false}
              domain={[0, 'dataMax']}
            />
            <Area
              type="monotone"
              dataKey="total_sales"
              stackId="1"
              stroke="#2F80ED"
              strokeWidth={2}
              fill="#2F80ED"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            // this is for Net Cost
            <Area
              type="monotone"
              dataKey="total_cost"
              stackId="1"
              stroke="#EB5757"
              strokeWidth={2}
              fill="#EB5757"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <Tooltip content={<CustomTooltip LegendArray={LegendArray} />} />
            <Legend
              payload={LegendArray.reverse().map(item => ({
                id: item.id,
                type: 'square',
                value: item.value,
                color: item.color,
              }))}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
