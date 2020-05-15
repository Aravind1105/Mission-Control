import React, { useState } from 'react';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';
import CustomTable from 'modules/shared/components/CustomTable';

const options = [
  { key: 1, text: 'Today', value: 'today' },
  { key: 2, text: 'This week', value: 'week' },
  { key: 3, text: 'This month', value: 'last_week' },
];

const columns = [
  {
    title: 'Sellers',
    field: 'item',
  },
  {
    title: 'Price',
    field: 'sales',
    formatter: ({ sales }) => `€${sales}`,
  },
];

const Ranking = ({ title, data }) => {
  const [timerange, setTimerange] = useState('today');

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>{title}</Header.Content>
        </Header>

        <Dropdown
          onChange={(e, { value }) => {
            setTimerange(value);
          }}
          options={options}
          placeholder="Choose an option"
          selection
          value={timerange}
          style={{ minWidth: 115 }}
        />
      </SegmentHeader>
      <CustomTable
        columns={columns}
        data={data}
        headless
        sortDirection="DESC"
        sortByColumn="sales"
      />
    </Segment>
  );
};

export default Ranking;
