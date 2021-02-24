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
import { getKiosk } from './actions';
import { getKioskInitValues, getKiosksSerialNumbers } from './selectors';

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
  serialNum,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backLink = {
    name: 'Back to kiosk',
    link: '/kiosks',
  };
  useEffect(() => {
    const isEdit = params.id !== 'new';
    const hasData = isEdit ? initialValues.id === params.id : false;

    if (!isOrgLoading) getOrganizations();
    if (!hasData && !isKioskLoading) {
      getKiosk(params.id);
    }
  }, []);

  const redirectHandler = () => {
    const redirectTo =
      params.id === 'new' ? '/kiosks' : `/kiosks/detail/${params.id}`;
    history.push(redirectTo);
  };

  const cancelHandler = ({ dirty }) => {
    if (dirty) setIsModalOpen(true);
    else redirectHandler();
  };

  const isEdit = params.id !== 'new';
  const hasData = isEdit ? initialValues.id === params.id : true;
  const isLoaded = !isOrgLoading && !!organizationsOptions.length && hasData;
  const kioskName = isEdit ? initialValues.name : 'New kiosk';

  return (
    <Grid stackable>
      <Grid.Column width={16}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Breadcrumbs
                  links={links}
                  backLink={backLink}
                  activeLink={kioskName}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          {isLoaded ? (
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h3">{kioskName}</Header>
                  <Divider />
                  <KioskForm
                    initialValues={initialValues}
                    organizations={organizationsOptions}
                    cancelHandler={cancelHandler}
                    isKioskLoading={isKioskLoading}
                    sNum={serialNum}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Loader />
          )}
        </Grid>
      </Grid.Column>
      <ConfirmationModal
        title="Confirm Cancelling"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        confirmHandler={redirectHandler}
      >
        <p>You have unsaved changes.</p>
        <p>Are you sure you want to leave the page?</p>
      </ConfirmationModal>
    </Grid>
  );
};

const mapStateToProps = state => ({
  initialValues: getKioskInitValues(state),
  organizationsOptions: getOrganizationsAsOptions(state),
  isOrgLoading: state.organizations.isOrgLoading,
  isKioskLoading: state.kiosks.isKioskLoading,
  serialNum: getKiosksSerialNumbers(state),
});

const mapDispatchToProps = {
  getOrganizations,
  getKiosk,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskEdit);
