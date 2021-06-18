import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { isEmpty } from 'lodash';
import DatePicker from 'modules/shared/components/Datepicker';
import CustomButton from 'modules/shared/components/CustomButton';
import ComplexChart from '../ComplexChart';
import { getTemperatureLogs, getKiosk, exportCsvTempLogs } from '../../actions';
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

const TempLogVisualization = ({
  match,
  kiosk,
  getTemperatureLogs,
  temperatureLogs,
  getKiosk,
  exportCsvTempLogs,
}) => {
  const [resolution, setResolution] = useState(optionsResolution[1].value);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const { id } = match.params;
  const [exportData, setExportData] = useState({});

  const getData = id =>
    getTemperatureLogs({
      kioskId: kiosk === null ? id : kiosk._id,
      resolution,
      ...dateRange,
    });
  useEffect(() => {
    getData(id);
  }, [id, resolution, dateRange]);

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
    if (date.$gte && date.$lte) {
      setDateRange({ from: date.$gte, to: date.$lte });
    } else {
      setDateRange(defaultDateRange);
    }

    if (date.$gte && date.$lte) {
      setExportData({
        from: date.$gte,
        to: date.$lte,
        kiosk: kiosk === null ? id : kiosk._id,
      });
    }
  };

  const handleChangeResolution = ({ value }) => {
    setResolution(value);
  };

  const DownloadCsv = () => {
    let value = {
      from: Math.round(new Date(exportData.from)),
      to: Math.round(new Date(exportData.to)),
      kiosk: exportData.kiosk,
    };
    exportCsvTempLogs(value);
    toast({
      description: 'Downloading the requested file.',
      animation: 'fade left',
      icon: 'info',
      color: 'blue',
    });
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
              <Grid.Column mobile={16} computer={4}>
                <DatePicker type="range" onChange={handleDateChange} />
              </Grid.Column>
              <Grid.Column mobile={16} computer={4}>
                <Select
                  onChange={handleChangeResolution}
                  options={optionsResolution}
                  defaultValue={optionsResolution[1]}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={3}>
                <CustomButton
                  label="Download CSV&nbsp;"
                  icon="arrow down icon"
                  className="custom-button-default"
                  onClick={DownloadCsv}
                  disabled={isEmpty(exportData)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16} computer={16}>
                <ComplexChart
                  data={temperatureLogs}
                  xAxisDataKey={resolution}
                />
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
  getKiosk,
  exportCsvTempLogs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TempLogVisualization);
