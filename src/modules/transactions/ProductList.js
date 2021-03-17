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

const sortDefault = [
  {
    column: 'productLine',
    direction: 'DESC',
  },
];

const sortValue = {
  productName: 'productName',
  soldProductQuanitiy: 'Quantity',
  status: 'status',
  productName: 'product',
  loadCell: 'loadCell',
  weight: 'weight',
  total: 'total',
};

const ProductList = ({
  products,
  isLoading,
  total,
  getAllProducts,
  kiosks,
  getProductsWidgetsData,
  widgetsData,
}) => {
  const [search, changeSearch] = useState('');
  const [dateRange, changeDate] = useState('');
  const [product, changeProduct] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [category, changeCategory] = useState('');
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    const widgetPayload = {};

    if (search || category || dateRange || kiosk) {
      const name = product ? { productLineId: product } : {};
      const cat = category ? { category: { $regex: category } } : {};
      const date = dateRange;
      const kio = kiosk ? { kioskId: kiosk } : {};
      // const kio = kiosk ? { kiosk } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...date,
        ...kio,
      });
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    if (dateRange || kiosk) {
      widgetPayload.period = dateRange;
      widgetPayload.kiosk = kiosk;
    }
    getAllProducts({ data });
    getProductsWidgetsData({ ...widgetPayload });
  };
  useEffect(() => {
    getProductsWidgetsData();
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, kiosk, dateRange]);

  return (
    <>
      <ProductsToolbar
        changeDate={changeDate}
        changeSearch={changeSearch}
        changeCategory={changeCategory}
        changeKiosk={changeKiosk}
        changePage={changePage}
        kiosks={kiosks}
        // productsList={productsList}
        changeProduct={changeProduct}
        getData={getData}
      />
      <Grid>
        <Grid.Row stretched className="custom-widgets">
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="star"
              color="green"
              text="Most Sold Product"
              amount={`${widgetsData.mostRefilledProductName} `}
              secondaryText={`${widgetsData.mostRefilledProductValue}  Sold`}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="long arrow alternate down"
              color="orange"
              text="Least Sold product"
              amount={`${widgetsData.leastSoldProductName} `}
              secondaryText={`${widgetsData.leastSoldProductValue}  Sold`}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="dolly flatbed"
              color="blue"
              text="Most Refilled Product"
              amount={`${widgetsData.mostRefilledProductName} `}
              secondaryText={`${widgetsData.mostRefilledProductValue}  Refilled`}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="reply"
              color="violet"
              text="Most Removed Products"
              amount={`${widgetsData.mostRemovedProductName} `}
              secondaryText={`${widgetsData.mostRemovedProductValue}  Removed`}
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
  productsList: getProductsDropdownList(state),
  widgetsData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getAllProducts,
  getProductsWidgetsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
