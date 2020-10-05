import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const FormInputMultiple = ({
  form,
  field: { onChange, onBlur, ...field },
  options,
  validation,
  ...props
}) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (options) {
      setValues(options);
    }
  }, [options]);

  const handleAddition = (e, { value }) => {
    if (!values.find(el => el.value === value)) {
      setValues([...values, { text: value, value }]);
    }
  };
  const handlerChange = (e, { value }) => {
    form.setFieldValue(field.name, value);
  };
  const isTouched = form.touched[field.name];
  const error = form.errors[field.name];
  const errMsg = isTouched && error ? { content: error } : undefined;
  return (
    <Form.Select
      options={values}
      search
      selection
      fluid
      multiple
      allowAdditions
      onAddItem={handleAddition}
      onChange={handlerChange}
      error={errMsg}
      noResultsMessage="Type to add..."
      {...field}
      {...props}
    />
  );
};

export default FormInputMultiple;
