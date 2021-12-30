import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-semantic-toasts';
import get from 'lodash/get';

import gqlProducts from 'lib/https/gqlProducts';
import history from 'lib/history';
import {
  CREATE_PRODUCT_LINE_MUTATION,
  UPDATE_PRODUCT_LINE_MUTATION,
  UPDATE_PRODUCT_LINE_PRICE_MUTATION,
} from '../schema';
import { selectorGetProductTax } from '../selectors';
import {
  modifyProductSaga as action,
  modifyProductSuccess as actionSuccess,
  getManufacturers,
} from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { values, initialValues, uploadedImage } }) {
  const { id, defaultPriceId, images, ...rest } = values;
  let isPriceUpdate = false;
  try {
    if (!id) {
      rest.defaultPrice = Number(rest.defaultPrice);
    } else if (id && initialValues.defaultPrice !== rest.defaultPrice) {
      isPriceUpdate = true;
      rest.defaultPrice = Number(rest.defaultPrice);
    } else {
      delete rest.defaultPrice;
    }
    const taxes = yield select(selectorGetProductTax);
    const tax =
      initialValues.tax !== rest.tax
        ? taxes.find(el => el.taxValue === rest.tax)
        : '';
    rest.tax = tax ? tax._id : '';
    initialValues.defaultCost !== rest.defaultCost
      ? (rest.defaultCost = Number(rest.defaultCost))
      : delete rest.defaultCost;

    const variables = {
      data: rest,
    };
    if (uploadedImage) {
      variables.image = uploadedImage;
    }
    if (id) {
      variables.id = id;
    }
    const [{ data, errors }, priceMutation] = yield all([
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
    if (!errors) {
      const responseData = data[id ? 'updateProductLine' : 'createProductLine'];
      history.push('/products');
      const priceHistory = get(
        priceMutation,
        'data.updateProductLinePrice.priceHistory',
        responseData.priceHistory,
      );
      toast({
        type: 'success',
        description: id
          ? 'Product details saved successfully'
          : 'Product created successfully',
        animation: 'fade left',
      });
      yield put(actionSuccess({ ...responseData, priceHistory }));
      yield put(getManufacturers());
    } else {
      if (errors && errors[0].message === 'Token expired')
        yield put(updateSessionExpired(true));
      toast({
        type: 'error',
        description: 'Error! Something went wrong',
        animation: 'fade left',
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* modifyProductSaga() {
  yield takeLatest(action, handler);
  return handler;
}
