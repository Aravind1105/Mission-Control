import React from 'react';
import { Segment, Container, Pagination } from 'semantic-ui-react';
import {
  Unitable,
  valueEquals,
  conditionalValue,
} from '../../shared/components/unitableReloaded';
import { kiosksOverviewMock } from '../mocks/kiosksMock';

const KiosksContent = () => {
  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Status',
      positive: valueEquals('Active'),
      negative: valueEquals('Offline'),
      warning: valueEquals('Issue'),
      icon: conditionalValue([['Offline', 'attention']]),
    },
    {
      name: 'Serial',
    },
    {
      name: 'Address',
    },
    {
      name: 'Sales',
      postfix: ' €',
    },
    {
      name: 'Level',
      type: 'progress',
    },
  ];

  return (
    <Segment>
      <Unitable
        data={kiosksOverviewMock}
        columns={columns}
        // onRowClick={clickRow}
        // clickArgs={['id']}
        sortable
        selectable
        sortByColumn="name"
      />
      {true && (
        <Container textAlign="center">
          <Pagination
            style={{ marginTop: '10px' }}
            defaultActivePage={1}
            boundaryRange={0}
            onPageChange={null}
            size="mini"
            siblingRange={1}
            totalPages={1}
          />
        </Container>
      )}
    </Segment>
  );
};

export default KiosksContent;
