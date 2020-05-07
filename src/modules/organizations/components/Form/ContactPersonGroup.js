import React from 'react';
import { GridRow, GridColumn } from 'semantic-ui-react';
import { Field } from 'formik';

import FormInput from 'modules/shared/components/FormInput';

export const initValuesContactPerson = {
  contactPerson: '',
  personRole: '',
  personEmail: '',
  personPhone: '',
};

const ContactPersonGroup = ({ form, name }) => {
  const fields = form.values[name] || [];

  return (
    <>
      {fields.map((el, i) => (
        <React.Fragment key={`${name}_${i}`}>
          <GridRow columns="equal">
            <GridColumn width={7}>
              <Field
                name={`${name}.${i}.contactPerson`}
                label="Contact Person"
                component={FormInput}
              />
            </GridColumn>
            <GridColumn width={7}>
              <Field
                name={`${name}.${i}.personRole`}
                label="Role"
                component={FormInput}
              />
            </GridColumn>
          </GridRow>
          <GridRow columns="equal">
            <GridColumn width={7}>
              <Field
                name={`${name}.${i}.personEmail`}
                label="Email"
                type="email"
                component={FormInput}
              />
            </GridColumn>
            <GridColumn width={7}>
              <Field
                name={`${name}.${i}.personPhone`}
                label="Phone Number"
                component={FormInput}
              />
            </GridColumn>
          </GridRow>
        </React.Fragment>
      ))}
    </>
  );
};

export default ContactPersonGroup;
