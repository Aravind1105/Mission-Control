import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Icon, Loa } from 'semantic-ui-react';
import { getWidgetData } from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import { getWidgetDataState } from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import Toolbar from './components/Toolbar';
import './styles.less';

const ReportsContent = ({
  isLoading,
  getWidgetData,
  widgetData,
  kiosksOptions,
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
  }, [dateRange, kiosk]);

  return (
    <>
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
              customColor="#F2994A"
              text="Total Products Sold"
              amount={widgetData.totalNumberOfProductsSold
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard customColor="#56CCF2" text="Peak Hour" amount={`-- €`} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              customColor="#BB6BD9"
              text="Average Daily Net Sales"
              amount={`-- €`}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div className="button__report-update">
        <Button
          onClick={() => {}}
          disabled={isLoading}
          basic
          color="orange"
          loading={isLoading}
        >
          <Icon name="undo" />
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.reports.isLoading,
  widgetData: getWidgetDataState(state),
  kiosksOptions: getKioskOptionsForTableDropdown(state),
});

const mapDispatchToProps = {
  getWidgetData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContent);
