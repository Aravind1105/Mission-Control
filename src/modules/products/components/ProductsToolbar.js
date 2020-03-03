import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Search_Text } from '../actions/productActions';
import { put } from 'redux-saga/effects';
import {
  Segment,
  Grid,
  Input,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';
import ProductModal from './ProductModal';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];
class ProductsToolbar extends React.Component {
  render() {
    return (
      <Segment className="toolbar">
        <Grid stackable>
          <Grid.Row verticalAlign="middle" columns="equal">
            <Grid.Column width={6} style={{ marginLeft: '10px' }}>
              <Input
                onChange={this.props.handleTextChanged}
                value={this.props.searchText}
                icon="user"
                placeholder="Search..."
                className="full-width"
              />
            </Grid.Column>

            <Grid.Column>
              <Dropdown
                placeholder="All types"
                selection
                options={stateOptions}
                className="full-width"
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                placeholder="All types"
                selection
                options={stateOptions}
                className="full-width"
              />
            </Grid.Column>

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
                Add Products
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  searchText: state.products.searchText,
});

const mapDispatchToProps = dispatch => ({
  handleTextChanged: (e, { value }) =>
    dispatch({
      type: Search_Text,
      payload: value,
    }),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar),
);
