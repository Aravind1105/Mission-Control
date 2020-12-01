import React from 'react';
import { Segment, Header, Grid, Divider, Table } from 'semantic-ui-react';
import { groupBy } from 'lodash';

import ColoredBlock from 'modules/shared/components/ColoredBlock';

const DetailsInventory = ({ list, total }) => {
  const groupedByProductLines = groupBy(list, "productLine._id");
  const inventoryItems = [];
  Object.values(groupedByProductLines).forEach(ele => {
    let totalQty = 0;
    let productName = '';
    let price = '';
    ele.forEach(ele => {
      totalQty += ele.totalProducts;
      productName = ele.productLine.name;
      price = ele.productLine.price;
    });
    inventoryItems.push({ productName, totalQty, price });
  });

  return (
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
          {inventoryItems.map(({ productName, totalQty, price }, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <ColoredBlock type="b" value={totalQty ? 100 : 0}>
                  {totalQty}
                </ColoredBlock>
              </Table.Cell>
              <Table.Cell>{productName}</Table.Cell>
              <Table.Cell style={{ textAlign: "right" }} collapsing>{`€ ${price || 0}`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        <b>{`Total Value: € ${total}`}</b>
      </div>
    </Segment>
  )
};

export default DetailsInventory;
