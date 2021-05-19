import {takeEvery, call, put} from 'redux-saga/effects'
import {LOCATION_CHANGE} from 'react-router-redux'
import {matchPath} from 'react-router-dom'

import paths from 'utils/paths'
import toasts from 'utils/toasts'
import {ID_VERIF_STATUSES} from 'utils/constants'
import {setUsers} from 'store/state/admin/actions'
import {CHANGE_USER_ID_VERIF} from 'store/state/admin/types'
import * as api from 'api'


function* changeUserIdVerifHandler({payload}) {
  const {userId, status} = payload

  const result = yield call(api.setUserVerified, userId, status)

  if (result) {
    yield call(updateUsers)

    toasts.add('Change status is success', 'success')
  } else {
    toasts.add('Error in changing status', 'error')
  }
}

function* updateUsers() {
  const users = yield call(api.getUsers)
  const mappedUsers = users.map(
    (user) => (user.idVerified ? user : {...user, idVerified: ID_VERIF_STATUSES.UNVERIFIED}),
  )

  yield put(setUsers(mappedUsers))
}

export default function* () {
  yield takeEvery(CHANGE_USER_ID_VERIF, changeUserIdVerifHandler)

  let needUpdateUsers = true
  yield takeEvery(LOCATION_CHANGE, function* ({payload}) {
    const {pathname} = payload

    if (matchPath(pathname, paths.ADMIN)) {
      if (needUpdateUsers) {
        yield call(updateUsers)

        needUpdateUsers = false
      }
    } else {
      needUpdateUsers = true
    }
  })
}