import React from 'react';
import {
  Icon,
  Segment,
  Header,
  Button,
  Divider,
  Container,
} from 'semantic-ui-react';

import CustomTable from 'modules/shared/components/CustomTable';

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Type',
    field: 'type',
  },
  {
    title: '',
    field: 'edit',
    formatter: () => <Icon name="edit outline" fitted />,
  },
];

const DetailsUsers = ({ users }) => (
  <Segment>
    <Header as="h3">{`Users (${users.length})`}</Header>
    <Divider />
    <CustomTable
      basic="very"
      data={users}
      columns={columns}
      sortByColumn="name"
    />
    <Container textAlign="center">
      <Button color="green" compact>
        + Add User
      </Button>
    </Container>
  </Segment>
);

DetailsUsers.defaultProps = {
  users: [{}, {}, {}],
};

export default DetailsUsers;
