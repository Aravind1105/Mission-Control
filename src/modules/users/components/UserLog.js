import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Grid, Segment, Header } from 'semantic-ui-react';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import CustomButton from 'modules/shared/components/CustomButton';
import Pagination from 'modules/shared/components/Pagination';
import DatePicker from 'modules/shared/components/Datepicker';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import {
  getUserLogsState,
  getTotalUserLogs,
  getActiveUserIDState,
  getUserInitValues,
} from '../selectors';
import { getUserTransactions, getOneUserWithInfo } from '../actions';

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
      return `${date}, ${time}`;
    },
  },
  {
    title: 'Event',
    field: 'event',
    formatter: ({ event }) => {
      let kiosk = '',
        type = '',
        touched = '',
        prodTaken = '',
        paymentDetails = '';
      if (event.kiosk !== null && event.kiosk !== undefined)
        kiosk = (
          <div id="ev-title">
            Session Started:
            <span style={{ paddingLeft: '20px' }}>Kiosk - {event.kiosk}</span>
          </div>
        );
      if (event.type !== null && event.type !== undefined)
        type = (
          <div id="ev-title">
            Session Type:
            <span style={{ paddingLeft: '33px' }}>{event.type}</span>
          </div>
        );
      if (
        event.touchedScales !== null &&
        event.touchedScales !== undefined &&
        event.touchedScales.length > 0
      ) {
        touched = (
          <div id="ev-title">
            Products Taken:
            {event.touchedScales.map((scl, key) => {
              if (key === 0) var displayInline = true;
              return (
                <span
                  id="prod-touch"
                  style={
                    displayInline && {
                      display: 'inline-block',
                      paddingLeft: '8px',
                    }
                  }
                >
                  Name: {scl.name} / Qty: {scl.qty} / Price: {scl.price}
                </span>
              );
            })}
          </div>
        );
      }
      if (
        event.productsTaken !== null &&
        event.productsTaken !== undefined &&
        event.productsTaken.length > 0
      ) {
        prodTaken = (
          <div id="ev-title">
            Products Taken:
            {event.productsTaken.map((prod, key) => {
              if (key === 0) var displayInline = true;
              return (
                <div
                  id="prod-taken"
                  style={
                    displayInline && {
                      display: 'inline-block',
                      paddingLeft: '20px',
                      paddingTop: '0px',
                    }
                  }
                >
                  Name: {prod.name} / Price: {prod.price} / Cable Id: {prod.lc}
                </div>
              );
            })}
          </div>
        );
      }
      if (event.paymentMethod !== null && event.paymentMethod !== undefined) {
        paymentDetails = (
          <div>
            Payment Details:
            {event.paymentMethod.map(pay => {
              return (
                <span style={{ paddingLeft: '15px' }}>
                  {pay.isPaid ? 'PAID' : 'PENDING'} /{' '}
                  {pay.memberId !== null
                    ? `MembercardId: ${pay.memberId}`
                    : pay.stripeId !== null
                    ? `StripeCustomerId: ${pay.stripeId}`
                    : `CardId: No Data Provided`}{' '}
                  / Total: {event.total}
                </span>
              );
            })}
          </div>
        );
      }
      return [kiosk, type, touched, prodTaken, paymentDetails];
    },
  },
];

const UserLog = ({
  match: { params },
  getUserTransactions,
  user,
  isLoading,
  match,
  total,
  userName,
  getOneUserWithInfo,
  initValue,
}) => {
  const [dateRange, changeDate] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  // const [exportData, changeExportData] = useState(false);
  const { id } = match.params;
  const links = [
    {
      name: 'Home',
      link: '/dashboard',
    },
    {
      name: 'Users',
      link: `/users`,
    },
  ];

  const backLink = {
    name: 'Back to users',
    link: '/users',
  };

  const getData = ({ sort }) => {
    const data = {
      search:
        dateRange !== ''
          ? `{"userId": \"${id}\","created":{"$gte":\"${dateRange.$gte}\"${
              dateRange.$lte ? `,"$lte":\"${dateRange.$lte}\"` : ''
            }}}`
          : `{"userId": \"${id}\"}`,
      skip: page * perPage,
      limit: perPage,
      sort: sort,
    };
    getUserTransactions({ data });
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
    // if (date.$gte && date.$lte) {
    //     changeExportData({
    //         from: date.$gte,
    //         to: date.$lte,
    //     });
    // }
  };
  useEffect(() => {
    getData({ sort });
    if (userName.firstName === '') getOneUserWithInfo({ id: params.id });
  }, [id, page, perPage, dateRange]);
  return (
    <>
      {isLoading && <Loader />}
      <Grid>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Breadcrumbs
                backLink={backLink}
                links={links}
                activeLink={`${
                  userName.firstName !== ''
                    ? userName.firstName
                    : initValue.firstName
                } ${
                  userName.lastName !== ''
                    ? userName.lastName
                    : initValue.lastName
                }`}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <SegmentHeader>
                <Header as="h4" color="black">
                  <Header.Content>User Log</Header.Content>
                </Header>
              </SegmentHeader>
              <Grid>
                <Grid.Row className="user-log-filter-row">
                  <Grid.Column width={4}>
                    <DatePicker type="range" onChange={handleDateChange} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <CustomButton
                      label="Download CSV&nbsp;"
                      icon="arrow down icon"
                      className="custom-button-default"
                      // onClick={DownloadCsv}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid.Row className="user-log-filter-row">
                <Grid.Column>
                  <CustomTable
                    sortByColumn="created"
                    sortable
                    data={user || []}
                    columns={columns}
                    getData={getData}
                    excludeSortBy={['event']}
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
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  user: getUserLogsState(state),
  userName: getActiveUserIDState(state),
  initValue: getUserInitValues(state),
  isLoading: state.users.isLoading,
  total: getTotalUserLogs(state),
});
const mapDispatchToProps = {
  getUserTransactions,
  getOneUserWithInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLog);
