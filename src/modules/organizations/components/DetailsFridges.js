import React, { useEffect, useState } from 'react';
import { Header, Progress } from 'semantic-ui-react';

import { UniTable } from 'modules/shared/components/unitableReloaded';
import { fridgesTableData } from '../mocks/organziationsMocks';

const columns = [
  {
    name: 'Name',
    textAlign: 'center',
  },
  {
    name: 'Last Repl.',
    mapDataFrom: 'timestamp',
  },
  {
    name: 'Inventory',
    mapDataFrom: 'level',
    type: 'progress',
  },
];

const DetailsFridges = ({ setSelectedFridge }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      fridgesTableData.length > 0 && setSelectedFridge(fridgesTableData[0].id);
      setInitialized(true);
    }
  });

  return (
    <>
      <Header as="h4" dividing>
        Fridges
      </Header>
      <UniTable
        data={fridgesTableData}
        columns={columns}
        onRowClick={({ id }) => {
          return setSelectedFridge(id);
        }}
        clickArgs={['id']}
        selectable
        sortByColumn="name"
      />
      <Progress percent={49} warning progress="percent">
        Overall capacity
      </Progress>
    </>
  );
};

export default DetailsFridges;
