import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

const LoadCellsHeader = ({ title, activeShelves }) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={10}>
        <Header as="h3">{title}</Header>
      </Grid.Column>
      <Grid.Column width={6} className="text-align-right">
        Active Shelves:
        <b className="textGreen">{` ${activeShelves}`}</b>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LoadCellsHeader;
