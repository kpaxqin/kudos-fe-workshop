import * as types from '../constants/ActionTypes'
import api from '../api';

const addTodoSuccess = text => ({ type: types.ADD_TODO, text })

const errorHandler = e => {
  window.alert(e)
  throw e;
};

export const addTodo = text => dispatch => Promise.all([api.addTodo(text), api.addTodo(text)])
  .then(([data])=> {
    dispatch(addTodoSuccess(text));
  }, errorHandler);
  
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
