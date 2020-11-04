import { call, put, takeEvery } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import { getUserTransactions, getUserTransactionsSuccess } from '../actions';
import { GET_USER_TRANSACTIONS } from '../schema';

function* handler({ payload }) {
    try {
        const {
            data: { findUserTransactionsGrid },
        } = yield call(gqlTransactions.query, {
            query: GET_USER_TRANSACTIONS,
            variables: {
                limit: payload.data.limit,
                skip: payload.data.skip,
                search: payload.data.search
            },
        });
        yield put(
            getUserTransactionsSuccess({
                userLogs: findUserTransactionsGrid,
            }),
        );
    } catch (e) {
        console.log(e);
    }
}

export default function* saga() {
    yield takeEvery(getUserTransactions, handler);
}
