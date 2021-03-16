import React from 'react';
import './styles.less';

const FormToggleCheckbox = ({
  form,
  field: { onClick, value = false, ...field },
  label,
  required,
  ...props
}) => {
  const handleChange = val => {
    console.log(val, 'VALALLALAL');
    if (props.onChangeCallback) props.onChangeCallback(!value);
  };
  return (
    // <div className={`field${required ? ' required' : ''}`}>
    //   <label className="checkbox">
    //     <input
    //       type="checkbox"
    //       toggle
    //       {...field}
    //       {...props}
    //       required={required}
    //       checked={value}
    //       onClick={handleChange}
    //     />
    //     <span>{label}</span>
    //   </label>
    // </div>
    <div class={`ui fitted toggle checkbox `}>
      <input
        type="checkbox"
        {...props}
        required={required}
        onClick={handleChange}
      />
      <label>{label}</label>
    </div>
  );
};
export default FormToggleCheckbox;
