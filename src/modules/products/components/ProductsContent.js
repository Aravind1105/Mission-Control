import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import get from 'lodash/get';
import { isEqual } from 'lodash';
import {
  resetProduct,
  setPage as changePage,
  setPerPage as changePerPage,
  setSort,
  setFilters,
  getProductLinesWithFilter,
} from '../actions';
import history from 'lib/history';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import Pagination from 'modules/shared/components/Pagination';
import './styles.less';
import { getTotalProductsCount } from '../selectors';
const screenWidth = window.innerWidth;

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Manufacturer',
    field: 'manufacturer',
  },
  {
    title: 'Weight',
    field: 'weight',
    formatter: ({ packagingOptions }) => {
      const weight = get(packagingOptions, '0.grossWeightGrams', 0);
      if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {weight} g </div>;
      }
      return <div style={{ textAlign: 'center' }}> {weight} g</div>;
    },
  },
  {
    title: 'Price',
    field: 'defaultPrice',
    formatter: ({ defaultPrice = 0 }) => {
      if (screenWidth < 750) {
        return (
          <div style={{ textAlign: 'left' }}> {defaultPrice.toFixed(2)}€ </div>
        );
      }
      return (
        <div style={{ textAlign: 'right' }}> {defaultPrice.toFixed(2)}€</div>
      );
    },
  },
];

const ProductsContent = ({
  products,
  resetProduct,
  isLoading,
  paginationState,
  total,
  changePage,
  changePerPage,
  setSort,
  setFilters,
  getProductLinesWithFilter,
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

    if (search || category || manufacturer.length > 0) {
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
      const sup =
        manufacturer.length > 0 ? { manufacturer: { $in: manufacturer } } : {};

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
  }, [page, perPage, search, category, manufacturer]);

  const clickRow = ({ _id }) => {
    resetProduct();
    history.push(`/products/${_id}`);
  };

  return (
    <Segment>
      {isLoading && <Loader />}
      <Grid stackable stretched>
        <Grid.Row>
          <Grid.Column>
            <CustomTable
              className="product-table"
              sortByColumn="name"
              columns={columns}
              data={products}
              onRowClick={clickRow}
              getData={getData}
              sortable
              selectable
              setSortByInCaller={sort => setSort(sort)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Pagination
              totalCount={total}
              page={page}
              perPage={perPage}
              changePage={changePage}
              changePerPage={changePerPage}
              isLoading={isLoading}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  total: getTotalProductsCount(state),
});

const mapDispatchToProps = {
  getProductLinesWithFilter,
  resetProduct,
  changePage,
  changePerPage,
  setSort,
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContent);
