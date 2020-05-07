import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Comment,
  Grid,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import get from 'lodash/get';

import { toggleUserRole } from '../actions';
import { getActiveUserState } from '../selectors';

const UsersDetail = ({ user, toggleUserRole }) => {
  const handlerRoleToggle = () => {
    const payload = {
      userId: user._id,
      root: !user.root,
    };
    toggleUserRole(payload);
  };

  const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  const city = get(user, 'address.city', '');
  const line1 = get(user, 'address.line1', '');
  const address = `${city ? `${city}, '` : ''} ${line1}`;
  return (
    <Segment>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Comment.Group size="massive">
              <Comment>
                <Comment.Avatar as="a" src={user.avatarUrl} />
                <Comment.Content>
                  <Comment.Author as="a">{name}</Comment.Author>
                  <Comment.Text>
                    {user.root ? 'Admin' : 'Consumer'}
                  </Comment.Text>
                  <Comment.Actions>Last Activity: 25.03.2019</Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            <Table compact="very" basic="very">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Firstname:</Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Lastname:</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Organization:</Table.Cell>
                  <Table.Cell>{user.organization}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>City/Address:</Table.Cell>
                  <Table.Cell>{address}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>E-Mail:</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Phone Number:</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Livello Card ID(s):</Table.Cell>
                  <Table.Cell>{user.cardId}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Credit:</Table.Cell>
                  <Table.Cell>{user.credit}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Allowance:</Table.Cell>
                  <Table.Cell>{user.allowance}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Loyality Points:</Table.Cell>
                  <Table.Cell>{user.loyality}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Payment Methods:</Table.Cell>
                  <Table.Cell>Mastercard, Debitcard</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Notes:</Table.Cell>
                  <Table.Cell />
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={6} className="user-actions">
            <Button
              style={{ marginBottom: 5 }}
              fluid
              onClick={handlerRoleToggle}
            >
              {user.root ? 'Revoke Root' : 'Grant Root'}
            </Button>
            <Button style={{ marginBottom: 5 }} fluid>
              Transactions
            </Button>
            <Button style={{ marginBottom: 5 }} fluid>
              Give Credit
            </Button>
            <Button style={{ marginBottom: 5 }} fluid>
              Charge
            </Button>
            <Button style={{ marginBottom: 5 }} fluid>
              Retrieve Login
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" dividing>
              Access Rights
            </Header>
            <Table compact="very" basic="very" collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Functions</Table.HeaderCell>
                  <Table.HeaderCell>View</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>User App</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Replenisher App</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Dashboard</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Fridges</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Users</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Products</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Fulfillment</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Reports</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Transactions</Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon color="green" name="checkmark" size="large" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

UsersDetail.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  toggleUserRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getActiveUserState(state),
});

const mapDispatchToProps = {
  toggleUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDetail);
