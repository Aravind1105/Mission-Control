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
  if (active && payload && payload.length) {
    let netSales = payload[0] && payload[0].payload.total_sales.toFixed(2);
    let netCost = payload[0] && payload[0].payload.total_cost.toFixed(2);
    let date = payload[0] && payload[0].payload._id;
    let profit = payload[0] && payload[0].payload.profit.toFixed(2);
    let isProfitPositve = profit > 0 ? true : false;
    return (
      <div className="custom_tool_tip">
        <div className="custom_tool_tip_container">{`${moment(date).format(
          'ddd, MMM D YYYY, h:mm',
        )}`}</div>
        <div className="custom_tool_tip_container_parent">
          <div className="custom_tool_tip_container_narrow">
            <ul
              style={{
                'list-style-type': 'none',
                padding: 0,
                margin: '10px 0px 0px 14px',
                width: '60px',
                lineHeight: 1.6,
              }}
            >
              <li style={{ color: '#228DCA' }}>Net Sale:</li>
              <li style={{ color: '#BB6BD9' }}>Net Cost:</li>
              <li
                style={{
                  color: '#7b7b7b',
                  fontSize: '16px',
                }}
              >
                Profit:
              </li>
            </ul>
          </div>
          <div className="custom_tool_tip_container_wide">
            <ul
              style={{
                'list-style-type': 'none',
                padding: 0,
                margin: '10px 25px 0px 20px',
                width: '95px',
                textAlign: 'right',
                lineHeight: 1.6,
              }}
            >
              <li>{`${netSales} €`}</li>
              <li>{`${netCost} €`}</li>
              {isProfitPositve ? (
                <li
                  style={{
                    // this color for Positive
                    color: '#27AE60',
                    fontSize: '16px',
                  }}
                  // with Positive signs at the Begining
                >{`+${profit} €`}</li>
              ) : (
                <li
                  style={{
                    color: '#EB5757',
                    fontSize: '16px',
                  }}
                  //  Negative signs at the Begining
                >{`${profit} €`}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const CustomizedAxisTick = ({ x, y, payload }) => {
  let xAxisValue = moment(payload.value).format('MMM D');
  let finalValue;
  if (xAxisValue === 'Invalid date') {
    finalValue = 'No Data';
  } else {
    finalValue = xAxisValue;
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={10} dy={4} textAnchor="middle" fill="#333">
        {finalValue}
      </text>
    </g>
  );
};

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
          color: '#228DCA',
        };
        LegendArray.push(item);
      } else if (key == 'total_cost' && value !== null) {
        const item = {
          id: 'total_cost',
          value: 'Net Cost',
          type: 'square',
          color: '#BB6BD9',
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
              // this is Red Color
              <linearGradient id="colorTC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eb5e73" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#eb5e73" stopOpacity={0} />
              </linearGradient>
              // this is Red Color
              <linearGradient id="colorTS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              height={60}
              tickSize={10}
              padding={{ left: 0, right: 0 }}
              dataKey="_id"
              reversed
              domain={['No Data']}
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              tickCount={7}
              tickSize={0}
              type="number"
              tickFormatter={value =>
                value ? parseInt(value).toFixed(0) + ' €' : ' '
              }
              axisLine={false}
              domain={['no Data']}
            />
            // Blue Color for Sale
            <Area
              type="monotone"
              dataKey="total_sales"
              stackId="1"
              stroke="#228DCA"
              strokeWidth={1}
              fill="#228DCA"
              fillOpacity={1}
              fill="url(#colorTS)"
            />
            // Red Color for Cost
            <Area
              type="monotone"
              dataKey="total_cost"
              stackId="2"
              stroke="#BB6BD9"
              strokeWidth={1}
              fill="#BB6BD9"
              fillOpacity={1}
              fill="url(#colorTC)"
            />
            {data && LegendArray && (
              <Tooltip content={<CustomTooltip data={LegendArray} />} />
            )}
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
