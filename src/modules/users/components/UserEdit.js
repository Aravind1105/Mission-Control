import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';

import { getOrganizations } from 'modules/organizations/actions';
import { getOrganizationsAsOptions } from 'modules/organizations/selectors';
import history from 'lib/history';
import UserForm from './UserForm';
import { getOneUserWithInfo } from '../actions';
import { getUserInitValues } from '../selectors';
import { getMemberCardsAsOptions } from '../selectors';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Users',
    link: '/users',
  },
];

const UserEdit = ({
  match: { params },
  getOneUserWithInfo,
  initialValues,
  isOrgLoading,
  organizationsOptions,
  userMemberCardsOptions,
  getOrganizations,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backLink = {
    name: 'Back to users',
    link: '/users',
  };
  useEffect(() => {
    const isEdit = params.id !== 'new';
    const hasData = isEdit ? initialValues.id === params.id : false;

    if (!isOrgLoading) getOrganizations();
    if (!hasData) {
      getOneUserWithInfo({ id: params.id });
    }
  }, []);

  const redirectHandler = () => {
    history.push('/users');
  };

  const cancelHandler = ({ dirty }) => {
    if (dirty) setIsModalOpen(true);
    else redirectHandler();
  };

  const isEdit = params.id !== 'new';
  const userName = isEdit
    ? `${initialValues.firstName} ${initialValues.lastName}`
    : 'New User';
  const isLoaded = true;
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
                  activeLink={userName}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          {isLoaded ? (
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h3">{userName}</Header>
                  <Divider />
                  <UserForm
                    initialValues={initialValues}
                    organizations={organizationsOptions}
                    userMemberCardsOptions={userMemberCardsOptions}
                    cancelHandler={cancelHandler}
                    isOrgLoading={isOrgLoading}
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
  initialValues: getUserInitValues(state),
  organizationsOptions: getOrganizationsAsOptions(state),
  userMemberCardsOptions: getMemberCardsAsOptions(state),
  isOrgLoading: state.organizations.isOrgLoading,
});

const mapDispatchToProps = {
  getOrganizations,
  getOneUserWithInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
