import React, { useState, useMemo } from 'react';
import pick from 'lodash/pick';
import { Segment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import separateToSides from 'lib/separateToSides';
import DetailLoadCellsSide from './DetailLoadCellsSide';
import ModalLoadCell from './ModalLoadCell';
import PlanogramSwitcher from './PlanogramSwitcher';
import { setPlanogramSwitchState } from '../actions';
import { useParams } from 'react-router-dom';
import { useComponentDidMount } from 'lib/customHooks';
import * as R from 'ramda';

const DetailsLoadCells = ({ cells, kioskName, currentKioskSide, rootUser }) => {
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
    surfaceSize,
  }) => {
    const data = pick(productLine, ['_id', 'name', 'price']);

    selectProduct({
      ...data,
      cellId,
      planogramPosition: planogramPosition || '',
      availableProducts,
      surfaceSize,
    });
  };

  const { cabelId } = useParams();
  useComponentDidMount(() => {
    if (cabelId) {
      const loadCell = R.find(R.propEq('cellId', cabelId))(cells);
      if (loadCell) {
        const {
          productLine,
          planogramPosition,
          cellId,
          totalProducts,
          surfaceSize,
        } = loadCell;
        const data = pick(productLine, ['_id', 'name', 'price']);
        selectProduct({
          ...data,
          cellId,
          planogramPosition: planogramPosition || '',
          availableProducts: totalProducts,
          surfaceSize,
        });
      }
    }
  });

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
    () => cells.filter(cell => cell.planogramPosition != null).length,
    [currentSide, sides],
  );
  return (
    <Segment>
      <PlanogramSwitcher
        {...{ activeShelves, setCurrentSide, currentSide, isTwoSides }}
      />

      <DetailLoadCellsSide
        cells={sides[currentSide]}
        handleEdit={handleEdit}
        handleAdd={
          activeShelves < (isTwoSides ? 30 : 15) ? handleAdd : undefined
        }
        rootUser={rootUser}
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
