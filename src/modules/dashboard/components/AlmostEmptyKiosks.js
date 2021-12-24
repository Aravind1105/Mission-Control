import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import BackLink from 'modules/shared/components/Breadcrumbs/BackLink';
import history from 'lib/history';
import Toolbar from './Toolbar';
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
      <SegmentHeader>
        <Header as="h4" color="black">
          <Header.Content>Almost Empty</Header.Content>
        </Header>
        <BackLink {...{ ...backLink }} />
      </SegmentHeader>
      <div className="toolbar-container">
        <Toolbar
          changeProduct={changeProduct}
          changeKiosk={changeKiosk}
          changeSupplier={changeSupplier}
        />
      </div>
      <CustomTable
        className="dashboard-table"
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
