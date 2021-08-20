import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import Pagination from 'modules/shared/components/Pagination';
import UsersDetail from './UsersDetail';
import MobileUser from './UserExtableTable/MobileUser';
import {
  getUsers,
  setActiveUser,
  setPage as changePage,
  setPerPage as changePerPage,
  setSort,
  setFilters,
} from '../actions';
import {
  getUsersListState,
  getActiveUserState,
  getTotalUsers,
  getUsersListForTable,
  getPaginationState,
} from '../selectors';
import UsersToolbar from './UsersToolbar';
import UserTemplate from './UserTemplate';
import { isEqual } from 'lodash';

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
];

const UsersContent = ({
  getUsers,
  setActiveUser,
  userList,
  list,
  activeUser,
  isLoading,
  total,
  selectedId,
  paginationState,
  changePage,
  changePerPage,
  setSort,
  setFilters,
}) => {
  const { search, page, perPage, sort, filters } = paginationState;

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
      sort: sort[0].direction === 'ASC' ? 1 : -1,
    };
    if (search) {
      data.name = search;
      const searchIndex = isEqual(search, filters.search);
      if (!searchIndex) {
        data.skip = 0;
        changePage(0);
        setFilters({
          ...filters,
          search,
        });
      }
    }
    getUsers({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search]);

  const handleRowClick = ({ _id }) => {
    setActiveUser(_id);
  };

  useEffect(() => {
    setActiveUser(selectedId);
  }, [list]);

  return (
    <>
      <UsersToolbar />

      {!isLoading ? (
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment>
              <Grid stackable>
                <Grid.Row only="mobile">
                  <Grid.Column>
                    <>
                      <br></br>
                      <br></br>
                      <MobileUser
                        sortByColumn="name"
                        columns={columns}
                        data={userList}
                        getData={getData}
                        list={list}
                        sortable
                        selectable
                        setSortByInCaller={sort => setSort([sort])}
                        sortDirection="ASC"
                      />
                    </>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row only="tablet computer">
                  <Grid.Column>
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
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Pagination
                      totalCount={total}
                      page={page}
                      perPage={perPage}
                      boundaryRange={1}
                      siblingRange={0}
                      changePage={changePage}
                      changePerPage={changePerPage}
                      isLoading={isLoading}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={12} only="tablet computer">
            <Grid.Row only="computer">
              {activeUser && (
                <Grid.Column>
                  <UsersDetail />
                </Grid.Column>
              )}
              {!activeUser && (
                <Grid.Column>
                  <UserTemplate />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      ) : (
        <Loader />
      )}
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
  list: getUsersListState(state),
  selectedId: state.users.activeUserId,
  activeUser: getActiveUserState(state),
  isLoading: state.users.isLoading,
  total: getTotalUsers(state),
  paginationState: getPaginationState(state),
});

const mapDispatchToProps = {
  getUsers,
  setActiveUser,
  changePage,
  changePerPage,
  setSort,
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContent);
