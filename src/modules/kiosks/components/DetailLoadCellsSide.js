import React from 'react';
import { Grid, Icon, Button, Segment } from 'semantic-ui-react';

import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import ColoredBlock from 'modules/shared/components/ColoredBlock';

const Card = ({
  cellId,
  planogramPosition,
  productLine,
  totalProducts,
  handleEdit,
}) => {
  const handleClick = () => {
    handleEdit({
      productLine,
      planogramPosition,
      cellId,
      availableProducts: totalProducts,
    });
  };

  return (
    <Grid.Column className="load-cell">
      <div className="load-cell-content">
        <div className="load-cell-tags">
          <button type="button" className="edit-icon" onClick={handleClick}>
            <Icon name="edit" size="small" />
          </button>
          <b className="load-cell-position">{planogramPosition ? planogramPosition : "Error"}</b>
          <p className="load-cell-calbeId">ID: {cellId ? cellId : "Error"}</p>
        </div>
        <div className="load-cell-info">
          <div className="load-cell-icon">
            {productLine.image ? (
              <img src={productLine.image} alt={productLine.name} />
            ) : (
                <NoImg />
              )}
          </div>
          <div className="load-cell-body">
            <b className="load-cell-title">
              {productLine ? `${productLine.name}` : null}
            </b>
            <p>
              Qty:&nbsp;
              <ColoredBlock type="b" value={totalProducts ? 100 : 0}>
                {totalProducts}
              </ColoredBlock>
            </p>
            <p>{`€ ${productLine.price}`}</p>
          </div>
        </div>

      </div>
    </Grid.Column>
  );
};

const DetailLoadCellsSide = ({ cells, handleEdit, handleAdd }) => (
  <Grid.Column>
    {cells.length > 0 && (
      <Grid>
        {cells.map((row, i) => {
          // let fullWidth = false;
          return (
            <Grid.Row key={`${i}`} columns="equal" className="load-cell-row">
              {row.map((props, j) => {
                // if (!j) {
                //   fullWidth = Boolean(props);
                // }
                // if ((fullWidth && j) || (!fullWidth && !j)) return null;
                return props && (
                  <Card {...props} key={props.cellId} handleEdit={handleEdit} />
                )
                //  (
                //     <Grid.Column
                //       key={performance.now().toString(32)}
                //       className="load-cell"
                //     />
                //   );
              })}
            </Grid.Row>
          );
        })}
      </Grid>
    )}
    {handleAdd && (
      <Grid.Row className="add-scale-button">
        <Button
          icon
          labelPosition="left"
          color="green"
          compact
          onClick={handleAdd}
        >
          <Icon name="plus" />
          Add Scale
        </Button>
      </Grid.Row>
    )}
  </Grid.Column>
);

export default DetailLoadCellsSide;
