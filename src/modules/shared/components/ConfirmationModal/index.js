import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  confirmHandler,
  title,
  children,
}) => {
  return (
    <Modal size="mini" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setIsModalOpen(false)}>
          No
        </Button>
        <Button positive onClick={confirmHandler}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmationModal;
