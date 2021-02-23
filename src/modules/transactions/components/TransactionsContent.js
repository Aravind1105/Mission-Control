import React from 'react';
import { Segment } from 'semantic-ui-react';

import TransactionsTable from './TransactionsTable/Sales';

const columns = [
  {
    title: 'Date / Time',
    field: 'created',
  },
  // {
  //   title: 'Status',
  //   field: 'status',
  // },
  {
    title: 'Kiosk',
    field: 'kioskName',
  },
  {
    title: 'Transaction ID',
    field: 'transactionID',
  },
  {
    title: 'Member Card ID',
    field: 'membercardId',
  },
  // {
  //   title: 'Terminal ID',
  //   field: 'terminalID',
  // },
  {
    title: 'Article Number',
    field: 'articleNumber',
  },
  {
    title: 'Product',
    field: 'productName',
  },
  // {
  //   title: 'Net',
  //   field: 'price',
  //   formatter: ({ price }) => `${(+price).toFixed(2) || 0} €`,
  // },
  // {
  //   title: 'Tax',
  //   field: 'tax',
  //   formatter: ({ tax }) => `${tax || 0}%`,
  // },
  {
    title: 'Quantity',
    field: 'quantity',
  },
  {
    title: 'Price',
    field: 'price',
    formatter: ({ price }) => {
      if (price === 0) {
        return '';
      }
      return `€ ${price}`;
    },
  },
  {
    title: 'Total Price',
    field: 'total',
    formatter: ({ total }) => `€ ${total}`,
  },
  // {
  //   title: 'Type',
  //   field: 'type',
  // },
];

const TransactionsContent = ({
  isLoading,
  transactions,
  getData,
  setSortByInCaller,
}) => {
  // const clickRow = ({ _id }) => {
  //   history.push(`/kiosks/detail/${_id}`);
  // };

  return (
    <Segment>
      <TransactionsTable
        sortByColumn="created"
        excludeSortBy={[
          'transactionID',
          'membercardId',
          'articleNumber',
          'productName',
          'articleNumber',
          'quantity',
          'price',
        ]}
        columns={columns}
        data={transactions}
        getData={getData}
        sortable
        selectable
        striped
        isLoading={isLoading}
        setSortByInCaller={sort => setSortByInCaller(sort)}
        sortDirection="DESC"
      />
    </Segment>
  );
};

export default TransactionsContent;
