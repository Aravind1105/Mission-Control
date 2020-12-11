import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Grid, Form, Button, FormRadio } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import FormInput from 'modules/shared/components/FormInput';
import FormSelect from 'modules/shared/components/FormSelect';
import FormCheckbox from 'modules/shared/components/FormCheckbox';
import { updateKioskProps } from '../actions';
import { getKioskProperties } from '../selectors';

const CustomizeScreen = ({
    cancelHandler,
    kioskProps
}) => {
    const dispatch = useDispatch();
    const [age, setAge] = useState(kioskProps.minimumAge.toString());
    const onSubmit = (values, formActions) => {
        const finalProps = {
            id: values.id,
            preAuth: parseFloat(values.preAuth),
            supportEmail: values.supportEmail,
            paymentType: values.paymentType,
            minimumAge: parseFloat(age),
            tabletLang: values.tabletLang,
            memberCardEnabled: values.memberCardEnabled,
            // serviceCheck: values.serviceCheck ? values.serviceCheck : null
            serviceCheck: values.OutOfServiceTime_start && values.OutOfServiceTime_end 
                ? {
                    enabled: true,
                    startTime: values.OutOfServiceTime_start,
                    endTime: values.OutOfServiceTime_end
                } 
                : {
                    enabled: false,
                } 
        }
        dispatch(updateKioskProps({ finalProps }));
    };
    const [type, setType] = useState(kioskProps.paymentType);

    const handlePaymentType = (value) => setType(value);


    useEffect(() => {
        if (!age || age === '')
            setAge(kioskProps.minimumAge.toString())
        if (!type || type === '')
            setType(kioskProps.paymentType)
    }, []);

    useEffect(() => {
        setAge(kioskProps.minimumAge.toString())
        setType(kioskProps.paymentType)
    }, [kioskProps]);

    const languages = [
        {
            key: 'DE',
            value: 'DE',
            text: 'German'
        },
        {
            key: 'EN',
            value: 'EN',
            text: 'English'
        },
        {
            key: 'FR',
            value: 'FR',
            text: 'French'
        },
        {
            key: 'DU',
            value: 'DU',
            text: 'Dutch'
        }
    ]

    const PaymentTypes = [
        {
            key: 'CreditOrDebitCard',
            value: 'CreditOrDebitCard',
            text: 'Credit & Debit Card'
        },
        {
            key: 'GiroCard',
            value: 'GiroCard',
            text: 'Giro Card'
        }
    ]

    return (
        <Formik
            initialValues={kioskProps}
            onSubmit={onSubmit}
            enableReinitialize
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
                                <Field
                                    name="preAuth"
                                    label="Pre-authorization amount"
                                    component={FormInput}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Field
                                    name="OutOfServiceTime"
                                    label="Out of service time"
                                    component={FormCheckbox}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal">
                            <Grid.Column>
                                <Field
                                    name="OutOfServiceTime_start"
                                    label="Start of Out of service time"
                                    component={FormInput}
                                    // disabled={OutOfServiceTime}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    name="OutOfServiceTime_end"
                                    label="End of Out of service time"
                                    component={FormInput}
                                    // disabled={OutOfServiceTime}
                                />
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
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Group inline>
                                    <label>Age Restriction</label>
                                    <Field
                                        label='16'
                                        name='minimumAge'
                                        value='16'
                                        checked={age === '16'}
                                        onChange={(e, { value }) => {
                                            setAge(value);
                                            setFieldValue(name, value)
                                        }}
                                        component={FormRadio}
                                        disabled={type === "CreditOrDebitCard"}
                                    />
                                    <Field
                                        label='18'
                                        name='minimumAge'
                                        value='18'
                                        checked={age === '18'}
                                        onChange={(e, { value }) => {
                                            setAge(value);
                                            setFieldValue(name, value)
                                        }}
                                        component={FormRadio}
                                        disabled={type === "CreditOrDebitCard"}
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
            )
            }
        </Formik >
    );
};

const mapStateToProps = state => ({
    kioskProps: getKioskProperties(state),
})

export default connect(mapStateToProps)(CustomizeScreen);
