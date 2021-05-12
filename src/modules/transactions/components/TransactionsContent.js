import React from 'react';
import TransactionsTable from './TransactionsTable/Sales';

const columns = [
  {
    title: 'Date / Time',
    field: 'created',
    formatter: ({ created }) => {
      if (created === '') {
        return '';
      } else
        return (
          <div style={{ textAlign: 'left', width: '120px' }}> {created} </div>
        );
    },
  },
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
      return <div style={{ textAlign: 'left' }}>{transactionID}</div>;
    },
  },
  {
    title: 'Member Card ID',
    field: 'membercardId',
  },
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
  {
    title: 'Quantity',
    field: 'quantity',
    formatter: ({ quantity }) => {
      if (quantity === 0) {
        return '';
      } else return <div style={{ textAlign: 'center' }}> {quantity} </div>;
    },
  },
  {
    title: 'Price',
    field: 'price',
    formatter: ({ price }) => {
      if (price === 0) {
        return '';
      } else
        return <div style={{ textAlign: 'right' }}> {price.toFixed(2)}€ </div>;
    },
  },
  {
    title: 'Total Price',
    field: 'total',
    formatter: ({ total }) => {
      if (total === 0) {
        return '';
      } else
        return <div style={{ textAlign: 'right' }}> {total.toFixed(2)}€ </div>;
    },
  },
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
  );
};

export default TransactionsContent;
