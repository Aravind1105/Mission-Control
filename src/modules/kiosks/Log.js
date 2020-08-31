import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import history from 'lib/history';
import { getKioskSingle } from './selectors';
import TempLogVisualization from './components/TempLogVisualization';
import TempLog from './components/TempLog';

const Log = ({ kiosk, isLoading }) => {
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

  if (kiosk === null) {
    history.push('/kiosks');
  }

  return (
    <>
      {isLoading && <Loader />}
      <Grid>
        <Grid.Row stretched>
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
        <TempLogVisualization />
        <TempLog />
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  isLoading: state.kiosks.isLoading,
});

export default connect(mapStateToProps)(Log);
