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
    title: 'Payment Type',
    field: 'paymentMethod',
    formatter: ({ paymentMethod }) => {
      if (paymentMethod) {
        if (paymentMethod.membercardId !== null)
          return <div style={{ textAlign: 'center' }}>MEMBER CARD</div>;
        else if (paymentMethod.stripeCustomerId !== null)
          return <div style={{ textAlign: 'center' }}>CONSUMER APP</div>;
        else return <div style={{ textAlign: 'center' }}>PT TERMINAL</div>;
      }
    },
  },
  {
    title: 'Payment Status',
    field: 'paymentMethod',
    formatter: ({ paymentMethod }) => {
      if (paymentMethod) {
        if (
          paymentMethod.isPaid === false &&
          paymentMethod.stripeCustomerId !== null
        ) {
          return (
            <div style={{ textAlign: 'center' }}>
              <a href="https://dashboard.stripe.com/" target="_blank">
                CHECK HERE
              </a>
            </div>
          );
        } else if (
          paymentMethod.isPaid === false &&
          paymentMethod.stripeCustomerId === null
        )
          return <div style={{ textAlign: 'center' }}>NOT PAID</div>;
        else if (paymentMethod.isPaid === true)
          return <div style={{ textAlign: 'center' }}>PAID</div>;
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
      sortDirection="DESC"
    />
  );
};

export default TransactionsContent;
