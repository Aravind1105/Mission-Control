import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import KiosksContent from './components/KiosksContent';
import { getKioskOptionsForTableDropdown, getKioskDoorStatus, getKiosksNetworkStatus } from './selectors'
import { connect } from 'react-redux';

const KiosksList = ({kiosks, kiosksStatus, kiosksNetworkStatus, ...props}) => {
  const [search, setSearch] = useState('');
  const [kiosk, setKiosk] = useState('');
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
      // setKioskNetworkStatus={setKioskNetworkStatus} //!LIV-2285
      />
      <KiosksContent 
      {...props} 
      search={search} 
      kiosk={kiosk}
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
});

export default connect(mapStateToProps)(KiosksList);