import React, { useState } from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Segment, Grid, Dropdown, Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { exportCsvRefills } from '../actions'
import { connect } from 'react-redux';

import DatePicker from 'modules/shared/components/Datepicker';

const Toolbar = ({
  kiosks,
  changeDate,
  changePage,
  changeKiosk,
  productsList,
  changeProduct,
  exportCsvRefills,
}) => {

  const [exportData, changeExportData] = useState(false);

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
    if (date.$gte && date.$lte) {
      changeExportData({
        from: date.$gte,
        to: date.$lte,
        kiosk: exportData.kiosk? exportData.kiosk: "",
      });
    }
  };

  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
    changeExportData({
      from : exportData.from? exportData.from:"",
      to : exportData.to? exportData.to:"",
      kiosk: value
    });
  };

  const DownloadCsv = () => {
    if(exportData.from == "" && exportData.to == ""){
      window.alert('Bitte wählen Sie zuerst das Datum.');
    }else {
      let value = {
        from : Math.round(new Date(exportData.from)),
        to : Math.round(new Date(exportData.to)),
        kiosk: exportData.kiosk? exportData.kiosk: "",
      }
      exportCsvRefills(value);
      window.alert('Datei wird heruntergeladen.');
    }
  };

  const handleProductChange = (e, { value }) => {
    changeProduct(value);
  };

  return (
    <Segment className="toolbar">
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3}>
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Dropdown
              placeholder="Kiosk"
              selection
              options={kiosks}
              className="full-width"
              onChange={handleKioskChange}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Button 
              style={{ background:"white", border: "1px solid rgba(34,36,38,.15)" }}
              onClick={DownloadCsv}
              disabled={!Boolean(exportData)}>
                Download CSV&nbsp;&nbsp;
                <i className="arrow down icon"/>
            </Button>
          </Grid.Column>
          {/* <Grid.Column width={3}>
            <Dropdown
              placeholder="Product"
              selection
              className="full-width"
              options={productsList}
              onChange={handleProductChange}
            />
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  changeDate: func,
  changePage: func,
  changeKiosk: func,
  kiosks: arrayOf(object),
};

const mapStateToProps = state => ({
});
const mapDispatchToProps = {
  exportCsvRefills,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

