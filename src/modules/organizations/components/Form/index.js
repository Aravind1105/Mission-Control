import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

import FormInput from 'modules/shared/components/FormInput';
import FormSelect from 'modules/shared/components/FormSelect';
import FormCheckbox from 'modules/shared/components/FormCheckbox';
import FormTextArea from 'modules/shared/components/FormTextArea';
import FormAsyncSelect from 'modules/shared/components/FormAsyncSelect';
import WeekdaysGroup from './WeekdaysGroup';
import RolesGroup from './RolesGroup';
import ContactPersonGroup from './ContactPersonGroup';
import FormGroupTitle from './FormGroupTitle';
import getCountries from '../../sagas/getCountries';
import loadOptions from '../../sagas/getOrganizationsForForm';
import { modifyOrganization } from '../../actions';
import CountryPicker from '../../../shared/components/CountryPicker';
import history from 'lib/history';

const OrganizationForm = ({ initialValues, orgOptions }) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    dispatch(modifyOrganization({ values, formActions }));
  };

  const handleCancel = resetForm => {
    resetForm();
    history.push('/organizations');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required('This field is required'),
        address: Yup.object().shape({
          line1: Yup.string().required('This field is required'),
          postalCode: Yup.string().required('This field is required'),
          city: Yup.string().required('This field is required'),
          country: Yup.string().required('This field is required'),
        }),
        connectedOrg: Yup.string().required('This field is required'),
      })}
    >
      {({ dirty, handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit}>
          <Grid className="form">
            <Grid.Row>
              <Grid.Column width={12}>
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column>
                      <Field
                        name="name"
                        label="Name and legal entity"
                        required
                        component={FormInput}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns="equal">
                    <Grid.Column>
                      <FieldArray name="role" component={RolesGroup} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              {/* <Grid.Column width={4}>Img</Grid.Column> */}
            </Grid.Row>

            <FormGroupTitle title="Address" />
            <Grid.Row>
              <Grid.Column width={14}>
                <Field
                  name="address.line1"
                  label="Street"
                  required
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={7}>
                <Field
                  name="address.postalCode"
                  label="ZIP"
                  type="number"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <Field
                  name="address.city"
                  label="City"
                  required
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column width={7}>
                <Field
                  name="address.state"
                  label="State"
                  disabled
                  options={[]}
                  component={FormSelect}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <Field
                  name="address.country"
                  label="Country"
                  required
                  // loadOptions={getCountries(500)}
                  component={CountryPicker}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column>
                <Field
                  name="invoiceAddr"
                  label="Different invoice address"
                  component={FormCheckbox}
                />
              </Grid.Column>
            </Grid.Row>

            <FormGroupTitle title="Contact" />
            <FieldArray name="contactPerson" component={ContactPersonGroup} />
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="additionalPerson"
                  label="Add additional contact person"
                  component={FormCheckbox}
                />
              </Grid.Column>
            </Grid.Row>

            <FormGroupTitle title="Bank &amp; Legal Details" />
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="accountName"
                  label="Account Name"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field name="bank" label="Bank" component={FormInput} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field name="iban" label="IBAN" component={FormInput} />
              </Grid.Column>
              <Grid.Column>
                <Field name="bic" label="BIC" component={FormInput} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="vat"
                  label="VAT Registration #"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="companyNumber"
                  label="Company Registration #"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <FormGroupTitle title="Further Details" />
            <Grid.Row columns="equal">
              <Grid.Column>
                <FieldArray name="weekdays" component={WeekdaysGroup} />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field name="workTimeFrom" label="From" component={FormInput} />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field name="workTimeTo" label="Until" component={FormInput} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="deliveryTime"
                  label="Delivery Time"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="orderQuantity"
                  label="Minimum Order Quantity"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="deliveryCostLimit"
                  label="Delivery Stop Cost"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="connectedOrg"
                  label="Connected Organizations"
                  required
                  isMulti
                  loadOptions={loadOptions(orgOptions)}
                  defaultOptions={orgOptions}
                  component={FormAsyncSelect}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="description"
                  label="Additional Notes"
                  component={FormTextArea}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column>
                <Button type="button" onClick={() => handleCancel(resetForm)}>
                  Cancel
                </Button>
                <Button color="green" type="submit" disabled={!dirty}>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizationForm;
