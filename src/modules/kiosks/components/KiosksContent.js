import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Unitable } from 'modules/shared/components/unitableReloaded';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import Loader from 'modules/shared/components/Loader';
import { getKiosksWithSearch } from '../selectors';
import { loadKiosksSaga } from '../actions';

const columns = [
  {
    name: 'Name',
  },
  {
    name: 'DoorStatus',
    mapDataFrom: 'doorStatus',
  },
  {
    name: 'Temperature',
    mapDataFrom: 'temperature.value',
  },
  {
    name: 'Last HeartBeat',
    mapDataFrom: 'temperature.updated',
    type: 'timeDifference',
  },
  {
    name: 'Serial',
    mapDataFrom: 'serialNumber',
  },
  {
    name: 'Address',
    mapDataFrom: 'ownerOrganization.address.0.properties.city',
  },
  {
    name: 'Sales',
    postfix: ' €',
  },
];

const KiosksContent = ({ isLoading, loadKiosksSaga, kiosks, history }) => {
  useEffect(() => {
    if (!isLoading) loadKiosksSaga();
  }, []);

  const clickRow = ({ _id }) => {
    history.push(`/kiosks/detail/${_id}`);
  };
  return (
    <>
      {isLoading && <Loader />}
      <Segment>
        <TableWithPagination list={kiosks}>
          <Unitable
            columns={columns}
            onRowClick={clickRow}
            clickArgs={['_id']}
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
