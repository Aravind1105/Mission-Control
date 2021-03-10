import React, { useState, useMemo } from 'react';
import pick from 'lodash/pick';
import { Segment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import separateToSides from 'lib/separateToSides';
import DetailLoadCellsSide from './DetailLoadCellsSide';
import ModalLoadCell from './ModalLoadCell';
import PlanogramSwitcher from './PlanogramSwitcher';
import { setPlanogramSwitchState } from '../actions';

const DetailsLoadCells = ({ cells, kioskName, currentKioskSide }) => {
  const [product, selectProduct] = useState(null);
  const [isAddLoadCell, setIsAddLoadCell] = useState(false);
  const [currentSide, setCurrentSide] = useState(currentKioskSide);
  const dispatch = useDispatch();
  const setSide = currentSide;
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

  const handleClose = () => {
    setIsAddLoadCell(false);
    selectProduct(null);
    dispatch(setPlanogramSwitchState({ setSide }));
  };

  const sides = useMemo(() => separateToSides(cells), [cells]);

  const isTwoSides = Boolean(sides.A.length && sides.B.length);
  const loadedPosition = product
    ? cells.map(({ planogramPosition }) => planogramPosition)
    : [];

  const handleAdd = () => {
    setIsAddLoadCell(true);
    selectProduct({});
  };

  const activeShelves = useMemo(
    () =>
      cells.filter(
        cell => cell.planogramPosition != null && cell.isActive !== false,
      ).length,
    [currentSide, sides],
  );

  return (
    <Segment stackable>
      <PlanogramSwitcher
        {...{ activeShelves, setCurrentSide, currentSide, isTwoSides }}
      />

      <DetailLoadCellsSide
        cells={sides[currentSide]}
        handleEdit={handleEdit}
        handleAdd={
          activeShelves < (isTwoSides ? 30 : 15) ? handleAdd : undefined
        }
      />
      {product && (
        <ModalLoadCell
          product={product}
          loadedPosition={loadedPosition}
          handleClose={handleClose}
          kioskName={kioskName}
          cells={cells}
          isAddLoadCell={isAddLoadCell}
        />
      )}
    </Segment>
  );
};

export default DetailsLoadCells;
