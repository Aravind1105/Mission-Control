import React, { useEffect, useState } from 'react';
import { Grid, Icon, Button, Segment, Popup } from 'semantic-ui-react';

import { ReactComponent as NoImg } from 'styling/assets/images/noImg.svg';
import ColoredBlock from 'modules/shared/components/ColoredBlock';
import { isNull } from 'lodash';
import PlanogramAlert from './PlanogramAlert/PlanogramAlert';

const Card = ({
  cellId,
  planogramPosition,
  productLine,
  totalProducts,
  handleEdit,
  surfaceSize,
  occupancy,
  maxQty,
}) => {
  const handleClick = () => {
    handleEdit({
      productLine,
      planogramPosition,
      cellId,
      availableProducts: totalProducts,
      surfaceSize,
    });
  };

  return (
    <Grid.Column className="load-cell">
      <div className="load-cell-content">
        <div className="load-cell-tags">
          <button type="button" className="edit-icon" onClick={handleClick}>
            <Icon name="edit" size="small" />
          </button>
          <b className="load-cell-position">
            {planogramPosition ? planogramPosition : 'Error'}
          </b>
          <p className="load-cell-calbeId">ID: {cellId ? cellId : 'Error'}</p>
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
            <Popup
              content={productLine ? `${productLine.name}` : null}
              trigger={
                <b className="load-cell-title">
                  {productLine ? `${productLine.name}` : null}
                </b>
              }
            />
            {/* <b className="load-cell-title">
              {productLine ? `${productLine.name}` : null}
            </b> */}
            <p>
              Qty:&nbsp;
              <ColoredBlock
                type="b"
                value={isNull(occupancy) ? undefined : occupancy}
              >
                {maxQty > 0 ? `${totalProducts}/${maxQty}` : `${totalProducts}`}
              </ColoredBlock>
            </p>
            <p>{`${productLine.price} €`}</p>
          </div>
        </div>
      </div>
    </Grid.Column>
  );
};

const DetailLoadCellsSide = ({ cells, handleEdit, handleAdd, rootUser }) => {
  const [showAddAlert, setShowAddAlert] = useState(false);
  return (
    <Grid.Column>
      {cells.length > 0 && (
        <Grid>
          {cells.map((row, i) => {
            // let fullWidth = false;
            return (
              <Grid.Row key={`${i}`} columns="equal" className="load-cell-row">
                {row.map((props, j) => {
                  return (
                    props && (
                      <Card
                        {...props}
                        key={props.cellId}
                        handleEdit={handleEdit}
                      />
                    )
                  );
                })}
              </Grid.Row>
            );
          })}
        </Grid>
      )}
      {handleAdd && rootUser && cells.length == 0 && (
        <Grid.Row className="add-scale-button">
          <Button
            icon
            labelPosition="left"
            color="green"
            compact
            onClick={() => {
              setShowAddAlert(true);
            }}
          >
            <Icon name="plus" />
            Add Planogram
          </Button>
          <PlanogramAlert
            visible={showAddAlert}
            onApprove={() => {
              setShowAddAlert(false);
            }}
            onCancel={() => setShowAddAlert(false)}
          />
        </Grid.Row>
      )}
      {handleAdd && cells.length > 0 && (
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
};

export default DetailLoadCellsSide;
