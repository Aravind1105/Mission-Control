import { all, fork } from 'redux-saga/effects';

import getWidgetData from './getWidgetData';
import getTopSellingKiosks from './getTopSellingKiosks';

export default function* reportsSaga() {
  yield all([fork(getWidgetData), fork(getTopSellingKiosks)]);
}
