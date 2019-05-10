import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Button, Input, Modal, Form, Message,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Formik, FieldArray, Field } from 'formik';
import { path } from 'ramda';
import * as Yup from 'yup';
import { addOrganizationsSaga } from '../actions/organizationsActions';

// {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}

const emptyAddress = {
  name: '',
  line1: '',
  postalCode: '',
  line2: '',
  state: '',
  country: '',
};

const OrganizationModal = ({
  addOrganization, history, open, title,
}) => (
  <Modal
    open={open}
    centered={false}
    onClose={() => {
      history.push('/organizations');
    }}
  >
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <Formik
        initialValues={{ name: '', slug: '' }}
        onSubmit={(values, { setSubmitting }) => {
          addOrganization(values);
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          history.push('/organizations');
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Required'),
          slug: Yup.string()
            .strict()
            .lowercase()
            .required('Required'),
          address: Yup.array().of(
            Yup.object().shape({
              properties: Yup.object().shape({
                name: Yup.string().required(),
                line1: Yup.string().required(),
                postalCode: Yup.number().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),
                country: Yup.string().required(),
              }),
            }),
          ),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <Form onSubmit={handleSubmit} error={!!errors}>
              <Form.Field
                control={Input}
                id="name"
                label="Name"
                placeholder="Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? 'text-input error' : 'text-input'}
                required
              />
              <Form.Field
                control={Input}
                id="slug"
                label="Slug"
                placeholder="e.g. livello"
                type="text"
                value={values.slug}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.slug && touched.slug ? 'text-input error' : 'text-input'}
                required
              />
              {errors.slug && touched.slug && (
                <Message error header="Validation Error" content={errors.slug} />
              )}

              <h4 className="form-header">Adresses</h4>
              <FieldArray
                name="address"
                render={arrayHelpers => (
                  <div className="form-group">
                    {values.address && values.address.length > 0 ? (
                      values.address.map((address, index) => (
                        <div key={index}>
                          <div style={{ textAlign: 'right' }}>
                            <Button
                              icon="close"
                              size="mini"
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            />
                          </div>

                          <Form.Field
                            name={`address[${index}].properties.name`}
                            control={Field}
                            label="Name"
                            placeholder="e.g. Headquarter"
                            type="text"
                            className={
                              path(['address', index, 'properties', 'name'], errors)
                              && path(['address', index, 'properties', 'name'], touched)
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />

                          <Form.Group widths="equal">
                            <Form.Field
                              control={Field}
                              name={`address[${index}].properties.line1`}
                              label="Line 1"
                              placeholder="e.g. Kaistraße, 5"
                              className={
                                path(['address', index, 'properties', 'line1'], errors)
                                && path(['address', index, 'properties', 'line1'], touched)
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                            <Form.Field
                              control={Field}
                              name={`address[${index}].properties.postalCode`}
                              label="Postalcode"
                              placeholder="e.g. 40221"
                              className={
                                path(['address', index, 'properties', 'postalCode'], errors)
                                && path(['address', index, 'properties', 'postalCode'], touched)
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                          </Form.Group>

                          <Form.Group widths="equal">
                            <Form.Field
                              control={Field}
                              name={`address[${index}].properties.line2`}
                              label="Line 2"
                              placeholder="additional information"
                            />
                            <Form.Field
                              control={Field}
                              name={`address[${index}].properties.city`}
                              label="City"
                              placeholder="e.g. Düsseldorf"
                              className={
                                path(['address', index, 'properties', 'city'], errors)
                                && path(['address', index, 'properties', 'city'], touched)
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                          </Form.Group>

                          <Form.Group widths="equal">
                            <Form.Input
                              control={Field}
                              name={`address[${index}].properties.state`}
                              label="State"
                              placeholder="e.g. NRW"
                              className={
                                path(['address', index, 'properties', 'state'], errors)
                                && path(['address', index, 'properties', 'state'], touched)
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                            <Form.Input
                              control={Field}
                              name={`address[${index}].properties.country`}
                              label="Country"
                              placeholder="e.g. DE"
                              className={
                                path(['address', index, 'properties', 'country'], errors)
                                && path(['address', index, 'properties', 'country'], touched)
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                          </Form.Group>

                          {values.address.length - 1 === index && (
                            <div className="form-btn-centered">
                              <Button
                                basic
                                content="Additional address"
                                icon="plus"
                                labelPosition="right"
                                onClick={() => arrayHelpers.push(emptyAddress)}
                              />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="form-btn-centered">
                        <Button
                          basic
                          content="Add address"
                          icon="plus"
                          labelPosition="right"
                          onClick={() => arrayHelpers.push(emptyAddress)}
                        />
                      </div>
                    )}
                  </div>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                Save organization
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Modal.Content>
  </Modal>
);

OrganizationModal.propTypes = {
  addOrganization: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
};

OrganizationModal.defaultProps = {
  title: 'Organizations Modal',
};

const mapDispatchToProps = dispatch => ({
  addOrganization: organization => dispatch(addOrganizationsSaga(organization)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(OrganizationModal),
);
