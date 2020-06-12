import React, { useState } from 'react';
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
      const [key, row, cell] = curr.planogramPosition
        ? [...curr.planogramPosition]
        : ['A', calculateIndex(prev['A'])];
      console.log(key, row, cell);
      if (prev[key]) {
        if (!prev[key][row]) {
          prev[key][row] = [];
        }
        if (cell == undefined) {
          prev[key][row].push(curr);
        } else {
          prev[key][row][cell] = curr;
        }
      }
      return prev;
    },
    { A: [], B: [] },
  );

const DetailsLoadCells = ({ cells, kioskName }) => {
  const [product, selectProduct] = useState(null);

  const handleEdit = ({
    productLine,
    cellId,
    availableProducts,
    planogramPosition,
  }) => {
    const data = pick(productLine, ['_id', 'name']);
    selectProduct({ ...data, cellId, planogramPosition, availableProducts });
  };

  const handleClose = () => selectProduct(null);
  const sides = separateToSides(cells);
  console.log(sides);
  const isTwoSides = Boolean(sides.A.length && sides.B.length);
  const loadedPosition = product
    ? cells.map(({ planogramPosition }) => planogramPosition)
    : [];

  return (
    <>
      {isTwoSides && (
        <DetailLoadCellsSide
          cells={sides.B}
          handleEdit={handleEdit}
          title="Planogram - Left Kiosk"
        />
      )}
      <DetailLoadCellsSide
        cells={sides.A}
        handleEdit={handleEdit}
        title={isTwoSides ? 'Planogram - Right Kiosk' : 'Load Cells'}
      />

      {product && (
        <ModalLoadCell
          product={product}
          loadedPosition={loadedPosition}
          handleClose={handleClose}
          kioskName={kioskName}
        />
      )}
    </>
  );
};

export default DetailsLoadCells;
