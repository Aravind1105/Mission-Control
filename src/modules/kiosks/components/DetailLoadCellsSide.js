import React from 'react';
import { Grid, Icon, Divider, Segment } from 'semantic-ui-react';

import ColoredBlock from 'modules/shared/components/ColoredBlock';
import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import LoadCellsHeader from './LoadCellsHeader';

const Card = ({
  cellId,
  productLine,
  products,
  availableProducts,
  handleEdit,
}) => {
  const percent = (availableProducts * 100) / products.length;
  const quantityText = `${availableProducts}/${products.length}`;
  const handleClick = () => {
    handleEdit({ productLine, cellId, availableProducts });
  };

  return (
    <Grid.Column className="load-cell">
      <div className="load-cell-header">
        <b>{cellId}</b>
        <button type="button" className="edit-icon" onClick={handleClick}>
          <Icon name="edit" size="small" />
        </button>
      </div>

      <div className="load-cell-content">
        <div className="load-cell-icon">
          {productLine.image ? (
            <img src={productLine.image} alt={productLine.name} />
          ) : (
            <NoImg />
          )}
        </div>
        <div className="load-cell-body">
          <p>
            <b>{productLine ? `${productLine.name}` : null}</b>
          </p>
          <p>
            <ColoredBlock type="b" value={percent}>
              {quantityText}
            </ColoredBlock>
          </p>
          <p>{`€${productLine.price}`}</p>
        </div>
      </div>
    </Grid.Column>
  );
};

const DetailLoadCellsSide = ({ title, cells, handleEdit }) => {
  const activeShelves = cells.reduce((prev, curr) => {
    return prev + curr.length;
  }, 0);

  return cells.length ? (
    <Grid.Column>
      <Segment>
        <LoadCellsHeader title={title} activeShelves={activeShelves} />
        <Divider />
        <Grid>
          {cells.map((row, i) => (
            <Grid.Row key={`${i}`} columns="equal" className="load-cell-row">
              {row.map(props => (
                <Card {...props} key={props.cellId} handleEdit={handleEdit} />
              ))}
            </Grid.Row>
          ))}
        </Grid>
      </Segment>
    </Grid.Column>
  ) : null;
};

export default DetailLoadCellsSide;
