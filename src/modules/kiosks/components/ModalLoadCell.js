import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Field } from 'formik';
import { Button, Grid, Popup, Icon, Modal } from 'semantic-ui-react';

import { getProductLinesByOrgId } from 'modules/kiosks/actions';
import {
  getProductsHistory,
} from 'modules/products/selectors';
import { getOrgIdFromKiosk, getProductsDropdownList } from 'modules/kiosks/selectors';
import FormAsyncSelect from 'modules/shared/components/FormAsyncSelect';
import FormInput from 'modules/shared/components/FormInput';
import Loader from 'modules/shared/components/Loader';
import ConfirmModal from 'modules/shared/components/ConfirmModal';
import CustomAlert from 'modules/shared/components/CustomAlert';
import getDefaultProductPrice from 'lib/getDefaultProductPrice';
import prettierNumber from 'lib/prettierNumber';
import validatePlanogramPosition from 'lib/validatePlanogramPosition';
import { modifyKioskLoadCell } from '../actions';

const ToolTip = () => (
  <Popup
    content="There  are products left in the fridge - can’t change the product setup for loadcell"
    trigger={<Icon size="large" color="yellow" name="info circle" />}
  />
);

const ModalLoadCell = ({
  initVal,
  options,
  handleClose,
  kioskName,
  productsHistory,
  isProductLoading,
  modifyKioskLoadCell,
  match,
  loadedPosition,
  cells,
  isAddLoadCell,
  orgId,
  getProductLinesByOrgId,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [position, setPosition] = useState() ;
  const [productInfo, setproductInfo] = useState();

  useEffect(() => {
    getProductLinesByOrgId(orgId);
  }, []);

  const handleSelect = ({ data, setFieldValue }) => {
    const newPrice = getDefaultProductPrice({
      products: productsHistory,
      productId: data.value,
      kioskId: match.params.id,
    });
    setFieldValue('price', newPrice);
  };

  const validateCellId = cellId => {
    let error;
    const filteredCellId = cells.filter(cell => cell.cellId === cellId);
    if (isAddLoadCell && filteredCellId.length > 0) {
      error = 'Cable ID already exists.';
    }
    return error;
  };

  const handleSave = data => {
    const isProductChanged = initVal.product.value !== data.product.value;
    const isPositionIdChanged =
      initVal.planogramPosition !== data.planogramPosition;
    const isQuantityChanged =
      isProductChanged || initVal.quantity !== +data.quantity;
    const isPriceChanged =
      Number(
        getDefaultProductPrice({
          products: productsHistory,
          productId: data.product.value,
          kioskId: match.params.id,
        }),
      ) !== +data.price;
    const isReplacementRequired =
      isPositionIdChanged &&
      loadedPosition.some(el => el === data.planogramPosition);
    data.price = +data.price || 0;
    data.quantity = +data.quantity || 0;
    let oldData;
    if (isReplacementRequired) {
      oldData = cells.find(
        el => el.planogramPosition === data.planogramPosition,
      );
      oldData.planogramPosition = initVal.planogramPosition;
    }
    modifyKioskLoadCell({
      isPriceChanged,
      isProductChanged,
      isQuantityChanged,
      isPositionIdChanged,
      data,
      oldData,
      callback: handleClose,
    });
  };

  return (
    <Formik
      onSubmit={ data => {
        setproductInfo(data);
        setPosition(data.planogramPosition);
        }
      }
      initialValues={initVal}
      key={initVal.price}
      validateOnBlur
    >
      {({ dirty, handleSubmit }) => (
        <ConfirmModal
          onClose={handleClose}
          isPristine={!dirty}
          title={initVal.cellId ? `${kioskName}  #${initVal.cellId}` : `${kioskName}`}
        >
          <form onSubmit={handleSubmit} className="modal-form">
            <Modal.Content>
              {isProductLoading && <Loader />}
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <b>Product&nbsp;</b>
                    {initVal.quantity ? <ToolTip /> : null}
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Field
                      name="product"
                      isSearchable
                      options={options}
                      onChange={handleSelect}
                      disabled={Boolean(initVal.quantity)}
                      component={FormAsyncSelect}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={6}>
                    <b>Product Quantity&nbsp;</b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Field
                      name="quantity"
                      limiting="integerField"
                      min={0}
                      component={FormInput}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={6}>
                    <b>Price</b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Field
                      name="price"
                      limiting="floatingField"
                      icon="euro"
                      iconPosition="left"
                      min={0}
                      prettier={prettierNumber}
                      component={FormInput}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="equal">
                  <Grid.Column>
                    <Field
                      name="planogramPosition"
                      label="Position"
                      required
                      validate={validatePlanogramPosition}
                      component={FormInput}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Field
                      name="cellId"
                      label="Cable ID"
                      disabled={!isAddLoadCell}
                      validate={validateCellId}
                      component={FormInput}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => handleClose()}>Cancel</Button>
              <Button 
                color="green"
                type="submit"
                disabled={!dirty} 
                onClick={() => setShowAlert(true)}
              >
                Update
              </Button>
            </Modal.Actions>
            <CustomAlert 
              visible={showAlert}
              onApprove={() => {
                handleSave(productInfo);
                setShowAlert(false);
                }
              }
              onCancel={() => setShowAlert(false)}
              alertMsg={`A loadcell is already assigned to this position (${position})! Do you want to switch positions?`}
            /> 
          </form>
        </ConfirmModal>
      )}
    </Formik>
  );
};

const mapStateToProps = (state, { product, match: { params } }) => {
  const productsHistory = getProductsHistory(state);
  const initVal = {
    cellId: product.cellId,
    planogramPosition: product.planogramPosition,
    kioskId: params.id,
    product: {
      value: product._id,
      label: product.name,
    },
    quantity: product.availableProducts,
    price: product.price,
  };
  return {
    options: getProductsDropdownList()(state),
    orgId: getOrgIdFromKiosk(state),
    productsHistory,
    isProductLoading: state.products.isLoading,
    initVal,
  };
};

const mapDispatchToProps = {
  modifyKioskLoadCell,
  getProductLinesByOrgId,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ModalLoadCell);
