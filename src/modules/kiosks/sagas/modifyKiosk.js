import { call, put, takeLatest } from 'redux-saga/effects';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import { toast } from 'react-semantic-toasts';
import history from 'lib/history';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  modifyKiosk as action,
  modifyKioskSuccess as actionSuccess,
  getKiosksList,
} from '../actions';
import { CREATE_KIOSK_MUTATION, UPDATE_KIOSK_MUTATION } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { values } }) {
  try {
    const { id, orgId, pin, technicianPin, ...rest } = values;
    const variables = {
      data: {
        ...rest,
        controller: {
          technicianPin: parseInt(technicianPin),
        },
      },
    };
    if (id) {
      variables.id = id;
    }
    if (orgId) {
      variables.data.ownerOrganization = orgId;
      variables.data.orgId = orgId;
    }
    variables.data.pin = parseInt(pin);

    const { data, errors } = yield call(gqlKiosk.mutate, {
      mutation: id ? UPDATE_KIOSK_MUTATION : CREATE_KIOSK_MUTATION,
      variables,
    });

    if (!errors) {
      const responseData = data[id ? 'kioskUpdate' : 'kioskCreate'];

      history.push(`/kiosks/detail/${responseData._id}`);
      const kiosk = {
        ...responseData,
        inventory: {
          loadCells: toFlatLoadCellItem(responseData.inventory.loadCells),
        },
      };
      yield put(actionSuccess(kiosk));
      toast({
        type: 'success',
        description: id
          ? 'Kiosk details saved successfully'
          : 'Kiosk created successfully',
        animation: 'fade left',
      });

      !id && (yield put(getKiosksList()));
    } else {
      if (errors && errors[0].message === 'Token expired')
        yield put(updateSessionExpired(true));
      toast({
        type: 'error',
        description: 'Error! Something went wrong',
        animation: 'fade left',
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
