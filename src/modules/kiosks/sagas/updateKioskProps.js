import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'lib/history';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
    updateKioskProps as action,
    updateKioskPropsSuccess as actionSuccess,
} from '../actions';
import { CONFIGURE_KIOSK_PROPS } from '../schema';
import { toast } from 'react-semantic-toasts';

function* handler({ payload: { finalProps } }) {
    try {
        const { id, ...rest } = finalProps;
        const variables = {
            data: {
                kioskId: id,
                controller: rest
            }
        };
        const responseData = yield call(gqlKiosk.mutate, {
            mutation: CONFIGURE_KIOSK_PROPS,
            variables,
        });
        const res = responseData.data.configureKioskProps;
        if (!res.errors) {
            toast({
                type: 'success',
                description: 'Kiosk settings customized successfully',
                animation: 'fade left',
            });
        } else {
            toast({
                type: 'error',
                description: 'Error! Something went wrong',
                animation: 'fade left'
            });
        }
        yield put(actionSuccess(res));
        history.push(`/kiosks/detail/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export default function* saga() {
    yield takeLatest(action, handler);
}
