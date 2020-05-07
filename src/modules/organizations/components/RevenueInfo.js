import React from 'react';
import { Segment, Button, Header, Divider } from 'semantic-ui-react';

const RevenueInfo = () => (
  <Segment>
    <Header as="h3">Revenue</Header>
    <Divider />
    <Button.Group basic>
      <Button>Daily</Button>
      <Button>Weekly</Button>
      <Button>Monthly</Button>
    </Button.Group>
  </Segment>
);

export default RevenueInfo;
