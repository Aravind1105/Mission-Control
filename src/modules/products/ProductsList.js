import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import { getProductLinesWithFilter } from './actions';
import { selectorGetProducts, getTotalProductsCount } from './selectors';

const sort = [
  {
    column: 'name',
    direction: 'ASC',
  },
];

const ProductsList = ({
  products,
  total,
  isLoading,
  getProductLinesWithFilter,
}) => {
  const [search, changeSearch] = useState('');
  const [category, changeCategory] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || category) {
      const name = search ? { name: { $regex: search } } : {};
      const cat = category ? { category: { $regex: category } } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
      });
    }

    if (sort) {
      data.sort = sort;
    }
    getProductLinesWithFilter({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, category]);

  return (
    <>
      <Toolbar changeSearch={changeSearch} changeCategory={changeCategory} />
      <ProductsContent
        products={products}
        getData={getData}
        isLoading={isLoading}
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
