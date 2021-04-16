import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment, Grid, Segment, Divider } from 'semantic-ui-react';
import get from 'lodash/get';
import CustomButton from 'modules/shared/components/CustomButton';
import UserInfoRow from 'modules/shared/components/UserInfoRow';
import history from 'lib/history';
import { toggleUserRole } from '../actions';
import { getActiveUserIDState, getUsersListState } from '../selectors';
import './styles.less';

const UsersDetail = ({ user, toggleUserRole, isLoading, rootUser }) => {
  const handlerRoleToggle = () => {
    const payload = {
      userId: user.id,
      root: !user.root,
    };
    toggleUserRole(payload);
  };

  const editUserHandler = () => {
    history.push(`/users/edit/${user.id}`);
  };
  const userLogHandler = () => {
    history.push(`/users/log/${user.id}`);
  };

  const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  const city = get(user, 'address.city', '');
  const line1 = get(user, 'address.line1', '');
  const address = `${city ? `${city}, '` : ''} ${line1}`;

  return (
    <>
      {!isLoading && (
        <div className="user-info">
          <Segment className="usr-detail-style">
            <Grid>
              <Grid.Row
                columns="equal"
                style={{
                  paddingBottom: '0px',
                }}
              >
                <Comment.Group size="massive">
                  <Comment>
                    <Comment.Avatar
                      as="a"
                      src={user.avatarUrl}
                      style={{ marginLeft: '12px' }}
                    />
                    <Comment.Content>
                      <Comment.Author as="a" style={{ lineHeight: 2 }}>
                        {name}
                      </Comment.Author>
                      {/* <Comment.Text>
                    {user.root ? 'Admin' : 'Consumer'} - {user.status}
                  </Comment.Text> */}
                      <Comment.Text style={{ marginTop: '10px' }}>
                        <Comment.Actions>
                          Last Updated: {user.updated}
                        </Comment.Actions>
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              </Grid.Row>
              <Divider />
              <Grid.Row
                style={{
                  paddingTop: '0px',
                }}
              >
                <Grid.Column width={12}>
                  <Grid>
                    <Grid.Row>
                      <UserInfoRow
                        title="First Name"
                        description={user.firstName}
                      />
                      <UserInfoRow
                        title="Last Name"
                        description={user.lastName}
                      />
                      <UserInfoRow
                        title="E-mail"
                        description={user.email && user.email}
                      />
                      <UserInfoRow
                        title="Phone Number"
                        description={user.mobile && user.mobile}
                      />
                      <UserInfoRow
                        title="Unique User ID"
                        description={user.id}
                      />
                      <UserInfoRow
                        title="Role / Organization"
                        description={
                          user.rolesInOrg &&
                          user.rolesInOrg.map(org => {
                            let [role, orgs] = org.split('-');
                            return (
                              <div className="multiple-cell">
                                {role} @ <b>{orgs}</b>
                              </div>
                            );
                          })
                        }
                      />
                      <UserInfoRow
                        title="Payment Method(s)"
                        description={
                          user.paymentMethods && user.paymentMethods.join(', ')
                        }
                      />
                      <UserInfoRow
                        title="Member Cards"
                        description={
                          user.userCards &&
                          user.userCards.map(mcard => {
                            return <div className="multiple-cell">{mcard}</div>;
                          })
                        }
                      />
                      <UserInfoRow
                        title="Address"
                        description={
                          user.address &&
                          user.address.line1 !== '' &&
                          user.address.line1
                        }
                      />
                      {user.address && user.address.line2 !== '' && (
                        <UserInfoRow description={user.address.line2} />
                      )}
                      {user.address && (
                        <UserInfoRow
                          description={
                            user.address.postalCode !== '' &&
                            user.address.postalCode
                          }
                          description2={
                            user.address.city !== '' && user.address.city
                          }
                        />
                      )}
                      {user.address && (
                        <UserInfoRow
                          description={
                            user.address.state !== '' && user.address.state
                          }
                          description2={
                            user.address.country !== '' && user.address.country
                          }
                        />
                      )}
                      <UserInfoRow title="Notes" description={user.note} />
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4}>
                  <CustomButton
                    label="Edit"
                    icon="edit"
                    onClick={editUserHandler}
                  />
                  <CustomButton
                    label="User log"
                    icon="line graph"
                    onClick={userLogHandler}
                  />
                  {rootUser && (
                    <CustomButton
                      label={`${user.root ? 'Revoke Root' : 'Grant Root'}`}
                      icon={`${user.root ? 'lock' : 'lock open'}`}
                      onClick={handlerRoleToggle}
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      )}
    </>
  );
};

UsersDetail.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  toggleUserRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getActiveUserIDState(state),
  userList: getUsersListState(state),
  isLoading: state.users.isLoading,
  rootUser: state.user.root,
});

const mapDispatchToProps = {
  toggleUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDetail);
