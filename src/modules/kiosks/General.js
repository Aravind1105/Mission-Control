import React, { useState, useEffect } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';
import CustomizeScreen from './components/CustomizeGeneral';
import history from 'lib/history';
import { getKiosk } from './actions';
import { getKioskSingle } from './selectors';
import NavSwitcher from '../shared/components/NavSwitcher';

const Settings = ({ getKiosk, kiosk, isKioskLoading, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const links = [
    {
      name: 'Home',
      link: '/dashboard',
    },
    {
      name: 'Kiosks',
      link: '/kiosks',
    },
    {
      name: !kiosk ? '' : kiosk.name,
      link: `/kiosks/detail/${!kiosk ? props.match.params.id : kiosk._id}`,
    },
  ];
  const backLink = {
    name: 'Back to kiosk detail',
    link: `/kiosks/detail/${!kiosk ? props.match.params.id : kiosk._id}`,
  };
  const navSwitcherConfig = [
    { name: 'Kiosk Settings' },
    {
      name: 'General',
      goTo: `/kiosks/settings/${
        !kiosk ? props.match.params.id : kiosk._id
      }/general`,
    },
    // {
    //   name: 'Screen Playlist',
    //   goTo: `/kiosks/settings/${
    //     !kiosk ? props.match.params.id : kiosk._id
    //   }/playlist`,
    // },
  ];

  const redirectHandler = () => {
    const redirectTo =
      props.match.params.id === 'new'
        ? '/kiosks'
        : `/kiosks/detail/${props.match.params.id}`;
    history.push(redirectTo);
  };

  const cancelHandler = ({ dirty }) => {
    if (dirty) setIsModalOpen(true);
    else redirectHandler();
  };
  useEffect(() => {
    getKiosk(props.match.params.id);
  }, []);

  return (
    <>
      <Grid>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Breadcrumbs
                backLink={backLink}
                links={links}
                activeLink="Settings"
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <NavSwitcher config={navSwitcherConfig} />
              <CustomizeScreen
                cancelHandler={cancelHandler}
                isKioskLoading={isKioskLoading}
                {...props}
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
          <p>Are you sure you want to leave the page?</p>
        </ConfirmationModal>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  isKioskLoading: state.kiosks.isKioskLoading,
});
const mapDispatchToProps = {
  getKiosk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
