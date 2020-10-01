import React from 'react';
import { FormInput as Input, Dropdown } from 'semantic-ui-react';

const FormInput = ({ form, field, step, readOnly, prettier, limiting, selectorOptions, selectorDefaultValueIndex, dropdownSelectedValue, ...props }) => {
  const [selectorValue, setSelectorValue] = React.useState(selectorOptions[selectorDefaultValueIndex].value);
  React.useEffect(() => {
    setSelectorValue(dropdownSelectedValue);
  }, [dropdownSelectedValue]);

  const isTouched = form.touched[field.name];
  const error = form.errors[field.name];
  const errMsg = isTouched && error ? { content: error } : undefined;

  // do not remove this effect
  // this is required for the component to refresh its dropdown value
  React.useEffect(() => {
  }, [selectorValue]);

  const handleBlur = ({ target }) => {
    const price = prettier(target.value);
    form.setFieldValue(field.name, price);
  };

  const handleChange = (e, { value }) => {
    if (limiting === 'floatingField') {
      if (/^[0-9]{1,20}([,.][0-9]{1,2})?$/.test(value) || /^[0-9]{1,20}([,.])?$/.test(value)) {
        if (value.includes('.') || value.includes(',')) {
          form.setFieldValue(field.name, value.replace(',', '.'));
        } else form.setFieldValue(field.name, value.replace('.', ','));
      } else if (value === '') form.setFieldValue(field.name, '');
    } else if (limiting === 'integerField') {
      if (/^\d+$/.test(value)) {
        form.setFieldValue(field.name, value);
      } else if (value === '') form.setFieldValue(field.name, value);
    }
    form.setFieldValue(`${field.name}Unit`, selectorValue);
  };

  return (
    <Input
      fluid
      step={step}
      {...field}
      onBlur={prettier ? handleBlur : field.onBlur}
      {...props}
      error={errMsg}
      onChange={limiting ? handleChange : field.onChange}
      action={(
        <Dropdown
          // {...field}
          compact
          button
          selection
          value={selectorValue}
          defaultValue={selectorOptions[selectorDefaultValueIndex].value}
          options={selectorOptions}
          onChange={(e, { value }) => {
            setSelectorValue(value);
          }}
        />
      )}
    />
  );
};

FormInput.defaultProps = {
  step: 'any',
  type: 'text',
};

export default FormInput;
