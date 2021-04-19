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
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
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
  kiosks,
  getProductListSaga,
  getRefillsWidgetsData,
  widgetsData,
}) => {
  const [dateRange, changeDate] = useState('');
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

    if (kiosk || dateRange) {
      const date = dateRange ? { created: dateRange } : {};
      const kio = kiosk ? { kiosk } : {};

      data.search = JSON.stringify({
        ...date,
        ...kio,
      });
      const dateRangeIndex = isEqual(dateRange, filter.dateRange);
      const kioskIndex = isEqual(kiosk, filter.kiosk);

      widgetPayload.period = dateRange;
      widgetPayload.kioskId = kiosk;

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
      <RefillsToolbar
        changeDate={changeDate}
        changeKiosk={changeKiosk}
        kiosks={kiosks}
      />
      <Grid>
        <Grid.Row stretched className="custom-widgets">
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="boxes"
              color="green"
              text="Total Products Replenished"
              amount={widgetsData.totalNumberOfProductsAdded}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4} tablet={8}>
            <StatsCard
              icon="tag"
              color="orange"
              text="Replenished Products Total Cost"
              amount={`€ ${widgetsData.totalCostValueOfReplenishedProducts} `}
              secondaryText="Replenished Products Sales Value"
              secondaryAmount={`€ ${widgetsData.totalSaleValueOfReplenishedProducts} `}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="reply"
              color="blue"
              text="Total products Removed"
              amount={widgetsData.totalNumberOfProductsRemoved}
            />
          </Grid.Column>
          <Grid.Column mobile={8} computer={4}>
            <StatsCard
              icon="trash alternate"
              color="violet"
              text="Spoilage rate"
              amount={`${widgetsData.averageSpoilageRate}%`}
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
  kiosks: getKioskOptionsForTableDropdown(state),
  productsList: getProductsDropdownList(state),
  widgetsData: getWidgetDataState(state),
});

const mapDispatchToProps = {
  getGridRefills,
  getProductListSaga,
  getRefillsWidgetsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplenisherList);
