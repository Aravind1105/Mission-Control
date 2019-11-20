import React, { useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Pagination, Container } from 'semantic-ui-react';
import { Unitable } from 'modules/shared/components/unitableReloaded';
import { loadOrganizationsSaga } from '../actions/organizationsActions';
import OrganizationModal from './OrganizationModal';
import ProductModal from '../../products/components/ProductModal';

const OrganizationsContent = ({
  history, loadOrganizations, organizations, match,
}) => {
  useEffect(() => {
    loadOrganizations();
  }, []);

  const clickRow = ({ slug }) => {
    history.push(`${slug}/detail`);
  };

  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Type',
    },
    {
      name: 'Fridges',
      mapDataFrom: 'fridges',
    },
    {
      name: 'Address',
      type: 'address',
    },
    {
      name: 'Users',
    },
  ];

  return (
    <>
      <Segment>
        <Unitable
          data={organizations}
          columns={columns}
          onRowClick={clickRow}
          clickArgs={['slug']}
          sortable
          sortByColumn="name"
        />
        {false && (
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
      <Route
        path={`${match.url}/add/new`}
        render={props => <OrganizationModal open {...props} title="Add a new pro" />}
      />
    </>
  );
};

const mapStateToProps = state => ({
  organizations: state.organizations,
});

const mapDispatchToProps = dispatch => ({
  loadOrganizations: () => dispatch(loadOrganizationsSaga()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OrganizationsContent),
);
