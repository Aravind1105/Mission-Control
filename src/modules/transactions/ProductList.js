import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Pagination from 'modules/shared/components/Pagination';
import StatsCard from 'modules/shared/components/StatsCard';
import ProductsToolbar from './components/ProductsToolbar';
import ProductsContent from './components/ProductsContent';

import {
  getGridProductsTableState,
  getTotalGridProductsCount,
  getWidgetDataState,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import { getAllProducts, getProductsWidgetsData } from './actions';
import { getProductsDropdownList } from '../products/selectors';
import { isEqual } from 'lodash';

const sortDefault = [
  {
    column: 'sold',
    direction: 'DESC',
  },
];

const defaultFilterValues = { dateRange: '', kiosk: '', product: '' };

const sortValue = {
  productLine: 'productLine',
  refilled: 'refilled',
  removed: 'removed',
  sold: 'sold',
  totalCost: 'totalCost',
  totalGrossSales: 'totalGrossSales',
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
}) => {
  const [dateRange, changeDate] = useState('');
  const [product, changeProduct] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaultFilterValues);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    const widgetPayload = {};
    if (dateRange || kiosk || product) {
      const date = dateRange ? { created: dateRange } : {};
      const kio = kiosk ? { kioskId: kiosk } : {};
      const prod = product ? { productLineId: product } : {};

      data.search = JSON.stringify({
        ...date,
        ...kio,
        ...prod,
      });
      const dateRangeIndex = isEqual(dateRange, filter.dateRange);
      const kioskIndex = isEqual(kiosk, filter.kiosk);
      const productIndex = isEqual(product, filter.product);

      widgetPayload.period = dateRange;
      widgetPayload.kioskId = kiosk;
      widgetPayload.productLine = product;

      if (!dateRangeIndex || !kioskIndex || !productIndex) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filter,
          dateRange,
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
      <ProductsToolbar
        changeDate={changeDate}
        changeKiosk={changeKiosk}
        kiosks={kiosks}
        productsListValue={productsListValue}
        changeProduct={changeProduct}
      />
      <Grid>
        <Grid.Row stretched className="custom-widgets">
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              icon="star"
              customColor="#219653"
              text="Most Sold Product"
              amount={`${widgetsData.mostRefilledProductName} `}
              secondaryText={`${widgetsData.mostRefilledProductValue.sum}  Sold`}
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
        setSortByInCaller={sort => setSort([sort])}
        // sortDirection="DESC"
      />
      <br></br>
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
  kiosks: getKioskOptionsForTableDropdown(state),
  productsListValue: getProductsDropdownList(state),
  widgetsData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getAllProducts,
  getProductsWidgetsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
