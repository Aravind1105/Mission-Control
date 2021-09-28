import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  confirmHandler,
  title,
  children,
  justConfirmation,
  onClickNo,
  sessionExpired,
}) => {
  return (
    <Modal size="mini" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      {sessionExpired ? (
        <Modal.Actions style={{ textAlign: 'center' }}>
          <Button
            color="blue"
            onClick={confirmHandler}
            style={{ textAlign: 'center' }}
          >
            Got it!
          </Button>
        </Modal.Actions>
      ) : (
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              if (onClickNo) {
                onClickNo();
              }
              setIsModalOpen(false);
            }}
          >
            No
          </Button>
          <>
            {justConfirmation ? (
              <Button positive onClick={() => setIsModalOpen(false)}>
                Yes
              </Button>
            ) : (
              <Button positive onClick={confirmHandler}>
                Yes
              </Button>
            )}
          </>
        </Modal.Actions>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
