import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import Loader from 'modules/shared/components/Loader';
import CellHeartbeat from './CellHeartbeat';
import CellDoorStatus from './CellDoorStatus';
import CellTemp from './CellTemp';
import AllKiosksTableToolbar from './AllKiosksTableToolbar';
import { getTotalKiosks, getKiosksTableState } from '../selectors';
import { getAllKiosksForTable } from '../actions';
import { isEqual } from 'lodash';

const sortDefault = [
  {
    column: 'name',
    direction: 'ASC',
  },
];

const sortValue = {
  name: 'name',
  doorStatus: 'doorStatus',
};

const defaultFilterValues = { search: '', kiosk: '', kioskStatus: '' };

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
    title: 'Door Status',
    field: 'doorStatus',
    formatter: ({ doorStatus, session }) => (
      <CellDoorStatus doorStatus={doorStatus} session={session} />
    ),
  },
  {
    title: 'Temperature',
    field: 'temperature.value',
    formatter: ({ temperature }) => <CellTemp temperature={temperature} />,
  },
  {
    title: 'Network Status',
    field: 'temperature.updated',
    formatter: ({ temperature }) => (
      <CellHeartbeat temperature={temperature} showTime />
    ),
  },
  {
    title: 'Address',
    field: 'location',
    formatter: ({ location: { address } }) => {
      const { postalCode, city } = address;
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
      }
      return <div style={{ textAlign: 'right' }}> {dayIncome}€ </div>;
    },
  },
];

const KiosksContent = ({
  isLoading,
  getAllKiosksForTable,
  kiosks,
  history,
  total,
  search,
  kiosk,
  kioskStatus,
}) => {
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [filter, setFilters] = useState(defaultFilterValues);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || kiosk || kioskStatus) {
      const name = search ? { name: { $regexI: search } } : {};
      const kio = kiosk ? { _id: kiosk } : {};
      const door = kioskStatus ? { doorStatus: kioskStatus } : {};

      data.search = JSON.stringify({
        ...name,
        ...kio,
        ...door,
      });
      const searchIndex = isEqual(search, filter.search);
      const kioskIndex = isEqual(kiosk, filter.kiosk);
      const kioskStatusIndex = isEqual(kioskStatus, filter.kioskStatus);

      if (!searchIndex || !kioskIndex || !kioskStatusIndex) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filter,
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
  }, [page, perPage, search, kiosk, kioskStatus]);

  const handlerClickRow = ({ _id }) => {
    history.push(`/kiosks/detail/${_id}`);
  };
  return (
    <>
      {isLoading && <Loader />}
      <Segment>
        {/* <AllKiosksTableToolbar
          {...{ changeKiosk, changeDoorStatus, changeNetworkStatus }}
        /> */}
        <CustomTable
          columns={columns}
          data={kiosks}
          onRowClick={handlerClickRow}
          sortable
          excludeSortBy={['temperature.value']}
          selectable
          getData={getData}
          sortByColumn="name"
          setSortByInCaller={sort => setSort([sort])}
          sortDirection="ASC"
        />
        <Pagination
          totalCount={total}
          page={page}
          perPage={perPage}
          changePage={changePage}
          changePerPage={changePerPage}
          isLoading={isLoading}
        />
      </Segment>
    </>
  );
};

const mapStateToProps = state => ({
  kiosks: getKiosksTableState(state),
  isLoading: state.kiosks.isLoading,
  total: getTotalKiosks(state),
});

const mapDispatchToProps = {
  getAllKiosksForTable,
};

KiosksContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllKiosksForTable: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KiosksContent),
);
