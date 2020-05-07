import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomTable from 'modules/shared/components/unitableReloaded/CustomTable';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import Loader from 'modules/shared/components/Loader';
import CellHeartbeat from './CellHeartbeat';
import { getKiosksWithSearch } from '../selectors';
import { loadKiosksSaga } from '../actions';

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
    title: 'Last HeartBeat',
    field: 'temperature.updated',
    formatter: ({ temperature }) => <CellHeartbeat temperature={temperature} />,
  },
  {
    title: 'Serial',
    field: 'serialNumber',
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
  {
    title: 'Sales',
    field: 'sales',
    formatter: ({ sales = 'N.A.' }) => `${sales}  €`,
  },
];

const KiosksContent = ({ isLoading, loadKiosksSaga, kiosks, history }) => {
  useEffect(() => {
    if (!isLoading) loadKiosksSaga();
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
  loadKiosksSaga,
};

KiosksContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadKiosksSaga: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KiosksContent),
);
