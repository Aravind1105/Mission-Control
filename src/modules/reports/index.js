import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Segment, Button, Icon } from 'semantic-ui-react';
import { getReports } from './actions';
import StatsCard from 'modules/shared/components/StatsCard';
import {} from './selectors';
import './styles.less';

const options = {
  lastMonth: {
    title: 'Sales last month',
    color: 'green',
  },
  income: {
    title: 'Sales income',
    color: 'blue',
  },
  totalRevenue: {
    title: 'total Revenue',
    color: 'red',
  },
};

const Reports = ({ isLoading }) => {
  useEffect(() => {}, []);

  return (
    <>
      {/* {isLoading && <Loader />} */}
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
              amount={`22 €`}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              customColor="#F2994A"
              text="Total Products Sold"
              amount={`23 €`}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              customColor="#56CCF2"
              text="Peak Hour"
              amount={`-- €`}
            />
            {/* <StatsCard
              icon="boxes"
              customColor="#F2994A"
              text="Total Products sold"
              amount={widgetsData.totalNumberOfProductsSold
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            /> */}
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} tablet={8}>
            <StatsCard
              customColor="#BB6BD9"
              text="Average Daily Net Sales"
              amount={`-- €`}
            />
            {/* <StatsCard
              icon="credit card"
              customColor="#2F80ED"
              text="Total Transactions"
              amount={widgetsData.totalNumberOfTransactions
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div className="button__report-update">
        <Button
          onClick={getReports}
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
});

const mapDispatchToProps = {
  getReports,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
