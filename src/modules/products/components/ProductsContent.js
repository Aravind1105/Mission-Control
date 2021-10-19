import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import get from 'lodash/get';
import { resetProduct } from '../actions';
import history from 'lib/history';
import CustomTable from 'modules/shared/components/CustomTable';
import './styles.less';
const screenWidth = window.innerWidth;

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Manufacturer',
    field: 'manufacturer',
  },
  {
    title: 'Weight',
    field: 'weight',
    formatter: ({ packagingOptions }) => {
      const weight = get(packagingOptions, '0.grossWeightGrams', 0);
      if (screenWidth < 750) {
        return <div style={{ textAlign: 'left' }}> {weight} g </div>;
      }
      return <div style={{ textAlign: 'center' }}> {weight} g</div>;
    },
  },
  {
    title: 'Price',
    field: 'defaultPrice',
    formatter: ({ defaultPrice = 0 }) => {
      if (screenWidth < 750) {
        return (
          <div style={{ textAlign: 'left' }}> {defaultPrice.toFixed(2)}€ </div>
        );
      }
      return (
        <div style={{ textAlign: 'right' }}> {defaultPrice.toFixed(2)}€</div>
      );
    },
  },
];

const ProductsContent = ({
  products,
  getData,
  isLoading,
  setSortByInCaller,
  resetProduct,
}) => {
  const clickRow = ({ _id }) => {
    resetProduct();
    history.push(`/products/${_id}`);
  };

  return (
    <Segment>
      <CustomTable
        className="product-table"
        sortByColumn="name"
        columns={columns}
        data={products}
        onRowClick={clickRow}
        getData={getData}
        sortable
        selectable
        isLoading={isLoading}
        setSortByInCaller={sort => setSortByInCaller(sort)}
      />
    </Segment>
  );
};

const mapDispatchToProps = {
  resetProduct,
};

export default connect(null, mapDispatchToProps)(ProductsContent);
