import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import {
  getProductLinesWithFilter,
  getManufacturers,
  setSearch as changeSearch,
  setCategory as changeCategory,
  setManufacturer as changeManufacturer,
  setPage as changePage,
  setPerPage as changePerPage,
  setSort,
  setFilters,
} from './actions';
import {
  selectorGetProducts,
  getTotalProductsCount,
  getPaginationState,
} from './selectors';
import { isEqual } from 'lodash';

const ProductsList = ({
  products,
  total,
  isLoading,
  getProductLinesWithFilter,
  getManufacturers,
  paginationState,
  changeSearch,
  changeCategory,
  changeManufacturer,
  setSort,
  setFilters,
  changePage,
  changePerPage,
}) => {
  const {
    page,
    perPage,
    sort,
    filters,
    search,
    category,
    manufacturer,
  } = paginationState;

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || category || manufacturer) {
      const name = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { manufacturer: { $regex: search, $options: 'i' } },
            ],
          }
        : {};

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

      const searchIndex = isEqual(search, filters.search);
      const categoryIndex = isEqual(category, filters.category);
      const manufacturerIndex = isEqual(manufacturer, filters.manufacturer);

      if (!searchIndex || !categoryIndex || !manufacturerIndex) {
        data.skip = 0;
        setFilters({
          ...filters,
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
        search={search}
        manufacturer={manufacturer}
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
  paginationState: getPaginationState(state),
});

const mapDispatchToProps = {
  getProductLinesWithFilter,
  getManufacturers,
  changeSearch,
  changeCategory,
  changeManufacturer,
  setSort,
  setFilters,
  changePage,
  changePerPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
