import React from 'react';
import { Field } from 'formik';

import FormCheckbox from 'modules/shared/components/FormCheckbox';

const fieldName = {
  client: 'Client',
  operator: 'Operator',
  logistics: 'Logistics',
  manufacturer: 'Manufacturer',
};

const RolesGroup = ({ form, name }) => {
  const fields = form.values[name] || [];
  const keys = Object.keys(fields);

  return (
    <div className="checkbox-group">
      {keys.map(role => (
        <Field
          key={role}
          name={`${name}.${role}`}
          label={fieldName[role]}
          component={FormCheckbox}
        />
      ))}
    </div>
  );
};

export default RolesGroup;
