import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { primaryColor, red, orange, teal } from 'lib/colors';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import Pagination from 'modules/shared/components/Pagination';
import UsersDetail from './UsersDetail';
import { getUsers, setActiveUser } from '../actions';
import { getUsersListForTable, getActiveUserState, getTotalUsers } from '../selectors';
import UsersToolbar from './UsersToolbar'

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
  // {
  //   title: 'Type',
  //   field: 'type',
  //   formatter: ({ type }) => (
  //     <span style={{ color: colors[type] }}>{type}</span>
  //   ),
  // },
];

const UsersContent = ({
  getUsers,
  setActiveUser,
  userList,
  activeUserID,
  isLoading,
  total,
}) => {
  const [search, changeSearch] = useState('');
  const [userType, changeUserType] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
      sort: sort[0].direction === 'ASC' ? 1 : -1
    };

    if (search || userType) {
      const name = search ? { firstName: { $regexI: search } } : {};
      const role = userType ? { "rolesInOrganizations.role": userType } : {};
      data.search = JSON.stringify({
        ...name,
        ...role,
      });
    }

    getUsers({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [search, userType, page, perPage]);

  const handleRowClick = ({ _id }) => {
    setActiveUser(_id);
  };

  return (
    <>
      <UsersToolbar changeSearch={changeSearch} changeUserType={changeUserType} />
      {isLoading && <Loader />}
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
                alignCenter={true}
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
    </>
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
  activeUserID: getActiveUserState(state),
  isLoading: state.users.isLoading,
  total: getTotalUsers(state),
});

const mapDispatchToProps = {
  getUsers,
  setActiveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContent);
