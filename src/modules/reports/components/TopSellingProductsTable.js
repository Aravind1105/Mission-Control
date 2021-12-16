import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import './styles.less';

const TopSellingProductsTable = ({ topSellingProducts }) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Rank'),
      field: 'rank',
      formatter: ({ rank }) => {
        return <div style={{ textAlign: 'left' }}> {rank}. </div>;
      },
    },
    {
      title: t('Product'),
      field: 'productLine',
      formatter: ({ productLine }) => {
        if (productLine === '') {
          return '';
        }
        return <div style={{ textAlign: 'left' }}> {productLine.name} </div>;
      },
    },
    {
      title: t('Quantity Sold'),
      field: 'amount',
      formatter: ({ amount }) => {
        if (amount === '') {
          return '';
        }
        return <div style={{ textAlign: 'center' }}> {amount} </div>;
      },
    },
    {
      title: t('Net Sales'),
      field: 'netSales',
      formatter: ({ netSales }) => {
        if (netSales === '') {
          return '';
        }
        return <div style={{ textAlign: 'right' }}> {netSales}€ </div>;
      },
    },
    {
      title: t('Net Cost'),
      field: 'netCost',
      formatter: ({ netCost }) => {
        if (netCost === '') {
          return '';
        }
        return <div style={{ textAlign: 'right' }}> {netCost}€ </div>;
      },
    },
    {
      title: t('Profit'),
      field: 'profit',
      formatter: ({ profit }) => {
        if (profit === '') {
          return '';
        }
        return <div style={{ textAlign: 'right' }}> {profit}€ </div>;
      },
    },
  ];
  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>Top Selling Products &nbsp;</Header.Content>
        </Header>
      </SegmentHeader>
      <CustomTable
        className="reports-table-component"
        sortable
        sortByColumn="startDate"
        fixed
        data={topSellingProducts}
        columns={columns}
      />
    </Segment>
  );
};

export default TopSellingProductsTable;
