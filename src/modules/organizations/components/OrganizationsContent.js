import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Pagination, Container } from 'semantic-ui-react';
import { Unitable } from 'modules/shared/components/unitableReloaded';
import { loadOrganizationsSaga } from '../actions/organizationsActions';

const OrganizationsContent = ({
  history,
  loadOrganizations,
  organizations,
}) => {
  useEffect(() => {
    loadOrganizations();
  }, []);

  const clickRow = ({ id }) => {
    console.log('I: ', id);
    history.push(`organizations/organization/${id}`);
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
    },
    {
      name: 'Users',
    },
  ];

  return (
    <Segment>
      <Unitable
        data={organizations}
        columns={columns}
        onRowClick={clickRow}
        clickArgs={['id']}
        sortable
        selectable
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
