import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid, Segment, Header, Button,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import DetailsBreadcrumb from './DetailsBreadcrumb';
import { getKioskById } from '../selectors/kiosksSelector';
import { resetKioskSaga, loadKiosksSaga, openKioskSaga } from '../actions/kioskActions';


const KioskDetails = ({
  match, kiosk, resetKiosk, loadKiosks, openKiosk,
}) => {
  useEffect(() => {
    if (!kiosk) {
      console.log('FETCH ORGANIZATION');
      loadKiosks();
    }
  }, []);

  if (!kiosk) return false;

  const toggleResetKiosk = () => {
    if (window.confirm('Willst Du die Session wirklich zurücksetzen?')) {
      resetKiosk(kiosk);
    }
  };

  const toggleOpenDoor = () => {
    if (window.confirm('Willst Du das Kiosk wirklich im Refill Mode öffnen?')) {
      openKiosk(kiosk);
    }
  };

  return (
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsBreadcrumb kioskName={kiosk.name} />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h4">
                    <Header.Content>{kiosk.name}</Header.Content>
                  </Header>
                  <div>{`Door: ${kiosk.doorStatus}`}</div>
                  <div>{`Session: ${kiosk.session}`}</div>
                  <Button style={{ marginBottom: 5 }} onClick={toggleResetKiosk}>
                    Reset Door & Session
                  </Button>
                  <Button style={{ marginBottom: 5 }} onClick={toggleOpenDoor}>
                    Open Door
                  </Button>
                  <pre>{JSON.stringify(kiosk, null, 1)}</pre>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>RFID</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={5}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>Sales</Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>Inventory</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  kiosk: getKioskById(ownProps.match.params.id)(state),
});

const mapDispatchToProps = dispatch => ({
  resetKiosk: kiosk => dispatch(resetKioskSaga(kiosk)),
  loadKiosks: () => dispatch(loadKiosksSaga()),
  openKiosk: kiosk => dispatch(openKioskSaga(kiosk)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(KioskDetails),
);
