import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import { getProductLinesWithFilter, getManufacturers } from './actions';
import { selectorGetProducts, getTotalProductsCount } from './selectors';
import { isEqual } from 'lodash';

const sortDefault = [
  {
    column: 'name',
    direction: 'ASC',
  },
];
const defaulFilterValues = { search: '', category: '', manufacturer: '' };

const ProductsList = ({
  products,
  total,
  isLoading,
  getProductLinesWithFilter,
  getManufacturers,
}) => {
  const [search, changeSearch] = useState('');
  const [category, changeCategory] = useState('');
  const [manufacturer, changeManufacturer] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaulFilterValues);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || category || manufacturer) {
      const name = search ? { name: { $regex: search, $options: 'i' } } : {};
      const cat = category
        ? { category: { $regex: category, $options: 'i' } }
        : {};
      const sup = manufacturer
        ? { manufacturer: { $regex: manufacturer, $options: 'i' } }
        : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...sup,
      });

      const searchIndex = isEqual(search, filter.search);
      const categoryIndex = isEqual(category, filter.category);
      const manufacturerIndex = isEqual(manufacturer, filter.manufacturer);

      if (!searchIndex || !categoryIndex || !manufacturerIndex) {
        data.skip = 0;
        setFilters({
          ...filter,
          search,
          category,
          manufacturer,
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
    getManufacturers();
  }, [page, perPage, search, category, manufacturer]);

  return (
    <>
      <Toolbar
        changeSearch={changeSearch}
        changeCategory={changeCategory}
        changeManufacturer={changeManufacturer}
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
  getManufacturers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
