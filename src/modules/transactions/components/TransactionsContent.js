import React from 'react';
import TransactionsTable from './TransactionsTable/Sales';

const columns = [
  {
    title: 'Date / Time',
    field: 'created',
    formatter: ({ created }) => {
      if (!created) {
        return '';
      }
      return (
        <div style={{ textAlign: 'left', width: '120px' }}> {created} </div>
      );
    },
  },
  {
    title: 'Kiosk',
    field: 'kioskName',
    formatter: ({ kioskName }) => {
      if (!kioskName) {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {kioskName} </div>;
    },
  },
  {
    title: 'Payment Type',
    field: 'paymentMethod',
    formatter: ({ paymentMethod }) => {
      if (paymentMethod) {
        if (paymentMethod.membercardId)
          return <div style={{ textAlign: 'center' }}>Member Card</div>;
        else if (paymentMethod.stripeCustomerId)
          return <div style={{ textAlign: 'center' }}>Consumer App</div>;
        else if (paymentMethod.cardType)
          return (
            <div style={{ textAlign: 'center' }}>{paymentMethod.cardType}</div>
          );
        else return <div style={{ textAlign: 'center' }}>Payment Terminal</div>;
      }
    },
  },
  {
    title: 'Payment Status',
    field: 'paymentMethod',
    formatter: ({ paymentMethod }) => {
      if (paymentMethod) {
        if (!paymentMethod.isPaid && paymentMethod.stripePaymentIntentId) {
          return (
            <div style={{ textAlign: 'center' }}>
              <a
                href={`https://dashboard.stripe.com/payments/${paymentMethod.stripePaymentIntentId}`}
                target="_blank"
              >
                Pending
              </a>
            </div>
          );
        } else if (
          !paymentMethod.isPaid &&
          !paymentMethod.stripePaymentIntentId
        )
          return <div style={{ textAlign: 'center' }}>Not Paid</div>;
        else if (paymentMethod.isPaid)
          return <div style={{ textAlign: 'center' }}>Paid</div>;
      }
    },
  },
  {
    title: 'Member Card ID',
    field: 'paymentMethod',
    formatter: ({ paymentMethod }) => {
      if (paymentMethod?.membercardId) {
        return (
          <div style={{ textAlign: 'center' }}>
            {paymentMethod.membercardId}
          </div>
        );
      }
    },
  },
  {
    title: 'Article Number',
    field: 'articleNumber',
  },
  {
    title: 'Product',
    field: 'productName',
    formatter: ({ productName }) => {
      if (!productName) {
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
      }
      return <div style={{ textAlign: 'right' }}> {total.toFixed(2)}€ </div>;
    },
  },
];

const TransactionsContent = ({
  isLoading,
  transactions,
  getData,
  setSortByInCaller,
  sortFilter,
}) => {
  return (
    <TransactionsTable
      sortByColumn={sortFilter[0].column}
      excludeSortBy={[
        'paymentMethod',
        'productName',
        'quantity',
        'price',
        'articleNumber',
      ]}
      columns={columns}
      data={transactions}
      getData={getData}
      sortable
      selectable
      striped
      isLoading={isLoading}
      setSortByInCaller={sort => setSortByInCaller(sort)}
      sortDirection={sortFilter[0].direction}
    />
  );
};

export default TransactionsContent;
