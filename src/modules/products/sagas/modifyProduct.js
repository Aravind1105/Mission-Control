import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import ls from 'lib/LocalStorage';
import history from 'lib/history';
import responseErrorFormatter from 'lib/responseErrorFormatter';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import updatePrice from './updatePrice';
import { handlerGetProduct } from './getProduct';
import { selectorGetProductTax } from '../selectors';
import {
  modifyProductSaga as action,
  modifyProductSuccess as actionSuccess,
} from '../actions';

function handlerModifyProduct(data, id) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  const route = id ? `/${id}` : '';

  return fetch(`/api/v1/product-lines${route}`, {
    method: id ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function* handler({ payload: { values, formActions, initialValues } }) {
  const { id, defaultPriceId, ...data } = values;
  const isPriceUpdate = id && initialValues.defaultPrice !== data.defaultPrice;
  try {
    const taxes = yield select(selectorGetProductTax);
    const tax = data.tax
      ? taxes.find(el => el._id === data.tax)
      : { _id: data.tax };
    data.tax = tax._id;

    const [response] = yield all([
      call(handlerModifyProduct, data, id),
      isPriceUpdate
        ? call(updatePrice, id, {
            priceId: defaultPriceId,
            price: data.defaultPrice,
            default: true,
          })
        : null,
    ]);
    let respData = yield call([response, response.json]);

    if ('error' in respData && respData.status !== 200) {
      const errors = responseErrorFormatter(respData);
      if (errors) yield put(formActions.setErrors(errors));
      throw Error('error in saga');
    }
    if (id) {
      const prod = yield call(handlerGetProduct, respData._id);
      respData = yield call([prod, prod.json]);
    } else {
      history.replace(`/products/${respData._id}`);
    }

    yield put(actionSuccess(respData));
  } catch (e) {
    console.log(e);
  }
}

export default function* modifyProductSaga() {
  yield takeLatest(action, handler);
}
