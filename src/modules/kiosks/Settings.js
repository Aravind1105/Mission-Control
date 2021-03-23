import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import Settings from './General';
import Playlist from './Playlist';
import { getKiosk } from './actions';
import { getKioskSingle } from './selectors';
import NavSwitcher from '../shared/components/NavSwitcher';

const Screen = ({ getKiosk, kiosk, isKioskLoading, ...props }) => {
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

  useEffect(() => {
    getKiosk(props.match.params.id);
  }, []);
  return (
    <>
      {isKioskLoading && <Loader />}
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
              <Switch>
                <Route
                  exact
                  path={`/kiosks/settings/${
                    !kiosk ? props.match.params.id : kiosk._id
                  }/general`}
                  component={Settings}
                />
                <Route
                  exact
                  path={`/kiosks/settings/${
                    !kiosk ? props.match.params.id : kiosk._id
                  }/playlist`}
                  component={Playlist}
                />
                <Redirect
                  to={`/kiosks/settings/${
                    !kiosk ? props.match.params.id : kiosk._id
                  }/general`}
                />
              </Switch>
            </Segment>
            <Divider />
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

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
