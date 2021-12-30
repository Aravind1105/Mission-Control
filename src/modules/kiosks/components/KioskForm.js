import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import FormInput from 'modules/shared/components/FormInput';
import FormTextArea from 'modules/shared/components/FormTextArea';
import FormSelect from 'modules/shared/components/FormSelect';
import { modifyKiosk } from '../actions';
import { getAllSerialNumbersState } from '../selectors';

let updatingKiosk = false;
const KioskForm = ({
  initialValues,
  organizations,
  cancelHandler,
  modifyKiosk,
  serialNumbers,
  buttonVal,
}) => {
  const addressModifier = values => {
    values.location = {};
    values.location.address = {
      name: values.locationName,
      line1: values.locationLine1,
      line2: values.locationLine2,
      postalCode: values.locationPostalCode,
      city: values.locationCity,
      state: values.locationState,
      country: values.locationCountry,
    };
    // Deleting Custom Properties
    delete values.locationName;
    delete values.locationLine1;
    delete values.locationLine2;
    delete values.locationPostalCode;
    delete values.locationCity;
    delete values.locationCountry;
    delete values.locationState;

    return values;
  };
  const onSubmit = (values, formActions) => {
    //Modifying Address According to BE

    addressModifier(values);
    updatingKiosk = modifyKiosk({ values, formActions });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required('This field is required'),
        serialNumber: Yup.string()
          .required('This field is required')
          .test({
            name: 'duplicate-serialNum-check',
            test: function(val) {
              if (Boolean(!initialValues.id)) {
                const num = serialNumbers.map(function(ele) {
                  return ele.toLowerCase();
                });
                return num.indexOf(val && val.toLowerCase()) > -1
                  ? this.createError({
                      path: 'serialNumber',
                      message: 'Serial Number already exists.',
                    })
                  : true;
              } else return true;
            },
          }),
        locationName: Yup.string().required('This field is required'),
        locationLine1: Yup.string().required('This field is required'),
        locationPostalCode: Yup.string().required('This field is required'),
        locationCity: Yup.string().required('This field is required'),
        locationState: Yup.string().required('This field is required'),
        locationCountry: Yup.string().required('This field is required'),
        orgId: Yup.string().required('This field is required'),
        pin: Yup.number()
          .required('This field is required')
          .test({
            name: 'check-same-pin',
            test: function(val) {
              if (val && val === this.parent.technicianPin) {
                return this.createError({
                  path: 'pin',
                  message:
                    "Replenishment PIN and Technician PIN can't be the same",
                });
              } else return true;
            },
          })
          .typeError('Invalid Input: Numbers please')
          .positive('Must be greater than zero')
          .test(
            'len',
            'Must be exactly 4 digits',
            val => val && val.toString().length === 4,
          ),
        technicianPin: Yup.number()
          .required('This field is required')
          .test({
            name: 'check-same-pin',
            test: function(val) {
              if (val && val === this.parent.pin) {
                return this.createError({
                  path: 'technicianPin',
                  message:
                    "Replenishment PIN and Technician PIN can't be the same",
                });
              } else return true;
            },
          })
          .typeError('Invalid Input: Numbers please')
          .positive('Must be greater than zero')
          .test(
            'len',
            'Must be exactly 4 digits',
            val => val && val.toString().length === 4,
          ),
      })}
    >
      {({ dirty, handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="name"
                  label="Name"
                  required
                  maxLength="50"
                  placeholder="max. 50 characters"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="serialNumber"
                  label="Serial Number"
                  required
                  maxLength="50"
                  placeholder="max. 50 characters"
                  disabled={Boolean(initialValues.id)}
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="modelType"
                  label="Model"
                  component={FormInput}
                  disabled
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="statusDetail"
                  label="Status"
                  disabled
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="orgId"
                  label="Organization"
                  required
                  component={FormSelect}
                  options={organizations}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="customerOrganization"
                  label="Customer organization"
                  disabled
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="locationName"
                  label="Client Name"
                  required
                  maxLength="50"
                  placeholder="max. 50 characters"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={6}>
                <Field
                  name="locationCountry"
                  label="Country"
                  required
                  maxLength="50"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Field
                  name="locationCity"
                  label="City"
                  required
                  maxLength="50"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Field
                  name="locationState"
                  label="State"
                  required
                  maxLength="50"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={6}>
                <Field
                  name="locationLine1"
                  label="Address 1"
                  required
                  maxLength="50"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Field
                  name="locationLine2"
                  label="Address 2"
                  maxLength="50"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Field
                  name="locationPostalCode"
                  label="ZIP Code"
                  required
                  placeholder="ex. 51377"
                  maxLength="10"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Field
                  name="notes"
                  label="Directions / Notes"
                  rows={5}
                  maxLength="200"
                  placeholder="Enter directions or notes here"
                  component={FormTextArea}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {!Boolean(initialValues.pin) && (
                <Grid.Column width={4}>
                  <Field
                    name="pin"
                    label="Replenishment PIN"
                    required
                    maxLength="4"
                    placeholder="4-digit pin"
                    limiting="integerField"
                    component={FormInput}
                  />
                </Grid.Column>
              )}
              {!Boolean(initialValues.technicianPin) && (
                <Grid.Column width={4}>
                  <Field
                    name="technicianPin"
                    label="Technician PIN"
                    maxLength="4"
                    limiting="integerField"
                    required
                    placeholder="4-digit pin"
                    component={FormInput}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column>
                <Button
                  type="button"
                  onClick={() => cancelHandler({ resetForm, dirty })}
                >
                  Cancel
                </Button>
                <Button color="green" type="submit" disabled={!dirty}>
                  {buttonVal}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  serialNumbers: getAllSerialNumbersState(state),
});

const mapDispatchToProps = {
  modifyKiosk,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskForm);
