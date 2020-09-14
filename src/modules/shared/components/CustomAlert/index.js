/* eslint-disable consistent-return */
import React from 'react';
import CustomButton from '../CustomButton'


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
          <CustomButton 
          label="No"
          onClick={() => onCancel()}/>
          
          <CustomButton 
          label="Yes"
          onClick={() => onApprove()}/>
          
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
