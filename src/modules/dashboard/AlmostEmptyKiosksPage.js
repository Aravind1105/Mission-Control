import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Pagination from 'modules/shared/components/Pagination';
import {
  getAlmostEmptyKiosksForTable,
  getAlmostEmptyKiosksTotal,
} from 'modules/kiosks/selectors';
import { getAlmostEmptyKiosks } from 'modules/kiosks/actions';
import { getProductListSaga } from 'modules/products/actions';
import AlmostEmptyKiosks from './components/AlmostEmptyKiosks';

const sort = [
  {
    column: 'product',
    direction: 'ASC',
  },
];

const sortValue = {
  product: 'product',
  amount: 'amount',
  scale: 'scale',
  kiosk: 'kiosk',
};

const AlmostEmptyKiosksPage = ({
  getAlmostEmptyKiosks,
  almostEmptyKiosks,
  kiosks,
  getProductListSaga,
  total,
}) => {
  const [product, changeProduct] = useState('');
  const [kiosk, changeKiosk] = useState('');
  const [supplier, changeSupplier] = useState('');
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };
    if (product || kiosk || supplier) {
      const prod = product ? { productLineId: product } : {};
      const kio = kiosk ? { kioskId: kiosk } : {};
      const sup = supplier ? { manufacturer: supplier } : {};
      data.filter = {
        ...prod,
        ...kio,
        ...sup,
      };
      data.skip = 0;
    }
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAlmostEmptyKiosks({ ...data });
  };

  useEffect(() => {
    getProductListSaga();
  }, []);

  useEffect(() => {
    getData({ sort });
  }, [page, perPage, product, kiosk, supplier]);

  return (
    <Grid className="dashboard">
      <Grid.Row stretched>
        <Grid.Column mobile={16} computer={16}>
          <AlmostEmptyKiosks
            almostEmptyKiosks={almostEmptyKiosks}
            fullTable
            kiosks={kiosks}
            changeKiosk={changeKiosk}
            changeProduct={changeProduct}
            changeSupplier={changeSupplier}
            getData={getData}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Pagination
            totalCount={total}
            page={page}
            perPage={perPage}
            changePage={changePage}
            changePerPage={changePerPage}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  total: getAlmostEmptyKiosksTotal(state),
});

const mapDispatchToProps = {
  getAlmostEmptyKiosks,
  getProductListSaga,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlmostEmptyKiosksPage);
