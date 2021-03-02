import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import FormInput from 'modules/shared/components/FormInput';
import FormTextArea from 'modules/shared/components/FormTextArea';
import FormSelect from 'modules/shared/components/FormSelect';
import { modifyKiosk } from '../actions';
import { toast } from 'react-semantic-toasts';
import { otherwise } from 'ramda';

let updatingKiosk = false;
const KioskForm = ({
  initialValues,
  organizations,
  cancelHandler,
  isKioskLoading,
  sNum,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    updatingKiosk = dispatch(modifyKiosk({ values, formActions }));
  };

  useEffect(() => {
    if (updatingKiosk) {
      if (isKioskLoading) {
        // toast({description:'Kiosk is being changed.', animation:'fade left', icon:'exclamation', color: 'orange'});
        toast({
          type: 'success',
          description: 'Kiosk was saved successfully.',
          animation: 'fade left',
        });
      }
    }
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={Yup.object().shape({
        serialNumber: Yup.string().test({
          name: 'duplicate-serialNum-check',
          test: function(val) {
            const num = sNum.map(function(ele) {
              return ele.toLowerCase();
            });
            return num.indexOf(val && val.toLowerCase()) > -1
              ? this.createError({
                  path: 'serialNumber',
                  message: 'Serial Number already exists.',
                })
              : true;
          },
        }),
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
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="serialNumber"
                  label="Serial Number"
                  required
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
                  name="location.address.name"
                  label="Client Name"
                  required
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={6}>
                <Field
                  name="location.address.country"
                  label="Country"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Field
                  name="location.address.city"
                  label="City"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Field
                  name="location.address.state"
                  label="State"
                  required
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={6}>
                <Field
                  name="location.address.line1"
                  label="Address 1"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Field
                  name="location.address.line2"
                  label="Address 2"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Field
                  name="location.address.postalCode"
                  label="ZIP Code"
                  required
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
                  component={FormTextArea}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                <Field
                  name="pin"
                  label="Pin"
                  type="number"
                  min={0}
                  required
                  component={FormInput}
                />
              </Grid.Column>
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
                  Save
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default KioskForm;
