import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

import ColoredBlock from 'modules/shared/components/ColoredBlock';
import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';

const widthCalc = pos => (Number(pos.substr(-1)) ? 8 : 16);

const Card = ({
  cellId,
  planogramPosition,
  productLine,
  products,
  availableProducts,
  handleEdit,
}) => {
  const percent = (availableProducts * 100) / products.length;
  const quantityText = `${availableProducts}/${products.length}`;
  const width = widthCalc(planogramPosition || '8');
  const handleClick = () => {
    handleEdit({ productLine, cellId, availableProducts });
  };

  return (
    <Grid.Column width={width}>
      <div className="load-cell">
        <div className="load-cell-icon">
          {productLine.image ? (
            <img src={productLine.image} alt={productLine.name} />
          ) : (
            <NoImg />
          )}
        </div>
        <div className="load-cell-content">
          <p className="load-cell-header">
            <b>{cellId}</b>
            &nbsp;- Quantity:&nbsp;
            <ColoredBlock type="b" value={percent}>
              {quantityText}
            </ColoredBlock>
            <button type="button" className="edit-icon" onClick={handleClick}>
              <Icon name="edit" size="small" />
            </button>
          </p>
          <p>
            <b>
              {productLine
                ? `${productLine.name}: €${productLine.price}`
                : null}
            </b>
          </p>
        </div>
      </div>
    </Grid.Column>
  );
};

const DetailLoadCellsSide = ({ cells, handleEdit }) => (
  <Grid.Column>
    <Grid divided="vertically">
      {cells.map(props => (
        <Card {...props} key={props.cellId} handleEdit={handleEdit} />
      ))}
    </Grid>
  </Grid.Column>
);

export default DetailLoadCellsSide;
