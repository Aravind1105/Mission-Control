import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { SegmentHeader } from 'modules/shared/components';
import {
  UniTable,
  conditionalIcon,
  valueEquals,
} from 'modules/shared/components/unitableReloaded';
import { alertsMockData } from '../mocks/alertsMocks';

const Alerts = () => {
  const { t } = useTranslation();

  const columns = [
    {
      name: t('message'),
      mapDataFrom: 'message',
    },
    {
      name: t('customer'),
      mapDataFrom: 'customer',
    },
    {
      name: t('time'),
      mapDataFrom: 'timestamp',
      postfix: value => ` hour${value > 1 ? 's' : ''} ago`,
    },
    {
      name: t('status'),
      mapDataFrom: 'status',
      positive: valueEquals('Resolved'),
      negative: valueEquals('New'),
      warning: valueEquals('In progress'),
      icon: conditionalIcon([
        ['Resolved', 'check circle'],
        ['New', 'attention'],
        ['In progress', 'time'],
      ]),
    },
  ];

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
        data={alertsMockData}
        columns={columns}
        sortable
        sortByColumn="timestamp"
      />
    </Segment>
  );
};

export default Alerts;
