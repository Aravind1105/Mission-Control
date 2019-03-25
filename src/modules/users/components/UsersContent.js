import React, { useState } from 'react';
import {
  Segment,
  Container,
  Pagination,
  Grid,
  Comment,
  Table,
  Button,
  Header,
  Icon,
} from 'semantic-ui-react';
import { findIndex, propEq } from 'ramda';
import {
  Unitable,
  valueEquals,
  conditionalValue,
} from '../../shared/components/unitableReloaded';
import { genUserListMock } from '../mocks/userMock';
import { primaryColor, red, orange, teal } from '../../../lib/colors';

const userList = genUserListMock(20);

const UsersContent = () => {
  const [activeUser, setActiveUser] = useState(0);
  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Type',
      color: conditionalValue([
        ['Customer', primaryColor],
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
              onRowClick={({ id }) => {
                setActiveUser(findIndex(propEq('id', id))(userList));
              }}
              clickArgs={['id']}
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
          <Segment>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Comment.Group size="massive">
                    <Comment>
                      <Comment.Avatar
                        as="a"
                        src={userList[activeUser].avatar}
                      />
                      <Comment.Content>
                        <Comment.Author as="a">
                          {userList[activeUser].name}
                        </Comment.Author>
                        <Comment.Text>{userList[activeUser].type}</Comment.Text>
                        <Comment.Actions>
                          Last Activity: 25.03.2019
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                  <Table compact="very" basic="very">
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Firstname:</Table.Cell>
                        <Table.Cell>
                          {userList[activeUser].firstName}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Lastname:</Table.Cell>
                        <Table.Cell>{userList[activeUser].lastName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Organization:</Table.Cell>
                        <Table.Cell>
                          {userList[activeUser].organization}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>City/Adress:</Table.Cell>
                        <Table.Cell>{userList[activeUser].address}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>E-Mail:</Table.Cell>
                        <Table.Cell>{userList[activeUser].email}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Phone Number:</Table.Cell>
                        <Table.Cell>{userList[activeUser].phone}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Livello Card ID(s):</Table.Cell>
                        <Table.Cell>{userList[activeUser].cardId}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Credit:</Table.Cell>
                        <Table.Cell>{userList[activeUser].credit}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Allowance:</Table.Cell>
                        <Table.Cell>
                          {userList[activeUser].allowance}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Loyality Points:</Table.Cell>
                        <Table.Cell>{userList[activeUser].loyality}</Table.Cell>
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UsersContent;
