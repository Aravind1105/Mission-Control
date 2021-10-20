import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import { getWidgetData, getTopSellingKiosks } from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import { getTopSellingKiosksState, getWidgetDataState } from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import Toolbar from './components/Toolbar';
import { format } from 'date-fns';
import Table, { FieldTypes, Size } from './components/Table';
import './styles.less';

const ReportsContent = ({
  isLoading,
  widgetData,
  kiosksOptions,
  topSellingKiosks,
  getWidgetData,
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
    getTopSellingKiosks(data);
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
          <Grid.Row>
            <Grid.Column mobile={16} computer={4} tablet={8}>
              <StatsCard
                customColor="#219653"
                text="Total Net Sales"
                amount={widgetData.totalNetIncome
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
              data={topSellingKiosks}
            />
          </Grid.Column>
          {/* <Grid.Column></Grid.Column> */}
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.reports.isLoading,
  widgetData: getWidgetDataState(state),
  kiosksOptions: getKioskOptionsForTableDropdown(state),
  topSellingKiosks: getTopSellingKiosksState(state),
});

const mapDispatchToProps = {
  getWidgetData,
  getTopSellingKiosks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContent);
