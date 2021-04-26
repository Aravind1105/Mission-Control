import React from 'react';
import { Segment } from 'semantic-ui-react';

import RefillsTable from './TransactionsTable/Refills';
const screenWidth = window.innerWidth;
const columns = [
  {
    title: 'Date / Time',
    field: 'created',
    formatter: ({ created }) => {
      if (created === '') {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {created} </div>;
    },
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
    ormatter: ({ kioskName }) => {
      if (kioskName === '') {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {kioskName} </div>;
    },
  },
  {
    title: 'Status',
    field: 'status',
    formatter: ({ status }) => {
      if (status === '') {
        return '';
      }
      return <div style={{ textAlign: 'left' }}> {status} </div>;
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
    field: 'count',
    formatter: ({ count }) => {
      if (count === 0) {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {count} </div>;
      }
      return <div style={{ textAlign: 'center' }}> {count} </div>;
    },
  },
  {
    title: 'Cable ID',
    field: 'loadCell',
    formatter: ({ loadCell }) => {
      if (loadCell === '') {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {loadCell} </div>;
      }
      return <div style={{ textAlign: 'center' }}> {loadCell} </div>;
    },
  },
  {
    title: 'Weight in g',
    field: 'weight',
    formatter: ({ weight }) => {
      if (weight === '') {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {weight} </div>;
      }
      return <div style={{ textAlign: 'center' }}> {weight} </div>;
    },
  },
  {
    title: 'Cost',
    field: 'cost',
    formatter: ({ cost }) => {
      if (cost === '') {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {cost}€ </div>;
      }
      return <div style={{ textAlign: 'right' }}> {cost}€ </div>;
    },
  },
  {
    title: 'Total Cost',
    field: 'total',
    formatter: ({ total }) => {
      if (total === '') {
        return '';
      } else if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {total}€ </div>;
      }
      return <div style={{ textAlign: 'right' }}> {total}€ </div>;
    },
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
