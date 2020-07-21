import React, { useState } from 'react';
import pick from 'lodash/pick';

import separateToSides from 'lib/separateToSides';
import DetailLoadCellsSide from './DetailLoadCellsSide';
import ModalLoadCell from './ModalLoadCell';

const DetailsLoadCells = ({ cells, kioskName }) => {
  const [product, selectProduct] = useState(null);

  const handleEdit = ({
    productLine,
    cellId,
    availableProducts,
    planogramPosition,
  }) => {
    const data = pick(productLine, ['_id', 'name', 'price']);
    selectProduct({
      ...data,
      cellId,
      planogramPosition: planogramPosition || '',
      availableProducts,
    });
  };

  const handleClose = () => selectProduct(null);

  const sides = separateToSides(cells);
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
          cells={cells}
        />
      )}
    </>
  );
};

export default DetailsLoadCells;
