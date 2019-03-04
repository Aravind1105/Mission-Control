import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        tableColumns={[
          {
            name: 'id',
            label: '',
            unit: '',
            width: 0,
            align: '',
          },
          {
            name: 'message',
            label: t('message'),
            unit: '',
            width: 40,
            align: 'left',
          },
          {
            name: 'customer',
            label: t('customer'),
            unit: '',
            width: 40,
            align: 'left',
          },
          {
            name: 'timestamp',
            label: t('time'),
            unit: 'hours ago',
            width: 20,
            align: 'left',
          },
          {
            name: 'status',
            label: t('status'),
            unit: '',
            width: 20,
            align: 'left',
          },
        ]}
        tableData={alertsMockData}
        filters={filters}
        infos={infos}
        onClickRow={(...args) => console.log('click on row: ', ...args)}
      />
    </Segment>
  );
};

export default Alerts;
