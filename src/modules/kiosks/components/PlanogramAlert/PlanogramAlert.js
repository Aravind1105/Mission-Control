/* eslint-disable consistent-return */
import { is } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import CustomFormDropdown from 'modules/shared/components/CustomFormDropdown';
import { Button, Grid, Modal, Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';
import ConfirmModal from 'modules/shared/components/ModalForm';
import * as Yup from 'yup';
import * as R from 'ramda';
import { getKioskSingle } from '../../selectors';
import { addSingleKiosk, addDoubleKiosk } from '../../actions';
import './styles.less';
const PlanogramTypeOptions = [
  { label: 'Single kiosk Planogram', value: '1' },
  { label: 'Double kiosk Planogram', value: '2' },
];

const PlanogramAlert = ({
  visible,
  onCancel,
  kiosk,
  addSingleKiosk,
  addDoubleKiosk,
}) => {
  if (!visible) {
    return <div />;
  }
  return (
    <>
      <div className="inner-modal">
        <div>
          <Formik
            initialValues={{}}
            onSubmit={data => {
              if (data.PlanogramType.value == 1) {
                addSingleKiosk({
                  kioskId: kiosk._id,
                });
              } else {
                addDoubleKiosk({
                  kioskId: kiosk._id,
                });
              }
            }}
            validateOnChange
            validationSchema={Yup.object().shape({
              PlanogramType: Yup.object({
                value: Yup.string().required('This field is required'),
              }),
            })}
          >
            {({ dirty, handleSubmit, errors }) => (
              <ConfirmModal
                onClose={() => onCancel()}
                isPristine={!dirty}
                title="Add new Planogram"
              >
                <Form onSubmit={handleSubmit} className="modal-form">
                  <Modal.Content>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column textAlign="left">
                          <b>Select the Planogram type</b>
                          <span style={{ color: 'red' }}>&#42;</span>
                          <Field
                            name="PlanogramType"
                            options={PlanogramTypeOptions}
                            required
                            component={CustomFormDropdown}
                            placeholder="Planogram type"
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="darkgrey" onClick={() => onCancel()}>
                      Cancel
                    </Button>
                    <Button
                      color="green"
                      type="submit"
                      disabled={!dirty}
                      onClick={() => {
                        if (R.isEmpty(errors)) {
                        }
                      }}
                    >
                      Save
                    </Button>
                  </Modal.Actions>
                </Form>
              </ConfirmModal>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
});

const mapDispatchToProps = {
  addSingleKiosk,
  addDoubleKiosk,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanogramAlert);
