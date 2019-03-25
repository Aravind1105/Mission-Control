import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import ExampleReport1 from './components/ExampleReport1';
import ExampleReport2 from './components/ExampleReport2';
import ExampleReport3 from './components/ExampleReport3';
import ExampleReport4 from './components/ExampleReport4';

const ReportsScreen = () => {
  return (
    <Grid>
      <Grid.Row columns="equal" stretched>
        <Grid.Column>
          <Segment>
            <Header as="h3" dividing>
              Sales Report
            </Header>
            <ExampleReport1 />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h3" dividing>
              Sales Report (Week)
            </Header>
            <ExampleReport2 />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" stretched>
        <Grid.Column>
          <Segment>
            <Header as="h3" dividing>
              Category Details
            </Header>
            <ExampleReport3 />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h3" dividing>
              Category development
            </Header>
            <ExampleReport4 />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReportsScreen;
