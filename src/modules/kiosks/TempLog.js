import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import { getKioskSingle } from './selectors';
import TempLogVisualization from './components/TempLogVisualization';
import TempLog from './components/TempLog';
import { getKiosk } from './actions';

const Log = ({ getKiosk, kiosk, isLoading, ...props }) => {
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
      name: kiosk === null ? '' : kiosk.name,
      link: `/kiosks/detail/${kiosk === null ? props.match.params.id : kiosk._id}`,
    },
  ]
  const backLink = {
    name: 'Back to kiosk detail',
    link: `/kiosks/detail/${kiosk === null ? props.match.params.id : kiosk._id}`,
  }
  useEffect(() => {
    if (kiosk === null) {
      getKiosk(props.match.params.id);
    }
  }, []);

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
        <TempLogVisualization {...props} />
        <TempLog />
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  isLoading: state.kiosks.isLoading
});
const mapDispatchToProps = {
  getKiosk
};

export default connect(mapStateToProps, mapDispatchToProps)(Log);
