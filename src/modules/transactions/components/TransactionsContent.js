import React from 'react';
import { Segment } from 'semantic-ui-react';

import CustomTable from 'modules/shared/components/CustomTable';

const columns = [
  {
    title: 'Date/Time',
    field: 'date',
  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    title: 'Kiosk',
    field: 'kioskName',
  },
  {
    title: 'Transaction ID',
    field: 'transactionID',
  },
  {
    title: 'Terminal ID',
    field: 'terminalID',
  },
  {
    title: 'Product Name',
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
    title: 'Total Price',
    field: 'total',
    formatter: ({ total }) => `${total} €`,
  },
  {
    title: 'Type',
    field: 'type',
  },
];

const TransactionsContent = ({ isLoading, transactions, getData }) => {
  // const clickRow = ({ _id }) => {
  //   history.push(`/kiosks/detail/${_id}`);
  // };

  return (
    <Segment>
      <CustomTable
        sortByColumn="created"
        columns={columns}
        data={transactions}
        getData={getData}
        sortable
        selectable
        striped
        isLoading={isLoading}
      />
    </Segment>
  );
};

export default TransactionsContent;
