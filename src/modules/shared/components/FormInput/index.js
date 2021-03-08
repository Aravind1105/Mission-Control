import React from 'react';
import { FormInput as Input } from 'semantic-ui-react';

const FormInput = ({
  form,
  field,
  step,
  readOnly,
  prettier,
  limiting,
  ...props
}) => {
  const isTouched = form.touched[field.name];
  const error = form.errors[field.name];
  const errMsg = isTouched && error ? { content: error } : undefined;

  const handleBlur = ({ target }) => {
    const price = prettier(target.value);
    form.setFieldValue(field.name, price);
  };

  const handleChange = (e, { value }) => {
    if (limiting === 'floatingField') {
      if (
        /^[0-9]{1,20}([,.][0-9]{1,2})?$/.test(value) ||
        /^[0-9]{1,20}([,.])?$/.test(value)
      ) {
        if (value.includes('.') || value.includes(',')) {
          form.setFieldValue(field.name, value.replace(',', '.'));
        } else form.setFieldValue(field.name, value.replace('.', ','));
      } else if (value === '') form.setFieldValue(field.name, '');
    } else if (limiting === 'integerField') {
      if (/^\d+$/.test(value)) {
        form.setFieldValue(field.name, value);
      } else if (value === '') form.setFieldValue(field.name, value);
    }
    if (props.callbackOnChange) {
      props.callbackOnChange();
    }
  };

  return (
    <Input
      fluid
      step={step}
      style={props.widthLimit && { width: '35%' }}
      {...field}
      onBlur={prettier ? handleBlur : field.onBlur}
      {...props}
      error={errMsg}
      onChange={limiting ? handleChange : field.onChange}
    />
  );
};

FormInput.defaultProps = {
  step: 'any',
  type: 'text',
};

export default FormInput;
