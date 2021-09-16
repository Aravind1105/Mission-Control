import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dropdown, Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { exportCsvSales } from '../actions';
import { connect } from 'react-redux';
import CustomButton from 'modules/shared/components/CustomButton';
import { toast } from 'react-semantic-toasts';
import DatePicker from 'modules/shared/components/Datepicker';
import SelectCheckBoxes from '../../shared/components/SelectCheckBoxes';

const Toolbar = ({
  changeDate,
  kiosks,
  changeKiosk,
  exportCsvSales,
  isKiosksListLoading,
}) => {
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

  const DownloadCsv = () => {
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
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={3}>
            <SelectCheckBoxes
              title="Kiosks"
              options={kiosks}
              allOptionKey="all"
              onClickApply={handleKioskChange}
              isLoading={isKiosksListLoading}
            />
          </Grid.Column>

          {/* <Grid.Column width={4}>
            <SearchInput onChange={changeSearch} timeout={500} />
          </Grid.Column> */}
          <Grid.Column mobile={16} tablet={8} computer={3}>
            <CustomButton
              label="Download CSV&nbsp;"
              icon="arrow down"
              className="custom-button-default"
              onClick={DownloadCsv}
              // disabled={Boolean(exportData)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  changeDate: PropTypes.func,
  kiosks: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  isKiosksListLoading: state.kiosks.isKiosksListLoading,
});
const mapDispatchToProps = {
  exportCsvSales,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
