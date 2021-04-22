import React, { useState } from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Grid, Dropdown } from 'semantic-ui-react';
import format from 'date-fns/format';
import { exportCsvRefills } from '../actions';
import { connect } from 'react-redux';
import CustomButton from 'modules/shared/components/CustomButton';
import { toast } from 'react-semantic-toasts';
import DatePicker from 'modules/shared/components/Datepicker';

const Toolbar = ({ kiosks, changeDate, changeKiosk, exportCsvRefills }) => {
  const [exportData, changeExportData] = useState(false);

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
    changeDate(date);
    if (date.$gte && date.$lte) {
      changeExportData({
        from: date.$gte,
        to: date.$lte,
        kiosk: exportData.kiosk ? exportData.kiosk : '',
      });
    }
  };

  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
    changeExportData({
      from: exportData.from ? exportData.from : '',
      to: exportData.to ? exportData.to : '',
      kiosk: value,
    });
  };

  const DownloadCsv = () => {
    let value = {
      from: Math.round(new Date(exportData.from)),
      to: Math.round(new Date(exportData.to)),
      kiosk: exportData.kiosk ? exportData.kiosk : '',
    };
    exportCsvRefills(value);
    toast({
      description: 'Downloading the requested file.',
      animation: 'fade left',
      icon: 'info',
      color: 'blue',
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
          <Grid.Column mobile={16} computer={3}>
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <Dropdown
              placeholder="All Kiosks"
              selection
              options={kiosks}
              className="full-width"
              onChange={handleKioskChange}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            <CustomButton
              label="Download CSV&nbsp;"
              icon="arrow down icon"
              className="custom-button-default"
              onClick={DownloadCsv}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  changeDate: func,
  changeKiosk: func,
  kiosks: arrayOf(object),
};

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  exportCsvRefills,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
