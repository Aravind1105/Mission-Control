import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Header, Divider } from 'semantic-ui-react';

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  var per = (percent * 100).toFixed(2);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={'middle'}
      dominantBaseline="central"
    >
      {per} %
    </text>
  );
};

export default function UsedPaymentMethodsPiChart({ paymentMethodsStatsdata }) {
  // Modifying Data For Legent Array to be used for Pie Chart
  let LegendArray = [];
  if (typeof paymentMethodsStatsdata[0] !== 'undefined') {
    for (var i = 0; i < paymentMethodsStatsdata.length; i++) {
      if (
        paymentMethodsStatsdata[i]._id == 'Membercard' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'member_card',
          value: 'Member Card',
          type: 'square',
          color: '#2F80ED',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'App' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'app',
          value: 'App (non-terminal)',
          type: 'square',
          color: '#9B51E0',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'V PAY' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'v_pay',
          value: 'V Pay',
          type: 'square',
          color: '#6F92BD',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'Visa' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'visa',
          value: 'Visa',
          type: 'square',
          color: '#56CCF2',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'girocard' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'girocard',
          value: 'Giro Card',
          type: 'square',
          color: '#0A5C84',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'Mastercard' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'master_card',
          value: 'Master Card',
          type: 'square',
          color: '#BFE6FF',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'Dallmayr-payment' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'dallmayr_payment',
          value: 'Dallmayr Payment',
          type: 'square',
          color: '#219653',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else if (
        paymentMethodsStatsdata[i]._id == 'VISA electron' &&
        paymentMethodsStatsdata[i].cnt !== null
      ) {
        const item = {
          id: 'VISA_electron',
          value: 'VISA electron',
          type: 'square',
          color: '#09D3D3',
          cntValue: paymentMethodsStatsdata[i].cnt,
        };
        LegendArray.push(item);
      } else {
        return;
      }
    }
  }
  //End

  return (
    <>
      <Header size="small">Used Payment Methods</Header>
      <Divider
        fitted
        style={{
          marginBottom: '17px',
        }}
      ></Divider>
      <div
        style={{
          height: 370,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              data={LegendArray}
              cx="50%"
              cy="48%"
              innerRadius={80}
              outerRadius={145}
              labelLine={false}
              minAngle={20}
              label={renderCustomizedLabel}
              dataKey="cntValue"
            >
              {LegendArray.map(item => (
                <Cell key={`cell-${item.id}`} fill={item.color} />
              ))}
            </Pie>
            <Legend
              payload={LegendArray.map(item => ({
                id: item.id,
                type: 'square',
                value: item.value,
                color: item.color,
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
