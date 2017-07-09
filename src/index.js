import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import 'todomvc-app-css/index.css'

const errorMiddleware = store => next => action => {
  if (action.meta && action.meta.asyncPhase && action.meta.asyncPhase === 'FAILED') {
    store.dispatch({
      type: 'ASYNC_FAILED',
      payload: action.payload
    })
  }

  return next(action);
}

const middlewares = [
  thunk,
  errorMiddleware,
  createLogger()
]

const store = applyMiddleware(...middlewares)(createStore)(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
