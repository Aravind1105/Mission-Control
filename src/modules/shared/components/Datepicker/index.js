import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import './styles.less';

const DatePicker = ({ type, onChange }) => {
  const handlerChange = (e, { value }) => {
    if (onChange) onChange(value);
  };

  return (
    <div id="datepicker-wrapper">
      <SemanticDatepicker
        format="DD.MM.YYYY"
        className="test"
        id="datepicker-input"
        type={type}
        onChange={handlerChange}
      />
    </div>
  );
};

DatePicker.defaultProps = {
  type: 'basic',
};

export default DatePicker;
