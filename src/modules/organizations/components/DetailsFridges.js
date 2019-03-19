import React, { useEffect, useState } from 'react';
import { Header, Progress } from 'semantic-ui-react';

import { UniTable } from 'modules/shared/components/unitable';

import { fridgesTableData } from '../mocks/organziationsMocks';

const fridgesTableConfig = {
  headless: true,
  enumerated: false,
  striped: false,
  selectable: true,
  selectableActive: true,
  sortation: 'timestamp',
  sorting: 'descending',
  clickArg: ['id'],
  active: 0,
};

const fridgesTableColumns = [
  {
    name: 'id',
    label: '',
    unit: '',
    width: 0,
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    unit: '',
    width: 30,
    align: 'left',
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    unit: '',
    width: 42,
    align: 'left',
  },
  {
    name: 'level',
    label: 'Level',
    unit: 'progress--%',
    width: 28,
    align: 'left',
  },
];

const infos = [];

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
        tableConfig={fridgesTableConfig}
        tableColumns={fridgesTableColumns}
        tableData={fridgesTableData}
        filters={[]}
        infos={infos}
        onClickRow={id => setSelectedFridge(id)}
      />
      <Header as="h4" dividing>
        Average level of all kiosks
      </Header>
      <Progress percent={28} error size={'small'}>
        Overall level 28%
      </Progress>
    </>
  );
};

export default DetailsFridges;
