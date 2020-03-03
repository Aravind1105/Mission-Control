/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Divider, Button, Header } from 'semantic-ui-react';
import { pathOr, sortBy, prop } from 'ramda';

import DetailsBreadcrumb from './components/DetailsBreadcrumb';
import DetailsLoadCells from './components/DetailsLoadCells';
import DetailsInventory from './components/DetailsInventory';
import DetailsHeader from './components/DetailsHeader';
import { getKioskById } from './selectors/kiosksSelector';
import { resetKioskSaga, loadKiosksSaga, openKioskSaga } from './actions';

const KioskDetails = ({
  kiosk,
  loadCells,
  resetKiosk,
  loadKiosks,
  openKiosk,
}) => {
  useEffect(() => {
    if (!kiosk) {
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

  const tempSensors = kiosk.temperature.sensors.map((v, id) => {
    const res = (
      <li style={{ margin: 5 }} key={v.id}>
        Sensor: {id} | Temperature: {v.temperature}
      </li>
    );
    return res;
  });

  const kioskPin = kiosk.pin;

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
                  <DetailsHeader
                    name={kiosk.name}
                    temp={kiosk.temperature.value}
                    connection={kiosk.internet.signalStrength}
                    doorStatus={kiosk.doorStatus}
                  />
                  <Divider />
                  <Header as="h3">
                    <Header.Content>{`#${kiosk.serialNumber}`}</Header.Content>
                  </Header>
                  <div>{`Session: ${kiosk.session}`}</div>
                  <Button
                    style={{ marginBottom: 5 }}
                    onClick={toggleResetKiosk}
                  >
                    Reset Door &amp; Session
                  </Button>
                  <Button style={{ marginBottom: 5 }} onClick={toggleOpenDoor}>
                    Open Door
                  </Button>
                  <p style={{ margin: 5 }}>KioskPin: {kioskPin}</p>
                  <div style={{ borderStyle: 'solid' }}>
                    <p style={{ margin: 5 }}>
                      {`Average Temperature:  ${kiosk.temperature.value} °C`}
                    </p>
                    {tempSensors}
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>RFID</Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <DetailsLoadCells cells={loadCells} kioskName={kiosk.name} />
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
                <DetailsInventory cells={loadCells} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  const kiosk = getKioskById(ownProps.match.params.id)(state);
  const cells = pathOr([], ['inventory', 'loadCells'], kiosk).sort(
    (a, b) => a.cellId - b.cellId,
  );
  const loadCells = sortBy(prop('planogramPosition'), cells).map(
    ({ products, ...rest }) => ({
      ...rest,
      products,
      availableProducts: products.filter(
        el => el.status === 'in_kiosk_available',
      ).length,
    }),
  );

  return {
    kiosk,
    loadCells,
  };
};

const mapDispatchToProps = dispatch => ({
  resetKiosk: kiosk => dispatch(resetKioskSaga(kiosk)),
  loadKiosks: () => dispatch(loadKiosksSaga()),
  openKiosk: kiosk => dispatch(openKioskSaga(kiosk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(KioskDetails);
