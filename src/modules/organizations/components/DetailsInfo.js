import React from 'react';
import { Segment, Grid, Header, List, Button, Icon } from 'semantic-ui-react';
import logo from '../mocks/mock-org-logo.png';
import logo1 from '../mocks/mock-org-logo1.png';
import { Link } from 'react-router-dom';

const DetailsInfo = ({ data }) => {
  const {
    logoURL,
    name,
    street,
    postal,
    city,
    taxID,
    cm,
    phone,
    mail,
    users,
    fridges,
  } = data;

  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column
            mobile={16}
            computer={8}
            textAlign="center"
            verticalAlign="middle"
          >
            <img src={logo} width="175px" />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <Header as="h4">
              <Header.Content>{name}</Header.Content>
            </Header>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header>Address:</List.Header>
                  <List.Description>{`${street}, ${postal} ${city}`}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Tax ID:</List.Header>
                  <List.Description>{taxID}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Mail:</List.Header>
                  <List.Description>{`${mail}`}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Contact person:</List.Header>
                  <List.Description>{`${cm}, ${phone}`}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Info:</List.Header>
                  <List.Description>{`${users} user(s) | ${fridges} fridge(s)`}</List.Description>
                </List.Content>
              </List.Item>
            </List>
            <Link to={`/organizations/edit/${data.id}`}>
              <Button
                icon
                labelPosition="left"
                color={'teal'}
                compact
                size="tiny"
              >
                <Icon name="building" />
                Edit organization data
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default DetailsInfo;
