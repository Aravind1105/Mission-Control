import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import differenceBy from 'lodash/differenceBy';

import FormInput from 'modules/shared/components/FormInput';
import FormTextArea from 'modules/shared/components/FormTextArea';
import FormSelect from 'modules/shared/components/FormSelect';
import FormInputMultiple from 'modules/shared/components/FormInputMultiple';
import FormAsyncSelect from 'modules/shared/components/FormAsyncSelect';
import getCountries from 'modules/organizations/sagas/getCountries';
import { modifyUserMemberCard } from '../actions';

const validateForm = data => {
  const { userCards } = data;
  const errors = userCards.reduce((prev, v) => {
    const msgSymbol = /^[a-zA-Z0-9]+$/g.test(v)
      ? ''
      : 'Card should contain only letters and numbers.';
    const msgLength = v.length > 19 ? 'Card length should be 19 or less.' : '';
    if (msgSymbol && !prev.includes(msgSymbol)) {
      prev.push(msgSymbol);
    }
    if (msgLength && !prev.includes(msgLength)) {
      prev.push(msgLength);
    }
    return prev;
  }, []);

  if (errors.length) {
    return { userCards: errors.join(' ') };
  }
  return {};
};

const UserForm = ({ initialValues, organizations, userMemberCardsOptions }) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    const initialCards = initialValues.userCards.map(item => ({
      membercardId: item,
      userId: values.id,
    }));
    const valuesCards = values.userCards.map(item => ({
      membercardId: item,
      userId: values.id,
    }));
    const dataForMutation = {
      cardsToAdd: differenceBy(valuesCards, initialCards, 'membercardId'),
      cardsToDel: differenceBy(initialCards, valuesCards, 'membercardId'),
    };

    dispatch(modifyUserMemberCard({ dataForMutation, formActions }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validate={validateForm}
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
                  name="userCards"
                  label="User Cards"
                  placeholder="Add Cards"
                  component={FormInputMultiple}
                  allowAdditions
                  options={userMemberCardsOptions}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field name="address" label="Address" component={FormInput} />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="address.country"
                  label="Country"
                  loadOptions={getCountries(500)}
                  component={FormAsyncSelect}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="address.postalCode"
                  label="ZIP"
                  type="number"
                  component={FormInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="address.city"
                  label="City"
                  loadOptions={getCountries(500)}
                  component={FormAsyncSelect}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="address.state"
                  label="State"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="notes"
                  label="Notes"
                  rows={5}
                  component={FormTextArea}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="6">
                <Field
                  name="pin"
                  label="Pincode for Kiosks"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column>
                <Button type="button" onClick={handleReset}>
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
