import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import Pagination from 'modules/shared/components/Pagination';
import BackLink from 'modules/shared/components/Breadcrumbs/BackLink';
import Loader from 'modules/shared/components/Loader';
import history from 'lib/history';
import Toolbar from './AlmostEmptyToolbar';
import { getAlmostEmptyKiosksTotal } from 'modules/kiosks/selectors';
import './styles.less';

const backLink = {
  name: 'Back to Dashboard',
  link: '/',
};

const AlmostEmptyKiosks = ({
  almostEmptyKiosks,
  changeProduct,
  changeKiosk,
  changeSupplier,
  getData,
  setSortByInCaller,
  isKioskLoading,
  page,
  perPage,
  changePage,
  changePerPage,
  total,
  kioskFilter,
  productFilter,
  supplierFilter,
  sortFilter,
}) => {
  const { t } = useTranslation();
  const screenWidth = window.innerWidth;
  const columns = [
    {
      title: t('Product'),
      field: 'product',
      formatter: ({ product }) => {
        if (product === '') {
          return '';
        }
        return <div style={{ textAlign: 'left' }}> {product} </div>;
      },
    },
    {
      title: t('Current Inventory'),
      field: 'amount',
      formatter: ({ amount }) => {
        if (amount === '') {
          return '';
        } else if (screenWidth < 750) {
          return <div style={{ textAlign: 'left' }}> {amount} </div>;
        }
        return <div style={{ textAlign: 'center' }}> {amount} </div>;
      },
      textAlign: 'center',
    },
    {
      title: t('Cable ID'),
      field: 'scale',
      formatter: ({ scale }) => {
        if (scale === '') {
          return '';
        } else if (screenWidth < 750) {
          return <div style={{ textAlign: 'left' }}> {scale} </div>;
        }
        return <div style={{ textAlign: 'center' }}> {scale} </div>;
      },
      textAlign: 'center',
    },
    {
      title: t('Kiosk'),
      field: 'kiosk',
      formatter: ({ kiosk }) => {
        if (kiosk === '') {
          return '';
        } else {
          return <div style={{ textAlign: 'left' }}> {kiosk} </div>;
        }
      },
    },
  ];
  const handlerClickRow = ({ kioskId }) => {
    history.push(`/kiosks/detail/${kioskId}`);
  };
  return (
    <Segment>
      {isKioskLoading && <Loader />}
      <SegmentHeader>
        <Header as="h4" color="black">
          <Header.Content>Almost Empty</Header.Content>
        </Header>
        <BackLink {...{ ...backLink }} />
      </SegmentHeader>
      <Toolbar
        changeProduct={changeProduct}
        productFilter={productFilter}
        changeKiosk={changeKiosk}
        kioskFilter={kioskFilter}
        changeSupplier={changeSupplier}
        supplierFilter={supplierFilter}
      />
      <Grid stackable stretched>
        <Grid.Row>
          <Grid.Column>
            <CustomTable
              className="dashboard-table"
              sortable
              sortByColumn={sortFilter[0].column}
              onRowClick={handlerClickRow}
              excludeSortBy={['product', 'scale', 'kiosk']}
              fixed
              selectable
              data={almostEmptyKiosks}
              columns={columns}
              getData={getData}
              setSortByInCaller={sort => setSortByInCaller(sort)}
              sortDirection={sortFilter[0].direction}
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
    </Segment>
  );
};

const mapStateToProps = state => ({
  total: getAlmostEmptyKiosksTotal(state),
});

export default connect(mapStateToProps)(AlmostEmptyKiosks);
