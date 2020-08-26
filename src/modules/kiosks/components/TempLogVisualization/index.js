import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import DatePicker from 'modules/shared/components/Datepicker';
import ComplexChart from '../ComplexChart';
import { getTemperatureLogs } from '../../actions';

import './styles.less';

const TempLogVisualization = ({ getTemperatureLogs, temperatureLogs }) => {
  useEffect(() => {
    getTemperatureLogs({});
  }, []);

  const handleDateChange = value => {
    let date = '';
    if (value) {
      date = value.reduce((prev, curr, i) => {
        const key = i % 2 ? '$lte' : '$gte';
        prev[key] = i % 2
          ? `${format(curr, 'yyyy-MM-dd')}T23:59:59.999Z`
          : `${format(curr, 'yyyy-MM-dd')}T00:00:00.000Z`;
        return prev;
      }, {});
    }
    // changePage(0);
    // changeDate(date);
    // if (date.$gte && date.$lte) {
    //   changeExportData({
    //     from: date.$gte,
    //     to: date.$lte,
    //     kiosk: exportData.kiosk ? exportData.kiosk : '',
    //   });
    // }
  };

  return (
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <SegmentHeader>
            <Header as="h4" color="black">
              <Header.Content>Temperature Log</Header.Content>
            </Header>
          </SegmentHeader>
          <Grid>
            <Grid.Row className="temp-log-filter-row">
              <Grid.Column width={4}>
                <DatePicker type="range" onChange={handleDateChange} />
              </Grid.Column>
              <Grid.Column width={4}>
                <Button
                  style={{
                    background: 'white',
                    border: '1px solid rgba(34,36,38,.15)',
                  }}
                // onClick={DownloadCsv}
                // disabled={!Boolean(exportData)}
                >
                  Download CSV&nbsp;&nbsp;
                  <i className="arrow down icon" />
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16} computer={16}>
                <ComplexChart data={temperatureLogs} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

TempLogVisualization.propTypes = {

};

const mapStateToProps = state => ({
  temperatureLogs: [{ month: 'Jan', Name1: 22 }, { month: 'Feb', Name1: 18 }, { month: 'Mar', Name1: 29 }],
});

const mapDispatchToProps = {
  getTemperatureLogs,
};


export default connect(mapStateToProps, mapDispatchToProps)(TempLogVisualization);
