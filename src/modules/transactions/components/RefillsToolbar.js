import React, { useState } from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Segment, Grid, Dropdown, Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { exportCsv } from '../actions'
import { connect } from 'react-redux';

import DatePicker from 'modules/shared/components/Datepicker';

const stateOptions = [
  { key: '', value: '', text: 'All' },
  { key: 'Added', value: 'Added', text: 'Added' },
  { key: 'Removed', value: 'Removed', text: 'Removed' },
];

const Toolbar = ({ kiosks, changeDate, changePage, changeKiosk, date, exportCsv}) => {
  
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
    if (date.$gte && date.$lte) changeExportData(date)
  };

  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
  };

  const DownloadCsv = () => {
    let value = {
      from : Math.round(new Date(exportData.$gte)),
      to : Math.round(new Date(exportData.$lte)),
    }
    exportCsv(value);
    window.alert('Datei wird heruntergeladen.')
    changeExportData(false)
  }

  return (
    <Segment className="toolbar">
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={3}>
            <DatePicker type="range" onChange={handleDateChange} />
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
            <Dropdown
              placeholder="Product"
              selection
              className="full-width"
              options={stateOptions}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Dropdown
              placeholder="Added & Removed"
              selection
              options={stateOptions}
              className="full-width"
            />
          </Grid.Column>
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
  exportCsv,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

