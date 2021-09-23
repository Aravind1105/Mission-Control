import React from 'react';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Table,
  Popup,
} from 'semantic-ui-react';
import { groupBy, orderBy } from 'lodash';
import ColoredBlock from 'modules/shared/components/ColoredBlock';
import './styles.less';
const DetailsInventory = ({ list, total }) => {
  const sortedByProductName = orderBy(
    list,
    [list => list.productLine.name.toLowerCase()],
    ['asc'],
  );
  const groupedByProductLines = groupBy(sortedByProductName, 'productLine._id');
  const inventoryItems = [];
  let totalCost = 0;
  let kioskAvailableQty = 0;
  let kioskMaxCapacity = 0;

  Object.values(groupedByProductLines).forEach(ele => {
    let totalQty = 0;
    let productName = '';
    let price = '';
    let totalMaxQty = 0;
    ele.forEach(ele => {
      totalQty += ele.totalProducts;
      productName = ele.productLine.name;
      price = ele.productLine.price;
      totalCost += ele.totalProducts * ele.productLine.defaultCost;
      totalMaxQty += ele.maxQty;
    });

    kioskAvailableQty += totalQty;
    kioskMaxCapacity += totalMaxQty;
    // compute percentage of availablity
    const availability = (totalQty / totalMaxQty) * 100;

    inventoryItems.push({
      productName,
      totalQty,
      price,
      totalMaxQty,
      availability,
    });
  });

  // Inventory sorting on the bases of Availability
  if (inventoryItems[0] !== undefined && inventoryItems[0].availability < 0) {
    inventoryItems.sort((a, b) => {
      return b.availability - a.availability;
    });
  } else {
    inventoryItems.sort((a, b) => {
      return a.availability - b.availability;
    });
  }

  const totalKioskOccupancy = (kioskAvailableQty / kioskMaxCapacity) * 100;

  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3">
              Inventory:&nbsp;
              <ColoredBlock type="b" value={totalKioskOccupancy}>
                {`${totalKioskOccupancy.toPrecision(4)} %`}
              </ColoredBlock>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Table basic="very" unstackable>
        <Table.Body>
          {inventoryItems.map(
            (
              { productName, totalQty, price, totalMaxQty, availability },
              index,
            ) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <ColoredBlock type="b" value={availability}>
                    {totalMaxQty > 0
                      ? `${totalQty}/${totalMaxQty}`
                      : `${totalQty}`}
                  </ColoredBlock>
                </Table.Cell>
                <Table.Cell>
                  <>
                    {productName.length >= 27 ? (
                      <Popup
                        trigger={
                          <div className="kiosk-inventory-table">
                            {productName}
                          </div>
                        }
                        position="top left"
                        wide
                        hoverable
                      >
                        {productName}
                      </Popup>
                    ) : (
                      <div className="kiosk-inventory-table-item">
                        {productName}
                      </div>
                    )}
                  </>
                </Table.Cell>
                <Table.Cell
                  style={{ textAlign: 'right' }}
                  collapsing
                >{`${price || 0} €`}</Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>
      <Table className="kiosk-inventory-total-values" unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="kiosk-inventory-total-values-cell">
              <b>Total Costs of Goods:</b>
            </Table.Cell>
            <Table.Cell className="kiosk-inventory-total-values-cell kiosk-inventory-total-values-cell-right">
              <b>{`${totalCost.toFixed(2)} €`}</b>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="kiosk-inventory-total-values-cell">
              <b>Total Sales Value:</b>
            </Table.Cell>
            <Table.Cell className="kiosk-inventory-total-values-cell kiosk-inventory-total-values-cell-right">
              <b>{`${total} €`}</b>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};
export default DetailsInventory;
