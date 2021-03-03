import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import { find, pick, isEmpty } from 'lodash';
import * as Yup from 'yup';

import FormInput from 'modules/shared/components/FormInput';
import FormTextArea from 'modules/shared/components/FormTextArea';
import FormSelect from 'modules/shared/components/FormSelect';
import FormInputMultiple from 'modules/shared/components/FormInputMultiple';
import { updateUser, validateMemberCard } from '../actions';
import history from 'lib/history';

const UserForm = ({ initialValues, organizations, userMemberCardsOptions }) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    const rolesInOrganizations = values.orgId.map(organizationId => {
      const org = find(
        initialValues.rolesInOrganizations,
        ele => ele.organizationId._id === organizationId,
      );
      if (org) {
        return {
          organizationId,
          role: org.role,
          status: 'ACTIVE',
        };
      } else {
        // role set to consumer by default
        return {
          organizationId,
          role: 'consumer',
          status: 'ACTIVE',
        };
      }
    });
    values.rolesInOrganizations = rolesInOrganizations;
    const payload = pick(values, [
      'id',
      'firstName',
      'lastName',
      'email',
      'mobile',
      'note',
      'rolesInOrganizations',
      'membercards',
      'kioskPin',
    ]);
    if (!isEmpty(values.address)) {
      if (!values.address.name) {
        values.address.name = values.address.line1;
      }
      values.address.postalCode = values.address.postalCode.toString();
      payload['address'] = pick(values.address, [
        'name',
        'line1',
        'line2',
        'postalCode',
        'city',
        'state',
        'country',
      ]);
    }
    dispatch(updateUser(payload));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={Yup.object().shape({
        mobile: Yup.number().positive('Phone number shoule be positive.'),
        membercards: Yup.array().of(Yup.string().matches(/^[a-zA-Z0-9]+$/)),
      })}
    >
      {({ dirty, handleSubmit, handleReset }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="firstName"
                  label="First Name"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="lastName"
                  label="Last Name"
                  required
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="email"
                  label="Email"
                  component={FormInput}
                  required
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="mobile"
                  label="Phone Number"
                  component={FormInput}
                  limiting="integerField"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="id"
                  label="Unique User ID"
                  component={FormInput}
                  disabled
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="paymentMethods"
                  label="Payment Method(s)"
                  component={FormInputMultiple}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="orgId"
                  label="Organization(s)"
                  multiple
                  component={FormSelect}
                  options={organizations}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="membercards"
                  label="User Cards"
                  placeholder="Add Cards"
                  component={FormInputMultiple}
                  allowAdditions
                  options={userMemberCardsOptions}
                  handleChangeCallback={membercards => {
                    dispatch(
                      validateMemberCard({
                        userId: initialValues.id,
                        membercards,
                      }),
                    );
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="address.line1"
                  label="Address"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="address.country"
                  label="Country"
                  required
                  // loadOptions={getCountries(500)}
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="address.postalCode"
                  label="ZIP"
                  required
                  limiting="integerField"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="address.city"
                  label="City"
                  required
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="address.state"
                  label="State"
                  required
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="note"
                  label="Notes"
                  rows={5}
                  component={FormTextArea}
                />
              </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row>
              <Grid.Column width="6">
                <Field
                  name="kioskPin"
                  label="Pincode for Kiosks"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row> */}
            <Grid.Row textAlign="center">
              <Grid.Column>
                <Button type="button" onClick={() => history.push('/users')}>
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

export default UserForm;
