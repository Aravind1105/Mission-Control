import React, { useState } from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/unitableReloaded/CustomTable';

const iconType = {
  Resolved: 'check circle',
  New: 'attention',
  'In progress': 'time',
};

const Alerts = ({ list }) => {
  const [rowLimit, setRowLimit] = useState(5);

  const { t } = useTranslation();
  const columns = [
    {
      title: t('message'),
      field: 'message',
    },
    {
      title: t('Name'),
      field: 'name',
    },
    {
      title: t('Time'),
      field: 'date',
      formatter: ({ date }) =>
        date || date === 0 ? `${date} hour${date > 1 ? 's' : ''} ago` : '',
    },
    {
      title: t('status'),
      field: 'status',
      formatter: ({ status }) => {
        const name = iconType[status];
        return (
          <>
            <Icon name={name} />
            {status}
          </>
        );
      },
    },
  ];

  const handlerToggle = () => {
    setRowLimit(val => (val ? 0 : 5));
  };

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4" color="red">
          <Icon name="exclamation triangle" size="small" />
          <Header.Content>Alerts</Header.Content>
        </Header>
        <div>
          <Button icon labelPosition="right" basic onClick={handlerToggle}>
            Show all
            <Icon name={`angle ${rowLimit ? 'right' : 'down'}`} />
          </Button>
        </div>
      </SegmentHeader>
      <CustomTable
        sortByColumn="date"
        sortable
        fixed
        data={list}
        columns={columns}
        rowLimit={rowLimit}
      />
    </Segment>
  );
};

export default Alerts;
