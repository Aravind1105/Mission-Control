import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Divider, Button, Header } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import DetailsLoadCells from './components/DetailsLoadCells';
import DetailsInventory from './components/DetailsInventory';
import DetailsHeader from './components/DetailsHeader';
import DetailsInfo from './components/DetailsInfo';
import DetailQRCode from './components/DetailQRCode';
import { getKioskById, getShelvesByKioskId } from './selectors';
import { resetKioskSaga, loadKiosksSaga, openKioskSaga } from './actions';

import './styles.less';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Kiosks',
    link: '/kiosks',
  },
];
const backLink = {
  name: 'Back to kiosks',
  link: '/kiosks',
};

const KioskDetails = ({
  kiosk,
  loadCells,
  isLoading,
  resetKioskSaga,
  loadKiosksSaga,
  openKioskSaga,
}) => {
  useEffect(() => {
    if (!kiosk && !isLoading) {
      loadKiosksSaga();
    }
  }, []);

  if (!kiosk) return false;

  const toggleResetKiosk = () => {
    if (window.confirm('Willst Du die Session wirklich zurücksetzen?')) {
      resetKioskSaga(kiosk);
    }
  };

  const toggleOpenDoor = () => {
    if (window.confirm('Willst Du das Kiosk wirklich im Refill Mode öffnen?')) {
      openKioskSaga(kiosk);
    }
  };

  return (
    <>
      <Grid stackable>
        <Grid.Column width={11}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Breadcrumbs
                    backLink={backLink}
                    links={links}
                    activeLink={kiosk.name}
                  />
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
                  <Header as="h3">{`#${kiosk.serialNumber}`}</Header>
                  <DetailsInfo session={kiosk.session}>
                    <>
                      <Button onClick={toggleOpenDoor}>Open Door</Button>
                      <Button>Edit</Button>
                      <Button onClick={toggleResetKiosk}>Sync / Restart</Button>
                      <Button>Temp Log.</Button>
                      <Button>Activity Log.</Button>
                    </>
                  </DetailsInfo>
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
            <DetailQRCode qrCode={kiosk.qrcode} />
            <Grid.Row>
              <Grid.Column>
                <DetailsInventory cells={loadCells} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>

      <DetailsLoadCells
        cells={loadCells}
        kioskName={kiosk.name}
        serial={kiosk.serialNumber}
      />
    </>
  );
};

const mapStateToProps = (state, { match: { params } }) => ({
  kiosk: getKioskById(params.id)(state),
  loadCells: getShelvesByKioskId(params.id)(state),
  isLoading: state.kiosks.isLoading,
});

const mapDispatchToProps = {
  resetKioskSaga,
  loadKiosksSaga,
  openKioskSaga,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskDetails);
