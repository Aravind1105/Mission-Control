import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import { getKiosksAlertsForTable } from 'modules/kiosks/selectors';
import { getAlertsGrid } from 'modules/kiosks/actions';
import {
  setAlertDate as changeDate,
  setAlertPage as changePage,
  setAlertPerPage as changePerPage,
  setAlertKiosk as changeKiosk,
  setAlert as changeAlert,
  setAlertFilters as changeFilter,
  setAlertSort as changeSort,
} from './actions';
import AlertsTable from './components/AlertsTable';

const sortValue = {
  startDate: 'startDate',
  type: 'type',
  scale: 'scale',
  'details.kioskId.name': 'details.kioskId.name',
};

const AlertsPage = ({
  getAlertsGrid,
  alerts,
  isLoading,
  paginationState,
  changeAlert,
  changePage,
  changePerPage,
  changeKiosk,
  changeFilter,
  changeSort,
  changeDate,
}) => {
  const {
    dateRange,
    page,
    perPage,
    sort,
    filters,
    alert,
    kiosk,
  } = paginationState;

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    if (dateRange || kiosk || alert) {
      const date = dateRange ? { startDate: dateRange } : {};
      const kio = kiosk.length > 0 ? { kioskId: kiosk } : {};
      const al = alert ? { type: alert } : {};
      data.search = JSON.stringify({
        ...date,
        ...kio,
        ...al,
      });
      const dateIndex = isEqual(dateRange, filters.dateRange);
      const kioskIndex = isEqual(kiosk, filters.kiosk);
      const alertIndex = isEqual(alert, filters.alert);

      if (!dateIndex || !kioskIndex || !alertIndex) {
        data.skip = 0;
        changePage(0);
        changeFilter({
          ...filters,
          dateRange,
          kiosk,
          alert,
        });
      }
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAlertsGrid({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, kiosk, alert, dateRange]);

  return (
    <Grid className="dashboard">
      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <AlertsTable
            alerts={alerts}
            fullTable
            changeKiosk={changeKiosk}
            changeDate={changeDate}
            changeAlert={changeAlert}
            changePage={changePage}
            changePerPage={changePerPage}
            page={page}
            perPage={perPage}
            dateRange={[dateRange.$gte, dateRange.$lte]}
            kioskFilter={kiosk}
            alertFilter={alert}
            getData={getData}
            isLoading={isLoading}
            setSortByInCaller={sort => changeSort([sort])}
            sortFilter={sort}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  isLoading: state.kiosks.isAlertsLoading,
  paginationState: state.dashboard.alertPagination,
});

const mapDispatchToProps = {
  getAlertsGrid,
  changeDate,
  changeAlert,
  changePage,
  changePerPage,
  changeKiosk,
  changeFilter,
  changeSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsPage);
