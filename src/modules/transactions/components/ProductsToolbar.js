import React, { useState, useEffect } from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Grid, Dropdown } from 'semantic-ui-react';
import { exportCsvProducts } from '../actions';
import { connect } from 'react-redux';
import { toast } from 'react-semantic-toasts';
import DatePicker from 'modules/shared/components/Datepicker';
import SelectCheckBoxes from '../../shared/components/SelectCheckBoxes';
import moment from 'moment'
const startOfMonth = moment().startOf('month').toDate();
const currentDay   = new Date();
const date = [startOfMonth, currentDay];

const Toolbar = ({
  changeDate,
  changeKiosk,
  exportCsvProducts,
  isKiosksLoading,
  kiosksOptions,
}) => {
  const [exportData, changeExportData] = useState(false);

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
    changeDate(date);
    if (date.$dateFrom && date.$dateTo) {
      changeExportData({
        from: date.$dateFrom,
        to: date.$dateTo,
        kiosk: exportData.kiosk ? exportData.kiosk : '',
      });
    }
  };

  const handleKioskChange = value => {
    changeKiosk(value);
    changeExportData({
      from: exportData.from ? exportData.from : '',
      to: exportData.to ? exportData.to : '',
      kiosk: value,
    });
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
            <DatePicker type="range" onChange={handleDateChange} value={date}/>
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
const mapDispatchToProps = {
  exportCsvProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
