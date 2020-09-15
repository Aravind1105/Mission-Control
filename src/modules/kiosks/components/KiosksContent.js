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
      const { name, line1, line2, city, country, postalCode, state } = address;
      const addr = [
        name || '',
        line1,
        line2 || '',
        city,
        state,
        `${postalCode} ${country}`,
      ]
        .filter(el => Boolean(el))
        .join(', ');
      return line1 ? addr : 'N.A.';
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
}) => {
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);
  const [kiosk, changeKiosk] = useState('');
  const [doorStatus, changeDoorStatus] = useState('');
  const [networkStatus, changeNetworkStatus] = useState('');

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

    if (search) {
      const name = search ? { name: { $regexI: search } } : {};

      data.search = JSON.stringify({
        ...name,
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
  }, [page, perPage, search]);

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
