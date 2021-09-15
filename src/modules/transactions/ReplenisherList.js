import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Pagination from 'modules/shared/components/Pagination';
import StatsCard from 'modules/shared/components/StatsCard';
import RefillsToolbar from './components/RefillsToolbar';
import RefillsContent from './components/RefillsContent';

import {
  getGridRefillsTableState,
  getTotalGridRefillsCount,
  getWidgetDataState,
} from './selectors';
import { getGridRefills, getRefillsWidgetsData } from './actions';
import { getProductListSaga } from '../products/actions';
import { getProductsDropdownList } from '../products/selectors';
import { isEqual } from 'lodash';

const sortDefault = [
  {
    column: 'created',
    direction: 'DESC',
  },
];
const defaultFilterValues = { dateRange: '', kiosk: '' };

const sortValue = {
  kioskName: 'kioskName',
  created: 'created',
  productName: 'product',
  count: 'count',
  loadCell: 'loadCell',
  weight: 'weight',
  total: 'totalCost',
  price: 'defaultCost',
};

const ReplenisherList = ({
  refills,
  isLoading,
  total,
  getGridRefills,
  getProductListSaga,
  getRefillsWidgetsData,
  widgetsData,
}) => {
  const [dateRange, changeDate] = useState('');
  const [kiosk, changeKiosk] = useState([]);
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

    if (kiosk || dateRange) {
      const date = dateRange ? { created: dateRange } : {};
      const kio = kiosk.length > 0 ? { kiosk } : {};

      data.search = JSON.stringify({
        ...date,
        ...kio,
      });
      const dateRangeIndex = isEqual(dateRange, filter.dateRange);
      const kioskIndex = isEqual(kiosk, filter.kiosk);

      widgetPayload.period = dateRange;
      if (kiosk.length > 0) {
        widgetPayload.kioskId = kiosk;
      }

      if (!dateRangeIndex || !kioskIndex) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filter,
          dateRange,
          kiosk,
        });
      }
    }

    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getGridRefills({ data });
    getRefillsWidgetsData({ ...widgetPayload });
  };

  useEffect(() => {
    getProductListSaga();
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, kiosk, dateRange]);
  return (
    <>
      <RefillsToolbar changeDate={changeDate} changeKiosk={changeKiosk} />
      <Grid>
        <Grid.Row stretched className="custom-widgets">
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              customColor="#219653"
              text="Replen. Products Total Cost"
              amount={`${widgetsData.totalCostValueOfReplenishedProducts
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              icon="boxes"
              customColor="#F2994A"
              text="Total Products Added"
              amount={widgetsData.totalNumberOfProductsAdded
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              customColor="#219653"
              text="Replen. Products Sales Value"
              amount={`${widgetsData.totalSaleValueOfReplenishedProducts
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={8}>
            <StatsCard
              icon="reply"
              customColor="#F2994A"
              text="Total Products Removed"
              amount={widgetsData.totalNumberOfProductsRemoved
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={16}>
            <StatsCard
              icon="trash alternate"
              customColor="#9B51E0"
              text="Spoilage Rate"
              amount={`${widgetsData.averageSpoilageRate} %`}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <RefillsContent
        refills={refills}
        isLoading={isLoading}
        getData={getData}
        setSortByInCaller={sort => setSort([sort])}
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
  refills: getGridRefillsTableState(state),
  total: getTotalGridRefillsCount(state),
  isLoading: state.transactions.isLoading,
  productsList: getProductsDropdownList(state),
  widgetsData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getGridRefills,
  getProductListSaga,
  getRefillsWidgetsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplenisherList);
