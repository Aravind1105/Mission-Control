import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import {
  getWidgetData,
  getTopSellingKiosks,
  getTopSellingProducts,
  getTopSellHours,
  getPaymentsMethodsStats,
  getNetSalesProfitNetCostData,
  getTopRefills,
} from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import {
  getTopSellingKiosksState,
  getWidgetDataState,
  getTopSellingProductsState,
  getTopSellHoursState,
  getNetSalesProfitCostState,
  getTopRefillsState,
  getPaymentsMethodsState,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import Toolbar from './components/Toolbar';
import { format } from 'date-fns';
import AreaChartComponent from './components/AreaChart';
import SoldProductsBarChart from './components/SoldProductsBarChart';
import TopSellingProductsTable from './components/TopSellingProductsTable';
import TopSellingKiosksTable from './components/TopSellingKiosksTable';
import './styles.less';
import Loader from 'modules/shared/components/Loader';
import './styles.less';
import BarChart from '../shared/components/BarChart';
import UsedPaymentMethodsPiChart from './components/UsedPaymentMethodsPiChart';

const ReportsContent = ({
  isLoading,
  widgetData,
  kiosksOptions,
  NetSalesProfitNetCostData,
  getNetSalesProfitNetCostData,
  topSellingKiosks,
  topSellingProducts,
  topSellHours,
  getWidgetData,
  getTopSellingProducts,
  getTopSellingKiosks,
  getTopSellHours,
  getTopRefills,
  topRefills,
  isTopRefillsLoading,
  isPaymentMethodLoading,
  paymentMethodsStats,
  getPaymentsMethodsStats,
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
    getTopSellHours(data);
    getTopRefills(data);
    getPaymentsMethodsStats(data);
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
      <Grid className="reports">
        <Grid.Row stretched>
          <Grid.Column mobile={16} computer={16}>
            {isLoading && <Loader />}
            <TopSellingProductsTable topSellingProducts={topSellingProducts} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className="kiosks-reports-table">
        <Grid.Row stretched>
          <Grid.Column mobile={16} computer={8}>
            {isLoading && <Loader />}
            <TopSellingKiosksTable topSellingKiosks={topSellingKiosks} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            {isPaymentMethodLoading && <Loader />}
            {!isPaymentMethodLoading && (
              <Segment>
                <UsedPaymentMethodsPiChart
                  paymentMethodsStatsdata={paymentMethodsStats}
                />
              </Segment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row stretched>
          {isLoading && <Loader />}
          <Grid.Column mobile={16} computer={8}>
            {topSellHours && (
              <Segment>
                <SoldProductsBarChart
                  data={topSellHours}
                  dateRange={dateRange}
                />
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            {isTopRefillsLoading && <Loader />}
            {!isTopRefillsLoading && (
              <Segment>
                <BarChart
                  data={topRefills}
                  dateRange={dateRange}
                  defaultGraphType="daily"
                  xAxisDataKey="key"
                  yAxisDataKey="amount"
                  xAxisLegend={{
                    daily: 'Hours of the day',
                    weekly: 'Days of the week',
                  }}
                  yAxisLegend={{
                    daily: 'Accumulated added products per hour',
                    weekly: 'Accumulated added products per day',
                  }}
                  barColor="#2f80ed"
                  widgetTextColor="#2f80ed"
                  toolTipTextColor="#2f80ed"
                  widgetLegend={{
                    daily: 'peak hour',
                    weekly: 'highest activity',
                  }}
                />
              </Segment>
            )}
          </Grid.Column>
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
  topSellHours: getTopSellHoursState(state),
  topRefills: getTopRefillsState(state),
  isTopRefillsLoading: state.reports.isTopRefillsLoading,
  isPaymentMethodLoading: state.reports.isPaymentMethodLoading,
  paymentMethodsStats: getPaymentsMethodsState(state),
});

const mapDispatchToProps = {
  getWidgetData,
  getNetSalesProfitNetCostData,
  getTopSellingKiosks,
  getTopSellingProducts,
  getTopSellHours,
  getTopRefills,
  getPaymentsMethodsStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContent);
