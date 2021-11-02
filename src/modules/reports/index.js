import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import ReportsContent from './ReportsContent';
import NavSwitcher from '../shared/components/NavSwitcher';
import './styles.less';

const screenWidth = window.innerWidth;

const navSwitcherConfig = [{ name: 'reports', goTo: '/reports' }];
const navMobileSwitcherConfig = [{ name: 'reports', goTo: '/reports' }];

const Reports = ({}) => {
  return (
    <>
      {/* <Segment> */}
        {/* <>
        {screenWidth < 770 ? (
          <NavSwitcher config={navMobileSwitcherConfig} />
        ) : (
          <NavSwitcher config={navSwitcherConfig} />
        )}
      </> */}
        <Switch>
          <Route exact path="/reports" component={ReportsContent} />
          <Redirect to="/reports" />
        </Switch>
      {/* </Segment> */}
    </>
  );
};

export default Reports;
