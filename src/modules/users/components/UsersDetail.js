import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Comment,
  Grid,
  Segment,
  Divider
} from 'semantic-ui-react';
import get from 'lodash/get';
import CustomButton from 'modules/shared/components/CustomButton';
import UserInfoRow from 'modules/shared/components/UserInfoRow';
import { toast } from 'react-semantic-toasts';
import history from 'lib/history';
import { toggleUserRole } from '../actions';
import { getActiveUserIDState } from '../selectors';
import './styles.less';

let toggleUserLoading = false;
const UsersDetail = ({ user, toggleUserRole, isLoading }) => {
  const handlerRoleToggle = () => {
    const payload = {
      userId: user.id,
      root: !user.root,
    };
    toggleUserLoading = true;
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

  useEffect(() => {
    if (toggleUserLoading) {
      if (!isLoading) {
        toast({
          type: 'success',
          description: `${user.root ? `Root access successfully granted` : `Root access successfully revoked`}`,
          animation: 'fade left',
        });
        toggleUserLoading = false;
      }
    }
  }, [toggleUserLoading, isLoading]);
  return (

    <div className="user-info">
      <Segment>
        <Grid>
          <Grid.Row columns="equal">
            <Comment.Group size="massive">
              <Comment>
                <Comment.Avatar as="a" src={user.avatarUrl} style={{ margin: "10px" }} />
                <Comment.Content>
                  <Comment.Author as="a">{name}</Comment.Author>
                  <Comment.Text>
                    {user.root ? 'Admin' : 'Consumer'} - {user.status}
                  </Comment.Text>
                  <Comment.Actions>Last Activity: 25.03.2019</Comment.Actions>
                  <Comment.Actions>Last Updated: 25.03.2019</Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column width={12}>
              <Grid>
                <Grid.Row >
                  <UserInfoRow title="First Name" description={user.firstName} />
                  <UserInfoRow title="Last Name" description={user.lastName} />
                  <UserInfoRow title="E-mail" description={user.email && user.email} />
                  <UserInfoRow title="Phone Number" description={user.mobile && user.mobile} />
                  <UserInfoRow title="Unique User ID" description={user.id} />
                  <UserInfoRow title="Organization(s)" description={user.org && user.org.map(orgName => {
                    return (
                      <div className="multiple-cell">
                        {orgName}
                      </div>
                    )
                  })} />
                  <UserInfoRow title="Payment Method(s)" description={user.paymentMethods && user.paymentMethods.map(type => {
                    return (
                      <div className="multiple-cell">
                        {type}
                      </div>
                    )
                  })} />
                  <UserInfoRow title="User Card(s)" description={user.userCards && user.userCards.map(mcard => {
                    return (
                      <div className="multiple-cell">
                        {mcard}
                      </div>
                    )
                  })} />
                  <UserInfoRow title="Address" description={user.address && user.address.name} />
                  {user.address && user.address.line1 !== "" && (
                    <UserInfoRow description={user.address.line1} />
                  )}
                  {user.address && user.address.line2 !== "" && (
                    <UserInfoRow description={user.address.line2} />)}
                  {user.address && (
                    <UserInfoRow description={user.address.postalCode !== "" && user.address.postalCode} description2={user.address.city !== "" && user.address.city} />
                  )}
                  {user.address && (
                    <UserInfoRow description={user.address.state !== "" && user.address.state} description2={user.address.country !== "" && user.address.country} />
                  )}
                  <UserInfoRow title="Notes" description={user.kiosks && user.kiosks.notes && user.kiosks.notes} />
                  <UserInfoRow title="Pincode for Kiosks" description={user.kiosks && user.kiosks.pin && user.kiosks.pin} />
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
              <CustomButton
                label={`${user.root ? "Revoke Root" : "Grant Root"}`}
                icon={`${user.root ? "lock open" : "lock"}`}
                onClick={handlerRoleToggle}
              />
              <CustomButton
                icon="key"
                label="Retrieve Login"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
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
  isLoading: state.users.isLoading
});

const mapDispatchToProps = {
  toggleUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDetail);
