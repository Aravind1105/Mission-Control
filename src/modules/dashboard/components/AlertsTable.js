import React from 'react';
import { Header, Segment, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import history from 'lib/history';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import BackLink from 'modules/shared/components/Breadcrumbs/BackLink';
import Loader from 'modules/shared/components/Loader';
import Pagination from 'modules/shared/components/Pagination';
import { getTotalAlerts } from 'modules/kiosks/selectors';
import Toolbar from './AlertsToolbar';
import { ToolTip } from './Alerts';
import './styles.less';
const backLink = {
  name: 'Back to Dashboard',
  link: '/',
};
import './styles.less';

const AlertsTable = ({
  alerts,
  changeDate,
  changeKiosk,
  changeAlert,
  changePage,
  getData,
  setSortByInCaller,
  isLoading,
  total,
  changePerPage,
  page,
  perPage,
  dateRange,
  kioskFilter,
  alertFilter,
  sortFilter,
}) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Date / Time'),
      field: 'startDate',
      formatter: ({ startDate }) => {
        let [date, time] = startDate.split(' ');
        return `${date}, ${time}`;
      },
    },
    {
      title: t('Alert'),
      field: 'type',
    },
    // {
    //   title: t('Duration'),
    //   field: 'duration',
    // },
    // {
    //   title: t('Severity'),
    //   field: 'severity',
    // },
    // {
    //   title: t('Status'),
    //   field: 'status',
    // },
    {
      title: t('Kiosk'),
      field: 'details.kioskId.name',
    },
  ];
  const handlerClickRow = ({ details }) => {
    if (details.kioskId) {
      history.push(`/kiosks/detail/${details.kioskId._id}`);
    }
  };
  return (
    <Segment>
      {isLoading && <Loader />}
      <SegmentHeader>
        <Header as="h4" color="red">
          <Icon name="exclamation triangle" size="small" />
          <Header.Content>
            Alerts &nbsp;
            <ToolTip />
          </Header.Content>
        </Header>
        <BackLink {...{ ...backLink }} />
      </SegmentHeader>
      <div className="toolbar-container">
        <Toolbar
          changeDate={changeDate}
          dateRange={dateRange}
          changeKiosk={changeKiosk}
          kioskFilter={kioskFilter}
          changeAlert={changeAlert}
          alertFilter={alertFilter}
          changePage={changePage}
        />
      </div>
      <Grid stackable stretched>
        <Grid.Row>
          <Grid.Column>
            <CustomTable
              className="dashboard-table"
              sortable
              sortByColumn={sortFilter[0].column}
              onRowClick={handlerClickRow}
              selectable
              excludeSortBy={[
                'status',
                'duration',
                'type',
                'details.kioskId.name',
              ]}
              fixed
              data={alerts}
              columns={columns}
              getData={getData}
              setSortByInCaller={sort => setSortByInCaller(sort)}
              sortDirection={sortFilter[0].direction}
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
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  total: getTotalAlerts(state),
});

export default connect(mapStateToProps)(AlertsTable);
