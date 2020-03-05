import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Segment,
  Grid,
  Input,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';

// import ProductModal from './ProductModal';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];
const Toolbar = ({ changeSearch }) => {
  const handleChangeSearch = ({ target }) => {
    changeSearch(target.value);
  };

  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={6} style={{ marginLeft: '10px' }}>
            <Input
              onChange={handleChangeSearch}
              icon="search"
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

export default withRouter(Toolbar);
