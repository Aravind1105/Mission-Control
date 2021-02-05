import React from 'react';
import { Segment, Header, Grid, Divider, Table } from 'semantic-ui-react';
import { groupBy } from 'lodash';
import ColoredBlock from 'modules/shared/components/ColoredBlock';
import './styles.less';
const DetailsInventory = ({ list, total }) => {
  const groupedByProductLines = groupBy(list, 'productLine._id');
  const inventoryItems = [];
  let totalCost = 0;
  Object.values(groupedByProductLines).forEach(ele => {
    let totalQty = 0;
    let productName = '';
    let price = '';
    ele.forEach(ele => {
      totalQty += ele.totalProducts;
      productName = ele.productLine.name;
      price = ele.productLine.price;
      totalCost += ele.totalProducts * ele.productLine.defaultCost;
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
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {inventoryItems.map(({ productName, totalQty, price }, index) => (
            <Table.Row key={index}>
              <Table.Cell>{productName}</Table.Cell>
              <Table.Cell>
                <ColoredBlock type="b" value={totalQty ? 100 : 0}>
                  {totalQty}
                </ColoredBlock>
              </Table.Cell>
              <Table.Cell>{`€ ${price || 0}`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Table className="kiosk-inventory-total-values">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="kiosk-inventory-total-values-cell">
              <b>Total Costs of Goods:</b>
            </Table.Cell>
            <Table.Cell className="kiosk-inventory-total-values-cell kiosk-inventory-total-values-cell-right">
              <b>{`€ ${totalCost.toFixed(2)}`}</b>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="kiosk-inventory-total-values-cell">
              <b>Total Sales Value:</b>
            </Table.Cell>
            <Table.Cell className="kiosk-inventory-total-values-cell kiosk-inventory-total-values-cell-right">
              <b>
                <b>{`€ ${total}`}</b>
              </b>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};
export default DetailsInventory;
