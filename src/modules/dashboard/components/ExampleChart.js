import React, { useState } from 'react';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
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
import { SegmentHeader } from 'modules/shared/components';

const data = [
  {
    name: 'Product A',
    lv_1: 4000,
    docomo: 2400,
    amt: 2400,
  },
  {
    name: 'Product B',
    lv_1: 3000,
    docomo: 1398,
    amt: 2210,
  },
  {
    name: 'Product C',
    lv_1: 2000,
    docomo: 9800,
    amt: 2290,
  },
  {
    name: 'Product D',
    lv_1: 2780,
    docomo: 3908,
    amt: 2000,
  },
  {
    name: 'Product E',
    lv_1: 1890,
    docomo: 4800,
    amt: 2181,
  },
  {
    name: 'Product F',
    lv_1: 2390,
    docomo: 3800,
    amt: 2500,
  },
  {
    name: 'Product G',
    lv_1: 3490,
    docomo: 4300,
    amt: 2100,
  },
];

const optionsTime = [
  { key: 1, text: 'Today', value: 'today' },
  { key: 2, text: 'This week', value: 'week' },
  { key: 3, text: 'This month', value: 'last_week' },
];

const optionsFridges = [
  { key: 1, text: 'All Fridges', value: 'all' },
  { key: 2, text: 'Livello 1', value: 'lv_1' },
  { key: 3, text: 'Docomo', value: 'docomo' },
];

const ExampleChart = () => {
  const [timerange, setTimerange] = useState('today');
  const [fridge, setFridge] = useState('all');

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>Sales by Fridges</Header.Content>
        </Header>
        <div>
          <Dropdown
            onChange={(e, { value }) => {
              setFridge(value);
            }}
            options={optionsFridges}
            selection
            value={fridge}
            style={{ minWidth: 115, marginRight: 15 }}
          />
          <Dropdown
            onChange={(e, { value }) => {
              setTimerange(value);
            }}
            options={optionsTime}
            selection
            value={timerange}
            style={{ minWidth: 115 }}
          />
        </div>
      </SegmentHeader>
      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="lv_1" name="Livello 1" stackId="a" fill="#8884d8" />
          <Bar dataKey="docomo" name="Docomo" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};

export default ExampleChart;
