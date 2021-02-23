import React from 'react';
import { Segment } from 'semantic-ui-react';

import RefillsTable from './TransactionsTable/Refills';

const columns = [
  {
    title: 'Date / Time',
    field: 'created',
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
    title: 'Article Number',
    field: 'articleNumber',
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
    title: 'Cable ID',
    field: 'loadCell',
  },
  {
    title: 'Weight in g',
    field: 'weight',
  },
  {
    title: 'Cost',
    field: 'cost',
    className: 'purchase-price-header',
    formatter: ({ cost }) => (cost !== '' ? `€ ${cost || 0}` : ''),
  },
  {
    title: 'Total Cost',
    field: 'total',
    formatter: ({ total }) => `€ ${total || 0}`,
  },
];

const RefillsContent = ({ isLoading, refills, getData, setSortByInCaller }) => {
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
        excludeSortBy={[
          'status',
          'productName',
          'articleNumber',
          'count',
          'loadCell',
          'weight',
          'price',
          'total',
        ]}
        setSortByInCaller={sort => setSortByInCaller(sort)}
        sortDirection="DESC"
      />
    </Segment>
  );
};

export default RefillsContent;
