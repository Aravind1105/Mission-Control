import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';

import { UniTable } from 'modules/shared/components/unitable';

import { alertsMockData } from '../mocks/alertsMocks';

// // unitable configuration start

const tableConfig = {
  headless: false,
  enumerated: false,
  striped: true,
  selectable: true,
  sortation: 'timestamp',
  sorting: 'ascending',
  clickArg: ['id'],
};

const tableColumns = [
  {
    name: 'id',
    label: '',
    unit: '',
    width: 0,
    align: '',
  },
  {
    name: 'message',
    label: 'Nachricht',
    unit: '',
    width: 40,
    align: 'left',
  },
  {
    name: 'customer',
    label: 'Kunde',
    unit: '',
    width: 40,
    align: 'left',
  },
  {
    name: 'timestamp',
    label: 'Uhrzeit',
    unit: 'hours ago',
    width: 20,
    align: 'left',
  },
  {
    name: 'status',
    label: 'Status',
    unit: '',
    width: 20,
    align: 'left',
  },
];

const filters = [];

const infos = [
  {
    column: 'status',
    value: 'New',
    comparsion: 'equal',
    type: 'negative',
    icon: 'attention',
  },
  {
    column: 'status',
    value: 'Resolved',
    comparsion: 'equal',
    type: 'positive',
    icon: 'check circle',
  },
  {
    column: 'status',
    value: 'In progress',
    comparsion: 'equal',
    type: 'warning',
    icon: 'time',
  },
];

// unitable configuration end

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
      <UniTable
        tableConfig={tableConfig}
        tableColumns={tableColumns}
        tableData={alertsMockData}
        filters={filters}
        infos={infos}
        onClickRow={(...args) => console.log('click on row: ', ...args)}
      />
      {/* <Table stackable basic="very" size="small">
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
      </Table> */}
    </Segment>
  );
};

export default Alerts;
