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
import { getKioskSingle, getActivityLogsState, getTotalActivityLogs } from '../selectors';
import { getActivityLogs } from '../actions';

import './styles.less';

const columns = [
    {
        title: 'Date/Time',
        field: 'date',
    },
    {
        title: 'Event',
        field: 'event',
        formatter: ({ event }) => {
            if (event.doorStatus !== null && event.doorStatus !== undefined)
                return `Door Status: ${event.doorStatus}`
            else if (event.touchedScales !== null && event.touchedScales !== undefined && event.touchedScales.length > 0) {
                return `Products Touched -` +
                    event.touchedScales.map((scl) => {
                        return ` Weight: ${scl.weight}g / Cable Id: ${scl.id}`
                    })
            }
            else if (event.touchedScales !== null && event.touchedScales !== undefined && event.touchedScales.length === 0) {
                return `Products Touched - Empty`
            }
            else if (event.paymentTerminal !== null && event.paymentTerminal !== undefined)
                return `Payment Terminal: ${event.paymentTerminal}`
        }
    },
];



const ActivityLogGrid = ({ kiosk, total, activityLogs, getActivityLogs }) => {
    const [dateRange, changeDate] = useState('');
    const [page, changePage] = useState(0);
    const [perPage, changePerPage] = useState(25);
    const [exportData, changeExportData] = useState(false);

    const getData = ({ }) => {
        const data = {
            kioskId: kiosk._id,
            skip: page * perPage,
            limit: perPage,
            date: dateRange !== '' && dateRange
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
        getData({});
    }, [page, perPage, dateRange]);

    return (
        <Grid.Row>
            <Grid.Column>
                <Segment>
                    <SegmentHeader>
                        <Header as="h4" color="black">
                            <Header.Content>Activity Log</Header.Content>
                        </Header>
                    </SegmentHeader>
                    <Grid>
                        <Grid.Row className="activity-log-filter-row">
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
                                    onClick={DownloadCsv}
                                    disabled={!Boolean(exportData)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid.Row className="activity-log-filter-row">
                        <Grid.Column>
                            <CustomTable
                                sortByColumn="date"
                                sortable
                                fixed
                                data={activityLogs}
                                columns={columns}
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
    total: getTotalActivityLogs(state)
});
const mapDispatchToProps = {
    getActivityLogs
};


export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogGrid);
