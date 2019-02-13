import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Row, Col } from 'reactstrap';

import * as Icon from 'react-feather';

import { AdvancedCardData } from '../../components/cards/advancedCardData';

import ProductsSalesChartCard from '../../components/cards/productsSalesChartCard';

import MonthlySalesStatisticsBarChartCard from '../../components/cards/monthlySalesStatisticsBarChartCard';
import Products from '../Products/Products';

import VisitSalesStatisticsCard from '../../components/cards/visitSalesStatistics';
import WeeklyStatisticsLineChartCard from '../../components/cards/weeklyStatisticsLineChartCard';

import UserListCard from '../../components/cards/userListCard';

import Utils from '../../inc/Utils';

// Styling

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('+++>', this.props);
    console.log('----> ', window.location.hash);
    console.log('----> ', Utils.getHashParams(window.location.hash));
    this.props.auth0.handleAuthentication();
  }

  render() {
    return (
      <Fragment>
        {/* Momthly Statistics & Prodcuts */}
        <Row>
          <Col sm="12">
            <VisitSalesStatisticsCard
              visitSalesData={AdvancedCardData.VisitSalesData}
              cardTitle="Visit & Sales Statistics"
              salesText="Sales"
              visitText="Visits"
            />
          </Col>
        </Row>
        {/* Visit - Sales Statistics & Weekly Statistics */}
        <Row className="row-eq-height">
          <Col sm="12" md="4">
            <MonthlySalesStatisticsBarChartCard
              monthlySalesStatisticsBarChartData={AdvancedCardData.MonthlySalesStatisticsBarChartData}
              cardTitle="Statistics"
              cardSubTitle="Last 6 Months Sales"
            />
          </Col>
          <Col sm="12" md="4">
            <WeeklyStatisticsLineChartCard
              weeklySalesStatisticsBarChartData={AdvancedCardData.WeeklySalesStatisticsBarChartData}
              cardBgColor="gradient-blackberry"
              cardTitle="Statistics"
              statisticsAmount="$ 78.89"
              statisticsRangeAmount="Week2 +15.44"
            />
          </Col>
          <Col sm="12" md="4">
            <UserListCard userListData={AdvancedCardData.UserListData} cardTitle="Users List" />
          </Col>
        </Row>
        <Row className="row-eq-height">
          <Col sm="12" />
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Dashboard),
);
