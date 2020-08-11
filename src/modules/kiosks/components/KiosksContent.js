import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomTable from 'modules/shared/components/CustomTable';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import Loader from 'modules/shared/components/Loader';
import CellHeartbeat from './CellHeartbeat';
import { getKiosksWithSearch } from '../selectors';
import { getAllKiosks } from '../actions';

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

const KiosksContent = ({ isLoading, getAllKiosks, kiosks, history }) => {
  useEffect(() => {
    if (!isLoading) getAllKiosks();
  }, []);

  const handlerClickRow = ({ _id }) => {
    history.push(`/kiosks/detail/${_id}`);
  };
  return (
    <>
      {isLoading && <Loader />}
      <Segment>
        <TableWithPagination list={kiosks}>
          <CustomTable
            columns={columns}
            onRowClick={handlerClickRow}
            sortable
            selectable
            sortByColumn="name"
          />
        </TableWithPagination>
      </Segment>
    </>
  );
};

const mapStateToProps = (state, { search }) => ({
  kiosks: getKiosksWithSearch(search)(state),
  isLoading: state.kiosks.isLoading,
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
