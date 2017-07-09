import { combineReducers } from 'redux'
import todos from './todos'
import * as types from '../constants/ActionTypes'

const rootReducer = combineReducers({
  todos,
})

export default rootReducer
