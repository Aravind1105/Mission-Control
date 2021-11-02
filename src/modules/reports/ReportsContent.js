import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import {
  getWidgetData,
  getTopSellingKiosks,
  getTopSellingProducts,
} from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import {
  getTopSellingKiosksState,
  getWidgetDataState,
  getTopSellingProductsState,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import Toolbar from './components/Toolbar';
import { format } from 'date-fns';
import Table, { FieldTypes, Size } from './components/Table';
import AreaChartComponent from './components/AreaChart';
import TopSellingProductsTable from './components/TopSellingProductsTable';
import './styles.less';
import { getNetSalesProfitNetCostData } from './actions';
import { getNetSalesProfitCostState } from './selectors';
import Loader from 'modules/shared/components/Loader';

const ReportsContent = ({
  isLoading,
  widgetData,
  kiosksOptions,
  NetSalesProfitNetCostData,
  getNetSalesProfitNetCostData,
  topSellingKiosks,
  topSellingProducts,
  getWidgetData,
  getTopSellingProducts,
  getTopSellingKiosks,
}) => {
  const [dateRange, changeDateRange] = useState('');
  const [kiosk, changeKiosk] = useState([]);

  useEffect(() => {
    const data = {};
    if (dateRange !== '') {
      data.period = dateRange;
    }
    if (kiosk.length > 0) {
      data.kioskId = kiosk;
    }
    getWidgetData(data);
    getNetSalesProfitNetCostData(data);
    getTopSellingKiosks(data);
    getTopSellingProducts(data);
  }, [dateRange, kiosk]);

  return (
    <>
      <Segment>
        <Toolbar
          changeDate={changeDateRange}
          kiosks={kiosksOptions}
          changeKiosk={changeKiosk}
        />
        <Grid>
          <Grid.Row stretched className="custom-widgets">
            <Grid.Column mobile={16} computer={4} tablet={8}>
              {widgetData.totalNetIncome && (
                <StatsCard
                  customColor="#219653"
                  text="Total Net Sales"
                  amount={`${widgetData.totalNetIncome
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}€`}
                />
              )}
            </Grid.Column>
            <Grid.Column mobile={16} computer={4} tablet={8}>
              {widgetData.totalNumberOfProductsSold && (
                <StatsCard
                  icon="boxes"
                  customColor="#F2994A"
                  text="Total Products Sold"
                  amount={widgetData.totalNumberOfProductsSold
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              )}
            </Grid.Column>
            <Grid.Column mobile={16} computer={4} tablet={8}>
              {widgetData.peakSalesHour && (
                <StatsCard
                  icon="time"
                  customColor="#56CCF2"
                  text="Peak Hour"
                  amount={`${format(
                    new Date(parseInt(widgetData.peakSalesHour.start)),
                    'HH:mm',
                  )} - ${format(
                    new Date(parseInt(widgetData.peakSalesHour.end)),
                    'HH:mm',
                  )}`}
                />
              )}
            </Grid.Column>
            <Grid.Column mobile={16} computer={4} tablet={8}>
              {widgetData.averageDailyRevenue && (
                <StatsCard
                  customColor="#BB6BD9"
                  text="Average Daily Net Sales"
                  amount={`${widgetData.averageDailyRevenue
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Grid>
        <Grid.Row>
          <Grid.Column>
            {isLoading && <Loader />}
            {NetSalesProfitNetCostData && (
              <Segment>
                <AreaChartComponent data={NetSalesProfitNetCostData} />
              </Segment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className="dashboard">
        <Grid.Row stretched>
          <Grid.Column mobile={16} computer={16}>
            <TopSellingProductsTable
              topSellingProducts={topSellingProducts}
              fullTable
            ></TopSellingProductsTable>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Row columns="2">
          <Grid.Column>
            <Table
              title="Top Selling Kiosks"
              size={Size.HALF}
              headers={[
                { title: 'Rank', fieldType: FieldTypes.RANK, key: 'rank' },
                {
                  title: 'Kiosk',
                  fieldType: FieldTypes.STRING,
                  key: 'kioskName',
                },
                {
                  title: 'Net Sales',
                  fieldType: FieldTypes.PRICE,
                  key: 'netSales',
                },
                {
                  title: 'Net Cost',
                  fieldType: FieldTypes.PRICE,
                  key: 'netCost',
                },
                { title: 'Profit', fieldType: FieldTypes.PRICE, key: 'profit' },
              ]}
              data={[
                {
                  rank: 1,
                  kioskId: '60a66994e0c7dd35c96abad7',
                  kioskName: 'Westwing Group AG',
                  netSales: 1568.78,
                  netCost: 462.24,
                  profit: 1106.53,
                },
                {
                  rank: 2,
                  kioskId: '5fa3dbcf3b0de589c3f25cf3',
                  kioskName:
                    'ABT Sportsline GmbH ABT Sportsline GmbH ABT Sportsline GmbH',
                  netSales: 381.18,
                  netCost: 316,
                  profit: 65.18,
                },
                {
                  rank: 3,
                  kioskId: '5fa3dbf13b0de589c3f25cfe',
                  kioskName: 'Scaltel AG',
                  netSales: 359.6,
                  netCost: 362.07,
                  profit: -2.46,
                },
              ]}
              data={topSellingKiosks}
            />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.reports.isLoading,
  widgetData: getWidgetDataState(state),
  kiosksOptions: getKioskOptionsForTableDropdown(state),
  NetSalesProfitNetCostData: getNetSalesProfitCostState(state),
  topSellingKiosks: getTopSellingKiosksState(state),
  topSellingProducts: getTopSellingProductsState(state),
});

const mapDispatchToProps = {
  getWidgetData,
  getNetSalesProfitNetCostData,
  getTopSellingKiosks,
  getTopSellingProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContent);
