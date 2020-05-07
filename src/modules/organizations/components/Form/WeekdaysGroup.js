import React from 'react';
import { Field } from 'formik';

import FormCheckbox from 'modules/shared/components/FormCheckbox';

const weekdaysTitle = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const WeekdaysGroup = ({ form, name }) => {
  const fields = form.values[name] || [];
  return (
    <>
      <div className="weekdays-label">Opening Days/Hours</div>
      <div className="checkbox-group">
        {fields.map((day, i) => (
          <Field
            key={weekdaysTitle[i]}
            name={`${name}.${i}`}
            label={weekdaysTitle[i]}
            component={FormCheckbox}
          />
        ))}
      </div>
    </>
  );
};

export default WeekdaysGroup;
