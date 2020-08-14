import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Dropdown, Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { exportCsvSales } from '../actions';
import { connect } from 'react-redux';

import SearchInput from 'modules/shared/components/SearchInput';
import DatePicker from 'modules/shared/components/Datepicker';

const Toolbar = ({
  changeSearch,
  changeDate,
  changePage,
  kiosks,
  changeKiosk,
  exportCsvSales,
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

  const DownloadCsv = () => {
    if(exportData.from == "" && exportData.to == ""){
      window.alert('Bitte wählen Sie zuerst das Datum.');
    }else {
      let value = {
        from : Math.round(new Date(exportData.from)),
        to : Math.round(new Date(exportData.to)),
        kiosk: exportData.kiosk? exportData.kiosk: "",
      }
      exportCsvSales(value);
      window.alert('Datei wird heruntergeladen.');
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

  return (
    <Segment className="toolbar">
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={4}>
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>

          <Grid.Column width={4}>
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
          <Grid.Column width={4}>
            <Button 
              style={{ background:"white", border: "1px solid rgba(34,36,38,.15)" }}
              onClick={DownloadCsv}
              disabled={!Boolean(exportData)}>
                Download CSV&nbsp;&nbsp;
                <i className="arrow down icon"/>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  changeSearch: PropTypes.func,
  changeDate: PropTypes.func,
  changePage: PropTypes.func,
  kiosks: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
});
const mapDispatchToProps = {
  exportCsvSales,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
