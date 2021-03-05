import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dropdown, Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { exportCsvSales } from '../actions';
import { connect } from 'react-redux';
import CustomButton from 'modules/shared/components/CustomButton';
import { toast } from 'react-semantic-toasts';
import DatePicker from 'modules/shared/components/Datepicker';

const Toolbar = ({
  changeDate,
  changePage,
  kiosks,
  changeKiosk,
  exportCsvSales,
}) => {
  const [exportData, changeExportData] = useState(false);
  const width = window.innerWidth;
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
    if (date.$gte && date.$lte) {
      changeExportData({
        from: date.$gte,
        to: date.$lte,
        kiosk: exportData.kiosk ? exportData.kiosk : '',
      });
    }
  };

  const DownloadCsv = () => {
    if (exportData.from == '' && exportData.to == '') {
      window.alert('Bitte wählen Sie zuerst das Datum.');
    } else {
      let value = {
        from: Math.round(new Date(exportData.from)),
        to: Math.round(new Date(exportData.to)),
        kiosk: exportData.kiosk ? exportData.kiosk : '',
      };
      exportCsvSales(value);
      toast({
        description: 'Downloading the requested file.',
        animation: 'fade left',
        icon: 'info',
        color: 'blue',
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

  return (
    <div
      style={{
        margin: '20px 0',
      }}
    >
      <Grid stackable>
        <Grid.Row verticalAlign="middle">
          <Grid.Column mobile={16} computer={3}>
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>

          <Grid.Column mobile={16} computer={3}>
            <Dropdown
              placeholder="Kiosk"
              selection
              options={kiosks}
              className="full-width"
              onChange={handleKioskChange}
            />
          </Grid.Column>

          {/* <Grid.Column width={4}>
            <SearchInput onChange={changeSearch} timeout={500} />
          </Grid.Column> */}
          <Grid.Column mobile={16} computer={3}>
            <CustomButton
              label="Download CSV&nbsp;"
              icon="arrow down icon"
              className="custom-button-default"
              ScreenWidth={width}
              onClick={DownloadCsv}
              disabled={!Boolean(exportData)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  changeSearch: PropTypes.func,
  changeDate: PropTypes.func,
  changePage: PropTypes.func,
  kiosks: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  exportCsvSales,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
