import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Comment,
  Grid,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';

const UsersDetail = ({ user }) => {
  if (!user) return false;

  return (
    <Segment>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Comment.Group size="massive">
              <Comment>
                <Comment.Avatar as="a" src={user.avatarUrl} />
                <Comment.Content>
                  <Comment.Author as="a">{user.name}</Comment.Author>
                  <Comment.Text>{user.type}</Comment.Text>
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
                  <Table.Cell>City/Adress:</Table.Cell>
                  <Table.Cell>{user.address}</Table.Cell>
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
            <Button style={{ marginBottom: 5 }} fluid>
              Edit
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
};

UsersDetail.defaultProps = {
  user: {},
};

export default UsersDetail;
