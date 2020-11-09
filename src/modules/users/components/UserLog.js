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
import { getUserLogsState, getTotalUserLogs, getActiveUserIDState, getUserInitValues } from '../selectors';
import { getUserTransactions, getOneUserWithInfo } from '../actions';


const sortDefault = [
    {
        column: 'created',
        direction: 'DESC',
    },
];

const sortValue = {
    created: 'created',
    date: 'created'

};

const columns = [
    {
        title: 'Date/Time',
        field: 'date',
    },
    {
        title: 'Event',
        field: 'event',
        formatter: ({ event }) => {
            let kiosk = '', type = '', touched = '', touchedEmpty = '', prodTaken = '', paymentDetails = '';
            if (event.kiosk !== null && event.kiosk !== undefined)
                kiosk = `Session Started - Kiosk - ${event.kiosk} \n`
            if (event.type !== null && event.type !== undefined)
                type = `Session Type - ${event.type} \n`
            if (event.touchedScales !== null && event.touchedScales !== undefined && event.touchedScales.length > 0) {
                touched = `Products Touched -` +
                    event.touchedScales.map((scl) => {
                        return ` Name: ${scl.name} / Qty:${scl.qty}`
                    }) + '\n'
            }
            else if (event.touchedScales === null || event.touchedScales.length === 0)
                touchedEmpty = `Products Touched - Empty \n`
            if (event.productsTaken !== null && event.productsTaken !== undefined && event.productsTaken.length > 0) {
                prodTaken = `Products Taken - ` +
                    event.productsTaken.map(prod => {
                        return ` Name: ${prod.name} / Price:${prod.price} / LoadCell:${prod.lc}`
                    }) + '\n'
            }
            if (event.paymentMethod !== null && event.paymentMethod !== undefined) {
                paymentDetails = `Payment Details - ` +
                    event.paymentMethod.map(pay => {
                        return `isPaid: ${pay.isPaid ? "TRUE" : "FALSE"} / ${pay.memberId !== null ? `MembercardId: ${pay.memberId}` : pay.stripeId !== null ? `StripeCustomerId: ${pay.stripeId}` : `CardId: No Data Provided`} / Total: ${event.total} `
                    }) + '\n'
            }
            return kiosk +
                type +
                (touched || touchedEmpty) +
                prodTaken +
                paymentDetails

        }
    },
];

const UserLog = ({ match: { params }, getUserTransactions, user, isLoading, match, total, userName, getOneUserWithInfo, initValue, setSortByInCaller }) => {
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

    const getData = (id) => {
        const data = {
            search: dateRange !== '' ? `{"created":{"$gte":\"${dateRange.$gte}\"${dateRange.$lte ? `,"$lte":\"${dateRange.$lte}\"` : ''}}}` : `{"userId": \"${id}\"}`,
            skip: page * perPage,
            limit: perPage
        };
        console.log(sort)
        if (sort && sortValue[sort[0].column]) {
            sort[0].column = sortValue[sort[0].column];
            data.sort = sort;
        }
        console.log(sort)
        console.log(data)
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
        getData(id)
        if (userName.firstName === '')
            getOneUserWithInfo({ id: params.id });
    }, [id, page, perPage, dateRange, sort]);
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
                                activeLink={`${userName.firstName !== '' ? userName.firstName : initValue.firstName} ${userName.lastName !== '' ? userName.lastName : initValue.lastName}`}
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
                                        <DatePicker
                                            type="range"
                                            onChange={handleDateChange}
                                        />
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
                                        sortByColumn="date"
                                        sortable
                                        data={user}
                                        columns={columns}
                                        excludeSortBy={['event']}
                                        setSortByInCaller={sort => setSort([sort])}
                                        sortDirection={sort[0].direction}
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
    total: getTotalUserLogs(state)
});
const mapDispatchToProps = {
    getUserTransactions,
    getOneUserWithInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLog);
