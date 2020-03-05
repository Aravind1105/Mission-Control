import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import history from 'lib/history';
import { Unitable } from 'modules/shared/components/unitableReloaded';
import TableWithPagination from 'modules/shared/components/TableWithPagination';
import { getProductsWithFilter } from '../selectors';

const columns = [
  {
    name: 'Name',
  },
  {
    name: 'Supplier',
    mapDataFrom: 'manufacturer',
  },
  {
    name: 'Category',
  },
  {
    mapDataFrom: 'packagingOptions.0.grossWeightGrams',
    name: 'Weight',
    postfix: ' g',
  },
  {
    mapDataFrom: 'priceHistory.0.price',
    name: 'Price',
    postfix: ' €',
  },
];

const ProductsContent = ({ products }) => {
  const clickRow = ({ _id }) => {
    history.push(`/products/${_id}`);
  };

  return (
    <>
      <Segment>
        <Grid stackable>
          <Grid.Row
            columns="equal"
            style={{ marginLeft: '0px', height: '470px' }}
          >
            <div style={{ height: '100%', overflow: 'auto', width: '100%' }}>
              <TableWithPagination list={products}>
                <Unitable
                  columns={columns}
                  onRowClick={clickRow}
                  clickArgs={['_id']}
                  sortable
                  selectable
                  sortByColumn="name"
                />
              </TableWithPagination>
            </div>
          </Grid.Row>
        </Grid>
      </Segment>
      {/*<Route
          exact
          path={`${match.url}/add/newProduct`}
          render={props => <ProductModal open {...props} title="Add a new product"
          // component={ProductModal}
          />}
        />
        {/* <Route exact path="/products/list/add/newProduct" component={withRouter(ProductModal)} /> */}
    </>
  );
};

const mapStateToProps = (state, { search }) => ({
  products: getProductsWithFilter(search)(state),
  family: state.products.family,
  tax: state.products.tax,
});

export default connect(mapStateToProps)(ProductsContent);
