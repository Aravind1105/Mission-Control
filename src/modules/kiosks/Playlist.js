import React, { useEffect } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import ContentPlaylist from './components/ScreenPlaylist';
import { getKioskSingle } from './selectors';
import NavSwitcher from '../shared/components/NavSwitcher';

const Playlist = ({ kiosk, isKioskLoading, ...props }) => {
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
              <ContentPlaylist {...props} />
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

export default connect(mapStateToProps)(Playlist);
