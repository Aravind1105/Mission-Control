import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import { getKiosksAlertsForTable } from 'modules/kiosks/selectors';
import { getAlertsGrid } from 'modules/kiosks/actions';
import AlertsTable from './components/AlertsTable';

const sortDefault = [
  {
    column: 'startDate',
    direction: 'DESC',
  },
];

const defaultFilterValues = { dateRange: '', kiosk: '', alert: '' };

const sortValue = {
  startDate: 'startDate',
  type: 'type',
  scale: 'scale',
  'details.kioskId.name': 'details.kioskId.name',
};

const AlertsPage = ({ getAlertsGrid, alerts, isLoading }) => {
  const [dateRange, changeDate] = useState('');
  const [kiosk, changeKiosk] = useState([]);
  const [alert, changeAlert] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaultFilterValues);

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
      const dateIndex = isEqual(dateRange, filter.dateRange);
      const kioskIndex = isEqual(kiosk, filter.kiosk);
      const alertIndex = isEqual(alert, filter.alert);

      if (!dateIndex || !kioskIndex || !alertIndex) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filter,
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
            getData={getData}
            isLoading={isLoading}
            setSortByInCaller={sort => setSort([sort])}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  isLoading: state.kiosks.isAlertsLoading,
});

const mapDispatchToProps = {
  getAlertsGrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsPage);
