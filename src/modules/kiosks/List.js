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
  kiosks,
  organizations,
  kiosksStatus,
  kiosksNetworkStatus,
  setSearch,
  setKiosk,
  setOrganization,
  setKioskStatus,
  paginationState,
  isLoading,
  ...props
}) => {
  const { search, kiosk, organization, kioskStatus } = paginationState;

  return (
    <>
      {!isLoading && (
        <Toolbar
          search={search}
          setSearch={setSearch}
          kiosks={kiosks}
          setKiosk={setKiosk}
          kiosksStatus={kiosksStatus}
          setKioskStatus={setKioskStatus}
          kiosksNetworkStatus={kiosksNetworkStatus}
          organizations={organizations}
          setOrganization={setOrganization}
          selectedKiosk={kiosk}
          selectedOrganization={organization}
        />
      )}
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
  kiosks: getKioskOptionsForTableDropdown(state),
  kiosksStatus: getKioskDoorStatus(state),
  kiosksNetworkStatus: getKiosksNetworkStatus(state),
  organizations: getOrganizationOptionsForTableDropdown(state),
  paginationState: getPaginationState(state),
  isLoading: state.kiosks.isLoading,
});

const mapDispatchToProps = {
  setSearch,
  setKiosk,
  setOrganization,
  setKioskStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(KiosksList);
