import React, { useState } from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Grid, Dropdown } from 'semantic-ui-react';
import { exportCsvProducts } from '../actions';
import { connect } from 'react-redux';
import CustomButton from 'modules/shared/components/CustomButton';
import { toast } from 'react-semantic-toasts';
import DatePicker from 'modules/shared/components/Datepicker';

const Toolbar = ({
  kiosks,
  // productsListValue,
  changeDate,
  changeKiosk,
  changeProduct,
  exportCsvProducts,
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

  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
    changeExportData({
      from: exportData.from ? exportData.from : '',
      to: exportData.to ? exportData.to : '',
      kiosk: value,
    });
  };
  const handleProductChange = (e, { value }) => {
    changeProduct(value);
  };

  const DownloadCsv = () => {
    if (exportData.from == '' && exportData.to == '') {
      window.alert('Bitte wählen Sie zuerst das Datum.');
    } else {
      let value = {
        from: Math.round(new Date(exportData.from)),
        to: Math.round(new Date(exportData.to)),
        kioskId: exportData.kioskId ? exportData.kioskId : '',
      };
      exportCsvProducts(value);
      toast({
        description: 'Downloading the requested file.',
        animation: 'fade left',
        icon: 'info',
        color: 'blue',
      });
    }
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
              placeholder="Kiosk"
              selection
              options={kiosks}
              className="full-width"
              onChange={handleKioskChange}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            {/* <Dropdown
              placeholder="All Products"
              selection
              options={productsListValue}
              className="full-width"
              onChange={handleProductChange}
            /> */}
          </Grid.Column>

          <Grid.Column computer={3}></Grid.Column>
          <Grid.Column mobile={16} computer={3}>
            {/* <CustomButton
              label="Download CSV&nbsp;"
              icon="arrow down icon"
              className="custom-button-default"
              onClick={DownloadCsv}
              disabled={!Boolean(exportData)}
            /> */}
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

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  exportCsvProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
