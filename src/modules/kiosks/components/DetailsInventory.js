import React from 'react';
import { Segment, Header, Grid, Divider, Table } from 'semantic-ui-react';

import ColoredBlock from 'modules/shared/components/ColoredBlock';

const DetailsInventory = ({ list, total }) => (
  <Segment>
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as="h3">Inventory</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider />
    <Table basic="very">
      <Table.Body>
        {list.map(({ cellId, productLine, totalProducts }) => (
          <Table.Row key={cellId}>
            <Table.Cell>
              <ColoredBlock type="b" value={totalProducts ? 100 : 0}>
                {totalProducts}
              </ColoredBlock>
            </Table.Cell>
            <Table.Cell>{productLine ? productLine.name : ''}</Table.Cell>
            <Table.Cell style={{textAlign: "right"}} collapsing>{`€ ${productLine.price || 0}`}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <div>
      <b>{`Total Value: € ${total}`}</b>
    </div>
  </Segment>
);

export default DetailsInventory;
