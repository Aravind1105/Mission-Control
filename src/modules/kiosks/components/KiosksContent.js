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

const sortDefault = [
  {
    column: 'name',
    direction: 'ASC',
  },
];

const sortValue = {
  name: 'name',
};

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
      }
      else return serialNumber
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
      const addr = [
        postalCode,
        city,
        !postalCode && !city && 'N.A.'
      ]
        .filter(el => Boolean(el))
        .join(', ');
      return addr;
    },
  },
  {
    title: 'Sales Today',
    field: 'dayIncome',
    formatter: ({ dayIncome }) => `€ ${dayIncome}`,
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
  // kioskNetworkStatus,
}) => {
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    // if (doorStatus || kiosk || networkStatus) {
    //   const net = networkStatus ? { networkStatus } : {};
    //   const kio = kiosk ? { kioskId: kiosk } : {};
    //   const door = doorStatus ? { doorStatus } : {};
    //   data.filter = {
    //     ...net,
    //     ...kio,
    //     ...door,
    //   };
    //   data.skip = 0;
    // }

    if (search || kiosk || kioskStatus) {
      const name = search ? { name: { $regexI: search } } : {};
      const kio = kiosk ? { _id: kiosk } : {};
      const door = kioskStatus ? { doorStatus: kioskStatus } : {};

      data.search = JSON.stringify({
        ...name,
        ...kio,
        ...door,
      });
      data.skip = 0;
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

const mapStateToProps = (state, { search }) => ({
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
