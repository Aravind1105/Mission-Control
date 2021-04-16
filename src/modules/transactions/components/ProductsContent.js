import React from 'react';
import { Segment } from 'semantic-ui-react';

import ProductsTable from './TransactionsTable/Products';

const columns = [
  {
    title: 'Product Name',
    field: 'ProductName',
  },
  {
    title: 'Sold Product Qty.',
    field: 'SoldProductQuantity',
  },
  {
    title: 'Sold Product Value',
    field: 'SoldProductValue',
  },
  {
    title: 'Replenished Product Qty.',
    field: 'ReplenishedProductQty',
  },
  {
    title: 'Replenished Product Value',
    title2: 'test3',
  },
  {
    title: 'Removed Product Qty.',
    title2: 'test4',
  },
  {
    title: 'Removed Product Value',
    title2: 'test5',
  },
];

const ProductsContent = ({
  isLoading,
  products,
  getData,
  setSortByInCaller,
}) => {
  return (
    <ProductsTable
      sortByColumn="sold"
      columns={columns}
      data={products}
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

export default ProductsContent;
