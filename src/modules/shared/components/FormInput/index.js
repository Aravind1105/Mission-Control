import React from 'react';
import { FormInput as Input } from 'semantic-ui-react';

const FormInput = ({ form, field, step, ...props }) => {
  return <Input type="text" fluid step={step} {...field} {...props} />;
};

FormInput.defaultProps = {
  step: 'any',
};

export default FormInput;
