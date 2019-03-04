import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';
import { UniTable } from 'modules/shared/components/unitable';

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

// table configuration start

const tableConfig = {
  headless: false,
  enumerated: true,
  striped: true,
  selectable: true,
  sortation: 'name',
  sorting: 'ascending',
  clickArg: ['id', 'name'],
};

const tableColumns = [
  {
    name: 'id',
    label: '',
    unit: '',
    width: 0,
    align: '',
  },
  {
    name: 'name',
    label: 'Produktname',
    unit: '',
    width: 40,
    align: 'left',
  },
  {
    name: 'stock',
    label: 'Bestand',
    unit: 'Stk.',
    width: 20,
    align: 'center',
  },
  {
    name: 'sales',
    label: 'Verkäufe',
    unit: '€',
    width: 20,
    align: 'center',
  },
  {
    name: 'sold',
    label: 'Verkauft',
    unit: 'Stk.',
    width: 20,
    align: 'center',
  },
  {
    name: 'margin',
    label: 'Profit',
    unit: '%',
    width: 20,
    align: 'center',
  },
];

const filters = [];

const infos = [
  {
    column: 'stock',
    value: 150,
    comparsion: 'lower',
    type: 'error',
    icon: 'attention',
  },
  {
    column: 'sales',
    value: 7000,
    comparsion: 'greater',
    type: 'positive',
    icon: 'star',
  },
  {
    column: 'margin',
    value: 35,
    comparsion: 'lower',
    type: 'warning',
    icon: 'question circle',
  },
];

// table configuration end

const ProductStats = ({ data }) => {
  const [timerange, setTimerange] = useState('today');
  const [fridge, setFridge] = useState('all');
  const { t, i18n } = useTranslation();

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>{t('core.welcome')}</Header.Content>
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
      <UniTable
        tableConfig={tableConfig}
        tableColumns={tableColumns}
        tableData={data}
        filters={filters}
        infos={infos}
        onClickRow={(...args) => console.log('click on row: ', ...args)}
      />
      {/* <Table stackable size="small">
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
      </Table> */}
    </Segment>
  );
};

export default ProductStats;
