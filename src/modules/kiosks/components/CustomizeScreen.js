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
import { Message } from 'semantic-ui-react';

const PreAuthToolTip = () => (
  <Popup
    content="Pre-authorization amount cannot exceed € 50."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const AgeToolTip = () => (
  <Popup
    content="Available for Giro card payment only."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const SupportEmailToolTip = () => (
  <Popup
    content="Support email is the same for all kiosks."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const MemberCardToolTip = () => (
  <Popup
    content="This feature can take a couple of minutes to update on the Kiosk."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const PaymentToolTip = () => (
  <Popup
    content="This feature can take a couple of minutes to update on the Kiosk."
    trigger={<Icon color="yellow" name="info circle" />}
  />
);

const AgeRestrictionWarningMessage = () => (
  <Message negative>
    <p>Funktioniert nur in Verbindung mit einer MSAM Händler Karte</p>
  </Message>
);

const ServiceOutOfTimeWarningMessage = () => (
  <Message negative>
    <p>Mit dieser Option können die Kunden keine Produkte am Kiosk kaufen.</p>
  </Message>
);

const CustomizeScreen = ({ cancelHandler, kioskProps }) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formActions) => {
    const finalProps = {
      id: values.id,
      preAuth: parseFloat(values.preAuth),
      paymentType: values.paymentType,
      minimumAge: parseFloat(age),
      tabletLang: values.tabletLang,
      memberCardEnabled: memberCard,
      serviceCheck: values.serviceCheckEnabled
        ? {
            enabled: true,
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
  const [memberCard, setMemberCard] = useState(kioskProps.memberCardEnabled);
  const [ageRestrictionWarning, setAgeRestrictionWarning] = useState(false);
  const [outOfServicewarning, setOutOfServiceWarning] = useState(false);

  const handlePaymentType = value => {
    setType(value);
    if (value === 'CreditOrDebitCard') {
      setAge('0');
      setAgeRestrictionWarning(false);
    }
    if (value === 'GiroCard') {
      setAgeRestrictionWarning(true);
      setMemberCard(true);
      setAge('18');
    }
  };

  const handleServiceCheckEnabled = value => {
    if(value){
      setOutOfServiceWarning(true);
    }else{
      setOutOfServiceWarning(false);
    }
  };

  useEffect(() => {
    if (kioskProps.minimumAge === '') setAge('0');
    else setAge(kioskProps.minimumAge.toString());
    if (!type || type === '') setType(kioskProps.paymentType);
  }, []);

  useEffect(() => {
    if (kioskProps.minimumAge === '') setAge('0');
    else setAge(kioskProps.minimumAge.toString());
    setType(kioskProps.paymentType);
    setServiceCheckEnabled(serviceCheckEnabled);
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
      text: 'Credit & Debit card (Incl. Giro card)',
    },
    {
      key: 'GiroCard',
      value: 'GiroCard',
      text: 'Giro card only',
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
    <Formik
      initialValues={kioskProps}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={Yup.object().shape({
        preAuth: Yup.number().max(50, 'Amount exceeds € 50.'),
      })}
    >
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
                <label className="tool-tip">Support Email&nbsp;</label>
                <SupportEmailToolTip />
                <Field name="supportEmail" component={FormInput} disabled />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column>
                <label className="tool-tip">Payment&nbsp;</label>
                <PaymentToolTip />
                <Field
                  name="paymentType"
                  component={FormSelect}
                  handleCallback={handlePaymentType}
                  options={PaymentTypes}
                />
              </Grid.Column>
              <Grid.Column>
                <label className="tool-tip">
                  Pre-authorization amount&nbsp;
                </label>
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
                <Form.Group>
                  <label className="tool-tip" style={{ marginLeft: '1em' }}>
                    Age Restriction&nbsp;
                  </label>
                  {type === 'CreditOrDebitCard' ? <AgeToolTip /> : null}
                  <Field
                    label="16+"
                    name="minimumAge"
                    value="16"
                    checked={age === '16'}
                    onChange={(e, { name, value }) => {
                      setAge(value);
                      setFieldValue(name, value);
                    }}
                    component={FormRadio}
                    disabled={type === 'CreditOrDebitCard'}
                  />
                  <Field
                    label="18+"
                    name="minimumAge"
                    value="18"
                    checked={age === '18'}
                    onChange={(e, { name, value }) => {
                      setAge(value);
                      setFieldValue(name, value);
                    }}
                    component={FormRadio}
                    disabled={type === 'CreditOrDebitCard'}
                  />
                </Form.Group>
                <div>{ageRestrictionWarning ? <AgeRestrictionWarningMessage></AgeRestrictionWarningMessage> : <></>}</div>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="serviceCheckEnabled"
                      label="Out of Service"
                      component={FormCheckbox}
                      onChangeCallback={handleServiceCheckEnabled}
                    />
                  </Grid.Column>
                  <div>{outOfServicewarning ? <ServiceOutOfTimeWarningMessage></ServiceOutOfTimeWarningMessage> : <></>}</div>
                </Grid.Row>
                {/* <Grid.Row style={{ display: 'flex' }} columns="equal">
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
                </Grid.Row> */}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Group>
                  <label className="tool-tip" style={{ marginLeft: '1em' }}>
                    Member Card&nbsp;
                  </label>
                  <MemberCardToolTip />
                  <Field
                    label="Enable"
                    name="memberCardEnabled"
                    value={true}
                    checked={memberCard == true}
                    onChange={(e, { name, value }) => {
                      setMemberCard(value);
                      setFieldValue(name, value);
                    }}
                    component={FormRadio}
                    disabled={type === 'GiroCard'}
                  />
                  <Field
                    label="Disable"
                    name="memberCardDisabled"
                    value={false}
                    checked={memberCard == false}
                    onChange={(e, { name, value }) => {
                      setMemberCard(value);
                      setFieldValue(name, value);
                    }}
                    component={FormRadio}
                    disabled={type === 'GiroCard'}
                  />
                </Form.Group>
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
