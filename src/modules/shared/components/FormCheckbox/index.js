import React from 'react';
import './styles.less';

const FormCheckbox = ({
  form,
  field: { onClick, value = false, ...field },
  label,
  required,
  ...props
}) => {
  const handleChange = () => {
    if (props.onChangeCallback) props.onChangeCallback(!value);
  };
  return (
    <div className={`field${required ? ' required' : ''}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          {...field}
          {...props}
          required={required}
          checked={value}
          onClick={handleChange}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default FormCheckbox;
