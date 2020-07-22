import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import get from 'lodash/get';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import { getKioskListName } from 'modules/kiosks/selectors';
import ProductForm from './components/ProductForm';
import ProductPriceHistory from './components/ProductPriceHistory';
import ImageUploader from './components/ImageUploader';
import { getFullProductData, deleteProductSaga } from './actions';
import { getOrganizations } from '../organizations/actions';
import {
  selectorGetProductInitValue,
  selectorGetProductFamilyForm,
  selectorProductTaxOptions,
} from './selectors';
import { getOrganizationsAsOptions } from '../organizations/selectors';

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
  isProductLoaded,
  productImg,
  kiosks,
  categoryOption,
  familyOption,
  taxesOption,
  deleteProductSaga,
  isLoading,
  match,
  getFullProductData,
  organizations,
  getOrganizations,
}) => {
  const { id } = match.params;
  const isNewProduct = id === 'new';
  const productName = isNewProduct ? 'New Product' : get(product, 'name', '');
  const { priceHistory, ...initialValues } = product;
  const loaded = familyOption.length && isProductLoaded;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isCancelTriggered, setIsCancelTriggered] = useState(false);

  useEffect(() => {
    const { id } = match.params;
    if (!isLoading) {
      getFullProductData(id);
      getOrganizations();
    }
  }, []);
  
  const deleteProductLine = () => {
    if(window.confirm('Willst Du das Product Line löschen?')){
      const {payload} = deleteProductSaga(id)
      if(payload == id){
        window.alert('Product Line erfolgreich gelöscht!')
        window.location.href = backLink.link
      }
    }
  }

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
                    initialValues={{ ...initialValues, image: 0 }}
                    categoryOption={categoryOption}
                    familyOption={familyOption}
                    taxesOption={taxesOption}
                    uploadedImage={uploadedImage}
                    organizations={organizations}
                    isImageDeleted={isImageDeleted}
                    setIsCancelTriggered={setIsCancelTriggered}
                    setIsImageDeleted={setIsImageDeleted}
                  />
                </Segment>
              </Grid.Column>
            ) : (
              <Loader />
            )}
          </Grid.Row>
        </Grid>
      </Grid.Column>

      {isProductLoaded ? (
        <Grid.Column width={5}>
          <Segment>
          <h3>Delete Product&nbsp;&nbsp;
            <i
            onClick={deleteProductLine} 
            className="trash icon right" > </i>
          </h3>
          </Segment>
          <ProductPriceHistory priceHistory={priceHistory} kiosks={kiosks} />
          <ImageUploader
            src={productImg}
            setUploadedImage={setUploadedImage}
            setIsImageDeleted={setIsImageDeleted}
            isCancelTriggered={isCancelTriggered}
            isImageDeleted={isImageDeleted}
          />
        </Grid.Column>
      ) : null}
    </Grid>
  );
};

const mapStateToProps = (state, { match: { params } }) => {
  const options = selectorGetProductFamilyForm(state);
  const product = selectorGetProductInitValue(state);
  const isProductLoaded = params.id === 'new'
    ? !get(product, 'id')
    : product && product.id === params.id;

  return {
    product,
    isProductLoaded,
    kiosks: getKioskListName(state),
    productImg: get(product, 'images[0]', ''),
    taxesOption: selectorProductTaxOptions(state),
    categoryOption: options.categories,
    familyOption: options.families,
    organizations: getOrganizationsAsOptions(state),
  };
};

const mapDispatchToProps = {
  getFullProductData,
  getOrganizations,
  deleteProductSaga,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
