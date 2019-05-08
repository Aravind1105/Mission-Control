import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Container, Pagination, Grid } from 'semantic-ui-react';
import { findIndex, propEq } from 'ramda';
import {
  Unitable,
  conditionalValue,
} from '../../shared/components/unitableReloaded';
import { loadUsersSaga } from '../actions/usersActions';
import UsersDetail from './UsersDetail';
import { primaryColor, red, orange, teal } from '../../../lib/colors';

// const userList = genUserListMock(20);

const UsersContent = ({ loadUsers, userList }) => {
  const [activeUser, setActiveUser] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Type',
      color: conditionalValue([
        ['Consumer', primaryColor],
        ['Admin', red],
        ['Employee', orange],
        ['Replenisher', teal],
      ]),
    },
  ];

  return (
    <Grid>
      <Grid.Row columns="equal" stretched>
        <Grid.Column width={5}>
          <Segment>
            <Unitable
              data={userList}
              columns={columns}
              onRowClick={({ _id }) => {
                setActiveUser(findIndex(propEq('_id', _id))(userList));
              }}
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
        </Grid.Column>
        <Grid.Column>
          <UsersDetail user={userList[activeUser]} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export const UserShape = PropTypes.shape({
  name: PropTypes.string,
});

UsersContent.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(UserShape).isRequired,
};

const mapStateToProps = state => ({
  userList: state.users,
});

const mapDispatchToProps = dispatch => ({
  loadUsers: () => dispatch(loadUsersSaga()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContent);
