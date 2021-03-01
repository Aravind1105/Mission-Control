import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Field } from 'formik';
import { Button, Grid, Popup, Icon, Modal } from 'semantic-ui-react';

import { getProductLinesByOrgId } from 'modules/kiosks/actions';
import { getProductsHistory } from 'modules/products/selectors';
import {
  getOrgIdFromKiosk,
  getProductsDropdownList,
} from 'modules/kiosks/selectors';
import FormAsyncSelect from 'modules/shared/components/FormAsyncSelect';
import FormInput from 'modules/shared/components/FormInput';
import Loader from 'modules/shared/components/Loader';
import ConfirmModal from 'modules/shared/components/ModalForm';
import CustomAlert from 'modules/shared/components/CustomAlert';
import getDefaultProductPrice from 'lib/getDefaultProductPrice';
import prettierNumber from 'lib/prettierNumber';
import validatePlanogramPosition from 'lib/validatePlanogramPosition';
import { modifyKioskLoadCell } from '../actions';
import { toast } from 'react-semantic-toasts';
import planogramExplaination from '../../../styling/assets/images/Planogram_Explanation.png';
import { getCellIdOptions } from '../selectors';

const ToolTip = () => (
  <Popup
    content="There  are products left in the fridge - can’t change the product setup for loadcell"
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const PositionTip = () => (
  <Popup trigger={<Icon color="yellow" name="info circle" />}>
    <Popup.Content>
      <img src={planogramExplaination} style={{ width: 330, height: 170 }} />
    </Popup.Content>
  </Popup>
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
  cellIdOptions,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [position, setPosition] = useState();
  const [productInfo, setproductInfo] = useState();

  const handleCableIdSelect = () => {};

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
    data.cellId = data.cellId.value;
    data.isActive = oldData.isActive;
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
      onSubmit={data => {
        setproductInfo(data);
        setPosition(data.planogramPosition);
      }}
      initialValues={initVal}
      key={initVal.price}
      validateOnBlur
    >
      {({ dirty, handleSubmit }) => (
        <ConfirmModal
          onClose={handleClose}
          isPristine={!dirty}
          title={
            initVal.cellId ? `${kioskName}  #${initVal.cellId}` : `${kioskName}`
          }
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
                    <b>Planogram Position</b>
                    {initVal.quantity ? <PositionTip /> : null}
                    <Field
                      name="planogramPosition"
                      // label="Position"
                      required
                      validate={validatePlanogramPosition}
                      component={FormInput}
                    />
                  </Grid.Column>

                  <Grid.Column>
                    <b>Cable ID</b>
                    {/* <Field
                      name="cellId"
                      // label="Cable ID"
                      disabled={!isAddLoadCell && Boolean(initVal.quantity)}
                      validate={validateCellId}
                      component={FormInput}
                    /> */}
                    <Field
                      name="cellId"
                      options={cellIdOptions}
                      onChange={handleCableIdSelect}
                      disabled={!isAddLoadCell && Boolean(initVal.quantity)}
                      component={FormAsyncSelect}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => handleClose()}>
                Cancel
              </Button>
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
                toast({
                  type: 'success',
                  description: 'Scale was saved successfully.',
                  animation: 'fade left',
                });
              }}
              onCancel={() => setShowAlert(false)}
              alertMsg={
                initVal.planogramPosition != position
                  ? `A loadcell is already assigned to this position (${position})! Do you want to switch positions?`
                  : `Are you sure that you want to update the product?`
              }
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
    cellId: {
      value: product.cellId,
      label: product.cellId
    },
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
    cellIdOptions: getCellIdOptions(state)
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
