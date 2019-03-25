import React from 'react';
import { Segment, Grid, Header, List, Button, Icon } from 'semantic-ui-react';
import logo from '../mocks/mock-org-logo.png';
import { Link } from 'react-router-dom';

const DetailsInfo = ({
  data: { name, street, postal, city, taxID, cm, phone, id },
}) => {
  return (
    <Segment>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <img src={logo} width="175px" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h3">
              <Header.Content>{name}</Header.Content>
            </Header>
            <List>
              <List.Item>
                <List.Content>{`${street}`}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content>{`${postal} ${city}`}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <b>USt.-IdNr.:</b> {taxID}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <b>CM:</b> {`${cm}, ${phone}`}
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center">
            <Link to={`/organizations/edit/${id}`}>
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
