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
import Loader from 'modules/shared/components/Loader';
import { isEqual } from 'lodash';

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

const AlertsPage = ({
  getAllKiosks,
  total,
  getAlertsGrid,
  alerts,
  isLoading,
}) => {
  const [dateRange, changeDate] = useState('');
  const [kiosk, changeKiosk] = useState('');
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
      const kio = kiosk ? { kioskId: kiosk } : {};
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
    getAllKiosks({ data: {} });
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, kiosk, alert, dateRange]);

  return (
    <>
      {isLoading && <Loader />}
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
              // searchValue={dateRange || kiosk || alert}
              changePage={changePage}
              // changeSearchPage={changeSearchPage}
              changePerPage={changePerPage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  total: getTotalAlerts(state),
  isLoading: state.kiosks.isLoading,
});

const mapDispatchToProps = {
  getAlertsGrid,
  getAllKiosks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsPage);
