import {combineReducers} from 'redux'
import {localeReducer} from 'react-localize-redux'

import appReducer from './app'
import uiReducer from './ui'
import routerReducer from './router'
import adminReducer from './admin'


export default combineReducers({
  app: appReducer,
  ui: uiReducer,
  router: routerReducer,
  locale: localeReducer,
  admin: adminReducer,
})