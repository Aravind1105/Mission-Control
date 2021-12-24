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
import SelectCheckBoxes from 'modules/shared/components/SelectCheckBoxes';
import {
  selectorGetProductCategories,
  getProductsDropdownList,
} from '../selectors';

const Toolbar = ({
  search,
  changeSearch,
  changeCategory,
  changeManufacturer,
  manufacturerOptions,
  manufacturer,
  isManufacturesLoading,
}) => {
  const handleSearchChange = ({ target }) => {
    changeSearch(target.value);
  };
  const handleChangeCategory = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    changeCategory(text);
  };

  const handleChangeManufacturer = value => {
    const text = value === 'All Manufacturers' ? '' : value;
    changeManufacturer(value);
  };

  return (
    <Segment className="products-toolbar">
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
          {/* <Grid.Column mobile={16} tablet={8} computer={3}>
            <SelectCheckBoxes
              title="Products"
              options={products}
              allOptionKey="all"
              onClickApply={handleProductsChange}
              isLoading={isProductsLoading}
              value={product}
            />
          </Grid.Column> */}
          <Grid.Column mobile={16} tablet={8} computer={3}>
            <SelectCheckBoxes
              title="Manufacturers"
              options={manufacturerOptions}
              allOptionKey="all"
              onClickApply={handleChangeManufacturer}
              isLoading={isManufacturesLoading}
              value={manufacturer}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => ({
  categories: selectorGetProductCategories(state),
  isManufacturesLoading: state.products.isManufacturesLoading,
  products: getProductsDropdownList(state),
});

export default connect(mapStateToProps)(Toolbar);
