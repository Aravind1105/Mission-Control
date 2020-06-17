import React, { useState } from 'react';
import { Container, Modal, Button } from 'semantic-ui-react';

import './styles.less';

const InnerModal = ({ onApprove, onCancel, confirmMsg }) => (
  <div className="inner-modal">
    <div className="inner-modal__content">
      {confirmMsg ? (
        confirmMsg
      ) : (
        <p>
          You have unsaved data.
          <br />
          Do you want to close the window without saving?
        </p>
      )}
      <div className="inner-modal__actions">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" color="green" onClick={onApprove}>
          Close
        </Button>
      </div>
    </div>
  </div>
);

const ConfirmModal = ({
  isPristine,
  title,
  children,
  onClose,
  size,
  confirmMsg,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (isPristine) {
      onClose();
    } else {
      setOpen(true);
    }
  };

  const onApprove = () => {
    onClose();
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open onClose={handleClose} size={size}>
      <Modal.Header className="text-align-center">
        <Container textAlign="center">
          <h3>{title}</h3>
        </Container>
      </Modal.Header>
      {children}
      {open && (
        <InnerModal
          onApprove={onApprove}
          onCancel={onCancel}
          confirmMsg={confirmMsg}
        />
      )}
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  isPristine: false,
  size: 'tiny',
  children: null,
};

export default ConfirmModal;
