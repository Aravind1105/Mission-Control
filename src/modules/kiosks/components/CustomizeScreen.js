import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Grid, Form, Button, FormRadio, Popup, Icon } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import prettierNumber from 'lib/prettierNumber';
import FormInput from 'modules/shared/components/FormInput';
import FormSelect from 'modules/shared/components/FormSelect';
import FormCheckbox from 'modules/shared/components/FormCheckbox';
import { updateKioskProps } from '../actions';
import { getKioskProperties } from '../selectors';

const PreAuthToolTip = () => (
  <Popup
    content="Pre-authorization amount cannot exceed € 50."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const AgeToolTip = () => (
  <Popup
    content="Available only for GiroCard payment."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const CustomizeScreen = ({ cancelHandler, kioskProps }) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    const finalProps = {
      id: values.id,
      preAuth: parseFloat(values.preAuth),
      supportEmail: values.supportEmail,
      paymentType: values.paymentType,
      minimumAge: parseFloat(age),
      tabletLang: values.tabletLang,
      memberCardEnabled: values.memberCardEnabled,
      serviceCheck: values.serviceCheckEnabled
        ? {
          enabled: true,
          startTime: values.serviceCheckStartTime,
          endTime: values.serviceCheckEndTime,
        }
        : {
          enabled: false,
        },
    };
    dispatch(updateKioskProps({ finalProps }));
  };
  const [age, setAge] = useState(kioskProps.minimumAge.toString());
  const [type, setType] = useState(kioskProps.paymentType);
  const [serviceCheckEnabled, setServiceCheckEnabled] = useState(false);

  const handlePaymentType = value => setType(value);

  useEffect(() => {
    if (!age || age === '') setAge(kioskProps.minimumAge.toString());
    if (!type || type === '') setType(kioskProps.paymentType);
  }, []);

  useEffect(() => {
    setAge(kioskProps.minimumAge.toString());
    setType(kioskProps.paymentType);
    setServiceCheckEnabled(kioskProps.serviceCheckEnabled);
  }, [kioskProps]);

  const languages = [
    {
      key: 'DE',
      value: 'DE',
      text: 'German',
    },
    {
      key: 'EN',
      value: 'EN',
      text: 'English',
    },
    {
      key: 'FR',
      value: 'FR',
      text: 'French',
    },
    {
      key: 'DU',
      value: 'DU',
      text: 'Dutch',
    },
  ];

  const PaymentTypes = [
    {
      key: 'CreditOrDebitCard',
      value: 'CreditOrDebitCard',
      text: 'Credit & Debit Card',
    },
    {
      key: 'GiroCard',
      value: 'GiroCard',
      text: 'Giro Card',
    },
  ];

  const TimeOptions = () => {
    let time = [];
    for (let i = 0; i <= 23; i++) {
      time.push({ key: i, value: i, text: `${String(i).padStart(2, '0')}:00` });
    }
    return time;
  };

  return (
    <Formik initialValues={kioskProps} onSubmit={onSubmit} enableReinitialize
      validationSchema={Yup.object().shape({
        preAuth: Yup.number().max(50, 'Amount exceeds € 50.'),
      })}>
      {({ dirty, handleSubmit, resetForm, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="tabletLang"
                  label="Default Language"
                  component={FormSelect}
                  options={languages}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="supportEmail"
                  label="Support Email"
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="paymentType"
                  label="Payment"
                  component={FormSelect}
                  handleCallback={handlePaymentType}
                  options={PaymentTypes}
                />
              </Grid.Column>

              <Grid.Column>
                <label className="tool-tip">Pre-authorization amount&nbsp;</label>
                <PreAuthToolTip />
                <Field
                  name="preAuth"
                  icon="euro"
                  iconPosition="left"
                  limiting="floatingField"
                  prettier={prettierNumber}
                  component={FormInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Group>
                      <label className="tool-tip" style={{ marginLeft: "1em" }}>Age Restriction&nbsp;</label>
                      {type === 'CreditOrDebitCard' ? <AgeToolTip /> : null}
                      <Field
                        label="16"
                        name="minimumAge"
                        value="16"
                        checked={age === '16'}
                        onChange={(e, { value }) => {
                          setAge(value);
                          setFieldValue(value);
                        }}
                        component={FormRadio}
                        disabled={type === 'CreditOrDebitCard'}
                      />
                      <Field
                        label="18"
                        name="minimumAge"
                        value="18"
                        checked={age === '18'}
                        onChange={(e, { value }) => {
                          setAge(value);
                          setFieldValue(value);
                        }}
                        component={FormRadio}
                        disabled={type === 'CreditOrDebitCard'}
                      />
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="memberCardEnabled"
                      label="Enable Member Card"
                      component={FormCheckbox}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="serviceCheckEnabled"
                      label="Out of Service"
                      component={FormCheckbox}
                      onChangeCallback={value => setServiceCheckEnabled(value)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ display: 'flex' }} columns="equal">
                  <Grid.Column style={{ width: '100%', marginRight: 5 }}>
                    <Field
                      name="serviceCheckStartTime"
                      label="From"
                      component={FormSelect}
                      options={TimeOptions()}
                      disabled={!serviceCheckEnabled}
                    />
                  </Grid.Column>
                  <Grid.Column style={{ width: '100%', marginLeft: 5 }}>
                    <Field
                      name="serviceCheckEndTime"
                      label="Until"
                      component={FormSelect}
                      options={TimeOptions()}
                      disabled={!serviceCheckEnabled}
                    />
                  </Grid.Column>
                </Grid.Row>
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

const mapStateToProps = state => ({
  kioskProps: getKioskProperties(state),
});

export default connect(mapStateToProps)(CustomizeScreen);
