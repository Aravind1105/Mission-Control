import React, { useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { Unitable } from 'modules/shared/components/unitableReloaded';
import Loader from 'modules/shared/components/Loader';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import OrganizationModal from './OrganizationModal';
import { getOrganizationsState } from '../selectors';
import { getOrganizations } from '../actions';

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

const OrganizationsContent = ({
  organizations,
  isLoading,
  history,
  loadOrganizations,
  match,
}) => {
  useEffect(() => {
    if (!isLoading) loadOrganizations();
  }, []);

  const clickRow = ({ slug }) => {
    history.push(`${slug}/detail`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Segment>
        <TableWithPagination list={organizations}>
          <Unitable
            columns={columns}
            onRowClick={clickRow}
            clickArgs={['slug']}
            sortable
            selectable
            sortByColumn="name"
          />
        </TableWithPagination>
      </Segment>
      <Route
        path={`${match.url}/add/new`}
        render={props => (
          <OrganizationModal open {...props} title="Add a new pro" />
        )}
      />
    </>
  );
};

const mapStateToProps = state => ({
  organizations: getOrganizationsState(state),
  isLoading: state.organizations.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loadOrganizations: () => dispatch(getOrganizations()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationsContent),
);
