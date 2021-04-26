import React from 'react';
import { Segment } from 'semantic-ui-react';

import TransactionsTable from './TransactionsTable/Sales';

const screenWidth = window.innerWidth;
const columns = [
  {
    title: 'Date / Time',
    field: 'created',
    formatter: ({ created }) => {
      if (created === '') {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {created} </div>;
      }
      return <div style={{ textAlign: 'center' }}> {created} </div>;
    },
  },
  // {
  //   title: 'Status',
  //   field: 'status',
  // },
  {
    title: 'Kiosk',
    field: 'kioskName',
    formatter: ({ kioskName }) => {
      if (kioskName === '') {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {kioskName} </div>;
    },
  },
  {
    title: 'Transaction ID',
    field: 'transactionID',
    formatter: ({ transactionID }) => {
      if (transactionID === '') {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {transactionID} </div>;
    },
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
    formatter: ({ productName }) => {
      if (productName === '') {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {productName} </div>;
    },
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
    formatter: ({ quantity }) => {
      if (quantity === 0) {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {quantity} </div>;
      }
      return <div style={{ textAlign: 'center' }}> {quantity} </div>;
    },
  },
  {
    title: 'Price',
    field: 'price',
    formatter: ({ price }) => {
      if (price === 0) {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {price.toFixed(2)}€ </div>;
      }
      return <div style={{ textAlign: 'right' }}> {price.toFixed(2)}€ </div>;
    },
  },
  {
    title: 'Total Price',
    field: 'total',
    formatter: ({ total }) => {
      if (total === 0) {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {total.toFixed(2)}€ </div>;
      }
      return <div style={{ textAlign: 'right' }}> {total.toFixed(2)}€ </div>;
    },
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
          'productName',
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
