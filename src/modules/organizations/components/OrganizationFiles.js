import React from 'react';
import {
  Segment,
  Grid,
  Button,
  Icon,
  Header,
  Divider,
} from 'semantic-ui-react';

import CustomTable from 'modules/shared/components/unitableReloaded/CustomTable';

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Owner',
    field: 'owner',
  },
  {
    title: 'Last Modified',
    field: 'updated',
  },
];

const OrganizationFiles = ({ filesList }) => (
  <Segment>
    <Grid>
      <Grid.Row>
        <Grid.Column mobile={16} computer={16}>
          <Header as="h3">Public Files</Header>
          <Divider />
          <CustomTable
            columns={columns}
            data={filesList}
            basic="very"
            className="files-list"
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button compact color="green">
            <Icon name="cloud upload" />
            Upload File
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default OrganizationFiles;
