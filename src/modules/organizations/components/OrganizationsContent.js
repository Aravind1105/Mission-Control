import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import get from 'lodash/get';

import history from 'lib/history';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import { getOrganizationsState } from '../selectors';
import { getOrganizations } from '../actions';

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Type',
    field: 'address.0.type',
  },
  {
    title: 'Fridges',
    field: 'fridges',
  },
  {
    title: 'Address',
    field: 'address',
    formatter: ({ address }) => {
      const { city = '', line1 = '' } = get(address, '0.properties', {});
      const adr = [city, line1].filter(el => Boolean(el)).join(', ');
      return adr || 'N.A.';
    },
  },
  {
    title: 'Users',
    field: 'user',
  },
];

const OrganizationsContent = ({
  organizations,
  isLoading,
  getOrganizations,
}) => {
  useEffect(() => {
    if (!isLoading) getOrganizations();
  }, []);

  const clickRow = ({ slug }) => {
    history.push(`detail/${slug}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Segment>
        <TableWithPagination list={organizations}>
          <CustomTable
            columns={columns}
            onRowClick={clickRow}
            sortable
            selectable
            sortByColumn="name"
          />
        </TableWithPagination>
      </Segment>
    </>
  );
};

const mapStateToProps = state => ({
  organizations: getOrganizationsState(state),
  isLoading: state.organizations.isLoading,
});

const mapDispatchToProps = {
  getOrganizations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationsContent);
