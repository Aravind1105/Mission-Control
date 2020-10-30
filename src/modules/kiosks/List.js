import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import KiosksContent from './components/KiosksContent';
import { getKioskOptionsForTableDropdown, getKioskDoorStatus, getKiosksNetworkStatus } from './selectors'
import { connect } from 'react-redux';

const sortDefault = [
  {
    column: 'name',
    direction: 'ASC',
  },
];

const KiosksList = ({kiosks, kiosksStatus, kiosksNetworkStatus, ...props}) => {
  const [search, setSearch] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [sort, setSort] = useState(sortDefault);
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);


  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || kiosk) {
      const name = search ? { name: { $regexI: search } } : {};
      const ki = kiosk ? { kiosk: { $regexI: kiosk } } : {};

      data.search = JSON.stringify({
        ...name,
        ...ki
      });

      data.skip = 0;
    }

    if (sort) {
      data.sort = sort;
    }
    // TODO: create sagas action for getKiosksWithFilter
    // getKiosksWithFilter({ data });
  };

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, kiosk]);

  return (
    <>
      <Toolbar 
      search={search}
      setSearch={setSearch}
      kiosks={kiosks}
      kiosksStatus={kiosksStatus}
      kiosksNetworkStatus={kiosksNetworkStatus}
      changeKiosk={changeKiosk}
      />
      <KiosksContent {...props} search={search} />
    </>
  );
};

const mapStateToProps = state => ({
  kiosks: getKioskOptionsForTableDropdown(state),
  kiosksStatus: getKioskDoorStatus(state),
  kiosksNetworkStatus: getKiosksNetworkStatus(state),
});

export default connect(mapStateToProps)(KiosksList);