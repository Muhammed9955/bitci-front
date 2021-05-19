import {takeEvery, call} from 'redux-saga/effects'
import {Parser} from 'json2csv'

import {EXPORT_ARRAY_AS_CSV} from 'store/state/app/types'


const EOL = '\r\n'
const DELIMITER = ','

const download = (filename, text) => {
  const el = document.createElement('a')
  el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  el.setAttribute('download', filename)

  el.style.display = 'none'
  document.body.appendChild(el)

  el.click()

  document.body.removeChild(el)
}

function* exportArrayAsCSVHandler({payload}) {
  const {filename, array} = payload

  if(!array.length) return null

  const fields = Object.keys(array[0])
  const parser = new Parser({fields, delimiter: DELIMITER, eol: EOL})
  const csv = `sep=${DELIMITER}${EOL}` + parser.parse(array)

  yield call(download, filename, csv)
}

export default function* () {
  yield takeEvery(EXPORT_ARRAY_AS_CSV, exportArrayAsCSVHandler)
}
