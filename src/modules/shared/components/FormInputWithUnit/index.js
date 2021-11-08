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
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!isUpdated && form.values[field.name].value) {
      changeText(form.values[field.name].value);
      setUnit(form.values[field.name].unit);
      setIsUpdated(true);
    }
  }, [form.values[field.name], isUpdated]);

  const handleValueChange = value => {
    // const unit = form.values[field.name].unit;
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
      } else if (value === '') {
        changeText('');
      }
    }
  };

  const setFormFieldValues = (value, unit) =>
    form.setFieldValue(field.name, {
      value,
      unit,
    });

  useEffect(() => {
    form.setFieldValue(field.name, {
      value: text,
      unit,
    });
  }, [unit]);

  return (
    <Input
      {...field}
      fluid
      onBlur={() =>
        form.setFieldValue(field.name, {
          value: text,
          unit,
        })
      }
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
