import React from 'react';
import { Segment } from 'semantic-ui-react';

import CustomTable from 'modules/shared/components/CustomTable';

const columns = [
  {
    title: 'Date',
    field: 'date',
  },
  {
    title: 'Time',
    field: 'time',
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
    title: 'Product Name',
    field: 'productName',
  },
  {
    title: 'Count',
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
    title: 'Purchase Price per Item',
    field: 'price',
    className: 'purchase-price-header',
    formatter: ({ price }) => `${price || 0} €`,
  },
  {
    title: 'Total Price',
    field: 'total',
    formatter: ({ total }) => `${total || 0} €`,
  },
];

const RefillsContent = ({ isLoading, refills, getData }) => {
  // const clickRow = ({ _id }) => {
  //   history.push(`/kiosks/detail/${_id}`);
  // };

  return (
    <Segment>
      <CustomTable
        // sortByColumn="name"
        columns={columns}
        data={refills}
        getData={getData}
        // sortable
        selectable
        striped
        isLoading={isLoading}
      />
    </Segment>
  );
};

export default RefillsContent;
