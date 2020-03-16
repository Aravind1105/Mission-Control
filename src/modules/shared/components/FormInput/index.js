import React from 'react';
import { FormInput as Input } from 'semantic-ui-react';

const FormInput = ({ form, field, step, ...props }) => {
  const isTouched = form.touched[field.name];
  const error = form.errors[field.name];
  const errMsg = isTouched && error ? { content: error } : undefined;

  return (
    <Input type="text" fluid step={step} {...field} {...props} error={errMsg} />
  );
};

FormInput.defaultProps = {
  step: 'any',
};

export default FormInput;
