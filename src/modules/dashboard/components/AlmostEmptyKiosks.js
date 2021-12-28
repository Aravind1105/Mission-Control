import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import history from 'lib/history';
import { getAlmostEmptyKiosksForTable } from 'modules/kiosks/selectors';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import './styles.less';

const AlmostEmptyTable = ({ almostEmptyKiosks, isAlmostEmptyLoading }) => {
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

  const handleClick = () => {
    history.push('/dashboard/almostEmpty');
  };
  const handlerClickRow = ({ kioskId }) => {
    history.push(`/kiosks/detail/${kioskId}`);
  };
  return (
    <Segment>
      {isAlmostEmptyLoading && <Loader />}
      <SegmentHeader>
        <Header as="h4" color="black">
          <Header.Content>Almost Empty</Header.Content>
        </Header>
        <div>
          <Button icon labelPosition="right" basic onClick={handleClick}>
            Show all
            <Icon name="angle right" />
          </Button>
        </div>
      </SegmentHeader>

      <CustomTable
        className="dashboard-table"
        onRowClick={handlerClickRow}
        sortable
        excludeSortBy={['product', 'amount', 'scale', 'kiosk']}
        fixed
        selectable
        data={almostEmptyKiosks}
        columns={columns}
        sortByColumn="amount"
        sortDirection="ASC"
      />
    </Segment>
  );
};

const mapStateToProps = state => ({
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
  isAlmostEmptyLoading: state.kiosks.isAlmostEmptyLoading,
});

export default connect(mapStateToProps, null)(AlmostEmptyTable);
