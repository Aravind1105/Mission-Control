import React, { useState, useEffect } from 'react';
import { FormInput as Input, Dropdown } from 'semantic-ui-react';

const FormInputWithUnit = ({
  form,
  field,
  placeholder,
  onChange,
  disabled,
  unitOptions,
  selectedUnitInput,
  defaultUnitIndex,
  limiting,
  ...props
}) => {
  const isTouched = form.touched[field.name];
  const error = form.errors[field.name] && form.errors[field.name].value;
  const errMsg = isTouched && error ? { content: error } : undefined;

  const [text, changeText] = useState('');
  const [unit, setUnit] = useState(unitOptions[defaultUnitIndex].value);

  useEffect(() => {
    changeText(form.values[field.name].value);
    setUnit(form.values[field.name].unit);
  }, [form.values[field.name]]);

  const handleValueChange = value => {
    if (limiting === 'floatingField') {
      if (
        /^[0-9]{1,20}([,.][0-9]{1,2})?$/.test(value) ||
        /^[0-9]{1,20}([,.])?$/.test(value)
      ) {
        if (value.includes('.') || value.includes(',')) {
          changeText(value.replace(',', '.'));
        } else {
          changeText(value.replace('.', ','));
        }
      } else if (value === '') {
        changeText('');
      }
    } else if (limiting === 'integerField') {
      if (/^\d+$/.test(value)) {
        changeText(value);
        form.setFieldValue(field.name, {
          value: value,
          unit,
        });
      } else if (value === '') {
        changeText('');
        form.setFieldValue(field.name, {
          value: '',
          unit,
        });
      }
    }
  };

  useEffect(() => {
    form.setFieldValue(field.name, {
      value: text,
      unit,
    });
  }, [unit]);

  return (
    <Input
      fluid
      {...field}
      placeholder={placeholder}
      error={errMsg}
      onChange={event => {
        handleValueChange(event.target.value);
      }}
      value={text}
      {...props}
      action={
        <Dropdown
          compact
          button
          selection
          value={unit}
          options={unitOptions}
          onChange={(e, { value }) => setUnit(value)}
        />
      }
    />
  );
};

export default FormInputWithUnit;
