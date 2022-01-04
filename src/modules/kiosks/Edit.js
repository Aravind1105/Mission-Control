import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';
import { getOrganizations } from 'modules/organizations/actions';
import { getOrganizationsAsOptions } from 'modules/organizations/selectors';
import history from 'lib/history';
import KioskForm from './components/KioskForm';
import { getAllSerialNumbers, getKiosk } from './actions';
import { getKioskInitValues } from './selectors';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Kiosks',
    link: '/kiosks',
  },
];

const KioskEdit = ({
  match: { params },
  initialValues,
  isOrgLoading,
  isKioskLoading,
  organizationsOptions,
  getOrganizations,
  getKiosk,
  getAllSerialNumbers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonVal, setButtonVal] = useState('Submit');

  const backLinkToKioskDetail = {
    name: 'Back to kiosk detail',
    link: `/kiosks/detail/${params.id}`,
  };
  const backLinkToKiosks = {
    name: 'Back to kiosks',
    link: '/kiosks',
  };

  const isEdit = params.id !== 'new';
  useEffect(() => {
    const hasData = isEdit ? initialValues.id === params.id : false;
    getOrganizations();
    if (!hasData) {
      getKiosk(params.id);
    }
    if (!isEdit) {
      getAllSerialNumbers();
    } else setButtonVal('Save');
  }, []);

  const redirectHandler = () => {
    const redirectTo =
      params.id === 'new' ? '/kiosks' : `/kiosks/detail/${params.id}`;
    history.push(redirectTo);
  };

  const cancelHandler = ({ dirty, resetForm }) => {
    if (dirty) setIsModalOpen(true);
    else {
      resetForm();
      redirectHandler();
    }
  };
  const hasData = isEdit ? initialValues.id === params.id : true;
  const isLoaded = !isOrgLoading && !!organizationsOptions.length && hasData;
  const kioskName = isEdit ? initialValues.name : 'New Kiosk';

  return (
    <>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Breadcrumbs
                links={links}
                backLink={isEdit ? backLinkToKioskDetail : backLinkToKiosks}
                activeLink={kioskName}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Segment>
              {(isKioskLoading || !isLoaded) && <Loader />}
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h2">{kioskName}</Header>
                    <Divider />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <KioskForm
                initialValues={initialValues}
                organizations={organizationsOptions}
                cancelHandler={cancelHandler}
                buttonVal={buttonVal}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <ConfirmationModal
          title="Confirm Cancelling"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          confirmHandler={redirectHandler}
        >
          <p>You have unsaved changes.</p>
          <p>Are you sure want to leave the page?</p>
        </ConfirmationModal>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  initialValues: getKioskInitValues(state),
  organizationsOptions: getOrganizationsAsOptions(state),
  isOrgLoading: state.organizations.isOrgLoading,
  isKioskLoading: state.kiosks.isKioskLoading,
});

const mapDispatchToProps = {
  getOrganizations,
  getKiosk,
  getAllSerialNumbers,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskEdit);
