/* eslint-disable consistent-return */
import React from 'react';
import { Button } from 'semantic-ui-react';

import './styles.less';

const CustomAlert = ({
  visible,
  onApprove,
  onCancel,
  alertMsg,
}) => {
  if (!visible) {
    return <div />;
  }

  return (
    <div className="inner-modal">
      <div className="inner-modal__content">
        {alertMsg}
        <div className="inner-modal__actions">
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button type="submit" color="green" onClick={() => onApprove()}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
