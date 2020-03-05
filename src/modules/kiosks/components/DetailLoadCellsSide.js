import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

import ColoredBlock from 'modules/shared/components/ColoredBlock';

const widthCalc = (pos = '8') => (Number(pos.substr(-1)) ? 8 : 16);

const Side = ({
  cellId,
  planogramPosition,
  productLine,
  products,
  availableProducts,
  handleEdit,
}) => {
  const percent = (availableProducts * 100) / products.length;
  const quantityText = `${availableProducts}/${products.length}`;
  const width = widthCalc(planogramPosition);

  return (
    <Grid.Column width={width}>
      <div className="load-cell">
        <p className="load-cell-header">
          <b>{cellId}</b>
          &nbsp;- Quantity:&nbsp;
          <ColoredBlock type="b" value={percent}>
            {quantityText}
          </ColoredBlock>
          <button type="button" className="edit-icon" onClick={handleEdit}>
            <Icon name="edit" size="small" />
          </button>
        </p>
        <p>
          <b>
            {productLine ? `${productLine.name}: €${productLine.tax}` : null}
          </b>
        </p>
      </div>
    </Grid.Column>
  );
};

const DetailLoadCellsSide = ({ cells, handleEdit }) => (
  <Grid.Column>
    <Grid divided="vertically">
      {cells.map(
        ({
          _id,
          cellId,
          planogramPosition,
          productLine,
          products,
          availableProducts,
        }) => (
          <Side
            key={_id}
            cellId={cellId}
            planogramPosition={planogramPosition}
            productLine={productLine}
            products={products}
            availableProducts={availableProducts}
            handleEdit={handleEdit({ productLine, cellId, availableProducts })}
          />
        ),
      )}
    </Grid>
  </Grid.Column>
);

export default DetailLoadCellsSide;
