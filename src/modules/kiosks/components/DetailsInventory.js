import React from 'react';
import { Segment, Header, Grid, Divider, Icon, Table } from 'semantic-ui-react';
import { pathOr } from 'ramda';

import ColoredBlock from 'modules/shared/components/ColoredBlock';
import './styles.less';

const initObj = { available: 0, total: 0, totalPrice: 0 };

const DetailsInventory = ({ cells }) => {
  const { available, total, totalPrice } = cells.reduce(
    (prev, { productLine, products, availableProducts }) => {
      const available = availableProducts + prev.available;
      const total = products.length + prev.total;
      const totalPrice = pathOr(0, ['tax'], productLine) + prev.totalPrice;
      return { available, total, totalPrice };
    },
    initObj,
  );
  const percent = Math.round((available * 100) / total) || 0;
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={14}>
            <Header as="h3">
              Inventory:
              <ColoredBlock value={percent}>{` ${percent}%`}</ColoredBlock>
            </Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <a href="/" className="edit-icon">
              <Icon name="edit" size="small" />
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Table basic="very">
        <Table.Body>
          {cells.map(({ _id, productLine, availableProducts, products }) => (
            <Table.Row key={_id}>
              <Table.Cell>
                <ColoredBlock
                  value={(availableProducts * 100) / products.length}
                >
                  {`${availableProducts}/${products.length}`}
                </ColoredBlock>
              </Table.Cell>
              <Table.Cell>{pathOr('', ['name'], productLine)}</Table.Cell>
              <Table.Cell>{`€ ${pathOr(0, ['tax'], productLine)}`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        <b>{`Total Value: €${totalPrice}`}</b>
      </div>
    </Segment>
  );
};

export default DetailsInventory;
