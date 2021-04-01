import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import { getProductLinesWithFilter } from './actions';
import { selectorGetProducts, getTotalProductsCount } from './selectors';

const sortDefault = [
  {
    column: 'name',
    direction: 'ASC',
  },
];
const defaulFilterValues = { search: '', category: '', supplier: '' };

const ProductsList = ({
  products,
  total,
  isLoading,
  getProductLinesWithFilter,
}) => {
  const [search, changeSearch] = useState('');
  const [category, changeCategory] = useState('');
  const [supplier, changeSupplier] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaulFilterValues);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || category || supplier) {
      const name = search ? { name: { $regexI: search } } : {};
      const cat = category ? { category: { $regexI: category } } : {};
      const sup = supplier ? { manufacturer: { $regexI: supplier } } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...sup,
      });

      const searchIndex = isEqual(search, filter.search);
      const categoryIndex = isEqual(category, filter.category);
      const supplierIndex = isEqual(supplier, filter.supplier);

      if (!searchIndex || !categoryIndex || !supplierIndex) {
        data.skip = 0;
        setFilters({
          ...filter,
          search,
          category,
          supplier,
        });
      }
    }

    if (sort) {
      data.sort = sort;
    }
    getProductLinesWithFilter({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, category, supplier]);

  return (
    <>
      <Toolbar
        changeSearch={changeSearch}
        changeCategory={changeCategory}
        changeSupplier={changeSupplier}
      />
      <ProductsContent
        products={products}
        getData={getData}
        isLoading={isLoading}
        setSortByInCaller={sort => setSort([sort])}
      />
      <Pagination
        totalCount={total}
        page={page}
        perPage={perPage}
        changePage={changePage}
        changePerPage={changePerPage}
        isLoading={isLoading}
      />
    </>
  );
};

const mapStateToProps = state => ({
  products: selectorGetProducts(state),
  total: getTotalProductsCount(state),
  isLoading: state.products.isLoading,
});

const mapDispatchToProps = {
  getProductLinesWithFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
