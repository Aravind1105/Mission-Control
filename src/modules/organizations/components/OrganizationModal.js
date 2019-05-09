import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Button, Input, Modal, Form, Message,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addOrganizationsSaga } from '../actions/organizationsActions';

// {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}

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
          setSubmitting(false);
          history.push('/organizations');
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Required'),
          slug: Yup.string()
            .strict()
            .lowercase()
            .required('Required'),
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
              <Button type="submit" disabled={isSubmitting}>
                Submit
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
