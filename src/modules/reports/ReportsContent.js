import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Segment } from 'semantic-ui-react';
import {
  getWidgetData,
  getTopSellingKiosks,
  getTopSellingProducts,
  getTopSell,
  getPaymentsMethodsStats,
  getNetSalesProfitNetCostData,
  getTopRefills,
} from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import {
  getTopSellingKiosksState,
  getWidgetDataState,
  getTopSellingProductsState,
  getTopSellState,
  getNetSalesProfitCostState,
  getTopRefillsState,
  getPaymentsMethodsState,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import Toolbar from './components/Toolbar';
import { format } from 'date-fns';
import AreaChartComponent from './components/AreaChart';
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
  topSell,
  getWidgetData,
  getTopSellingProducts,
  getTopSellingKiosks,
  getTopSell,
  getTopRefills,
  topRefills,
  isWidgetLoading,
  isNetSalesLoading,
  isTopSellKioskLoading,
  isTopSellProductsLoading,
  isTopRefillsLoading,
  isTopSellLoading,
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
    getTopSell(data);
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
          {isWidgetLoading && <Loader />}
          <Grid.Row stretched className="custom-widgets">
            <Grid.Column mobile={16} computer={4} tablet={8}>
              <StatsCard
                customColor="#219653"
                text="Total Net Sales"
                amount={`${widgetData.totalNetIncome
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={4} tablet={8}>
              <StatsCard
                icon="boxes"
                customColor="#F2994A"
                text="Total Products Sold"
                amount={widgetData.totalNumberOfProductsSold
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={4} tablet={8}>
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
            </Grid.Column>
            <Grid.Column mobile={16} computer={4} tablet={8}>
              <StatsCard
                customColor="#BB6BD9"
                text="Average Daily Net Sales"
                amount={`${widgetData.averageDailyRevenue
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              {isNetSalesLoading && <Loader />}
              {NetSalesProfitNetCostData && (
                <AreaChartComponent data={NetSalesProfitNetCostData} />
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className="reports">
        <Grid.Row stretched>
          <Grid.Column mobile={16} computer={16}>
            <Segment>
              {isTopSellProductsLoading && <Loader />}
              <TopSellingProductsTable
                topSellingProducts={topSellingProducts}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className="kiosks-reports-table">
        <Grid.Row stretched>
          <Grid.Column mobile={16} computer={8}>
            <Segment>
              {isTopSellKioskLoading && <Loader />}
              <TopSellingKiosksTable topSellingKiosks={topSellingKiosks} />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <Segment>
              {isPaymentMethodLoading && <Loader />}
              <UsedPaymentMethodsPiChart
                paymentMethodsStatsdata={paymentMethodsStats}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row stretched>
          <Grid.Column mobile={16} computer={8}>
            <Segment>
              {isTopSellLoading && <Loader />}
              {!isTopSellLoading ? (
                <BarChart
                  title={'Sold products'}
                  data={topSell}
                  dateRange={dateRange}
                  defaultGraphType="daily"
                  xAxisDataKey="key"
                  yAxisDataKey="amount"
                  xAxisLegend={{
                    daily: 'Hours of the day',
                    weekly: 'Days of the week',
                  }}
                  yAxisLegend={{
                    daily: 'Accumulated sales per hour',
                    weekly: 'Accumulated sales per day',
                  }}
                  barColor="#56CCF2"
                  widgetTextColor="#56CCF2"
                  toolTipTextColor="#56CCF2"
                  widgetLegend={{
                    daily: 'peak hour',
                    weekly: 'highest activity',
                  }}
                />
              ) : (
                <>
                  <Header size="small">{'Sold products'}</Header>
                  <Divider fitted style={{ marginBottom: '48px' }}></Divider>
                </>
              )}
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <Segment>
              {isTopRefillsLoading && <Loader />}
              {!isTopRefillsLoading ? (
                <BarChart
                  title={'Refills'}
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
              ) : (
                <>
                  <Header size="small">{'Refills'}</Header>
                  <Divider fitted style={{ marginBottom: '48px' }}></Divider>
                </>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  widgetData: getWidgetDataState(state),
  kiosksOptions: getKioskOptionsForTableDropdown(state),
  NetSalesProfitNetCostData: getNetSalesProfitCostState(state),
  topSellingKiosks: getTopSellingKiosksState(state),
  topSellingProducts: getTopSellingProductsState(state),
  topSell: getTopSellState(state),
  topRefills: getTopRefillsState(state),
  isWidgetLoading: state.reports.isWidgetLoading,
  isNetSalesLoading: state.reports.isNetSalesLoading,
  isTopSellKioskLoading: state.reports.isTopSellKioskLoading,
  isTopSellProductsLoading: state.reports.isTopSellProductsLoading,
  isTopSellLoading: state.reports.isTopSellLoading,
  isTopRefillsLoading: state.reports.isTopRefillsLoading,
  isPaymentMethodLoading: state.reports.isPaymentMethodLoading,
  paymentMethodsStats: getPaymentsMethodsState(state),
});

const mapDispatchToProps = {
  getWidgetData,
  getNetSalesProfitNetCostData,
  getTopSellingKiosks,
  getTopSellingProducts,
  getTopSell,
  getTopRefills,
  getPaymentsMethodsStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContent);
