import React from 'react';
import {
  Segment, Grid, Header, List, Button, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../mocks/mock-org-logo.png';

const DetailsInfo = ({
  data: {
    name, imageUrl, address, taxID, cm, phone, id,
  },
}) => {
  return (
    <Segment>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <img src={imageUrl} width="100px" />
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h3">
              <Header.Content>{name}</Header.Content>
            </Header>
            <List>
              {address[0] && (
                <>
                  <List.Item>
                    <List.Content>{`${address[0].properties.line1}`}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      {`${address[0].properties.postalCode} ${
                        address[0].properties.city
                      }`}
                    </List.Content>
                  </List.Item>
                </>
              )}
              <List.Item>
                <List.Content>
                  <b>USt.-IdNr.:</b>
                  {taxID}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <b>CM:</b>
                  {' '}
                  {`${cm}, ${phone}`}
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center">
            <Link to={`/organizations/edit/${id}`}>
              <Button icon labelPosition="left" color="teal" compact size="tiny">
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
