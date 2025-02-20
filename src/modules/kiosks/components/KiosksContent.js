import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import Loader from 'modules/shared/components/Loader';
import CellHeartbeat from './CellHeartbeat';
import CellDoorStatus from './CellDoorStatus';
import CellSessionStatus from './CellSessionStatus';
import CellTemp from './CellTemp';
import {
  getTotalKiosks,
  getKiosksTableState,
  getPaginationState,
} from '../selectors';
import {
  getAllKiosksForTable,
  setPage as changePage,
  setPerPage as changePerPage,
  setSort,
  setFilters,
} from '../actions';
import { getUserType } from 'modules/authentication/selectors';
import './styles.less';

const sortValue = {
  name: 'name',
  doorStatus: 'doorStatus',
  serialNumber: 'serialNumber',
  'ownerOrganization.name': 'ownerOrganization.name',
  dayIncome: 'dayIncome',
  'heartbeat.updated': 'heartbeat.updated',
};

const screenWidth = window.innerWidth;
let isSuperAdmin = false;

const KiosksContent = ({
  isLoading,
  getAllKiosksForTable,
  kiosks,
  history,
  total,
  search,
  kiosk,
  kioskStatus,
  organization,
  changePage,
  changePerPage,
  setSort,
  setFilters,
  paginationState,
  userType,
}) => {
  const { page, perPage, sort, filters } = paginationState;
  if (userType !== 'Admin') {
    isSuperAdmin = true;
  }
  const columns = [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Serial Number',
      field: 'serialNumber',
      formatter: ({ serialNumber }) => {
        if (serialNumber.length > 20) {
          return serialNumber.substring(0, 15) + '...';
        } else return serialNumber;
      },
    },
    {
      title: 'Network Status',
      field: 'heartbeat.updated,temperature.updated',
      formatter: ({ heartbeat, temperature }) => (
        <CellHeartbeat
          heartbeat={heartbeat}
          temperature={temperature}
          showTime
        />
      ),
    },
    {
      title: 'Session',
      field: 'session',
      formatter: ({ doorStatus, session }) => (
        <CellSessionStatus doorStatus={doorStatus} session={session} />
      ),
    },
    {
      title: 'Door Status',
      field: 'doorStatus',
      formatter: ({ doorStatus, session }) => (
        <CellDoorStatus doorStatus={doorStatus} session={session} />
      ),
    },
    {
      title: 'Temperature',
      field: 'temperature.value',
      formatter: ({ temperature }) => {
        if (screenWidth < 750) {
          return (
            <div style={{ textAlign: 'left' }}>
              <CellTemp temperature={temperature} />
            </div>
          );
        } else {
          return (
            <div style={{ textAlign: 'center' }}>
              <CellTemp temperature={temperature} />
            </div>
          );
        }
      },
    },
    {
      title: 'Address',
      field: 'location',
      formatter: ({ location: { address } }) => {
        const { postalCode, city } = address || {};
        const addr = [postalCode, city, !postalCode && !city && 'N.A.']
          .filter(el => Boolean(el))
          .join(', ');
        return addr;
      },
    },
    {
      title: 'Sales Today',
      field: 'dayIncome',
      // formatter: ({ dayIncome }) => `€ ${dayIncome}`,
      formatter: ({ dayIncome }) => {
        if (dayIncome === '') {
          return '';
        } else if (screenWidth < 750) {
          return <div style={{ textAlign: 'left' }}>{dayIncome}€ </div>;
        }
        return <div style={{ textAlign: 'right' }}>{dayIncome}€ </div>;
      },
    },
  ];
  if (isSuperAdmin) {
    columns.splice(6, 0, {
      title: 'Organization',
      field: 'ownerOrganization.name',
    });
    columns.splice(7, 1);
  }
  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || kiosk.length > 0 || kioskStatus || organization) {
      const name = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { serialNumber: { $regex: search, $options: 'i' } },
            ],
          }
        : {};
      const kio = kiosk.length > 0 ? { _id: kiosk } : {};
      const door = kioskStatus ? { doorStatus: kioskStatus } : {};

      const organizationId = organization ? { orgId: organization } : {};

      data.search = JSON.stringify({
        ...name,
        ...kio,
        ...door,
        ...organizationId,
      });
      const searchIndex = isEqual(search, filters.search);
      const kioskIndex = isEqual(kiosk, filters.kiosk);
      const kioskStatusIndex = isEqual(kioskStatus, filters.kioskStatus);

      if (
        !searchIndex ||
        !kioskIndex ||
        !kioskStatusIndex ||
        !kioskStatusIndex
      ) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filters,
          search,
          kiosk,
          kioskStatus,
        });
      }
    }

    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAllKiosksForTable({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, kiosk, kioskStatus, organization]);

  const handlerClickRow = ({ _id }) => {
    history.push(`/kiosks/detail/${_id}`);
  };

  return (
    <>
      <Segment>
        {isLoading && <Loader />}
        <Grid stackable stretched>
          <Grid.Row>
            <Grid.Column>
              <CustomTable
                className="kiosk-table"
                columns={columns}
                data={kiosks}
                onRowClick={handlerClickRow}
                sortable
                excludeSortBy={['temperature.value']}
                selectable
                getData={getData}
                sortByColumn={sort[0].column}
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
                isLoading={isLoading}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

const mapStateToProps = state => ({
  kiosks: getKiosksTableState(state),
  isLoading: state.kiosks.isLoading,
  total: getTotalKiosks(state),
  paginationState: getPaginationState(state),
  userType: getUserType(state),
});

const mapDispatchToProps = {
  getAllKiosksForTable,
  changePage,
  changePerPage,
  setSort,
  setFilters,
};

KiosksContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllKiosksForTable: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KiosksContent),
);
