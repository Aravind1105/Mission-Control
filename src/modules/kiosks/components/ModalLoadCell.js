import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Header, Modal } from 'semantic-ui-react';
import Select from 'react-select';

import { loadProductsSaga } from 'modules/products/actions/productActions';
import { getProductsSimpleList } from 'modules/products/selectors';
import { modifyKioskLoadCell } from '../actions';

const ModalLoadCell = ({
  product,
  productList,
  handleClose,
  kioskName,
  loadProductsSaga,
  modifyKioskLoadCell,
  match,
}) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadProductsSaga();
  }, []);

  const handleSelect = value => {
    setSelected(value);
  };

  const handleSave = () => {
    const payload = {
      loadCellConfigs: [
        {
          productLine: selected.value,
          cellId: product.cellId,
        },
      ],
      kioskId: match.params.id,
      callback: handleClose,
    };
    modifyKioskLoadCell(payload);
  };

  return (
    <Modal open onClose={handleClose} size="tiny">
      <Header content={kioskName} textAlign="center" />
      <Modal.Content>
        <p>
          Current product:&nbsp;
          <b>{product.name}</b>
        </p>
        <p>
          New product:&nbsp;
          <b>{selected ? selected.label : ''}</b>
        </p>
        <Select
          options={productList}
          onChange={handleSelect}
          isSearchable
          placeholder="Select new product..."
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleSave} disabled={!selected}>
          Save changes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state, { product }) => ({
  productList: getProductsSimpleList(state).filter(
    el => el.value !== product._id,
  ),
});

const mapDispatchToProps = {
  loadProductsSaga,
  modifyKioskLoadCell,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(ModalLoadCell);
