import { call, put, takeLatest } from 'redux-saga/effects';
import gqlKiosk from 'lib/https/gqlKiosk';
import { updateSessionExpired } from '../../../core/actions/coreActions';
import { addSingleKiosk as action, getKiosk } from '../actions';
import { ADD_SINGLE_KIOSK } from '../schema';
import { toast } from 'react-semantic-toasts';

function* handler({ payload }) {
  try {
    const { kioskId } = payload;
    const variables = {
      data: {
        kioskId: kioskId,
        loadCellConfigs: [
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A11',
            cellId: '1',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A12',
            cellId: '2',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A21',
            cellId: '3',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A22',
            cellId: '4',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A31',
            cellId: '5',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A32',
            cellId: '6',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A41',
            cellId: '7',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A42',
            cellId: '8',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A51',
            cellId: '9',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A52',
            cellId: '10',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A61',
            cellId: '11',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A62',
            cellId: '12',
            surfaceSize: 'N50',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A71',
            cellId: '13',
            surfaceSize: 'N33',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A72',
            cellId: '14',
            surfaceSize: 'N33',
          },
          {
            productLine: '6110ceae05ae6c5fd493d98a',
            planogramPosition: 'A73',
            cellId: '15',
            surfaceSize: 'N33',
          },
        ],
      },
    };
    const { errors } = yield call(gqlKiosk.mutate, {
      mutation: ADD_SINGLE_KIOSK,
      variables,
    });

    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    yield put(getKiosk(kioskId));

    toast({
      type: 'success',
      description: 'Single Kiosk was added successfully.',
      animation: 'fade left',
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
