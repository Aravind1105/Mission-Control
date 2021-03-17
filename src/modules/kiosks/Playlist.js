import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import ContentPlaylist from './components/ScreenPlaylist';
import { getKiosk } from './actions';
import { getKioskSingle } from './selectors';
import history from 'lib/history';
import NavSwitcher from '../shared/components/NavSwitcher';

const Playlist = ({ getKiosk, kiosk, isKioskLoading, ...props }) => {
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
    {
      name: 'Screen Playlist',
      goTo: `/kiosks/settings/${
        !kiosk ? props.match.params.id : kiosk._id
      }/playlist`,
    },
  ];
  const redirectHandler = () => {
    const redirectTo =
      props.match.params.id === 'new'
        ? '/kiosks'
        : `/kiosks/detail/${props.match.params.id}`;
    history.push(redirectTo);
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
              <ContentPlaylist redirectHandler={redirectHandler} {...props} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
