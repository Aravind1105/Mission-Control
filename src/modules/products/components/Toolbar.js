import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Segment,
  Grid,
  Dropdown,
  Button,
  Icon,
  Divider,
  Input,
} from 'semantic-ui-react';

import SearchInput from 'modules/shared/components/SearchInput';
import {
  selectorGetProductCategories,
  selectorGetSupplier,
} from '../selectors';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];
const Toolbar = ({
  search,
  setSearch,
  changeSearch,
  changeCategory,
  changeSupplier,
  categories,
  supplier,
}) => {

  const handleSearchChange = ({ target }) => {
    changeSearch(target.value);
  };
  const handleChangeCategory = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    changeCategory(text);
  };

  const handleChangeSupplier = (e, { value }) => {
    const text = value === 'All Suppliers' ? '' : value;
    changeSupplier(text);
  };

  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={6}>
            <Input
              icon="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
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
              to="/products/new"
            >
              <Icon name="right arrow" />
              Add Products
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Divider style={{ marginTop: 0, marginBottom: 0 }} />
        <Grid.Row verticalAlign="middle" columns={2}>
          <Grid.Column mobile={16} computer={4}>
            <Dropdown
              placeholder="All Categories"
              selection
              className="full-width"
              onChange={handleChangeCategory}
              options={categories}
            ></Dropdown>
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Dropdown
              placeholder="All Suppliers"
              selection
              className="full-width"
              onChange={handleChangeSupplier}
              options={supplier}
            ></Dropdown>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  categories: selectorGetProductCategories(state),
  supplier: selectorGetSupplier(state),
});

export default connect(mapStateToProps)(Toolbar);
