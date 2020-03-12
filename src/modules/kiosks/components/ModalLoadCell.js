import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Button,
  Container,
  Modal,
  Grid,
  Input,
  Popup,
  Icon,
} from 'semantic-ui-react';
import Select from 'react-select';

import { getProductListSaga } from 'modules/products/actions';
import {
  getProductsSimpleList,
  getProductsHistory,
} from 'modules/products/selectors';
import Loader from 'modules/shared/components/Loader';
import getDefaultProductPrice from 'lib/getDefaultProductPrice';
import { modifyKioskLoadCell } from '../actions';

const ToolTip = () => (
  <Popup
    content="There  are products left in the fridge - can’t change the product setup for loadcell"
    trigger={<Icon size="large" color="yellow" name="info circle" />}
  />
);

const ModalLoadCell = ({
  product,
  options,
  handleClose,
  kioskName,
  defaultPrice,
  productsHistory,
  isProductLoading,
  getProductListSaga,
  modifyKioskLoadCell,
  match,
}) => {
  const [selected, setSelected] = useState({
    value: product._id,
    label: product.name,
  });
  const [price, changePrice] = useState('');

  const defaultValueSelect = {
    value: product._id,
    label: product.name,
  };
  const disabled = selected.value === product._id && price === defaultPrice;

  useEffect(() => {
    getProductListSaga();
  }, []);

  useEffect(() => {
    changePrice(defaultPrice);
  }, [defaultPrice]);

  const handleSelect = newProduct => {
    const newPrice = getDefaultProductPrice({
      products: productsHistory,
      productId: newProduct.value,
      kioskId: match.params.id,
    });
    setSelected(newProduct);
    changePrice(newPrice);
  };

  const handleChangePrice = ({ target }) => {
    changePrice(target.value);
  };

  const handleSave = () => {
    const isProductChanged = product._id !== selected.value;
    const isPriceChanged =
      getDefaultProductPrice({
        products: productsHistory,
        productId: selected.value,
        kioskId: match.params.id,
      }) !== +price;

    const payload = {
      price: isPriceChanged ? price : '',
      productId: selected.value,
      cellId: isProductChanged ? product.cellId : '',
      kioskId: match.params.id,
      callback: handleClose,
    };
    modifyKioskLoadCell(payload);
  };

  return (
    <Modal open onClose={handleClose} size="tiny">
      <Modal.Header className="text-align-center">
        <Container textAlign="center">
          <h3>{`${kioskName}  #${product.cellId}`}</h3>
        </Container>
      </Modal.Header>
      <Modal.Content>
        {isProductLoading && <Loader />}
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <b>Product&nbsp;</b>
              {product.availableProducts ? <ToolTip /> : null}
            </Grid.Column>
            <Grid.Column width={10}>
              <Select
                options={options}
                onChange={handleSelect}
                defaultValue={defaultValueSelect}
                isSearchable
                isDisabled={product.availableProducts}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={6}>
              <b>Price</b>
            </Grid.Column>
            <Grid.Column width={10}>
              <Input
                icon="euro"
                className="full-width"
                type="number"
                min={0}
                value={price}
                onChange={handleChangePrice}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleSave} disabled={disabled}>
          Update
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state, { product, match: { params } }) => {
  const productsHistory = getProductsHistory(state);
  return {
    options: getProductsSimpleList()(state),
    productsHistory,
    isProductLoading: state.products.isLoading,
    defaultPrice: getDefaultProductPrice({
      products: productsHistory,
      productId: product._id,
      kioskId: params.id,
    }),
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
