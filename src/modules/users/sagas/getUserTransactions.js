import { call, put, takeEvery } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import { getUserTransactions, getUserTransactionsSuccess } from '../actions';
import { GET_USER_TRANSACTIONS } from '../schema';

function* handler({ payload }) {
    try {
        const {
            data: { findAllTransactions },
        } = yield call(gqlTransactions.query, {
            query: GET_USER_TRANSACTIONS,
            variables: {
                id: payload.data.id,
            },
        });
        yield put(
            getUserTransactionsSuccess({
                user: findAllTransactions,
            }),
        );
    } catch (e) {
        console.log(e);
    }
}

export default function* saga() {
    yield takeEvery(getUserTransactions, handler);
}
