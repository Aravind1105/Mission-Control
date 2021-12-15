import React from 'react';
import ProductsTable from './TransactionsTable/Products';

const ProductsContent = ({
  isLoading,
  products,
  getData,
  setSortByInCaller,
}) => {
  return (
    <ProductsTable
      sortByColumn="sold"
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
