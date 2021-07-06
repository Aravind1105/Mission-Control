import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header } from 'semantic-ui-react';
import format from 'date-fns/format';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import CustomButton from 'modules/shared/components/CustomButton';
import DatePicker from 'modules/shared/components/Datepicker';
import { toast } from 'react-semantic-toasts';
import {
  getKioskSingle,
  getActivityLogsState,
  getTotalActivityLogs,
} from '../selectors';
import { getActivityLogs } from '../actions';

import './styles.less';

const sortDefault = [
  {
    column: 'created',
    direction: 'DESC',
  },
];

const columns = [
  {
    title: 'Date/Time',
    field: 'created',
    formatter: ({ created }) => {
      let [date, time] = created.split(' ');
      return (
        <div style={{ textAlign: 'left', width: '120px' }}>
          {date}, {time}
        </div>
      );
    },
    className: 'ActivityLog',
  },
  {
    title: 'Event',
    field: 'event',
    formatter: ({ event }) => {
      if (event.doorStatus !== null && event.doorStatus !== undefined)
        return `Door Status: ${event.doorStatus}`;
      else if (
        event.touchedScales !== null &&
        event.touchedScales !== undefined &&
        event.touchedScales.length > 0
      ) {
        let len = event.touchedScales.length;
        let Scallen = event.scales.length;
        return (
          `Products Touched -     Cable ID:` +
          event.touchedScales[0].id +
          ' / Weight:' +
          event.touchedScales[0].weight +
          ',' +
          event.touchedScales.slice(1, len).map(scl => {
            return (
              '\n\t\t\t\t\t\t Cable ID: ' + scl.id + ' / Weight:' + scl.weight
            );
          }) +
          '\n\n Product Taken -             Cable ID:' +
          event.scales[0].id +
          ' / Weight:' +
          event.scales[0].weight +
          ',' +
          event.scales.slice(1, Scallen).map(scl => {
            return (
              '\n\t\t\t\t\t\t Cable ID: ' + scl.id + ' / Weight:' + scl.weight
            );
          })
        );
      } else if (
        event.touchedScales !== null &&
        event.touchedScales !== undefined &&
        event.touchedScales.length === 0
      ) {
        return `Products Touched - Empty`;
      } else if (
        event.paymentTerminal !== null &&
        event.paymentTerminal !== undefined
      )
        return `Payment Terminal: ${event.paymentTerminal}`;
      else return '-';
    },
  },
];

const ActivityLogGrid = ({
  match,
  kiosk,
  total,
  activityLogs,
  getActivityLogs,
}) => {
  const [dateRange, changeDate] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [exportData, changeExportData] = useState(false);
  const { id } = match.params;

  const getData = ({ sort }) => {
    const data = {
      kioskId: !kiosk ? id : kiosk._id,
      skip: page * perPage,
      limit: perPage,
      date: dateRange !== '' && dateRange,
      sort: sort[0].direction === 'ASC' ? 1 : -1,
    };
    getActivityLogs({ data });
  };

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
        kiosk: kiosk._id ? kiosk._id : '',
      };
      //   exportCsvRefills(value);
      // toast({ description: 'Downloading the requested file.', animation: 'fade left', icon: 'info', color: 'blue' });
    }
  };

  useEffect(() => {
    getData({ sort });
  }, [id, page, perPage, dateRange]);

  return (
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <SegmentHeader>
            <Header as="h4" color="black">
              <Header.Content>Activity Log</Header.Content>
            </Header>
          </SegmentHeader>
          <Grid stackable>
            <Grid.Row className="activity-log-filter-row">
              <Grid.Column mobile={16} computer={4}>
                <DatePicker type="range" onChange={handleDateChange} />
              </Grid.Column>
              <Grid.Column mobile={16} computer={4}>
                <CustomButton
                  label="Download CSV&nbsp;"
                  icon="arrow down icon"
                  className="custom-button-default"
                  onClick={DownloadCsv}
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid.Row className="activity-log-filter-row">
            <Grid.Column>
              <CustomTable
                sortByColumn="created"
                sortable
                data={activityLogs || []}
                getData={getData}
                columns={columns}
                setSortByInCaller={sort => setSort([sort])}
                sortDirection="DESC"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Pagination
                totalCount={total}
                page={page}
                perPage={perPage}
                changePage={changePage}
                changePerPage={changePerPage}
              />
            </Grid.Column>
          </Grid.Row>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  activityLogs: getActivityLogsState(state),
  total: getTotalActivityLogs(state),
});
const mapDispatchToProps = {
  getActivityLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogGrid);
