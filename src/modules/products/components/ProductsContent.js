import React from 'react';
import { Segment } from 'semantic-ui-react';
import get from 'lodash/get';

import history from 'lib/history';
import CustomTable from 'modules/shared/components/CustomTable';

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Supplier',
    field: 'manufacturer',
  },
  {
    title: 'Category',
    field: 'category',
  },
  {
    title: 'Weight',
    field: 'weight',
    formatter: ({ packagingOptions }) => {
      const weight = get(packagingOptions, '0.grossWeightGrams', 0);
      return `${weight} g`;
    },
  },
  {
    title: 'Price',
    field: 'defaultPrice',
    formatter: ({ defaultPrice = 0 }) => `${defaultPrice.toFixed(2)} €`,
  },
];

const ProductsContent = ({ products, getData, isLoading }) => {
  const clickRow = ({ _id }) => {
    history.push(`/products/${_id}`);
  };

  return (
    <Segment>
      <CustomTable
        sortByColumn="name"
        columns={columns}
        data={products}
        onRowClick={clickRow}
        getData={getData}
        sortable
        selectable
        isLoading={isLoading}
        excludeSortBy={['price']}
      />
    </Segment>
  );
};

export default ProductsContent;
