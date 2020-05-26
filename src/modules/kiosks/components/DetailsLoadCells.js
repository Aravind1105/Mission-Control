import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
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

  return (
    <>
      <Grid>
        <Grid.Column width={isTwoSides ? 16 : 11}>
          <Grid columns={isTwoSides ? 2 : 1}>
            <DetailLoadCellsSide
              cells={sides.A}
              handleEdit={handleEdit}
              title={isTwoSides ? 'Planogram 1 - Left Kiosk' : 'Load Cells'}
            />
            <DetailLoadCellsSide
              cells={sides.B}
              handleEdit={handleEdit}
              title="Planogram 2 - Right Kiosk"
            />
          </Grid>
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
