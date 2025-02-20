import React from 'react';
import Toolbar from './components/Toolbar';
import KiosksContent from './components/KiosksContent';
import {
  getKioskOptionsForTableDropdown,
  getKioskDoorStatus,
  getKiosksNetworkStatus,
  getOrganizationOptionsForTableDropdown,
  getPaginationState,
} from './selectors';
import {
  setSearch,
  setKiosk,
  setOrganization,
  setKioskStatus,
} from './actions';
import { connect } from 'react-redux';

const KiosksList = ({
  organizations,
  kiosksStatus,
  kiosksNetworkStatus,
  setSearch,
  setKiosk,
  setOrganization,
  setKioskStatus,
  paginationState,
  ...props
}) => {
  const { search, kiosk, organization, kioskStatus } = paginationState;

  return (
    <>
      <Toolbar
        search={search}
        setSearch={setSearch}
        kiosksStatus={kiosksStatus}
        setKioskStatus={setKioskStatus}
        kiosksNetworkStatus={kiosksNetworkStatus}
        organizations={organizations}
        setOrganization={setOrganization}
        selectedOrganization={organization}
      />

      <KiosksContent
        {...props}
        search={search}
        kiosk={kiosk}
        organization={organization}
        kioskStatus={kioskStatus}
        // kioskNetworkStatus={kioskNetworkStatus} //!LIV-2285
      />
    </>
  );
};

const mapStateToProps = state => ({
  kiosksStatus: getKioskDoorStatus(state),
  kiosksNetworkStatus: getKiosksNetworkStatus(state),
  organizations: getOrganizationOptionsForTableDropdown(state),
  paginationState: getPaginationState(state),
});

const mapDispatchToProps = {
  setSearch,
  setKiosk,
  setOrganization,
  setKioskStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(KiosksList);
