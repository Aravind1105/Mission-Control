import React from 'react';
import { Grid, Dropdown, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import DatePicker from 'modules/shared/components/Datepicker';
import {
  getKiosksAlertsForTable,
  getKioskOptionsForTableDropdown,
  getAlertsOptions,
} from 'modules/kiosks/selectors';
import SelectCheckBoxes from 'modules/shared/components/SelectCheckBoxes';
import './styles.less';

const Toolbar = ({
  changeAlert,
  changeKiosk,
  changeDate,
  kiosks,
  alertsOptions,
  isKiosksLoading,
  dateRange,
  kioskFilter,
  alertFilter,
}) => {
  const handleKioskChange = value => {
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
    if (
      (!isEqual(value, dateRange) && date.$gte && date.$lte) ||
      value === null
    ) {
      changeDate(date);
    }
  };
  return (
    <Grid stackable>
      <Grid.Row verticalAlign="middle">
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <DatePicker
            type="range"
            onChange={handleDateChange}
            value={dateRange}
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <SelectCheckBoxes
            title="Kiosks"
            options={kiosks}
            value={kioskFilter}
            allOptionKey="all"
            onClickApply={handleKioskChange}
            isLoading={isKiosksLoading}
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <Dropdown
            placeholder="All Alerts"
            selection
            options={alertsOptions}
            value={alertFilter}
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
  isKiosksLoading: state.kiosks.isKiosksListLoading,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
