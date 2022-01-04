import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import Pagination from 'modules/shared/components/Pagination';
import StatsCard from 'modules/shared/components/StatsCard';
import Loader from 'modules/shared/components/Loader';
import ProductsToolbar from './components/ProductsToolbar';
import ProductsContent from './components/ProductsContent';
import {
  getGridProductsTableState,
  getTotalGridProductsCount,
  getWidgetDataState,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import {
  getAllProducts,
  getProductsWidgetsData,
  setProducts as changeProduct,
  setProductsPage as changePage,
  setProductsPerPage as changePerPage,
  setProductsKiosk as changeKiosk,
  setProductsSort as changeSort,
  setProductsFilter as changeFilter,
} from './actions';
import { getProductsDropdownList } from '../products/selectors';

const sortValue = {
  productLine: 'productLine',
  refilled: 'refilled',
  removed: 'removed',
  sold: 'sold',
  totalCost: 'totalCost',
  totalGrossSales: 'totalGrossSales',
  totalRemovedCost: 'totalRemovedCost',
};

const ProductList = ({
  products,
  isLoading,
  total,
  getAllProducts,
  kiosks,
  productsListValue,
  getProductsWidgetsData,
  widgetsData,
  isWidgetsLoading,
  paginationState,
  changePage,
  changePerPage,
  changeFilter,
  changeKiosk,
  changeSort,
  changeProduct,
}) => {
  const startOfMonth = moment()
    .startOf('month')
    .toDate();
  const currentDay = new Date();
  const defaultDate = [startOfMonth, currentDay];

  const { page, perPage, kiosk, filter, sort, product } = paginationState;
  const [dateRange, changeDate] = useState({
    $gte: defaultDate[0],
    $lte: defaultDate[1],
  });
  const [dateFilter, changeDateFilter] = useState('');

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    const widgetPayload = {};
    if (dateRange || kiosk || product) {
      const date = dateRange ? dateRange : {};
      const kio = kiosk ? { kioskId: kiosk } : {};
      const prod = product ? { productLineId: product } : {};

      data.search = JSON.stringify({
        ...date,
        ...kio,
        ...prod,
      });
      const dateRangeIndex = isEqual(dateRange, dateFilter);
      const kioskIndex = isEqual(kiosk, filter.kiosk);
      const productIndex = isEqual(product, filter.product);

      widgetPayload.period = dateRange;
      widgetPayload.kioskId = kiosk;
      widgetPayload.productLine = product;

      if (!dateRangeIndex || !kioskIndex || !productIndex) {
        data.skip = 0;
        changePage(0);
        changeDateFilter(dateRange);
        changeFilter({
          ...filter,
          kiosk,
          product,
        });
      }
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAllProducts({ data });
    getProductsWidgetsData({ ...widgetPayload });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, kiosk, dateRange, product]);

  return (
    <>
      {(isWidgetsLoading || isLoading) && <Loader />}
      <ProductsToolbar
        changeDate={changeDate}
        dateRange={[dateRange.$gte, dateRange.$lte]}
        kiosksOptions={kiosks}
        changeKiosk={changeKiosk}
        kioskFilter={kiosk}
        productsListValue={productsListValue}
        changeProduct={changeProduct}
      />
      <Grid stackable stretched>
        <Grid.Row stretched className="custom-widgets">
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              icon="star"
              customColor="#219653"
              text="Most Sold Product"
              amount={`${widgetsData.mostSoldProductName} `}
              secondaryText={`${widgetsData.mostSoldProductValue.sum}  Sold`}
              popup
              fontTo18
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              icon="long arrow alternate down"
              customColor="#F2994A"
              text="Least Sold Product"
              amount={`${widgetsData.leastSoldProductName} `}
              secondaryText={`${widgetsData.leastSoldProductValue.sum}  Sold`}
              popup
              fontTo18
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              icon="dolly flatbed"
              customColor="#2D9CDB"
              text="Most Refilled Product"
              amount={`${widgetsData.mostRefilledProductName} `}
              secondaryText={`${widgetsData.mostRefilledProductValue.sum}  Refilled`}
              popup
              fontTo18
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              icon="reply"
              customColor="#9B51E0"
              text="Most Removed Product"
              amount={`${widgetsData.mostRemovedProductName} `}
              secondaryText={`${widgetsData.mostRemovedProductValue.sum}  Removed`}
              popup
              fontTo18
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ProductsContent
        products={products}
        isLoading={isLoading}
        getData={getData}
        setSortByInCaller={sort => changeSort([sort])}
        sortFilter={sort}
      />
      <br />
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
  products: getGridProductsTableState(state),
  total: getTotalGridProductsCount(state),
  isLoading: state.transactions.isLoading,
  isWidgetsLoading: state.transactions.isWidgetsLoading,
  kiosks: getKioskOptionsForTableDropdown(state),
  productsListValue: getProductsDropdownList(state),
  widgetsData: getWidgetDataState(state),
  paginationState: state.transactions.productsPagination,
});

const mapDispatchToProps = {
  getAllProducts,
  getProductsWidgetsData,
  changePage,
  changePerPage,
  changeFilter,
  changeKiosk,
  changeSort,
  changeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
