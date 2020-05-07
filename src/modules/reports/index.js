import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Segment, Button, Icon } from 'semantic-ui-react';

import OneLineChart from './components/OneLineChart';
import TotalStatisticContainer from './components/TotalStatisticContainer';
import ComplexChart from './components/ComplexChart';
import PortfolioContainer from './components/PortfolioContainer';
import TopSellers from './components/TopSellers';
import BestSellerProducts from './components/BestSellerProducts';
import PortfolioPerfGraph from './components/PortfolioPerfGraph';
import { getReports } from './actions';
import {
  getSalesListReports,
  getTargetStatistics,
  getTargetSales,
  getPortfolioStatistic,
  getTopSellers,
  getBestSellingProducts,
} from './selectors';
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

const Reports = ({
  portfolioStatistic,
  salesListReports,
  targetStatistics,
  targetSales,
  topSellers,
  bestSellingProducts,
  isLoading,
  getReports,
}) => {
  useEffect(() => {
    if (!isLoading) getReports();
  }, []);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Segment>
        <Header as="h3" dividing>
          Reports
        </Header>
      </Segment>

      <PortfolioContainer statistic={portfolioStatistic} />

      <Grid>
        <Grid.Row columns="equal">
          {Object.keys(salesListReports).map(key => (
            <Grid.Column key={key}>
              <OneLineChart
                data={salesListReports[key]}
                title={options[key].title}
                color={options[key].color}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>

      <ComplexChart data={targetSales} />

      <TotalStatisticContainer statistic={targetStatistics} />

      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <TopSellers data={topSellers} />
          </Grid.Column>
          <Grid.Column>
            <BestSellerProducts data={bestSellingProducts} />
          </Grid.Column>
          <Grid.Column>
            <PortfolioPerfGraph data={portfolioStatistic} />
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
  salesListReports: getSalesListReports(state),
  targetStatistics: getTargetStatistics(state),
  targetSales: getTargetSales(state),
  portfolioStatistic: getPortfolioStatistic(state),
  topSellers: getTopSellers(state),
  bestSellingProducts: getBestSellingProducts(state),
  isLoading: state.reports.isLoading,
});

const mapDispatchToProps = {
  getReports,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
