import React, { useEffect } from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './ProductsContent.css';
import {
  Grid,
  Segment,
  Button,
  Icon,
} from 'semantic-ui-react';
// import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ProductModal from './ProductModal';
import { loadProductsSaga } from '../actions/productActions';
import OrganizationModal from '../../organizations/components/OrganizationModal';


const ProductsContent = ({ loadProducts, products, family, tax, match }) => {
  useEffect(() => {
    loadProducts();
  }, []);
  console.log(products);
  console.log(family);
  console.log(tax);

  const nullChecker = cell => (!cell ? "-" : cell);
  const defaultSorted = [{
    dataField: 'name',
    order: 'asc'
  }];
  const { SearchBar, ClearSearchButton } = Search;
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center'
      },
    },
    {
      dataField: 'manufacturer',
      text: 'Supplier',
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center'
      },
    },
    {
      dataField: 'category',
      text: 'Category',
      formatter: nullChecker,
      align: 'center',
      headerStyle: {
        textAlign: 'center'
      },

    },
    {
      dataField: 'packagingOptions[0].grossWeightGrams',
      text: 'Weight',
      align: 'center',
      headerStyle: () => {
        return { width: '100px', textAlign: 'center' }
      },
      formatter: (cell, row) => {
        return (
          <span>{cell} gms</span>
        );
      },
      sort: true
    },
    {
      dataField: 'priceHistory[0]',
      text: 'Price',
      align: 'center',
      headerStyle: () => {
        return { width: '100px', textAlign: 'center' }
      },
      formatter: (cell, row) => {
        // if (cell.default) {
        return (
          <span>€ {cell.price} </span>
        );
        // }
      },
    },
    {
      text: 'Cost',
      align: 'center',
      headerStyle: () => {
        return { width: '100px', textAlign: 'center' }
      },
      formatter: nullChecker,
    },
    {
      text: 'Margin',
      align: 'center',
      headerStyle: () => {
        return { width: '100px', textAlign: 'center' }
      },
      formatter: nullChecker,
    },
  ];
  console.log(match.url);
  return (
    <>
      <Segment>
        <ToolkitProvider
          bootstrap4
          hover
          keyField='_id'
          data={products}
          columns={columns}
          search
        >
          {
            props => (
              <div>
                <Grid stackable>
                  <Grid.Row verticalAlign="middle" columns="equal">
                    {/* <Grid.Column> */}
                    <SearchBar {...props.searchProps} placeholder="Search any value..." />
                    <ClearSearchButton {...props.searchProps} />
                    {/* </Grid.Column> */}
                    <Grid.Column textAlign="right">
                      <Button
                        icon
                        labelPosition="left"
                        color="green"
                        compact
                        as={Link}
                        to="/products/list/add/newProduct"
                      // onClick={() => <ProductModal open {...props} title="Add a new product" />}
                      >
                        <Icon name="right arrow" />
                        Add Product
            </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                {/* <FaSearch /> */}
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory()}
                />
              </div>
            )
          }
        </ToolkitProvider>
      </Segment>
      <Route
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

const mapStateToProps = state => ({
  products: state.products.product,
  family: state.products.family,
  tax: state.products.tax
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProductsSaga()),
});

ProductsContent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadProducts: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProductsContent),
);

