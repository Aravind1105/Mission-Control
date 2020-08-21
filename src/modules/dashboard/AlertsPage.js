import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Pagination from 'modules/shared/components/Pagination';
import {
  getKiosksAlertsForTable,
  getTotalAlerts,
} from 'modules/kiosks/selectors';
import { getAlertsGrid, getAllKiosks } from 'modules/kiosks/actions';
import AlertsTable from './components/AlertsTable';

const sortDefault = [
  {
    column: 'startDate',
    direction: 'ASC',
  },
];

const sortValue = {
  startDate: 'startDate',
  type: 'type',
  scale: 'scale',
  'details.kioskId.name': 'details.kioskId.name',
};

const AlertsPage = ({ getAllKiosks, total, getAlertsGrid, alerts }) => {
  const [dateRange, changeDate] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [alert, changeAlert] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    if (dateRange || kiosk || alert) {
      const date = dateRange ? { startDate: dateRange } : {};
      const kio = kiosk ? { kioskId: kiosk } : {};
      const al = alert ? { type: alert } : {};
      data.search = JSON.stringify({
        ...date,
        ...kio,
        ...al,
      });
      data.skip = 0;
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAlertsGrid({ data });
  };

  useEffect(() => {
    getAllKiosks({ data: {} });
  }, []);

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
            getData={getData}
            setSortByInCaller={sort => setSort([sort])}
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
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  total: getTotalAlerts(state),
});

const mapDispatchToProps = {
  getAlertsGrid,
  getAllKiosks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsPage);
