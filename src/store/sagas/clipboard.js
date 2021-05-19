import {takeEvery, call} from 'redux-saga/effects'

import {COPY_TO_CLIPBOARD} from 'store/state/app/types'
import toasts from 'utils/toasts'


const copy = (text) => {
  const textArea = document.createElement('textarea')

  textArea.style.opacity = '0'
  textArea.style.position = 'fixed'
  textArea.value = text

  document.body.appendChild(textArea)

  textArea.select()
  document.execCommand('copy')

  document.body.removeChild(textArea)
}

function* copyToClipboardHandler({payload: text}) {
  yield call(copy, text)

  toasts.add('Copied to clipboard')
}

export default function* () {
  yield takeEvery(COPY_TO_CLIPBOARD, copyToClipboardHandler)
}