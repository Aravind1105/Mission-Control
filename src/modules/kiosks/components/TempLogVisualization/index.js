import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import DatePicker from 'modules/shared/components/Datepicker';
import ComplexChart from '../ComplexChart';
import { getTemperatureLogs } from '../../actions';
import { getKioskSingle, getTemperatureLogsState } from '../../selectors';

import './styles.less';


const dataKeys = {
  MONTH: 'month',
  DAY: 'day',
};

const defaultDateRange = {
  from: new Date(new Date(new Date().setHours(0, 0, 0)).setDate(1)),
  to: new Date(),
};

const optionsResolution = [
  { label: 'Monthly', value: dataKeys.MONTH },
  { label: 'Daily', value: dataKeys.DAY },
];

const TempLogVisualization = ({ kiosk, getTemperatureLogs, temperatureLogs }) => {
  const [resolution, setResolution] = useState(optionsResolution[1].value);
  const [dateRange, setDateRange] = useState(defaultDateRange);

  const getData = () => getTemperatureLogs({ kioskId: kiosk._id, resolution, ...dateRange });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [resolution, dateRange]);

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
    if (date.$gte && date.$lte) {
      setDateRange({ from: date.$gte, to: date.$lte });
    } else {
      setDateRange(defaultDateRange);
    }
  };

  const handleChangeResolution = ({ value }) => {
    setResolution(value);
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
                <Select
                  onChange={handleChangeResolution}
                  options={optionsResolution}
                  defaultValue={optionsResolution[1]}
                />
              </Grid.Column>
              {/* <Grid.Column width={4}>
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
              </Grid.Column> */}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16} computer={16}>
                <ComplexChart data={temperatureLogs} xAxisDataKey={resolution} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  temperatureLogs: getTemperatureLogsState(state),
});

const mapDispatchToProps = {
  getTemperatureLogs,
};


export default connect(mapStateToProps, mapDispatchToProps)(TempLogVisualization);
