import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { primaryColor, red, orange, teal } from 'lib/colors';
import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import UsersDetail from './UsersDetail';
import { getUsers, setActiveUser } from '../actions';
import { getUsersListForTable, getActiveUserIDState, getTotalUsers } from '../selectors';

const sortDefault = [
  {
    column: 'firstName',
    direction: 'ASC',
  },
];

const sortValue = {
  firstName: 'firstName',
  name: 'firstName',
};

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
  isLoading,
  total,
}) => {
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getUsers({ data });
  };

  useEffect(() => {
    if (!isUserListLoading) getData({ sort });
  }, [page, perPage]);

  const handleRowClick = ({ _id }) => {
    setActiveUser(_id);
  };

  return (
    <Grid>
      <Grid.Row columns="equal" stretched>
        <Grid.Column width={5}>
          <Segment>
            <CustomTable
              sortByColumn="name"
              columns={columns}
              onRowClick={handleRowClick}
              data={userList}
              getData={getData}
              sortable
              selectable
              setSortByInCaller={sort => setSort([sort])}
              sortDirection="ASC"
            />
            <Pagination
              totalCount={total}
              page={page}
              perPage={perPage}
              changePage={changePage}
              changePerPage={changePerPage}
              isLoading={isLoading}
            />
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
  total: getTotalUsers(state),
});

const mapDispatchToProps = {
  getUsers,
  setActiveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContent);
