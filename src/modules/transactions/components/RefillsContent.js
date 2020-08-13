import React from 'react';
import { Segment } from 'semantic-ui-react';

import RefillsTable from './TransactionsTable/Refills';

const columns = [
  {
    title: 'Date / Time',
    field: 'date',
  },
  // {
  //   title: 'Time',
  //   field: 'time',
  // },
  // {
  //   title: 'Status',
  //   field: 'status',
  // },
  {
    title: 'Kiosk',
    field: 'kioskName',
  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    title: 'Product',
    field: 'productName',
  },
  {
    title: 'Quantity',
    field: 'count',
  },
  {
    title: 'Load Cell',
    field: 'loadCell',
  },
  {
    title: 'Weight in g',
    field: 'weight',
  },
  {
    title: 'Price',
    field: 'price',
    className: 'purchase-price-header',
    formatter: ({ price }) => (price !== '' ? `€ ${price || 0}` : ''),
  },
  {
    title: 'Total Price',
    field: 'total',
    formatter: ({ total }) => `€ ${total || 0}`,
  },
];

const RefillsContent = ({ isLoading, refills, getData }) => {
  // const clickRow = ({ _id }) => {
  //   history.push(`/kiosks/detail/${_id}`);
  // };

  return (
    <Segment>
      <RefillsTable
        sortByColumn="created"
        columns={columns}
        data={refills}
        getData={getData}
        sortable
        selectable
        striped
        isLoading={isLoading}
        // excludeSortBy={['total', 'price']}
      />
    </Segment>
  );
};

export default RefillsContent;
