import { call, put, takeLatest } from 'redux-saga/effects';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
// import responseErrorFormatter from 'lib/responseErrorFormatter';
import history from 'lib/history';
import gqlKiosk from 'lib/https/gqlKiosk';
import { modifyKiosk as action, getKiosk as actionSuccess } from '../actions';
import {
  CREATE_KIOSK_MUTATION,
  UPDATE_KIOSK_MUTATION,
  GET_KIOSK_QUERY,
} from '../schema';
import { toast } from 'react-semantic-toasts';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { values, formActions } }) {
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

    if (!responseData.errors) {
      const responseData = data[id ? 'kioskUpdate' : 'kioskCreate'];

      history.push(`/kiosks/detail/${responseData._id}`);
      const kiosk = {
        ...responseData,
        inventory: {
          loadCells: toFlatLoadCellItem(responseData.inventory.loadCells),
        },
      };
      toast({
        type: 'success',
        description: 'Kiosk was saved successfully',
        animation: 'fade left',
      });
    } else {
      if (
        responseData.errors &&
        responseData.errors[0].message === 'Token expired'
      )
        yield put(updateSessionExpired(true));
      toast({
        type: 'error',
        description: 'Error! Something went wrong',
        animation: 'fade left',
      });
    }
    yield put(actionSuccess(responseData._id));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
