import React, { useState, useEffect } from 'react';
import { Modal, Button, Header, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

// const initialValues = {
//   organization: [{ id: '', name: '' }],
// };

const OrganizationsForm = ({ history, match }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [id, setId] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      // match.params.id && processFetchOrganization(match.params.id);
      console.log('M: ', match);
      if (match.params.id) setId(match.params.id);
      setLoaded(true);
    }
  });

  const clearAndAbort = () => {
    history.goBack();
    // clear form
  };

  const saveOrganizationsData = () => {
    // processSaveOrganization
    setFormSuccess(true);
    setButtonLoading(true);
    window.setTimeout(() => {
      history.goBack();
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <Modal open={true}>
      <Header icon="building" content="Organization Data" />
      <Modal.Content>
        <Formik
          initialValues={{ id: '', name: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="id" />
              <Field type="text" name="name" />
              <button type="submit" disabled={isSubmitting}>
                Save organization
              </button>
            </Form>
          )}
        </Formik>

        {/* <Formik
          initialValues={initialValues}
          onSubmit={values => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <div>
              <Form>
                <div className="row">
                  <div className="col">
                    <Field name="organization[0].id" type="text" />
                  </div>
                  <div className="col">
                    <Field name="organization[0].name" type="text" />
                  </div>
                  <div className="col">
                    <buton type="button">X</buton>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Save organization
                </button>
              </Form>
            </div>
          )}
        </Formik> */}

        {/* <Form success={formSuccess}>
          <Form.Input label="Organization ID" placeholder="" value={id} />
          <Message
            success
            header="Data saved"
            content="Organization data saved successfully"
          />
        </Form> */}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => clearAndAbort()}>
          <Icon name="remove" /> Abort
        </Button>
        <Button
          loading={buttonLoading}
          color="green"
          onClick={() => saveOrganizationsData()}
        >
          <Icon name="checkmark" />
          Save Organization
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default withRouter(connect()(OrganizationsForm));
