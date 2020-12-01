import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const FormSelect = ({
  form,
  field: { onChange, onBlur, ...field },
  options,
  ...props
}) => {
  const handlerChange = (e, { value }) => {
    form.setFieldValue(field.name, value);
    if (props.handleCallback) props.handleCallback(value);
  };
  const isTouched = form.touched[field.name];
  const error = form.errors[field.name];
  const errMsg = isTouched && error ? { content: error } : undefined;

  return (
    <Form.Select
      fluid
      options={options}
      {...field}
      {...props}
      onChange={handlerChange}
      error={errMsg}
    />
  );
};

FormSelect.prototype = {
  options: PropTypes.arrayOf({
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default FormSelect;
