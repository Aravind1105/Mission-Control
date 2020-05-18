import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';
import CustomTable from 'modules/shared/components/CustomTable';

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

const columns = [
  {
    title: 'Produktname',
    field: 'name',
  },
  {
    title: 'Bestand',
    field: 'stock',
  },
  {
    title: '€ Verkäufe',
    field: 'sales',
    formatter: ({ sales }) => `€${sales}`,
  },
  {
    title: '# Verkauft',
    field: 'sold',
  },
  {
    title: 'Profit',
    field: 'margin',
    formatter: ({ margin }) => `${margin}%`,
  },
];

const ProductStats = ({ data }) => {
  const [timerange, setTimerange] = useState('today');
  const [fridge, setFridge] = useState('all');
  const { t } = useTranslation();

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>{t('products')}</Header.Content>
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
      <CustomTable columns={columns} data={data} />
    </Segment>
  );
};

export default ProductStats;
