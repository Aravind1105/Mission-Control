import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import KiosksContent from './components/KiosksContent';
import {
  getKioskOptionsForTableDropdown,
  getKioskDoorStatus,
  getKiosksNetworkStatus,
  getOrganizationOptionsForTableDropdown,
} from './selectors';
import { connect } from 'react-redux';

const KiosksList = ({
  kiosks,
  organizations,
  kiosksStatus,
  kiosksNetworkStatus,
  ...props
}) => {
  const [search, setSearch] = useState('');
  const [kiosk, setKiosk] = useState('');
  const [organization, setOrganization] = useState('');
  const [kioskStatus, setKioskStatus] = useState('');
  // const [kioskNetworkStatus, setKioskNetworkStatus] = useState(''); //!LIV-2285

  return (
    <>
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
        // setKioskNetworkStatus={setKioskNetworkStatus} //!LIV-2285
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
  kiosks: getKioskOptionsForTableDropdown(state),
  kiosksStatus: getKioskDoorStatus(state),
  kiosksNetworkStatus: getKiosksNetworkStatus(state),
  organizations: getOrganizationOptionsForTableDropdown(state),
});

export default connect(mapStateToProps)(KiosksList);
