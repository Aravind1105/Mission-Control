/* eslint-disable consistent-return */
import { is } from 'ramda';
import React from 'react';
import CustomButton from '../CustomButton';

import './styles.less';

const CustomAlert = ({ visible, onApprove, onCancel, alertMsg, isWarning }) => {
  if (!visible) {
    return <div />;
  }

  return (
    <div className="inner-modal">
      <div className="inner-modal__content">
        {alertMsg}
        <div className="inner-modal__actions">
          {!isWarning && (
            <>
              <CustomButton
                cancelStyle
                label="Cancel"
                onClick={() => onCancel()}
              />
              <CustomButton
                confirmStyle
                label="Confirm"
                onClick={() => onApprove()}
              />
            </>
          )}
          {isWarning && <CustomButton label="OK" onClick={() => onApprove()} />}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
