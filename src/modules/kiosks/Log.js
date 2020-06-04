import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import { getKioskSingle } from './selectors';

const Log = ({ kiosk }) => {
  const links = kiosk
    ? [
        {
          name: 'Home',
          link: '/dashboard',
        },
        {
          name: 'Kiosks',
          link: '/kiosks',
        },
        {
          name: kiosk.name,
          link: `/kiosks/detail/${kiosk._id}`,
        },
      ]
    : [];
  const backLink = kiosk
    ? {
        name: 'Back to kiosk detail',
        link: `/kiosks/detail/${kiosk._id}`,
      }
    : null;

  return kiosk ? (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Breadcrumbs
              backLink={backLink}
              links={links}
              activeLink="Temp log"
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : null;
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  isKioskLoading: state.kiosks.isKioskLoading,
});

export default connect(mapStateToProps)(Log);
