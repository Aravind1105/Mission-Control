import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Pagination } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Unitable } from 'modules/shared/components/unitableReloaded';
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

const KiosksContent = ({ loadKiosks, kiosks, history }) => {
  const [page, setPage] = useState(0);
  const perPage = 10;
  const totalPages = Math.ceil(kiosks.length / perPage);

  useEffect(() => {
    loadKiosks();
  }, []);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage - 1);
  };

  const clickRow = ({ _id }) => {
    history.push(`/kiosks/${_id}/detail`);
  };

  const kioskList = kiosks.slice(page * perPage, page * perPage + perPage);

  return (
    <Segment>
      <Unitable
        data={kioskList}
        columns={columns}
        onRowClick={clickRow}
        clickArgs={['_id']}
        sortable
        selectable
        sortByColumn="name"
      />
      {kioskList.length ? (
        <Container textAlign="center">
          <Pagination
            activePage={1 + page}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            onPageChange={handlePageChange}
          />
        </Container>
      ) : null}
    </Segment>
  );
};

const mapStateToProps = (state, { search }) => ({
  kiosks: state.kiosks.filter(({ name }) =>
    name.toUpperCase().includes(search.toUpperCase()),
  ),
});

const mapDispatchToProps = dispatch => ({
  loadKiosks: () => dispatch(loadKiosksSaga()),
});

KiosksContent.propTypes = {
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadKiosks: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KiosksContent),
);
