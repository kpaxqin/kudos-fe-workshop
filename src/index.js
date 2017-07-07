import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import 'todomvc-app-css/index.css'

const middlewares = [
  thunk,
  createLogger()
]

const store = applyMiddleware(...middlewares)(createStore)(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
