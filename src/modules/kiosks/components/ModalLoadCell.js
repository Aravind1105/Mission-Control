import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Field } from 'formik';
import { Button, Grid, Popup, Icon, Modal, Form } from 'semantic-ui-react';
import * as R from 'ramda';

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
import validatePlanogramPosition from 'lib/validatePlanogramPosition';
import { modifyKioskLoadCell, deleteLoadCell } from '../actions';
import planogramExplaination from '../../../styling/assets/images/Planogram_Explanation.png';
import { getCellIdOptions, getUsedPlanogramPositions } from '../selectors';
import * as Yup from 'yup';

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

const shelfSizeOptions = [
  { label: '1/3 Shelf (S)', value: 33 },
  { label: '1/2 Shelf (M)', value: 50 },
  { label: 'Full Shelf (L)', value: 100 },
];

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
  const [position, setPosition] = useState('');
  const [productInfo, setproductInfo] = useState();
  const [isValid, setIsValid] = useState({
    productLine: false,
    cableId: false,
  });
  const [showPositionErrorAlert, setShowPositionErrorAlert] = useState(false);
  const [isValidPosition, setIsValidPosition] = useState(true);
  const [disableCableId, setDisableCableId] = useState(false);
  const [disablePlanogramPosition, setDisablePlanogramPosition] = useState(
    false,
  );

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
    const { productLine, cableId } = isValid;
    return productLine && cableId && isValidPosition;
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

    // compare price with default price or compare price with previous price
    const isPriceChanged =
      Number(
        getDefaultProductPrice({
          products: productsHistory,
          productId: data.product.value,
          kioskId: match.params.id,
        }),
      ) !== +data.price || initVal.price !== +data.price;

    const isReplacementRequired =
      isPositionIdChanged &&
      loadedPosition.some(el => el === data.planogramPosition);

    const isShelfSizeChanged = initVal.surfaceSize
      ? initVal.surfaceSize.value !== data.surfaceSize.value
      : true;

    data.surfaceSize = data.surfaceSize.value;
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
      isShelfSizeChanged,
      data,
      oldData,
      callback: handleClose,
    });
  };

  return (
    <Formik
      onSubmit={data => {
        setproductInfo(data);
        // setPosition(data.planogramPosition);
      }}
      initialValues={initVal}
      key={initVal.price}
      validateOnChange
      enableReinitialize
      validationSchema={Yup.object().shape({
        product: Yup.string().required('This field is required'),
        planogramPosition: Yup.string().required('This field is required'),
        cellId: Yup.string().required('This field is required'),
        price: Yup.number().required('This field is required'),
        surfaceSize: Yup.string().required('This field is required'),
      })}
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
          <Form onSubmit={handleSubmit} className="modal-form">
            <Modal.Content>
              {isProductLoading && <Loader />}
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column>
                    <b>
                      Product<span style={{ color: 'red' }}>&#42;</span>&nbsp;
                    </b>
                    {initVal.quantity ? <ToolTip /> : null}
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
                  <Grid.Column>
                    <b>Product Quantity&nbsp;</b>
                    <Field
                      name="quantity"
                      limiting="integerField"
                      min={0}
                      component={FormInput}
                      onChange={(e, { value }) => {
                        setQuantityState(value);
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column>
                    <b>
                      Planogram Position
                      <span style={{ color: 'red' }}>&#42;</span>&nbsp;
                    </b>
                    {initVal.quantity ? <PositionTip /> : null}
                    <Field
                      name="planogramPosition"
                      required
                      validate={validatePlanogramPosition}
                      component={FormInput}
                      disabled={disablePlanogramPosition}
                      onBlur={e => {
                        // if position modified, disable cable ID field
                        if (
                          initVal.planogramPosition !== e.target.value &&
                          !isAddLoadCell
                        ) {
                          setDisableCableId(true);
                        } else {
                          setDisableCableId(false);
                        }

                        //check if the planogramPosition is already available in the used positions list
                        //throw error if already available
                        if (isAddLoadCell) {
                          // only in add mode
                          if (usedPositions.indexOf(e.target.value) === -1) {
                            setShowPositionErrorAlert(false);
                            setIsValidPosition(true);
                          } else {
                            setShowPositionErrorAlert(true);
                            setIsValidPosition(false);
                          }
                          setPosition(e.target.value);
                        } else if (
                          initVal.planogramPosition !== e.target.value &&
                          usedPositions.includes(e.target.value)
                        ) {
                          setIsValidPosition(false);
                          setPosition(e.target.value);
                        } else if (
                          initVal.planogramPosition !== e.target.value &&
                          !usedPositions.includes(e.target.value)
                        ) {
                          setIsValidPosition(true);
                        } else if (
                          initVal.planogramPosition === e.target.value
                        ) {
                          setIsValidPosition(true);
                        }
                      }}
                    />
                  </Grid.Column>

                  <Grid.Column>
                    <b>Cable ID</b>
                    <span style={{ color: 'red' }}>&#42;</span>
                    <Field
                      name="cellId"
                      options={cellIdOptions}
                      disabled={
                        (!isAddLoadCell && Boolean(initVal.quantity)) ||
                        disableCableId
                      }
                      required
                      component={FormAsyncSelect}
                      onChange={({ data }) => {
                        setIsValid({ ...isValid, cableId: true });

                        // if cable ID is changed, disable planogram position field
                        if (data.value !== initVal.cableId && !isAddLoadCell) {
                          setDisablePlanogramPosition(true);
                        } else {
                          setDisablePlanogramPosition(false);
                        }
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  <Grid.Column>
                    <b>Price</b>
                    <span style={{ color: 'red' }}>&#42;</span>
                    <Field
                      name="price"
                      limiting="floatingField"
                      icon="euro"
                      iconPosition="right"
                      min={0}
                      required
                      component={FormInput}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <b>Shelf Size</b>
                    <span style={{ color: 'red' }}>&#42;</span>
                    <Field
                      name="surfaceSize"
                      options={shelfSizeOptions}
                      component={FormAsyncSelect}
                      required
                      onChange={({}) => {
                        // setIsValid({ ...isValid, cableId: true });
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {!isAddLoadCell && (
                <Button
                  color="red"
                  floated="left"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  Delete
                </Button>
              )}
              <Button color="darkgrey" onClick={() => handleClose()}>
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
                (isAddLoadCell &&
                  !isValidPosition &&
                  !showPositionErrorAlert) ||
                (initVal.cellId.value && !isValidPosition)
                  ? `A loadcell is already assigned to this position (${position})!\nDo you want to switch positions?`
                  : `Are you sure you want to\nupdate the product?`
              }
            />
            <CustomAlert
              visible={showDeleteAlert}
              onApprove={() => {
                handleDeleteLoadCell();
              }}
              onCancel={() => setShowDeleteAlert(false)}
              alertMsg={
                quantityState === 0
                  ? 'Are you sure you want to\ndelete this scale?'
                  : 'There are still some products on this scale.\nAre you sure want to delete?'
              }
            />
            <CustomAlert
              visible={showPositionErrorAlert}
              onApprove={() => {
                setShowPositionErrorAlert(false);
              }}
              alertMsg={`Provided planogram position is already in use.\nPlease choose another one.`}
              isWarning={true}
            />
          </Form>
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
    surfaceSize: R.find(
      R.propEq('value', product.surfaceSize),
      shelfSizeOptions,
    ),
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
