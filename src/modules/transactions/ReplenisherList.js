import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Pagination from 'modules/shared/components/Pagination';
import RefillsToolbar from './components/RefillsToolbar';
import RefillsContent from './components/RefillsContent';
import {
  getGridRefillsTableState,
  getTotalGridRefillsCount,
} from './selectors';
import { getKioskOptionsForTableDropdown } from '../kiosks/selectors';
import { getGridRefills } from './actions';
import { exportCsv } from './actions'

const sort = [
  {
    column: 'created',
    direction: 'ASC',
  },
];

const sortValue = {
  kioskName: 'kiosk',
  date: 'created',
  productName: 'product',
  count: 'count',
  loadCell: 'loadCell',
  weight: 'weight',
  total: 'totalPrice',
  price: 'defaultPrice',
};

const ReplenisherList = ({
  refills,
  isLoading,
  total,
  getGridRefills,
  exportCsv,
  kiosks,
}) => {
  const [search, changeSearch] = useState('');
  const [dateRange, changeDate] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (search || kiosk || dateRange) {
      const name = search ? { product: { $regex: search } } : {};
      const cat = kiosk ? { kiosk: { $regex: kiosk } } : {};
      const date = dateRange ? { created: dateRange } : {};

      data.search = JSON.stringify({
        ...name,
        ...cat,
        ...date,
      });
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getGridRefills({ data });
    exportCsv();
    // test
    // console.log('data: ', data)
  };


  // ?BE: where does the year start?
  // https://api-stage.livello.com/api/v1/transactions/csv/export/1578328700000/1578388700000
  // ?FE
  // $gte: "2020-07-14T00:00:00.000Z"
  // $lte: "2020-08-17T23:59:59.999Z"

  // TODO: (1) create the action
  // TODO: (2) parse the date as the endpoint is expecting it.

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, search, kiosk, dateRange]);

  return (
    <>
      <RefillsToolbar
        changeDate={changeDate}
        changeSearch={changeSearch}
        changeKiosk={changeKiosk}
        changePage={changePage}
        kiosks={kiosks}
      />
      <RefillsContent
        refills={refills}
        isLoading={isLoading}
        getData={getData}
      />
      <Pagination
        totalCount={total}
        page={page}
        perPage={perPage}
        changePage={changePage}
        changePerPage={changePerPage}
        isLoading={isLoading}
      />
    </>
  );
};

const mapStateToProps = state => ({
  refills: getGridRefillsTableState(state),
  total: getTotalGridRefillsCount(state),
  isLoading: state.transactions.isLoading,
  kiosks: getKioskOptionsForTableDropdown(state),
});

const mapDispatchToProps = {
  getGridRefills,
  exportCsv,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplenisherList);
