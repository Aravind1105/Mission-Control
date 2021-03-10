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
import { modifyKioskLoadCell, deleteLoadCell } from '../actions';
import planogramExplaination from '../../../styling/assets/images/Planogram_Explanation.png';
import { getCellIdOptions, getUsedPlanogramPositions } from '../selectors';

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
  deleteLoadCell,
  usedPositions,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [quantityState, setQuantityState] = useState(initVal.quantity);
  const [position, setPosition] = useState();
  const [productInfo, setproductInfo] = useState();
  const [isValid, setIsValid] = useState({
    productLine: false,
    quantity: false,
    cableId: false,
  });
  const [showPositionErrorAlert, setShowPositionErrorAlert] = useState(false);
  const [isValidPosition, setIsValidPosition] = useState(true);

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
    setIsValid({ ...isValid, productLine: true });
  };

  const validateCellContents = () => {
    const { productLine, quantity, cableId } = isValid;
    return productLine && quantity && cableId && isValidPosition;
  };

  const handleDeleteLoadCell = () => {
    deleteLoadCell({
      kioskId: initVal.kioskId,
      cellId: initVal.cellId.value,
      callback: handleClose,
    });
    setShowDeleteAlert(false);
  };

  const handleSave = data => {
    const isProductChanged = initVal.product.value !== data.product.value;
    const isPositionIdChanged =
      initVal.planogramPosition !== data.planogramPosition;
    const isQuantityChanged =
      isProductChanged || initVal.quantity !== +data.quantity;
    const isCellIdChanged = initVal.cellId.value !== data.cellId.value;
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
    // if not add new load cell
    if (!isAddLoadCell && (isReplacementRequired || isCellIdChanged)) {
      oldData = cells.find(
        el => el.planogramPosition === data.planogramPosition,
      );
      oldData.planogramPosition = initVal.planogramPosition;
      if (isCellIdChanged) {
        oldData.cellId = initVal.cellId.value;
      }
    }
    data.cellId = data.cellId.value;
    modifyKioskLoadCell({
      isPriceChanged,
      isProductChanged,
      isQuantityChanged,
      isPositionIdChanged,
      isCellIdChanged,
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
            initVal.cellId.value
              ? `${kioskName}  #${initVal.cellId.value}`
              : `${kioskName}`
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
                      required
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
                      onChange={(e, { value }) => {
                        setQuantityState(value);
                      }}
                      callbackOnChange={() =>
                        setIsValid({ ...isValid, quantity: true })
                      }
                      required
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
                      required
                      validate={validatePlanogramPosition}
                      component={FormInput}
                      onBlur={e => {
                        //usedPositions will hold a list of planogram positions that has isActive flag set to true
                        //check if the planogramPosition is already available in the used positions list
                        //throw error if already available
                        if (isAddLoadCell) {
                          // only in add mode
                          if (usedPositions.indexOf(e.target.value) === -1) {
                            setShowPositionErrorAlert(false);
                            setIsValidPosition(true);
                          } else if (
                            initVal.planogramPosition !== e.target.value
                          ) {
                            setShowPositionErrorAlert(true);
                            setIsValidPosition(false);
                          }
                        }
                      }}
                    />
                  </Grid.Column>

                  <Grid.Column>
                    <b>Cable ID</b>
                    <Field
                      name="cellId"
                      options={cellIdOptions}
                      disabled={!isAddLoadCell && Boolean(initVal.quantity)}
                      component={FormAsyncSelect}
                      onChange={({}) => {
                        setIsValid({ ...isValid, cableId: true });
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
                {!isAddLoadCell && (
                  <Grid.Row>
                    <Button
                      color="red"
                      style={{ marginLeft: 15 }}
                      onClick={() => setShowDeleteAlert(true)}
                    >
                      Delete
                    </Button>
                  </Grid.Row>
                )}
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
                onClick={() => {
                  if (!isAddLoadCell) {
                    setShowAlert(true);
                  } else {
                    if (validateCellContents()) {
                      setShowAlert(true);
                    } else if (!isValidPosition) {
                      setShowPositionErrorAlert(true);
                    }
                  }
                }}
              >
                Update
              </Button>
            </Modal.Actions>
            <CustomAlert
              visible={showAlert}
              onApprove={() => {
                handleSave(productInfo);
                setShowAlert(false);
              }}
              onCancel={() => setShowAlert(false)}
              alertMsg={
                initVal.cellId.value && initVal.planogramPosition != position
                  ? `A loadcell is already assigned to this position (${position})! Do you want to switch positions?`
                  : `Are you sure that you want to update the product?`
              }
            />
            <CustomAlert
              visible={showDeleteAlert}
              onApprove={() => {
                if (quantityState === 0) {
                  handleDeleteLoadCell();
                } else {
                  setShowDeleteAlert(false);
                }
              }}
              onCancel={() => setShowDeleteAlert(false)}
              alertMsg={
                quantityState === 0
                  ? 'Are you sure want to delete this load cell?'
                  : 'Loadcell should be empty before deleting.'
              }
              isWarning={quantityState !== 0}
            />
            <CustomAlert
              visible={showPositionErrorAlert}
              onApprove={() => {
                setShowPositionErrorAlert(false);
              }}
              alertMsg="Provided planogram position is already in use. Please choose another one."
              isWarning={true}
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
      label: product.cellId,
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
    cellIdOptions: getCellIdOptions(state),
    usedPositions: getUsedPlanogramPositions(state),
  };
};

const mapDispatchToProps = {
  modifyKioskLoadCell,
  getProductLinesByOrgId,
  deleteLoadCell,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ModalLoadCell);
