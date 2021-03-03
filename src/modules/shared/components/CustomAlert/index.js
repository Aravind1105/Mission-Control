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
              <CustomButton label="No" onClick={() => onCancel()} />
              <CustomButton label={'Yes'} onClick={() => onApprove()} />
            </>
          )}
          {isWarning && (
            <CustomButton label={'Ok'} onClick={() => onApprove()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
