import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import Loader from 'modules/shared/components/Loader';
import CellHeartbeat from './CellHeartbeat';
import { getKiosksWithSearch, getTotalKiosks, getKiosksState } from '../selectors';
import { getAllKiosks } from '../actions';

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
    title: 'DoorStatus',
    field: 'doorStatus',
  },
  {
    title: 'Temperature',
    field: 'temperature.value',
  },
  {
    title: 'Status',
    field: 'temperature.updated',
    formatter: ({ temperature }) => <CellHeartbeat temperature={temperature} showTime />,
  },
  {
    title: 'Address',
    field: 'location',
    formatter: ({ location: { address } }) => {
      const { line1, city } = address;
      const addr = [city || '', line1 || '']
        .filter(el => Boolean(el))
        .join(', ');
      return addr || 'N.A.';
    },
  },
];

const KiosksContent = ({ isLoading, getAllKiosks, kiosks, history, total, search }) => {
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

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
    getAllKiosks({ data });
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
        <CustomTable
          columns={columns}
          data={kiosks}
          onRowClick={handlerClickRow}
          sortable
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
  kiosks: getKiosksState(state),
  isLoading: state.kiosks.isLoading,
  total: getTotalKiosks(state),
});

const mapDispatchToProps = {
  getAllKiosks,
};

KiosksContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllKiosks: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KiosksContent),
);
