import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
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
        prev[key] =
          i % 2
            ? `${format(curr, 'yyyy-MM-dd')}T23:59:59.999Z`
            : `${format(curr, 'yyyy-MM-dd')}T00:00:00.000Z`;
        return prev;
      }, {});
    }
    changePage(0);
    changeDate(date);
  };
  return (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={4}>
          <DatePicker
            type="range"
            onChange={handleDateChange}
            className="full-width"
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <Dropdown
            placeholder="Kiosks"
            selection
            className="full-width"
            onChange={handleKioskChange}
            options={kiosks}
          />
        </Grid.Column>
        <Grid.Column width={4}>
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
