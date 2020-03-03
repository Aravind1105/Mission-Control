import React, { useState } from 'react';
import { Segment, Header, Grid, Divider, Icon } from 'semantic-ui-react';
import pick from 'lodash/pick';

import ColoredBlock from 'modules/shared/components/ColoredBlock';
import ModalLoadCell from './ModalLoadCell';
import './styles.less';

const widthCalc = (pos = '8') => (Number(pos.substr(-1)) ? 8 : 16);

const DetailsLoadCells = ({ cells, kioskName }) => {
  const [product, selectProduct] = useState(null);

  const handleEdit = ({ productLine, cellId }) => () => {
    const data = pick(productLine, ['_id', 'name']);
    selectProduct({ ...data, cellId });
  };

  const handleClose = () => selectProduct(null);

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h3">Load Cells</Header>
            </Grid.Column>
            <Grid.Column width={6} className="text-align-right">
              Active Shelves:
              <b className="textGreen">{` ${cells.length}`}</b>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid divided="vertically">
          <Grid.Row>
            {cells.map(
              ({
                _id,
                cellId,
                planogramPosition,
                productLine,
                products,
                availableProducts,
              }) => {
                const percent = (availableProducts * 100) / products.length;
                const quantityText = `${availableProducts}/${products.length}`;
                const width = widthCalc(planogramPosition);

                return (
                  <Grid.Column key={_id} width={width}>
                    <div className="load-cell">
                      <p className="load-cell-header">
                        <b>{cellId}</b>
                        &nbsp;- Quantity:&nbsp;
                        <ColoredBlock type="b" value={percent}>
                          {quantityText}
                        </ColoredBlock>
                        <span
                          className="edit-icon"
                          onClick={handleEdit({ productLine, cellId })}
                        >
                          <Icon name="edit" size="small" />
                        </span>
                      </p>
                      <p>
                        <b>
                          {productLine
                            ? `${productLine.name}: €${productLine.tax}`
                            : null}
                        </b>
                      </p>
                    </div>
                  </Grid.Column>
                );
              },
            )}
          </Grid.Row>
        </Grid>
      </Segment>

      {product && (
        <ModalLoadCell
          product={product}
          handleClose={handleClose}
          kioskName={kioskName}
        />
      )}
    </>
  );
};

export default DetailsLoadCells;
