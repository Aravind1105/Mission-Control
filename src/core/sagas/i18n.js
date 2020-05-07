import { all, call, takeEvery, put } from 'redux-saga/effects';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ls from 'lib/LocalStorage';
import { changeLanguageSaga } from '../actions/i18nActions';
import { setLanguageState } from '../actions/coreActions';
import baseLanguage from '../i18n';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LANGUAGE_NS,
  LANGUAGE_STORAGE_KEY,
} from '../constants';

function* getTranslationsAsync(lng) {
  try {
    const response = yield call(fetch, `/locales/${lng}/translation.json`);
    const responseBody = yield response.json();
    return responseBody;
  } catch (e) {
    console.log(e);
  }
}

function* addLanguageAsync(lng, translations) {
  yield i18n.addResourceBundle(
    lng,
    DEFAULT_LANGUAGE_NS,
    translations,
    true,
    false,
  );
}

function* loadLanguage(lng) {
  const isLoaded = i18n.hasResourceBundle(lng, DEFAULT_LANGUAGE_NS);

  if (!isLoaded) {
    const translations = yield call(getTranslationsAsync, lng);
    yield call(addLanguageAsync, lng, translations);
  }
}

function* handler({ payload }) {
  yield call(loadLanguage, payload);
  yield put(setLanguageState(payload));
  yield i18n.changeLanguage(payload);
  ls.setItem(LANGUAGE_STORAGE_KEY, payload);
}

function* initializeI18nDev() {
  yield i18n.use(initReactI18next).init({
    resources: baseLanguage,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

  const chosenLanguage = ls.getItem(LANGUAGE_STORAGE_KEY);
  yield call(handler, { payload: chosenLanguage || DEFAULT_LANGUAGE });
}
function* watchChangeLanguage() {
  yield takeEvery(changeLanguageSaga, handler);
}

export function* initializeI18n() {
  yield call(initializeI18nDev);
}

export default function* languageSaga() {
  yield all([watchChangeLanguage()]);
}
