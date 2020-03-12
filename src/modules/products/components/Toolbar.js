import React, { useEffect } from 'react';
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

import { getProductFamilySaga } from '../actions';
import { selectorGetProductCategories } from '../selectors';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];
const Toolbar = ({
  changeSearch,
  changeCategory,
  categories,
  getProductFamilySaga,
}) => {
  const isCategoriesLoading = categories.length <= 1;

  const handleChangeSearch = ({ target }) => {
    changeSearch(target.value);
  };
  const handleChangeCategory = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    changeCategory(text);
  };

  useEffect(() => {
    if (isCategoriesLoading) {
      getProductFamilySaga();
    }
  }, []);

  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={7}>
            <Input
              icon="search"
              placeholder="Search..."
              fluid
              onChange={handleChangeSearch}
              className="input-search"
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <b>Category:&nbsp;</b>
            <Dropdown
              defaultValue="All"
              inline
              options={categories}
              disabled={isCategoriesLoading}
              onChange={handleChangeCategory}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <b>Suppliers:&nbsp;</b>
            <Dropdown
              placeholder="All"
              inline
              options={stateOptions}
              disabled
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
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  categories: selectorGetProductCategories(state),
});

const mapDispatchToProps = {
  getProductFamilySaga,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
