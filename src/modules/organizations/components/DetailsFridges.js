import React from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Divider,
} from 'semantic-ui-react';

import CustomTable from 'modules/shared/components/unitableReloaded/CustomTable';

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Location',
    field: 'location',
  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    title: '',
    field: 'edit',
    formatter: () => <Icon name="edit outline" fitted />,
  },
];

const DetailsFridges = ({ kiosks }) => (
  <Segment>
    <Header as="h3">{`Kiosks (${kiosks.length})`}</Header>
    <Divider />
    <CustomTable
      basic="very"
      data={kiosks}
      columns={columns}
      sortByColumn="name"
    />
    <Container textAlign="center">
      <Button color="green" compact>
        + Add kiosk
      </Button>
    </Container>
  </Segment>
);

DetailsFridges.defaultProps = {
  kiosks: [{}, {}],
};

export default DetailsFridges;
