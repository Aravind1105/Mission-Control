import React from 'react';
import { Segment, Header, Grid, Divider, Table } from 'semantic-ui-react';
import get from 'lodash/get';

import ColoredBlock from 'modules/shared/components/ColoredBlock';

const initObj = { available: 0, total: 0, totalPrice: 0 };

const DetailsInventory = ({ cells }) => {
  const { available, total, totalPrice } = cells.reduce(
    (prev, { productLine, products, availableProducts }) => {
      const available = availableProducts + prev.available;
      const total = products.length + prev.total;
      const totalPrice = +(
        get(productLine, 'price', 0) + prev.totalPrice
      ).toFixed(2);
      return { available, total, totalPrice };
    },
    initObj,
  );
  const percent = Math.round((available * 100) / total) || 0;
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3">
              Inventory:
              <ColoredBlock value={percent}>{` ${percent}%`}</ColoredBlock>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Table basic="very">
        <Table.Body>
          {cells.map(({ cellId, productLine, availableProducts, products }) => (
            <Table.Row key={cellId}>
              <Table.Cell>
                <ColoredBlock
                  value={(availableProducts * 100) / products.length}
                >
                  {`${availableProducts}/${products.length}`}
                </ColoredBlock>
              </Table.Cell>
              <Table.Cell>{productLine ? productLine.name : ''}</Table.Cell>
              <Table.Cell>{`€ ${
                productLine ? productLine.price : 0
              }`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        <b>{`Total Value: € ${totalPrice}`}</b>
      </div>
    </Segment>
  );
};

export default DetailsInventory;
