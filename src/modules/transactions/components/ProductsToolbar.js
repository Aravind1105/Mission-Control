import React from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import DatePicker from 'modules/shared/components/Datepicker';
import SelectCheckBoxes from 'modules/shared/components/SelectCheckBoxes';

const Toolbar = ({
  changeDate,
  changeKiosk,
  isKiosksLoading,
  kiosksOptions,
  dateRange,
}) => {
  const handleDateChange = value => {
    let date = '';
    if (value) {
      date = value.reduce((prev, curr, i) => {
        const key = i % 2 ? 'dateTo' : 'dateFrom';
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

  const handleKioskChange = value => {
    changeKiosk(value);
  };

  return (
    <div
      style={{
        marginTop: '20px',
      }}
    >
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
              options={kiosksOptions}
              allOptionKey="all"
              onClickApply={handleKioskChange}
              isLoading={isKiosksLoading}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  changeDate: func,
  changePage: func,
  changeKiosk: func,
  changeProduct: func,
  kiosks: arrayOf(object),
};

const mapStateToProps = state => ({
  isKiosksLoading: state.kiosks.isKiosksListLoading,
});

export default connect(mapStateToProps)(Toolbar);
