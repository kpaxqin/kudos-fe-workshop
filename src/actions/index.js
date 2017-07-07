import * as types from '../constants/ActionTypes'
import api from '../api';

const createAsyncAction = (type, asyncFn, ) => syncPayload => dispatch => {
  dispatch({
    type, 
    payload: syncPayload
  })
  asyncFn(syncPayload).then(
    (data)=> {
      dispatch({type: `${type}_SUCCESS`, payload: data})
    },
    (e)=> {
      dispatch({type: `${type}_FAILED`, payload: e, error: true})
    }
  )
}

export const addTodo = createAsyncAction(
  types.ADD_TODO, 
  (text)=> Promise.all([api.addTodo(text), api.addTodo(text)]),
);

export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
