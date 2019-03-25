import React from 'react';
import { Grid, Header, Label } from 'semantic-ui-react';

import { UniTable } from 'modules/shared/components/unitable';

import { inventoryTableData } from '../mocks/organziationsMocks';

const inventoryTableConfig = {
  headless: false,
  enumerated: false,
  striped: false,
  selectable: false,
  sortation: 'name',
  sorting: 'ascending',
  clickArg: [],
};

const inventoryTableColumns = [
  {
    name: 'stock',
    label: 'Stock',
    unit: '',
    width: 15,
    align: 'center',
  },
  {
    name: 'max',
    label: 'Max',
    unit: '',
    width: 15,
    align: 'center',
  },
  {
    name: 'category',
    label: 'Category',
    unit: '',
    width: 42,
    align: 'left',
    cellStyle: 'list',
  },
  {
    name: 'level',
    label: 'Level',
    unit: 'progress--%',
    width: 28,
    align: 'center',
  },
];

const infos = [];

const DetailsInventory = ({ selectedFridge }) => {
  return (
    <>
      <Header as="h4" dividing>
        <Grid columns={2}>
          <Grid.Column mobile={12} computer={12}>
            Inventory for Fridge #{selectedFridge}
          </Grid.Column>
          <Grid.Column
            mobile={4}
            computer={4}
            textAlign="right"
            verticalAlign="top"
          >
            <Label color={'green'}>70%</Label>
          </Grid.Column>
        </Grid>
      </Header>
      <UniTable
        tableConfig={inventoryTableConfig}
        tableColumns={inventoryTableColumns}
        tableData={inventoryTableData}
        filters={[]}
        infos={infos}
      />
    </>
  );
};

export default DetailsInventory;
