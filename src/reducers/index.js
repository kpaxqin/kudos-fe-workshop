import { combineReducers } from 'redux'
import todos from './todos'
import * as types from '../constants/ActionTypes'

const rootReducer = combineReducers({
  todos,
  error(state = null, action) {
    switch(action.type) {
      case types.ADD_TODO_FAILED:
        // shouldn't call alert in reducer, just for demostrate
        window.alert(action.payload); 
        return action.payload;
      default: return state;
    }
  }
})

export default rootReducer
