import React from 'react';
import ProductsTable from './TransactionsTable/Products';

const ProductsContent = ({
  isLoading,
  products,
  getData,
  setSortByInCaller,
  sortFilter,
}) => {
  return (
    <ProductsTable
      sortByColumn={sortFilter[0].column}
      data={products}
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

export default ProductsContent;
