import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Pagination } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Unitable, valueEquals, conditionalValue } from '../../shared/components/unitableReloaded';
import { loadKiosksSaga } from '../actions/kioskActions';

const KiosksContent = ({ loadKiosks, kiosks, history }) => {
  useEffect(() => {
    loadKiosks();
  }, []);

  const clickRow = ({ _id }) => {
    history.push(`/kiosks/${_id}/detail`);
  };

  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Status',
      positive: valueEquals('Active'),
      negative: valueEquals('Offline'),
      warning: valueEquals('Issue'),
      icon: conditionalValue([['Offline', 'attention']]),
    },
    {
      name: 'Serial',
      mapDataFrom: 'Serial',
    },
    {
      name: 'Address',
    },
    {
      name: 'Sales',
      postfix: ' €',
    },
    {
      name: 'Level',
      type: 'progress',
    },
  ];

  return (
    <Segment>
      <Unitable
        data={kiosks}
        columns={columns}
        onRowClick={clickRow}
        clickArgs={['_id']}
        sortable
        selectable
        sortByColumn="name"
      />
      {true && (
        <Container textAlign="center">
          <Pagination
            style={{ marginTop: '10px' }}
            defaultActivePage={1}
            boundaryRange={0}
            onPageChange={null}
            size="mini"
            siblingRange={1}
            totalPages={1}
          />
        </Container>
      )}
    </Segment>
  );
};

const mapStateToProps = state => ({
  kiosks: state.kiosks,
});

const mapDispatchToProps = dispatch => ({
  loadKiosks: () => dispatch(loadKiosksSaga()),
});

KiosksContent.propTypes = {
  kiosks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadKiosks: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(KiosksContent),
);
