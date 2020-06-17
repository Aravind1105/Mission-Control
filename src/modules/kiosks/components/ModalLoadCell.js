import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Field } from 'formik';
import { Button, Grid, Popup, Icon, Modal } from 'semantic-ui-react';

import { getProductListSaga } from 'modules/products/actions';
import {
  getProductsSimpleList,
  getProductsHistory,
} from 'modules/products/selectors';
import FormAsyncSelect from 'modules/shared/components/FormAsyncSelect';
import FormInput from 'modules/shared/components/FormInput';
import Loader from 'modules/shared/components/Loader';
import ConfirmModal from 'modules/shared/components/ConfirmModal';
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
  getProductListSaga,
  modifyKioskLoadCell,
  match,
  loadedPosition,
}) => {
  useEffect(() => {
    getProductListSaga();
  }, []);

  const handleSelect = ({ data, setFieldValue }) => {
    const newPrice = getDefaultProductPrice({
      products: productsHistory,
      productId: data.value,
      kioskId: match.params.id,
    });
    setFieldValue('price', newPrice);
  };

  const handleSave = data => {
    const isProductChanged = initVal.product.value !== data.product.value;
    const isPositionIdChanged =
      initVal.planogramPosition !== data.planogramPosition;
    const isQuantityChanged =
      isProductChanged || initVal.quantity !== data.quantity;
    const isPriceChanged =
      1 *
        getDefaultProductPrice({
          products: productsHistory,
          productId: data.product.value,
          kioskId: match.params.id,
        }) !==
      +data.price;
    if (
      isPositionIdChanged &&
      loadedPosition.some(el => el === data.planogramPosition)
    ) {
      const isConfirmed = window.confirm(
        `A loadcell is already assigned to this position (${data.planogramPosition})! Do you want to switch positions?`,
      );
      if (!isConfirmed) {
        return '';
      }
    }
    const payload = {
      isPriceChanged,
      isProductChanged,
      isQuantityChanged,
      isPositionIdChanged,
      data,
      callback: handleClose,
    };
    modifyKioskLoadCell(payload);
  };

  return (
    <Formik
      onSubmit={handleSave}
      initialValues={initVal}
      key={initVal.price}
      validateOnBlur
    >
      {({ dirty, handleSubmit }) => (
        <ConfirmModal
          onClose={handleClose}
          isPristine={!dirty}
          title={`${kioskName}  #${initVal.cellId}`}
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
                      disabled={initVal.quantity}
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
                      type="number"
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
                      type="number"
                      icon="euro"
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
                      disabled
                      component={FormInput}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" type="submit" disabled={!dirty}>
                Update
              </Button>
            </Modal.Actions>
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
    price: getDefaultProductPrice({
      products: productsHistory,
      productId: product._id,
      kioskId: params.id,
    }),
  };
  return {
    options: getProductsSimpleList()(state),
    productsHistory,
    isProductLoading: state.products.isLoading,
    initVal,
  };
};

const mapDispatchToProps = {
  getProductListSaga,
  modifyKioskLoadCell,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ModalLoadCell);
