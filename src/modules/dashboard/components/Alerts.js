import React from 'react';
import { Button, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';

const Alerts = () => {
  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4" color="red">
          <Icon name="exclamation triangle" size="small" />
          <Header.Content>Alerts</Header.Content>
        </Header>
        <div>
          <Button icon labelPosition="right" basic>
            Show all
            <Icon name="angle right" />
          </Button>
        </div>
      </SegmentHeader>
      <Table stackable basic="very" size="small">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <strong>System down</strong>
            </Table.Cell>
            <Table.Cell>Publicis Media #1986</Table.Cell>
            <Table.Cell>5 hours ago</Table.Cell>
            <Table.Cell>New</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Temperature high</strong>
            </Table.Cell>
            <Table.Cell>Docomo #2817</Table.Cell>
            <Table.Cell>7 hours ago</Table.Cell>
            <Table.Cell>In progress</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Door left open</strong>
            </Table.Cell>
            <Table.Cell>Interboden #1845</Table.Cell>
            <Table.Cell>9 hours ago</Table.Cell>
            <Table.Cell>In progress</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Loadcell fluctuating</strong>
            </Table.Cell>
            <Table.Cell>Siemens 2 #2392 (A3, B2)</Table.Cell>
            <Table.Cell>12 hours ago</Table.Cell>
            <Table.Cell>In progress</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Fridge > 70% empty</strong>
            </Table.Cell>
            <Table.Cell>Salesforce 1 #3452</Table.Cell>
            <Table.Cell>14 hours ago</Table.Cell>
            <Table.Cell>Resolved</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default Alerts;
