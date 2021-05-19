import {initialize, addTranslationForLanguage} from 'react-localize-redux'
import {SET_ACTIVE_LANGUAGE} from 'react-localize-redux/lib/locale'
import {put, all, takeEvery} from 'redux-saga/effects'

import translations from 'translations'


const setCookieLang = (code) => (document.cookie = `lang=${code}; path=/`)
const getCookieLang = () => {
  const match = document.cookie.match(/\blang=([^\;]+)(([;].*)|($))/)

  return match && match[1]
}

function* setActiveLanguageHandler({payload}) {
  const {languageCode: code} = payload

  setCookieLang(code)
}

export default function* () {
  yield put(initialize(
    translations.map(({name, code}) => ({name, code})),
    {defaultLanguage: getCookieLang() || 'en', showMissingTranslationMsg: false}),
  )

  const addTranslationsActions = translations.map(({code, content}) => (
    put(addTranslationForLanguage(content, code))
  ))

  yield all(addTranslationsActions)
  yield takeEvery(SET_ACTIVE_LANGUAGE, setActiveLanguageHandler)
}