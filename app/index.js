import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules/'
import { checkIfAuthed } from 'helpers/auth'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

const history = syncHistoryWithStore(hashHistory, store)

function checkAuth (nextState, replace) {
  if (store.getState().users.isFetching === true) return
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed) replace('/timeline')
  } else {
    if (!isAuthed) replace('/auth')
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth, history)}
  </Provider>,
  document.getElementById('app')
)
