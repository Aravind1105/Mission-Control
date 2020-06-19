import React from 'react';
import { FormInput as Input } from 'semantic-ui-react';

const FormInput = ({ form, field, step, readOnly, prettier, ...props }) => {
  const isTouched = form.touched[field.name];
  const error = form.errors[field.name];
  const errMsg = isTouched && error ? { content: error } : undefined;

  const handleBlur = ({ target }) => {
    const price = prettier(target.value);
    form.setFieldValue(field.name, price);
  };

  return (
    <Input
      type="text"
      fluid
      step={step}
      {...field}
      onBlur={prettier ? handleBlur : field.onBlur}
      {...props}
      error={errMsg}
    />
  );
};

FormInput.defaultProps = {
  step: 'any',
};

export default FormInput;
