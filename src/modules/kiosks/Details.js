import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Divider } from 'semantic-ui-react';

import history from 'lib/history';
import { createRefill } from 'modules/transactions/actions';
import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import CustomButton from 'modules/shared/components/CustomButton';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';
import DetailsLoadCells from './components/DetailsLoadCells';
import DetailsInventory from './components/DetailsInventory';
import DetailsHeader from './components/DetailsHeader';
import DetailsInfo from './components/DetailsInfo';
import DetailQRCode from './components/DetailQRCode';
import {
  getKioskSingle,
  getKioskShelves,
  getOrgIdFromKiosk,
  getOrgData,
} from './selectors';
import { resetKiosk, getKiosk, getOrganizationById } from './actions';
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
  currentKioskSide,
  resetKiosk,
  createRefill,
  getKiosk,
  orgId,
  getOrganizationById,
  orgData,
  rootUser,
}) => {
  const { id } = match.params;
  const [openDoor, setOpenDoor] = useState(false);
  const [resetSession, setResetSession] = useState(false);

  useEffect(() => {
    getKiosk(id);
  }, [id]);

  useEffect(() => {
    if (orgId) {
      getOrganizationById(orgId);
    }
  }, [orgId]);

  const handlerEdit = () => {
    history.push(`/kiosks/edit/${kiosk._id}`);
  };

  const handlerResetKiosk = () => {
    setResetSession(true);
  };
  const redirectResetHandler = () => {
    resetKiosk(kiosk._id);
    setResetSession(false);
  };

  const handlerOpenDoor = () => {
    setOpenDoor(true);
  };
  const redirectDoorHandler = () => {
    createRefill(kiosk._id);
    setOpenDoor(false);
  };

  const loaded = !isKioskLoading && orgData;
  return (
    <>
      {!loaded && <Loader />}
      <Grid stackable>
        <Grid.Column width={11}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Breadcrumbs
                    backLink={backLink}
                    links={links}
                    activeLink={kiosk?.name}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsHeader
                    name={kiosk?.name}
                    doorStatus={kiosk?.doorStatus}
                    temperature={kiosk?.temperature}
                    heartbeat={kiosk?.heartbeat}
                    session={kiosk?.session}
                    service={kiosk?.controller?.serviceCheck?.enabled}
                  />
                  <Divider />
                  <DetailsInfo
                    serial={`#${kiosk?.serialNumber}`}
                    session={kiosk?.session}
                    location={kiosk?.location}
                    ownerOrganization={orgData?.name}
                    notes={kiosk?.notes}
                    pin={kiosk?.pin}
                  >
                    <>
                      <CustomButton
                        label="Open Door"
                        icon="lock open"
                        onClick={handlerOpenDoor}
                      />
                      <CustomButton
                        label="Edit"
                        icon="edit"
                        onClick={handlerEdit}
                      />
                      <CustomButton
                        label="Sync / Restart"
                        icon="redo"
                        onClick={handlerResetKiosk}
                      />
                      <CustomButton
                        icon="thermometer quarter"
                        label="Temp. Log"
                        onClick={() =>
                          history.push(`/kiosks/log/temp/${kiosk?._id}`)
                        }
                      />
                      <CustomButton
                        icon="list ul"
                        label="Activity Log"
                        onClick={() =>
                          history.push(`/kiosks/log/activity/${kiosk?._id}`)
                        }
                      />
                      <CustomButton
                        icon="setting"
                        label="Settings"
                        // disabled={(function() {
                        //   const value = get(
                        //     kiosk && kiosk.temperature,
                        //     'updated',
                        //     0,
                        //   );
                        //   const dif = differenceInMinutes(
                        //     new Date(),
                        //     new Date(value),
                        //   );
                        //   return !(dif <= 10);
                        // })()}
                        onClick={() =>
                          history.push(`/kiosks/settings/${kiosk?._id}`)
                        }
                      />
                    </>
                  </DetailsInfo>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <DetailsLoadCells
                  cells={loadCells.list}
                  kioskName={kiosk?.name}
                  currentKioskSide={currentKioskSide}
                  rootUser={rootUser}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={5}>
          <Grid>
            <DetailQRCode
              qrCode={`http://qrdeeplink.livello.com?qrCode=${kiosk?.qrcode}&slug=${orgData?.slug}&appleId=${orgData?.appleId}`}
              fileName={kiosk?.name || ''}
            />
            <Grid.Row>
              <Grid.Column>
                <DetailsInventory {...loadCells} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <ConfirmationModal
          title="Replenishment Session"
          isModalOpen={openDoor}
          setIsModalOpen={setOpenDoor}
          confirmHandler={redirectDoorHandler}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '16px',
              whiteSpace: 'pre-wrap',
            }}
          >
            <p>Are you sure you want to make a{'\n'}Replenishment session?</p>
          </div>
        </ConfirmationModal>
        <ConfirmationModal
          title="Reset Session"
          isModalOpen={resetSession}
          setIsModalOpen={setResetSession}
          confirmHandler={redirectResetHandler}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '16px',
              whiteSpace: 'pre-wrap',
            }}
          >
            <p>Are you sure you want to reset{'\n'}the existing session?</p>
          </div>
        </ConfirmationModal>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  kiosk: getKioskSingle(state),
  loadCells: getKioskShelves(state),
  orgId: getOrgIdFromKiosk(state),
  orgData: getOrgData(state),
  isKioskLoading: state.kiosks.isKioskLoading,
  currentKioskSide: state.kiosks.currentKioskSide,
  rootUser: state.user.root,
});

const mapDispatchToProps = {
  resetKiosk,
  createRefill,
  getKiosk,
  getOrganizationById,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskDetails);
