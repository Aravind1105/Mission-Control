import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

const ProductsToolbar = ({ openModal }) => {
  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={6}>
            <Input
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
};

export default connect()(ProductsToolbar);
