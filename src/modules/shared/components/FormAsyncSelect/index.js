import React from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const FormAsyncSelect = ({
  form,
  field,
  label,
  disabled,
  required,
  loadOptions,
  onChange,
  ...props
}) => {
  const cn = `field ${required ? 'required' : ''}`;
  const handlerChange = value => {
    const { setFieldValue } = form;
    setFieldValue(field.name, value);
    if (onChange) {
      onChange({
        fieldName: field.name,
        data: value,
        setFieldValue,
      });
    }
  };

  return (
    <div className={cn}>
      {label && <label htmlFor={field.name}>{label}</label>}
      {loadOptions ? (
        <AsyncSelect
          {...props}
          {...field}
          id={field.name}
          loadOptions={loadOptions}
          cacheOptions={false}
          onChange={handlerChange}
        />
      ) : (
        <Select
          id={field.name}
          {...props}
          {...field}
          isDisabled={disabled}
          onChange={handlerChange}
        />
      )}
    </div>
  );
};

export default FormAsyncSelect;
