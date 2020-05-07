import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { primaryColor, red, orange, teal } from 'lib/colors';
import CustomTable from 'modules/shared/components/unitableReloaded/CustomTable';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import UsersDetail from './UsersDetail';
import { getUsers, setActiveUser } from '../actions';
import { getUsersListForTable, getActiveUserIDState } from '../selectors';

const colors = {
  Consumer: primaryColor,
  Admin: red,
  Employee: orange,
  Replenisher: teal,
};

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Type',
    field: 'type',
    formatter: ({ type }) => (
      <span style={{ color: colors[type] }}>{type}</span>
    ),
  },
];

const UsersContent = ({
  getUsers,
  setActiveUser,
  isUserListLoading,
  userList,
  activeUserID,
}) => {
  useEffect(() => {
    if (!isUserListLoading) getUsers();
  }, []);

  const handleRowClick = ({ _id }) => {
    setActiveUser(_id);
  };

  return (
    <Grid>
      <Grid.Row columns="equal" stretched>
        <Grid.Column width={5}>
          <Segment>
            <TableWithPagination list={userList} perPage={25}>
              <CustomTable
                sortByColumn="name"
                columns={columns}
                onRowClick={handleRowClick}
                sortable
                selectable
              />
            </TableWithPagination>
          </Segment>
        </Grid.Column>
        <Grid.Column>{activeUserID && <UsersDetail />}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export const UserShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

UsersContent.propTypes = {
  getUsers: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(UserShape).isRequired,
};

const mapStateToProps = state => ({
  userList: getUsersListForTable(state),
  activeUserID: getActiveUserIDState(state),
  isLoading: state.users.isLoading,
});

const mapDispatchToProps = {
  getUsers,
  setActiveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContent);
