import { all, fork } from 'redux-saga/effects';

import getWidgetData from './getWidgetData';

export default function* reportsSaga() {
  yield all([fork(getWidgetData)]);
}
