import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import get from 'lodash/get';

import history from 'lib/history';
import gqlProducts from 'lib/https/gqlProducts';
// import updatePrice from './updatePrice';
import {
  CREATE_PRODUCT_LINE_MUTATION,
  UPDATE_PRODUCT_LINE_MUTATION,
  UPDATE_PRODUCT_LINE_PRICE_MUTATION,
} from '../schema';
import { selectorGetProductTax } from '../selectors';
import {
  modifyProductSaga as action,
  modifyProductSuccess as actionSuccess,
} from '../actions';

function* handler({ payload: { values, initialValues, uploadedImage, isImageDeleted } }) {
  const { id, defaultPriceId, images, ...rest } = values;
  const isPriceUpdate = id && initialValues.defaultPrice !== rest.defaultPrice;
  if (isImageDeleted) rest.images = [];
  try {
    const taxes = yield select(selectorGetProductTax);

    const tax = rest.tax ? taxes.find(el => el.taxValue === rest.tax) : '';
    rest.tax = tax ? tax._id : '';
    rest.defaultPrice = Number(rest.defaultPrice);
    rest.defaultCost = Number(rest.defaultCost);
    const variables = {
      data: rest,
    };
    if (uploadedImage) {
      variables.image = uploadedImage;
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
    ]);
    
    const responseData = data[id ? 'updateProductLine' : 'createProductLine'];
    
    // TODO: response status should reach props to alert the users the following information.
    if(id){
      if (responseData) window.alert('Product Line erfolgreich gespeichert!');
      else window.alert('Product Line nicht gespeichert. Bitte wenden Sie sich an die Mitarbeiter von Livello.');
    } else{
      if (responseData) window.alert('Product Line erfolgreich eingereicht!');
      else window.alert('Product Line nicht eingereicht. Bitte wenden Sie sich an die Mitarbeiter von Livello.');
    }

    const priceHistory = get(
      priceMutation,
      'data.updateProductLinePrice.priceHistory',
      responseData.priceHistory,
    );
    if (!id) {
      history.replace(`/products/${responseData._id}`);
    }
    yield put(actionSuccess({ ...responseData, priceHistory }));
  } catch (e) {
    console.log(e);
  }
}

export default function* modifyProductSaga() {
  yield takeLatest(action, handler);
  return handler;
}
