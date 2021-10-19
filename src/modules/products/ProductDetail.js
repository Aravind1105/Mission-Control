import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider, Button } from 'semantic-ui-react';
import get from 'lodash/get';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import { getKioskListName } from 'modules/kiosks/selectors';
import ProductForm from './components/ProductForm';
import ImageUploader from './components/ImageUploader';
import {
  getFullProductData,
  getPriceHistory,
  resetPriceHistory,
  deleteActivePriceHistory,
  archiveProduct,
  duplicateProductLine,
  getKiosksWithProduct,
} from './actions';
import { getOrganizations } from '../organizations/actions';
import {
  getActivePriceHistoryState,
  getDefaultPriceHistoryState,
  getKiosksWithProductState,
  selectorGetProductInitValue,
  selectorProductTaxOptions,
} from './selectors';
import { getOrganizationsAsOptions } from '../organizations/selectors';
import PriceHistoryWidget from './components/PriceHistoryWidget';
import { isEqual } from 'lodash';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';
import './styles.less';
import UsedKiosksWidget from './components/UsedKiosksWidget';

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
  // familyOption,
  taxesOption,
  isLoading,
  match,
  getFullProductData,
  organizations,
  getOrganizations,
  isProductLoading,
  getPriceHistory,
  defaultPriceHistory,
  activePriceHistory,
  resetPriceHistory,
  deleteActivePriceHistory,
  archiveProduct,
  duplicateProductLine,
  getKiosksWithProduct,
  kiosksWithProduct,
}) => {
  const { id } = match.params;
  const isNewProduct = id === 'new';
  const productName = isNewProduct ? 'New Product' : get(product, 'name', '');
  const { priceHistory, ...initialValues } = product;
  const [isCancelTriggered, setIsCancelTriggered] = useState(false);
  const [buttonVal, setButtonVal] = useState('Submit');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  // this state variable is used only when a product is created along with the image
  const [firstUploadImage, setFirstUploadImage] = useState(null);

  useEffect(() => {
    const { id } = match.params;
    if (!isLoading) {
      getFullProductData(id);
      getOrganizations();
      setButtonVal(id == 'new' ? 'Submit' : 'Save');
    }
    if (id) {
      getPriceHistory({ productLineId: id });
      getKiosksWithProduct({ productLineId: id });
    }

    // reset price history redux state if the product is a new one
    if (isEqual(id, 'new')) {
      resetPriceHistory();
    }
  }, []);

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
            <Grid.Column>
              <Segment>
                <Grid stackable>
                  <Grid.Row relaxed="very" columns={2}>
                    <Grid.Column width={10}>
                      <Header as="h2">{productName}</Header>
                    </Grid.Column>
                    {id !== 'new' && (
                      <>
                        <Grid.Column width={6} textAlign="right">
                          <Button
                            className="product-detail-header-action-button"
                            size="small"
                            onClick={() => setShowDuplicateAlert(true)}
                          >
                            Duplicate
                          </Button>
                          <Button
                            className="product-detail-header-action-button product-detail-header-action-button-delete"
                            size="small"
                            onClick={() => setShowDeleteAlert(true)}
                          >
                            Delete
                          </Button>
                        </Grid.Column>
                        <ConfirmationModal
                          title="Duplicate"
                          isModalOpen={showDuplicateAlert}
                          setIsModalOpen={setShowDuplicateAlert}
                          confirmHandler={() => {
                            duplicateProductLine({ productLineId: id });
                            setShowDuplicateAlert(false);
                          }}
                        >
                          {'Are you sure want to duplicate this product?'}
                        </ConfirmationModal>
                        <ConfirmationModal
                          title="Delete"
                          isModalOpen={showDeleteAlert}
                          setIsModalOpen={setShowDeleteAlert}
                          confirmHandler={() => {
                            archiveProduct({ productLineId: id });
                            setShowDeleteAlert(false);
                          }}
                        >
                          {'Are you sure want to delete this product?'}
                        </ConfirmationModal>
                      </>
                    )}
                  </Grid.Row>
                </Grid>

                <Divider />
                <Grid.Row>
                  <ProductForm
                    initialValues={{ ...initialValues, image: 0 }}
                    // categoryOption={categoryOption}
                    // familyOption={familyOption}
                    taxesOption={taxesOption}
                    organizations={organizations}
                    setIsCancelTriggered={setIsCancelTriggered}
                    buttonVal={buttonVal}
                    isProductLoading={isProductLoading}
                    firstUploadImage={firstUploadImage}
                  />
                </Grid.Row>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>

      {isProductLoaded ? (
        <Grid.Column width={5}>
          {defaultPriceHistory.length > 0 && (
            <PriceHistoryWidget priceHistory={defaultPriceHistory} />
          )}
          {activePriceHistory.length > 0 && (
            <PriceHistoryWidget
              priceHistory={activePriceHistory}
              activePriceHistory
              onClickDelete={priceHistoryId =>
                deleteActivePriceHistory({
                  productLineId: id,
                  priceHistoryId,
                })
              }
            />
          )}
          {kiosksWithProduct.length > 0 && (
            <UsedKiosksWidget kioskData={kiosksWithProduct} />
          )}
          <ImageUploader
            isCancelTriggered={isCancelTriggered}
            setIsCancelTriggered={setIsCancelTriggered}
            initialValues={{ ...initialValues, image: 0 }}
            setFirstUploadImage={setFirstUploadImage}
          />
        </Grid.Column>
      ) : null}
    </Grid>
  );
};

const mapStateToProps = (state, { match: { params } }) => {
  const product = selectorGetProductInitValue(state);
  const isProductLoaded =
    params.id === 'new'
      ? !get(product, 'id')
      : product && product.id === params.id;

  return {
    product,
    isProductLoaded,
    kiosks: getKioskListName(state),
    productImg: get(product, 'images[0]', ''),
    taxesOption: selectorProductTaxOptions(state),
    isProductLoading: state.products.isLoading,
    organizations: getOrganizationsAsOptions(state),
    defaultPriceHistory: getDefaultPriceHistoryState(state),
    activePriceHistory: getActivePriceHistoryState(state),
    kiosksWithProduct: getKiosksWithProductState(state),
  };
};

const mapDispatchToProps = {
  getFullProductData,
  getOrganizations,
  getPriceHistory,
  resetPriceHistory,
  deleteActivePriceHistory,
  archiveProduct,
  duplicateProductLine,
  getKiosksWithProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
