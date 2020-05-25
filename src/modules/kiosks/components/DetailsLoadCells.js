import React, { useState } from 'react';
import { Segment, Header, Grid, Divider } from 'semantic-ui-react';
import pick from 'lodash/pick';

import DetailLoadCellsSide from './DetailLoadCellsSide';
import ModalLoadCell from './ModalLoadCell';

const calculateIndex = arr => {
  const { length } = arr[arr.length - 1] || [];
  if (!length) {
    return 0;
  }
  return length < 2 ? arr.length - 1 : arr.length;
};

const separateToSides = cells =>
  cells.reduce(
    (prev, curr) => {
      const [key, row] = curr.planogramPosition
        ? [...curr.planogramPosition]
        : ['A', calculateIndex(prev['A'])];

      if (prev[key]) {
        if (!prev[key][row]) {
          prev[key][row] = [];
        }
        prev[key][row].push(curr);
      }
      return prev;
    },
    { A: [], B: [] },
  );

const DetailsLoadCells = ({ cells, kioskName }) => {
  const [product, selectProduct] = useState(null);

  const handleEdit = ({ productLine, cellId, availableProducts }) => {
    const data = pick(productLine, ['_id', 'name']);
    selectProduct({ ...data, cellId, availableProducts });
  };

  const handleClose = () => selectProduct(null);
  const sides = separateToSides(cells);
  const isTwoSides = sides.A.length && sides.B.length;
  const fridgeWidth = isTwoSides ? 16 : 11;

  return (
    <>
      <Grid>
        <Grid.Column width={fridgeWidth}>
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

            <Grid columns={isTwoSides ? 2 : 1} divided>
              <DetailLoadCellsSide cells={sides.A} handleEdit={handleEdit} />
              <DetailLoadCellsSide cells={sides.B} handleEdit={handleEdit} />
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>

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
