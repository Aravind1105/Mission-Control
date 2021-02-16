import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import BackLink from 'modules/shared/components/Breadcrumbs/BackLink';
import history from 'lib/history';
import Toolbar from './Toolbar';

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
}) => {
  const { t } = useTranslation();
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
        }
        return <div style={{ textAlign: 'center' }}> {amount} </div>;
      },
    },
    {
      title: t('Scale'),
      field: 'scale',
      formatter: ({ scale }) => {
        if (scale === '') {
          return '';
        }
        return <div style={{ textAlign: 'center' }}> {scale} </div>;
      },
    },
    {
      title: t('Kiosk'),
      field: 'kiosk',
      formatter: ({ kiosk }) => {
        if (kiosk === '') {
          return '';
        }
        return <div style={{ textAlign: 'center' }}> {kiosk} </div>;
      },
    },
  ];
  const handlerClickRow = ({ kioskId }) => {
    history.push(`/kiosks/detail/${kioskId}`);
  };
  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4" color="black">
          <Header.Content>Almost Empty</Header.Content>
        </Header>
        <BackLink {...{ ...backLink }} />
      </SegmentHeader>
      <Toolbar
        changeProduct={changeProduct}
        changeKiosk={changeKiosk}
        changeSupplier={changeSupplier}
      />
      <CustomTable
        sortable
        onRowClick={handlerClickRow}
        excludeSortBy={['product', 'amount', 'scale', 'kiosk']}
        fixed
        selectable
        data={almostEmptyKiosks}
        columns={columns}
        getData={getData}
        setSortByInCaller={sort => setSortByInCaller(sort)}
      />
    </Segment>
  );
};

export default AlmostEmptyKiosks;
