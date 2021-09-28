import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Segment, Button, Icon, Loa } from 'semantic-ui-react';
import { getWidgetData } from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import { getWidgetDataState } from './selectors';
import './styles.less';

const Reports = ({ isLoading, getWidgetData, widgetData }) => {
  useEffect(() => {
    getWidgetData();
  }, []);

  return (
    <>
      <Segment>
        <Header as="h3" dividing>
          Reports
        </Header>
      </Segment>

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
});

const mapDispatchToProps = {
  getWidgetData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
