import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import moment from 'moment';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import CustomButton from 'modules/shared/components/CustomButton';
import DatePicker from 'modules/shared/components/Datepicker';
import Loader from 'modules/shared/components/Loader';
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
      let data = {
        [event.sessionId]: event.type?.includes('Replenishment'),
      };
      if (event.cardDetails.paymentTerminal) {
        let text = '';
        if (
          event.cardDetails.paymentTerminal === 'Valid Card Read' ||
          event.cardDetails.paymentTerminal === 'Invalid Card Read'
        )
          text =
            event.cardDetails.cardName &&
            'Card Type: ' + event.cardDetails.cardName + '\n\n';
        else if (event.cardDetails.paymentTerminal === 'Valid Member Card Read')
          text =
            event.cardDetails.cardId &&
            'Card Id: ' + event.cardDetails.cardId + '\n\n';
        return text + 'Payment Terminal: ' + event.cardDetails.paymentTerminal;
      } else if (event.type)
        return `${
          event.userName ? 'User: ' + event.userName + '\n\n' : ''
        }Session Type: ${event.type} `;
      else if (event.doorStatus) return `Door Status: ${event.doorStatus}`;
      else if (event.alertType) return event.alertType;
      else if (event.touchedScales?.length > 0 || event.scales?.length > 0) {
        let prodTaken;
        if (event.scales?.length > 0) {
          let ScalLen = event.scales.length;
          let ScalResults = event.scales;
          prodTaken =
            ScalResults[0].id +
            '  /  Weight :  ' +
            ScalResults[0].weight +
            ' g' +
            '  /  Name :  ' +
            ScalResults[0].name +
            (ScalResults.length > 1
              ? ',' +
                ScalResults.slice(1, ScalLen).map(scl => {
                  let prodTaken_1 =
                    '\t Cable ID :  ' +
                    scl.id +
                    '  /  Weight :  ' +
                    scl.weight +
                    ' g' +
                    '  /  Name :  ' +
                    scl.name;
                  return event.touchedScales.length > 0
                    ? '\n\t\t\t\t\t\t\t' + prodTaken_1
                    : '\n\t\t\t\t\t' + prodTaken_1;
                })
              : '');
        }
        if (event.touchedScales?.length > 0) {
          let touchedLen = event.touchedScales.length;
          let TouchedResults = event.touchedScales;
          return (
            `Product(s) Touched  - \t Cable ID :  ` +
            TouchedResults[0].id +
            '  /  Weight :  ' +
            TouchedResults[0].weight +
            ' g' +
            '  /  Name :  ' +
            TouchedResults[0].name +
            (TouchedResults.length > 1
              ? ',' +
                TouchedResults.slice(1, touchedLen).map(scl => {
                  return (
                    '\n\t\t\t\t\t\t\t Cable ID :  ' +
                    scl.id +
                    '  /  Weight :  ' +
                    scl.weight +
                    ' g' +
                    '  /  Name :  ' +
                    scl.name
                  );
                }) +
                (prodTaken
                  ? `\n\n${
                      data[event.sessionId]
                        ? 'Product(s) Replenished'
                        : 'Product(s) Taken'
                    }   - \t\t Cable ID :  ` + prodTaken
                  : '')
              : prodTaken
              ? `\n\n${
                  data[event.sessionId]
                    ? 'Product(s) Replenished'
                    : 'Product(s) Taken'
                }  - \t\t Cable ID :  ` + prodTaken
              : '')
          );
        } else
          return (
            `${
              data[event.sessionId]
                ? 'Product(s) Replenished'
                : 'Product(s) Taken'
            }  - \t Cable ID :  ` + prodTaken
          );
      } else if (
        event.touchedScales?.length === 0 &&
        event.scales?.length === 0
      )
        return `Product Touched/Taken - Empty`;
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
  isLoading,
}) => {
  const startOfMonth = moment()
    .startOf('month')
    .toDate();
  const currentDay = new Date();
  const defaultDate = [startOfMonth, currentDay];

  const [dateRange, changeDate] = useState({
    $gte: defaultDate[0],
    $lte: defaultDate[1],
  });
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
    if (
      (!isEqual(value, defaultDate) && date.$gte && date.$lte) ||
      value === null
    ) {
      changePage(0);
      changeDate(date);
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
          {isLoading && <Loader />}
          <SegmentHeader>
            <Header as="h4" color="black">
              <Header.Content>Activity Log</Header.Content>
            </Header>
          </SegmentHeader>
          <Grid stackable>
            <Grid.Row className="activity-log-filter-row">
              <Grid.Column mobile={16} tablet={8} computer={3}>
                <DatePicker
                  type="range"
                  onChange={handleDateChange}
                  value={defaultDate}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={3}>
                <CustomButton
                  label="Download CSV&nbsp;"
                  icon="arrow down"
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
                className="kiosk-table"
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
