import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Divider, Button, Header } from 'semantic-ui-react';
import get from 'lodash/get';

import history from 'lib/history';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import DetailsLoadCells from './components/DetailsLoadCells';
import DetailsInventory from './components/DetailsInventory';
import DetailsHeader from './components/DetailsHeader';
import DetailsInfo from './components/DetailsInfo';
import DetailQRCode from './components/DetailQRCode';
import { getKioskSingle, getKioskShelves } from './selectors';
import { resetKiosk, getAllKiosks, refillKiosk, getKiosk } from './actions';

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
  match,
  kiosk,
  loadCells,
  isKioskLoading,
  resetKiosk,
  refillKiosk,
  getKiosk,
}) => {
  useEffect(() => {
    const { id } = match.params;
    if ((!kiosk || kiosk._id !== id) && !isKioskLoading) {
      getKiosk(id);
    }
  }, []);

  const handlerEdit = () => {
    history.push(`/kiosks/edit/${kiosk._id}`);
  };
  const handlerResetKiosk = () => {
    if (window.confirm('Willst Du die Session wirklich zurücksetzen?')) {
      resetKiosk(kiosk._id);
    }
  };

  const handlerOpenDoor = () => {
    if (window.confirm('Willst Du das Kiosk wirklich im Refill Mode öffnen?')) {
      refillKiosk(kiosk._id);
    }
  };
  const loaded = kiosk && kiosk._id === match.params.id;
  return loaded ? (
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
                  <DetailsInfo
                    session={kiosk.session}
                    location={kiosk.location}
                    ownerOrganization={get(kiosk, 'ownerOrganization.name', '')}
                  >
                    <>
                      <Button onClick={handlerOpenDoor}>Open Door</Button>
                      <Button onClick={handlerEdit}>Edit</Button>
                      <Button onClick={handlerResetKiosk}>
                        Sync / Restart
                      </Button>
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
            <DetailQRCode
              qrCode={`http://qrdeeplink.livello.com?id=${kiosk.qrcode}`}
            />
            <Grid.Row>
              <Grid.Column>
                <DetailsInventory cells={loadCells} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>

      <DetailsLoadCells cells={loadCells} kioskName={kiosk.name} />
    </>
  ) : (
    <Loader />
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  loadCells: getKioskShelves(state),
  isKioskLoading: state.kiosks.isKioskLoading,
});

const mapDispatchToProps = {
  resetKiosk,
  getAllKiosks,
  refillKiosk,
  getKiosk,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskDetails);
