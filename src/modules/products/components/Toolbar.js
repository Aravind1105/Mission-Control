import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Grid, Dropdown, Button, Icon } from 'semantic-ui-react';

import SearchInput from 'modules/shared/components/SearchInput';
import { selectorGetProductCategories, selectorGetSupplier } from '../selectors';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];
const Toolbar = ({ changeSearch, changeCategory, categories, supplier }) => {
  const isCategoriesLoading = categories.length <= 1;

  const handleChangeCategory = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    changeCategory(text);
  };

  const handleChangeSupplier = () => {
    console.log('supplier: ', supplier)
  }

  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={7}>
            <SearchInput onChange={changeSearch} timeout={500} />
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
              options={supplier}
              onChange={handleChangeSupplier}
              // disabled
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
  supplier: selectorGetSupplier(state),
});

export default connect(mapStateToProps)(Toolbar);
