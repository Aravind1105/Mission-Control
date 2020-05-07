import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import get from 'lodash/get';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import { getKioskListName } from 'modules/kiosks/selectors';
import ProductForm from './components/ProductForm';
import ProductPriceHistory from './components/ProductPriceHistory';
import { getFullProductData } from './actions';
import {
  selectorGetProductInitValue,
  selectorGetProductFamilyForm,
  selectorProductTaxOptions,
} from './selectors';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Products',
    link: '/products',
  },
];
const backLink = {
  name: 'Back to products',
  link: '/products',
};

const ProductDetail = ({
  product,
  kiosks,
  categoryOption,
  familyOption,
  taxesOption,
  isLoading,
  match,
  getFullProductData,
}) => {
  useEffect(() => {
    const { id } = match.params;
    if (!isLoading) {
      getFullProductData(id);
    }
  }, []);
  const { id } = match.params;
  const isNewProduct = id === 'new';
  const productName = isNewProduct ? 'New Product' : get(product, 'name', '');
  const { priceHistory, ...initialValues } = product;
  const isProductLoaded = isNewProduct
    ? !get(product, 'id')
    : product && product.id;
  const loaded = familyOption.length && isProductLoaded;

  return (
    <Grid stackable>
      <Grid.Column width={11}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Breadcrumbs
                  links={links}
                  backLink={backLink}
                  activeLink={productName}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            {loaded ? (
              <Grid.Column>
                <Segment>
                  <Header as="h3">{productName}</Header>
                  <Divider />
                  <ProductForm
                    initialValues={initialValues}
                    categoryOption={categoryOption}
                    familyOption={familyOption}
                    taxesOption={taxesOption}
                  />
                </Segment>
              </Grid.Column>
            ) : (
              <Loader />
            )}
          </Grid.Row>
        </Grid>
      </Grid.Column>

      <Grid.Column width={5}>
        <ProductPriceHistory priceHistory={priceHistory} kiosks={kiosks} />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  const options = selectorGetProductFamilyForm(state);
  return {
    kiosks: getKioskListName(state),
    product: selectorGetProductInitValue(state),
    taxesOption: selectorProductTaxOptions(state),
    categoryOption: options.categories,
    familyOption: options.families,
  };
};

const mapDispatchToProps = {
  getFullProductData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
