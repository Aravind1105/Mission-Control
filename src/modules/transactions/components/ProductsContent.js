import React from 'react';
import { Segment } from 'semantic-ui-react';

import ProductsTable from './TransactionsTable/Products';

const columns = [
  {
    title: 'Product Name',
    // title2: 'test',
    field: 'ProductName',
  },
  {
    title: 'Sold Product Qty.',
    // title2: 'test',
    field: 'SoldProductQuantity',
  },
  {
    title: 'Sold Product Value',
    title2: 'test1',
    field: 'SoldProductValue',
  },
  {
    title: 'Replenished Product Qty.',
    title2: 'test2',
    field: 'ReplenishedProductQty',
    // field: 'status',
  },
  {
    title: 'Replenished Product Value',
    title2: 'test3',
    // field: 'productName',
  },
  {
    title: 'Removed Product Qty.',
    title2: 'test4',
    // field: 'productName',
  },
  {
    title: 'Removed Product Value',
    title2: 'test5',
    // field: 'productName',
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
      sortByColumn="ProductName"
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
