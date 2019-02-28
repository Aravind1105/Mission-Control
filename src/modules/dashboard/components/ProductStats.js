import React, { useState } from 'react';
import { Dropdown, Header, Segment, Table } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';
import ProductItemStats from '../ProductStatsItem';

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

const ProductStats = ({ data }) => {
  const [timerange, setTimerange] = useState('today');
  const [fridge, setFridge] = useState('all');

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>Products</Header.Content>
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
      <Table stackable size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Current inventory</Table.HeaderCell>
            <Table.HeaderCell>€ Sales</Table.HeaderCell>
            <Table.HeaderCell># Sold</Table.HeaderCell>
            <Table.HeaderCell>Margin</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(props => (
            <ProductItemStats {...props} key={props.id} />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default ProductStats;
