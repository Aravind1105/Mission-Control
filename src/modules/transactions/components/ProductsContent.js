import React from 'react';
import { Segment } from 'semantic-ui-react';

import ProductsTable from './TransactionsTable/Products';

//
const ProductsContent = ({
  isLoading,
  products,
  getData,
  setSortByInCaller,
}) => {
  return (
    <ProductsTable
      sortByColumn="productLine"
      data={products}
      getData={getData}
      sortable
      selectable
      striped
      isLoading={isLoading}
      setSortByInCaller={sort => setSortByInCaller(sort)}
      sortDirection="ASC"
    />
  );
};

export default ProductsContent;
