import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Segment,
  Container,
  Pagination,
  Button,
  Icon,
} from 'semantic-ui-react';
import { loadProductsSaga } from '../actions/productActions';

import {
  Unitable,
  valueEquals,
  conditionalValue,
} from '../../shared/components/unitableReloaded';

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
  }
];
class ProductsContent extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    products: []
  }
  getProductsData = () => {
    let productsarray = [];
    if (this.props.products !== undefined && this.props.products !== null && this.props.products.length > 0 && this.props.searchText !== undefined && this.props.searchText !== null && this.props.searchText.toString().trim() !== '') {
      this.props.products.forEach(productObject => {
        if (productObject.name !== undefined && (productObject.name.toString().trim().toLowerCase().includes(this.props.searchText.toString().trim().toLowerCase())
          || productObject.manufacturer.toString().trim().toLowerCase().includes(this.props.searchText.toString().trim().toLowerCase())
          || productObject.category.toString().trim().toLowerCase().includes(this.props.searchText.toString().trim().toLowerCase()))) {

          productsarray.push(productObject)
        }
      });
    } else {
      productsarray = this.props.products
    }
    return productsarray
  }
  render() {
    return (
      <>
        <Segment>
          <Grid stackable>
            <Grid.Row columns="equal" style={{ marginLeft: '0px', height: '470px' }}>
              <div style={{ height: '100%', overflow: 'auto', width: '100%' }}>
                <Unitable
                  data={this.getProductsData()}
                  columns={columns}
                  // onRowClick={clickRow}
                  // clickArgs={['id']}
                  sortable
                  selectable
                  sortByColumn="name"
                />
              </div>
            </Grid.Row>
            <Grid.Row columns="equal" style={{ marginLeft: '0px', height: '50px', paddingTop: '0px', paddingBottom: '0px' }}>
              <Grid.Column width={6} />
              <Grid.Column width={3}>
                {true && (
                  <Container textAlign="center">
                    <Pagination
                      defaultActivePage={1}
                      boundaryRange={0}
                      onPageChange={null}
                      size="mini"
                      siblingRange={1}
                      totalPages={1}
                    />
                  </Container>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
       
        </Segment >
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
}
const mapStateToProps = state => ({
  products: state.products.product,
  family: state.products.family,
  tax: state.products.tax,
  searchText: state.products.searchText
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProductsSaga()),

});
export default
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProductsContent)

