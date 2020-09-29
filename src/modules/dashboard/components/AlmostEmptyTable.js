import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import history from 'lib/history';

import { getAlmostEmptyKiosksForTable } from 'modules/kiosks/selectors';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';

const AlmostEmptyTable = ({ almostEmptyKiosks, getData }) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Product'),
      field: 'product',
    },
    {
      title: t('Current Inventory'),
      field: 'amount',
    },
    {
      title: t('Cable ID'),
      field: 'scale',
    },
    {
      title: t('Kiosk'),
      field: 'kiosk',
    },
  ];

  const handleClick = () => {
    history.push('/dashboard/almost-empty');
  };
  const handlerClickRow = ({ kioskId }) => {
    history.push(`/kiosks/detail/${kioskId}`);
  };
  return (
    <Segment>
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
        onRowClick={handlerClickRow}
        sortable
        excludeSortBy={['product', 'amount', 'scale', 'kiosk']}
        fixed
        selectable
        data={almostEmptyKiosks}
        columns={columns}
        getData={getData}
      />
    </Segment>
  );
};

const mapStateToProps = state => ({
  almostEmptyKiosks: getAlmostEmptyKiosksForTable(state),
});

export default connect(mapStateToProps, null)(AlmostEmptyTable);
