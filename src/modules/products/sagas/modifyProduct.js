import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import get from 'lodash/get';

import gqlProducts from 'lib/https/gqlProducts';
// import updatePrice from './updatePrice';
// !Clean comments LIV-1584
import {
  CREATE_PRODUCT_LINE_MUTATION,
  UPDATE_PRODUCT_LINE_MUTATION,
  UPDATE_PRODUCT_LINE_PRICE_MUTATION,
  // UPLOAD_PRODUCT_LINE_IMAGE_MUTATION,
} from '../schema';
import { selectorGetProductTax } from '../selectors';
import {
  modifyProductSaga as action,
  modifyProductSuccess as actionSuccess,
} from '../actions';

// let tempVar;
function* handler({ payload: { values, initialValues, uploadedImage, isImageDeleted } }) {
  const { id, defaultPriceId, images, ...rest } = values;
  let isPriceUpdate = false;


  // console.log('uploadedImage:', uploadedImage)

  // console.log('values: ', values)
  if (isImageDeleted) rest.images = [];
  try {
    if(!id){
      rest.defaultPrice = Number(rest.defaultPrice);
    }else if(id && initialValues.defaultPrice !== rest.defaultPrice){
      isPriceUpdate = true;
      rest.defaultPrice = Number(rest.defaultPrice);
    }else{
      delete rest.defaultPrice;
    }
    const taxes = yield select(selectorGetProductTax);
    const tax = (initialValues.tax !== rest.tax ) 
      ? taxes.find(el => el.taxValue === rest.tax) 
      : '';
    rest.tax = tax ? tax._id : '';
    (initialValues.defaultCost !== rest.defaultCost)
    ? rest.defaultCost = Number(rest.defaultCost)
    : delete rest.defaultCost;

    const variables = {
      data: rest,
    };
    if (uploadedImage) {
      variables.image = uploadedImage;
      // console.log('img: ', uploadedImage)
      // "https://storage.googleapis.com/livello-public/img/productline_5f3e8fd12e85286ed239d2fe_bagel_malz_pute.jpg"
      // tempVar = uploadedImage;
      // console.log('img: ', tempVar)
      // variables.orgId = values.orgId
      // console.log('orgId: ', variables.orgId)
    }
    if (id) {
      variables.id = id;
    }
    const [{ data }, priceMutation] = yield all([
      call(gqlProducts.mutate, {
        mutation: id
          ? UPDATE_PRODUCT_LINE_MUTATION
          : CREATE_PRODUCT_LINE_MUTATION,
        variables,
      }),
      isPriceUpdate
        ? call(gqlProducts.mutate, {
          mutation: UPDATE_PRODUCT_LINE_PRICE_MUTATION,
          variables: {
            id,
            data: {
              priceId: defaultPriceId,
              price: rest.defaultPrice,
              default: true,
            },
          },
        })
        : null,
      //   uploadedImage
      // ? call(gqlProducts.mutate,{
      //   mutation: UPLOAD_PRODUCT_LINE_IMAGE_MUTATION,
      //   variables: {
      //     id: variables.id,
      //     orgId: variables.orgId,
      //     image: tempVar,
      //   },
      // })
      // : console.log('GIMME THAT IMAGE!')
    ]);
    
    const responseData = data[id ? 'updateProductLine' : 'createProductLine'];
    
    const priceHistory = get(
      priceMutation,
      'data.updateProductLinePrice.priceHistory',
      responseData.priceHistory,
    );
    yield put(actionSuccess({ ...responseData, priceHistory }));
  } catch (e) {
    console.log(e);
    window.alert('An error has occurred with your action. Please contact the Livello staff.');
  }
}

export default function* modifyProductSaga() {
  yield takeLatest(action, handler);
  return handler;
}
