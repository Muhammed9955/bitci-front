import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import createHistory from 'history/createHashHistory'
import {routerMiddleware as createRouterMiddleware} from 'react-router-redux'

import sagas from './sagas'
import appReducer from './state'


export const history = createHistory()

const sagaMiddleware = createSagaMiddleware()
const routerMiddleware = createRouterMiddleware(history)
const middleWares = [
  sagaMiddleware,
  routerMiddleware
]

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(...middleWares)))

sagaMiddleware.run(sagas)

export default store