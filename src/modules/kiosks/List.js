import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import KiosksContent from './components/KiosksContent';

const KiosksList = props => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Toolbar search={search} setSearch={setSearch} />
      <KiosksContent {...props} search={search} />
    </>
  );
};

export default KiosksList;
