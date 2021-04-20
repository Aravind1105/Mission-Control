import React from 'react';
import { Grid, Dropdown, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import DatePicker from 'modules/shared/components/Datepicker';
import {
  getKiosksAlertsForTable,
  getKioskOptionsForTableDropdown,
  getAlertsOptions,
} from 'modules/kiosks/selectors';

const Toolbar = ({
  changeAlert,
  changeKiosk,
  changePage,
  changeDate,
  kiosks,
  alertsOptions,
}) => {
  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
  };
  const handleAlertsChange = (e, { value }) => {
    changeAlert(value);
  };
  const handleDateChange = value => {
    let date = '';
    if (value) {
      date = value.reduce((prev, curr, i) => {
        const key = i % 2 ? '$lte' : '$gte';
        let formattedDate = curr;
        if (i % 2) {
          let date = new Date(curr);
          date.setHours(23);
          date.setMinutes(59);
          date.setSeconds(59);
          formattedDate = date;
        }
        prev[key] = formattedDate;
        return prev;
      }, {});
    }
    changePage(0);
    changeDate(date);
  };
  return (
    <Grid stackable>
      <Grid.Row verticalAlign="middle" columns="equal">
        <Grid.Column mobile={16} computer={4}>
          <DatePicker
            type="range"
            onChange={handleDateChange}
            className="full-width"
          />
        </Grid.Column>
        <Grid.Column mobile={16} computer={4}>
          <Dropdown
            placeholder="All Kiosks"
            selection
            className="full-width"
            onChange={handleKioskChange}
            options={kiosks}
          />
        </Grid.Column>
        <Grid.Column mobile={16} computer={4}>
          <Dropdown
            placeholder="All Alerts"
            selection
            options={alertsOptions}
            className="full-width"
            onChange={handleAlertsChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  kiosks: getKioskOptionsForTableDropdown(state),
  alertsOptions: getAlertsOptions(),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
