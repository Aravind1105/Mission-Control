import React from 'react';
import AsyncSelect from 'react-select/async';

const FormAsyncSelect = ({ form, field, label, required, ...props }) => {
  const cn = `field ${required ? 'required' : ''}`;
  const handlerChange = value => {
    form.setFieldValue(field.name, value);
  };

  return (
    <div className={cn}>
      <label htmlFor={field.name}>{label}</label>
      <AsyncSelect
        id={field.name}
        {...props}
        {...field}
        cacheOptions={false}
        onChange={handlerChange}
      />
    </div>
  );
};

export default FormAsyncSelect;
