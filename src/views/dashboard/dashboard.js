import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";

import * as Icon from "react-feather";

import { AdvancedCardData } from "../cards/advancedCardData";

import ProductsSalesChartCard from "../../components/cards/productsSalesChartCard";

import MonthlySalesStatisticsBarChartCard from "../../components/cards/monthlySalesStatisticsBarChartCard";
import Products from "../../views/products/products";

import VisitSalesStatisticsCard from "../../components/cards/visitSalesStatistics";
import WeeklyStatisticsLineChartCard from "../../components/cards/weeklyStatisticsLineChartCard";

import UserListCard from "../../components/cards/userListCard";


// Styling

class Dashboard extends Component {
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
               <Col sm="12">
                  
               </Col>
            </Row>       
         </Fragment>
      );
   }
}

export default Dashboard;
