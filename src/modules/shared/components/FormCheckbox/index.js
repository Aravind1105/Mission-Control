import React from 'react';
import './styles.less';

const FormCheckbox = ({
  form,
  field: { value = false, ...field },
  label,
  required,
  ...props
}) => (
  <div className={`field${required ? ' required' : ''}`}>
    <label className="checkbox">
      <input
        type="checkbox"
        {...field}
        {...props}
        required={required}
        checked={value}
      />
      <span>{label}</span>
    </label>
  </div>
);

export default FormCheckbox;
